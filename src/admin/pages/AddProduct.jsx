import { useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layout/AdminLayout";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  const handleChange = e =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const submit = async () => {
    await api.post("/products", product);
    alert("Product added");
    setProduct({ title: "", price: "", image: "" });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">
        Add Product
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm max-w-xl">
        <div className="space-y-4">
          <input
            name="title"
            placeholder="Product Title"
            value={product.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="price"
            placeholder="Price"
            type="number"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={submit}
            className="bg-blue-600 text-white px-6 py-3
                       rounded-lg hover:bg-blue-700 transition">
            Add Product
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
