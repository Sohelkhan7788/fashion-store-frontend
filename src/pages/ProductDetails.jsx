import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data;

        setProduct(data);

        // ✅ SAFE IMAGE SET
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        } else {
          setActiveImage(
            "https://via.placeholder.com/600x600?text=No+Image"
          );
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!product.inStock) return;

    addToCart(product);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading product...
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ================= IMAGE GALLERY ================= */}
        <div>
          {/* MAIN IMAGE */}
          <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* THUMBNAILS */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(img)}
                  className={`
                    h-20 w-20 object-cover rounded cursor-pointer border
                    ${
                      activeImage === img
                        ? "border-black"
                        : "border-gray-300"
                    }
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">
            {product.title}
          </h1>

          <p className="text-xl font-bold">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description || "No description available"}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`
              w-full py-3 rounded font-medium text-white
              transition-all
              ${
                product.inStock
                  ? "bg-black hover:opacity-90 active:scale-95"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
