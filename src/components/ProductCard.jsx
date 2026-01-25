import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  

  return (
    <div className="border group bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-2">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-lg font-semibold text-gray-900">
          ₹ {product.price}
        </p>

        <button
          onClick={() => {
            console.log("buttpn clicked", product);
            addToCart(product)
          }}
          className="mt-3 w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
