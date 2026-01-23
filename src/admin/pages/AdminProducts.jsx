import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import AdminLayout from "../layout/AdminLayout";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load products");
        setLoading(false);
      });
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">
        Products
      </h1>

      {loading && (
        <p className="text-gray-500">Loading products...</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-t">
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <span className="line-clamp-1">
                    {p.title}
                  </span>
                </td>

                <td className="p-4 font-medium">
                  ₹{p.price}
                </td>

                <td className="p-4 flex gap-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${p._id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {products.map(p => (
          <div
            key={p._id}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image}
                alt={p.title}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="font-medium line-clamp-1">
                  {p.title}
                </p>
                <p className="text-gray-600 mt-1">
                  ₹{p.price}
                </p>
              </div>
            </div>

            <div className="flex gap-6 mt-4 text-sm">
              <button
                onClick={() =>
                  navigate(`/admin/edit-product/${p._id}`)
                }
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
