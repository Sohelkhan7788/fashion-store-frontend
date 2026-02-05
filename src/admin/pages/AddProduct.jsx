import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);

  const [imageInput, setImageInput] = useState("");
  const [images, setImages] = useState([]);

  // ➕ Add image URL
  const addImage = () => {
    if (!imageInput.trim()) return;
    setImages((prev) => [...prev, imageInput.trim()]);
    setImageInput("");
  };

  // ❌ Remove image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 🚀 Submit product
  const submitProduct = async () => {
    if (!title || !price || images.length === 0) {
      alert("Title, price and at least one image required");
      return;
    }

    try {
      await api.post("/products", {
        title,
        price,
        description,
        images,
        inStock,
      });

      alert("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold mb-6">
        Add Product
      </h1>

      {/* TITLE */}
      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Product title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* PRICE */}
      <input
        type="number"
        className="w-full border p-2 rounded mb-3"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* DESCRIPTION */}
      <textarea
        className="w-full border p-2 rounded mb-4 min-h-[100px]"
        placeholder="Product description (details, fabric, fit etc.)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* IMAGE INPUT */}
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Image URL"
          value={imageInput}
          onChange={(e) => setImageInput(e.target.value)}
        />
        <button
          onClick={addImage}
          className="px-4 bg-black text-white rounded"
        >
          Add
        </button>
      </div>

      {/* IMAGE PREVIEW */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                alt=""
                className="h-24 w-full object-cover rounded border"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* STOCK */}
      <label className="flex items-center gap-2 mb-5">
        <input
          type="checkbox"
          checked={inStock}
          onChange={() => setInStock(!inStock)}
        />
        In Stock
      </label>

      {/* SUBMIT */}
      <button
        onClick={submitProduct}
        className="w-full bg-black text-white py-3 rounded active:scale-95 transition"
      >
        Save Product
      </button>
    </div>
  );
};

export default AddProduct;
