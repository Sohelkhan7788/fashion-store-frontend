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

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!product.inStock || adding) return;

    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 700);
  };

  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const image =
    product.images?.[0] ||
    "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <div className="group bg-white/60 overflow-hidden border border-line transition hover:shadow-[0_12px_32px_-16px_rgba(22,20,15,0.25)]">

      <div
        onClick={goToDetails}
        className="relative aspect-[3/4] bg-paper-dim cursor-pointer overflow-hidden"
      >
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        {product.category && (
          <span className="absolute top-3 left-3 bg-paper/90 text-ink text-[10px] uppercase tracking-widest px-2.5 py-1">
            {product.category}
          </span>
        )}

        {!product.inStock && (
          <span className="
            absolute top-3 right-3
            bg-ink text-paper text-[10px] uppercase tracking-widest
            px-2.5 py-1
          ">
            Sold Out
          </span>
        )}
      </div>

      <div className="p-4 space-y-1.5">
        <h3
          onClick={goToDetails}
          className="text-[13.5px] font-medium text-ink line-clamp-2 cursor-pointer"
        >
          {product.title}
        </h3>

        <p className="text-sm font-semibold text-brass">
          ₹{product.price}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || adding}
          className={`
            w-full mt-3 py-2.5 text-[12px] uppercase tracking-wider font-medium
            transition
            ${
              product.inStock
                ? adding
                  ? "bg-moss text-paper"
                  : "border border-ink text-ink hover:bg-ink hover:text-paper"
                : "bg-paper-dim text-ink-soft/40 cursor-not-allowed"
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
