import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders (ADMIN)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  if (loading) return <p>Loading orders...</p>;

  const activeOrders = orders.filter(
    (o) => o.status !== "Cancelled"
  );

  const cancelledOrders = orders.filter(
    (o) => o.status === "Cancelled"
  );

  return (
    <div className="space-y-10">

      {/* ACTIVE ORDERS */}
      <div>
        <h2 className="font-display text-xl font-medium mb-4">
          Active Orders
        </h2>

        {activeOrders.length === 0 && (
          <p className="text-ink-soft/60">No active orders</p>
        )}

        <div className="space-y-4">
          {activeOrders.map((o) => (
            <div
              key={o._id}
              className="bg-white/70 border border-line p-4 text-sm"
            >
              <p className="text-ink-soft/60">
                Order ID: {o._id}
              </p>

              <p>User: {o.user?.email}</p>
              <p>Total: ₹ {o.totalAmount}</p>

              <p className="font-medium">
                Status: {o.status}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    updateStatus(o._id, "Processing")
                  }
                  className="px-3 py-1.5 text-xs uppercase tracking-wide border border-line hover:border-ink transition"
                >
                  Processing
                </button>

                <button
                  onClick={() =>
                    updateStatus(o._id, "Shipped")
                  }
                  className="px-3 py-1.5 text-xs uppercase tracking-wide border border-line hover:border-ink transition"
                >
                  Shipped
                </button>

                <button
                  onClick={() =>
                    updateStatus(o._id, "Delivered")
                  }
                  className="px-3 py-1.5 text-xs uppercase tracking-wide bg-ink text-paper hover:bg-ink-soft transition"
                >
                  Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CANCELLED ORDERS */}
      <div>
        <h2 className="font-display text-xl font-medium mb-4 text-red-600">
          Cancelled Orders
        </h2>

        {cancelledOrders.length === 0 && (
          <p className="text-ink-soft/60">No cancelled orders</p>
        )}

        <div className="space-y-4">
          {cancelledOrders.map((o) => (
            <div
              key={o._id}
              className="bg-paper-dim p-4 border border-line text-sm"
            >
              <p className="text-ink-soft/60">
                Order ID: {o._id}
              </p>

              <p>User: {o.user?.email}</p>
              <p>Total: ₹ {o.totalAmount}</p>

              <p className="text-rose font-semibold">
                Status: Cancelled
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminOrders;
