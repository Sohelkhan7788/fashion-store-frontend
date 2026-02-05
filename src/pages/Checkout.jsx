import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  // 🔐 Empty cart guard → redirect
  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // 🧠 PLACE ORDER
  const handlePlaceOrder = async () => {
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pincode
    ) {
      toast.warning("Please fill all shipping details");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shipping,
        paymentMethod,
      };

      const res = await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order placed successfully 🎉");

      clearCart();
      navigate(`/order-success/${res.data.orderId}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-10">
        {/* SHIPPING */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            🚚 Shipping Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              ["fullName", "Full Name"],
              ["phone", "Phone Number"],
              ["address", "Address", true],
              ["city", "City"],
              ["state", "State"],
              ["pincode", "Pincode"],
            ].map(([name, placeholder, full]) => (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                value={shipping[name]}
                onChange={handleChange}
                className={`border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none ${
                  full ? "sm:col-span-2" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            💳 Payment Method
          </h2>

          <div className="p-5 rounded-xl border border-black bg-gray-50 flex justify-between items-center">
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-gray-600">
                Pay when your order arrives
              </p>
            </div>
            <input type="radio" checked readOnly />
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
        <h3 className="text-xl font-semibold mb-6">
          Order Summary
        </h3>

        <div className="space-y-3 text-sm">
          {cart.map((item) => (
            <div key={item.productId} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>

        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total</span>
          <span>₹ {totalPrice}</span>
        </div>

        <button
          disabled={loading}
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:opacity-90 transition active:scale-90 disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
