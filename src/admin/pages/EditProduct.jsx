import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);

  const [imageInput, setImageInput] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        const p = res.data;
        setTitle(p.title || "");
        setPrice(p.price ?? "");
        setCategory(p.category || "");
        setDescription(p.description || "");
        setInStock(p.inStock ?? true);
        setImages(p.images || []);
      })
      .catch(() => toast.error("Could not load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const addImage = () => {
    if (!imageInput.trim()) return;
    setImages((prev) => [...prev, imageInput.trim()]);
    setImageInput("");
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const update = async () => {
    if (!title || !price || images.length === 0) {
      toast.error("Title, price and at least one image are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/products/${id}`, {
        title,
        price,
        category,
        description,
        images,
        inStock,
      });
      toast.success("Product updated");
      navigate("/admin/products");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-ink-soft/60 text-sm">Loading…</p>;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-xl font-medium mb-6">Edit Product</h1>

      <input
        className="w-full border border-line bg-white/70 p-2.5 mb-3 text-sm focus:outline-none focus:border-brass"
        placeholder="Product title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="number"
          className="border border-line bg-white/70 p-2.5 text-sm focus:outline-none focus:border-brass"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border border-line bg-white/70 p-2.5 text-sm focus:outline-none focus:border-brass"
          placeholder="Category (e.g. Shirts)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <textarea
        className="w-full border border-line bg-white/70 p-2.5 mb-4 min-h-[100px] text-sm focus:outline-none focus:border-brass"
        placeholder="Product description (details, fabric, fit etc.)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border border-line bg-white/70 p-2.5 text-sm focus:outline-none focus:border-brass"
          placeholder="Image URL"
          value={imageInput}
          onChange={(e) => setImageInput(e.target.value)}
        />
        <button
          onClick={addImage}
          className="px-4 bg-ink text-paper text-sm hover:bg-ink-soft transition"
        >
          Add
        </button>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                alt=""
                className="h-24 w-full object-cover border border-line"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-rose text-paper text-xs px-2 py-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="flex items-center gap-2 mb-5 text-sm">
        <input
          type="checkbox"
          checked={inStock}
          onChange={() => setInStock(!inStock)}
        />
        In Stock
      </label>

      <button
        onClick={update}
        disabled={saving}
        className="w-full bg-ink text-paper py-3 uppercase text-sm tracking-wider hover:bg-ink-soft active:scale-[0.99] transition disabled:opacity-60"
      >
        {saving ? "Saving…" : "Update Product"}
      </button>
    </div>
  );
};

export default EditProduct;
