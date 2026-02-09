import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [adding, setAdding] = useState(false);

  // 🔐 SAFE ADD TO CART (NO DOUBLE FIRE)
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!product.inStock || adding) return;

    setAdding(true);
    addToCart(product);

    // UX feedback only (does NOT affect cart logic)
    setTimeout(() => setAdding(false), 700);
  };

  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const image =
    product.images?.[0] ||
    "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <div className="group bg-white rounded-xl overflow-hidden border transition hover:shadow-lg">

      {/* IMAGE */}
      <div
        onClick={goToDetails}
        className="relative aspect-[3/4] bg-gray-100 cursor-pointer"
      >
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover"
        />

        {!product.inStock && (
          <span className="
            absolute top-3 right-3
            bg-black text-white text-xs
            px-3 py-1 rounded-full
          ">
            Sold Out
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        {/* TITLE */}
        <h3
          onClick={goToDetails}
          className="
            text-sm font-medium text-gray-900
            line-clamp-2 cursor-pointer
          "
        >
          {product.title}
        </h3>

        {/* PRICE */}
        <p className="text-sm font-semibold text-gray-800">
          ₹ {product.price}
        </p>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || adding}
          className={`
            w-full mt-3 py-2 rounded-md text-sm font-medium
            transition
            ${
              product.inStock
                ? adding
                  ? "bg-gray-200 text-gray-800"
                  : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {adding
            ? "Added to Cart"
            : product.inStock
            ? "Add to Cart"
            : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
