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
  const [adding, setAdding] = useState(false);

  // 🔄 FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        const data = res.data;

        setProduct(data);

        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        } else {
          setActiveImage(
            "https://via.placeholder.com/600x600?text=No+Image"
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🛒 ADD TO CART (POLISHED)
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!product.inStock || adding) return;

    setAdding(true);
    addToCart(product);

    // micro feedback
    setTimeout(() => {
      setAdding(false);
    }, 700);
  };

  /* ================= LOADING SKELETON ================= */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-200 h-96 rounded-xl" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* ================= IMAGE GALLERY ================= */}
        <div>
          {/* MAIN IMAGE */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 group">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* THUMBNAILS */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-20 rounded overflow-hidden border flex-shrink-0 transition
                    ${
                      activeImage === img
                        ? "border-black"
                        : "border-gray-300 hover:border-gray-500"
                    }
                  `}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold leading-snug">
              {product.title}
            </h1>

            <p className="text-2xl font-bold mt-2">
              ₹ {product.price}
            </p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description || "No description available"}
          </p>

          {/* STOCK BADGE */}
          <div>
            {product.inStock ? (
              <span className="inline-block text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                In Stock
              </span>
            ) : (
              <span className="inline-block text-sm px-3 py-1 rounded-full bg-red-100 text-red-700">
                Out of Stock
              </span>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || adding}
            className={`w-full py-3 rounded-lg font-medium text-white
              transition-all duration-200
              ${
                product.inStock
                  ? adding
                    ? "bg-gray-700"
                    : "bg-black hover:opacity-90 active:scale-95"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            {adding
              ? "Added ✓"
              : product.inStock
              ? "Add to Cart"
              : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
