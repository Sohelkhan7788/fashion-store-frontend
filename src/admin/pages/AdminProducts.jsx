import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑 Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // 🔁 Toggle stock
  const toggleStock = async (product) => {
    try {
      const res = await api.put(`/products/${product._id}`, {
        inStock: !product.inStock,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? res.data : p
        )
      );
    } catch {
      alert("Failed to update stock");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto">

      {/* 🔥 HEADER + ADD BUTTON */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Products</h2>

        {/* ✅ ADD PRODUCT BUTTON */}
        <button
          onClick={() => navigate("/admin/products/add")}
          className="px-4 py-2 bg-black text-white rounded active:scale-95"
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
          >
            <img
              src={p.images?.[0]}
              alt={p.title}
              className="h-16 w-16 object-cover rounded border"
            />

            <div className="flex-1">
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-500">
                ₹ {p.price}
              </p>
              <p
                className={`text-xs ${
                  p.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {p.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            {/* ACTIONS */}
            <button
              onClick={() => toggleStock(p)}
              className="px-3 py-1 text-sm border rounded"
            >
              Toggle Stock
            </button>

            <button
              onClick={() =>
                navigate(`/admin/products/edit/${p._id}`)
              }
              className="px-3 py-1 text-sm border rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteProduct(p._id)}
              className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
