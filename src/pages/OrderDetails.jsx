import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        alert("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const cancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      await api.put(`/orders/${id}/cancel`);
      alert("Order cancelled");
      navigate("/my-orders");
    } catch {
      alert("Cancel failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">
        Order Details
      </h1>

      {order.items.map((item, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity}
            </p>
          </div>
          <p>₹ {item.price * item.quantity}</p>
        </div>
      ))}

      <div className="mt-4 font-semibold">
        Total: ₹ {order.totalAmount}
      </div>

      <div className="text-sm text-gray-600">
        Status: {order.status}
      </div>

      {/* ❌ CANCEL BUTTON */}
      {order.status === "Pending" && (
        <button
          onClick={cancelOrder}
          className="mt-6 px-6 py-2 border border-red-500 text-red-500 rounded"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
