import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <div className="py-24 text-center px-4">
        <h2 className="text-2xl font-semibold">
          Your cart is empty
        </h2>

        <p className="text-gray-600 mt-2">
          Add some products to get started
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg active:scale-95"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 grid md:grid-cols-3 gap-8">

      {/* ================= CART ITEMS ================= */}
      <div className="md:col-span-2 space-y-4">
        {cart.map(item => (
          <div
            key={item.productId}
            className="flex gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl shadow-sm"
          >
            {/* IMAGE */}
            <img
              src={
                item.image ||
                "https://via.placeholder.com/100x100?text=No+Image"
              }
              alt={item.name}
              className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-xl"
            />

            {/* INFO */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 line-clamp-2">
                {item.name}
              </h3>

              <p className="text-gray-600 mt-1">
                ₹ {item.price}
              </p>

              {/* QUANTITY + REMOVE */}
              <div className="flex items-center gap-4 mt-4 flex-wrap">

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, -1)
                    }
                    className="px-3 py-1 text-lg active:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="px-4 text-sm">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.productId, +1)
                    }
                    className="px-3 py-1 text-lg active:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeFromCart(item.productId)
                  }
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* ITEM TOTAL */}
            <p className="font-semibold text-gray-900">
              ₹ {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* ================= SUMMARY (DESKTOP) ================= */}
      <div className="hidden md:block bg-white p-6 rounded-2xl shadow-sm h-fit">
        <h3 className="text-lg font-semibold mb-6">
          Order Summary
        </h3>

        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>Subtotal</span>
          <span>₹ {total}</span>
        </div>

        <div className="flex justify-between font-semibold text-lg border-t pt-4">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

        <Link
          to="/checkout"
          className="block mt-6 text-center bg-black text-white py-3 rounded-xl active:scale-95"
        >
          Proceed to Checkout
        </Link>
      </div>

      {/* ================= MOBILE STICKY CHECKOUT ================= */}
      <div className="
        md:hidden fixed bottom-0 left-0 right-0
        bg-white border-t shadow-lg
        px-4 py-3
        flex items-center justify-between
        z-50
      ">
        <div>
          <p className="text-xs text-gray-500">
            Total
          </p>
          <p className="text-lg font-semibold">
            ₹ {total}
          </p>
        </div>

        <Link
          to="/checkout"
          className="bg-black text-white px-6 py-3 rounded-xl active:scale-95"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
