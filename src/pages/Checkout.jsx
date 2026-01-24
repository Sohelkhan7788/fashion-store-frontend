import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    console.log("Shipping:", shipping);
    console.log("Payment:", paymentMethod);
    console.log("Cart:", cart);

    navigate("/order-success");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-10">

        {/* SHIPPING DETAILS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            🚚 Shipping Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="fullName"
              placeholder="Full Name"
              value={shipping.fullName}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={shipping.phone}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              name="address"
              placeholder="Address"
              value={shipping.address}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none sm:col-span-2"
            />

            <input
              name="city"
              placeholder="City"
              value={shipping.city}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              name="state"
              placeholder="State"
              value={shipping.state}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={shipping.pincode}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            💳 Payment Method
          </h2>

          <div className="space-y-4">

            {/* COD */}
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`p-5 rounded-xl border cursor-pointer flex justify-between items-center
                ${paymentMethod === "cod"
                  ? "border-black bg-gray-50"
                  : "border-gray-300"
                }`}
            >
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-sm text-gray-600">
                  Pay when your order arrives
                </p>
              </div>
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                readOnly
              />
            </div>

            {/* ONLINE */}
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed flex justify-between items-center">
              <div>
                <p className="font-medium">Online Payment</p>
                <p className="text-sm text-gray-600">
                  UPI / Card / NetBanking (Coming Soon)
                </p>
              </div>
              <input type="radio" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
        <h3 className="text-xl font-semibold mb-6">
          Order Summary
        </h3>

        <div className="space-y-3 text-sm">
          {cart.map(item => (
            <div key={item._id} className="flex justify-between">
              <span>{item.title} × {item.quantity}</span>
              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {total}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>

        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
