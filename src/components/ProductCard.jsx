import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    if (!product.inStock) return;

    addToCart(product);
  };

  // 🔍 GO TO DETAILS PAGE
  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  // 🖼️ SAFE IMAGE (fallback)
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <div className="border bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
      
      {/* IMAGE */}
      <div
        className="relative h-64 bg-gray-100 overflow-hidden cursor-pointer"
        onClick={goToDetails}
      >
        <img
          src={mainImage}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />

        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-2">
        <h3
          onClick={goToDetails}
          className="text-sm font-medium text-gray-800 line-clamp-2 cursor-pointer hover:underline"
        >
          {product.title}
        </h3>

        <p className="text-lg font-semibold text-gray-900">
          ₹ {product.price}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`
            mt-3 w-full py-2 rounded font-medium
            transition-all duration-150
            ${
              product.inStock
                ? "bg-black text-white hover:opacity-90 active:scale-95"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }
          `}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
