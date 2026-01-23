import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <Link
          to="/"
          className="inline-block mt-6 text-black underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

      {/* CART ITEMS */}
      <div className="md:col-span-2 space-y-6">
        {cart.map(item => (
          <div
            key={item._id}
            className="flex gap-6 bg-white p-6 rounded-2xl shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-24 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h3 className="font-medium text-gray-800 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-1">
                ₹ {item.price}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                    className="px-3 py-1 text-lg"
                  >
                    −
                  </button>
                  <span className="px-4">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    className="px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>

            <p className="font-semibold text-gray-900">
              ₹ {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
        <h3 className="text-lg font-semibold mb-6">
          Order Summary
        </h3>

        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>Subtotal</span>
          <span>₹ {total}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between font-semibold text-lg border-t pt-4">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

        <Link
          to="/checkout"
          className="block mt-6 text-center bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
