import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders"),
        ]);

        const products = productsRes.data;
        const orders = ordersRes.data;

        const revenue = orders
          .filter((o) => o.status !== "Cancelled")
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        const pending = orders.filter((o) => o.status === "Pending").length;
        const outOfStock = products.filter((p) => !p.inStock).length;

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          pending,
          outOfStock,
          revenue,
        });
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = stats
    ? [
        { label: "Total Products", value: stats.totalProducts, to: "/admin/products" },
        { label: "Total Orders", value: stats.totalOrders, to: "/admin/orders" },
        { label: "Pending Orders", value: stats.pending, to: "/admin/orders" },
        { label: "Out of Stock", value: stats.outOfStock, to: "/admin/products" },
        { label: "Revenue (delivered/active)", value: `₹${stats.revenue.toLocaleString("en-IN")}`, to: "/admin/orders" },
      ]
    : [];

  return (
    <div>
      <h2 className="font-display text-2xl font-medium mb-1">Dashboard</h2>
      <p className="text-ink-soft/60 text-sm mb-8">
        A quick snapshot of the store, right now.
      </p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-paper-dim animate-pulse" />
          ))}
        </div>
      ) : !stats ? (
        <p className="text-rose text-sm">Could not load dashboard stats.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="bg-white/70 border border-line p-6 hover:border-brass transition"
            >
              <p className="text-xs uppercase tracking-widest text-ink-soft/50 mb-2">
                {c.label}
              </p>
              <p className="font-display text-3xl font-medium">{c.value}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
