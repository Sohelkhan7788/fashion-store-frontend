import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    api.get("/products").then((res) => {
      const p = res.data.find((x) => x._id === id);
      if (p) setForm(p);
    });
  }, [id]);

  const update = async () => {
    await api.put(`/products/${id}`, form);
    navigate("/admin/products");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

      <div className="space-y-3 max-w-md">
        <input
          value={form.title}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          value={form.price}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          value={form.image}
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button
          onClick={update}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
