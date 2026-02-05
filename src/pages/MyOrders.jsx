import { useEffect, useState } from "react";
import api from "../utils/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders/my");
      setOrders(res.data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    if (!confirm("Cancel this order?")) return;

    await api.put(`/orders/${id}/cancel`);

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status: "Cancelled" } : o
      )
    );
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  const activeOrders = orders.filter(
    (o) => o.status !== "Cancelled"
  );

  const cancelledOrders = orders.filter(
    (o) => o.status === "Cancelled"
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

      {/* ACTIVE ORDERS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Active Orders
        </h2>

        {activeOrders.length === 0 && (
          <p className="text-gray-500">No active orders</p>
        )}

        {activeOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 mb-4"
          >
            <p className="text-sm text-gray-500">
              Order ID: {order._id}
            </p>

            <p className="font-semibold">
              Total: ₹ {order.totalAmount}
            </p>

            <p>Status: {order.status}</p>

            <button
              onClick={() => cancelOrder(order._id)}
              className="mt-3 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
            >
              Cancel Order
            </button>
          </div>
        ))}
      </div>

      {/* CANCELLED ORDERS */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Cancelled Orders
        </h2>

        {cancelledOrders.length === 0 && (
          <p className="text-gray-500">No cancelled orders</p>
        )}

        {cancelledOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 mb-4 bg-gray-50"
          >
            <p className="text-sm text-gray-500">
              Order ID: {order._id}
            </p>

            <p className="font-semibold">
              Total: ₹ {order.totalAmount}
            </p>

            <p className="text-red-600 font-medium">
              Status: Cancelled
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
