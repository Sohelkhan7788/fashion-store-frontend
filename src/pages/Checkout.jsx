import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required details");
      return;
    }

    clearCart();
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12">

      {/* ORDER SUMMARY */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Order Summary
        </h2>

        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item._id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹ {item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between border-t pt-4 text-lg font-semibold">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>
      </div>

      {/* CHECKOUT FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6">
          Shipping Details
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            rows="3"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* PAYMENT */}
        <div className="mt-8">
          <h3 className="font-semibold mb-3">
            Payment Method
          </h3>

          <label className="flex items-center gap-3 border p-3 rounded-lg mb-3 cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>

          <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <span>UPI / Google Pay / PhonePe</span>
          </label>
        </div>

        <button
          onClick={placeOrder}
          className="mt-8 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
