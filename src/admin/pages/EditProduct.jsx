import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import AdminLayout from "../layout/AdminLayout";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    api.get(`/products`).then(res => {
      const found = res.data.find(p => p._id === id);
      if (found) setProduct(found);
    });
  }, [id]);

  const handleChange = e =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const submit = async () => {
    await api.put(`/products/${id}`, product);
    alert("Product updated");
    navigate("/admin/products");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm max-w-xl">
        <div className="space-y-4">
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={submit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Update Product
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
