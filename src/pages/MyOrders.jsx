import { useEffect, useState } from "react";
import api from "../utils/api";

const statusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my");
        setOrders(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) return;

    await api.put(`/orders/${id}/cancel`);

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status: "Cancelled" } : o
      )
    );
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading your orders…
      </div>
    );
  }

  const activeOrders = orders.filter(
    (o) => o.status !== "Cancelled"
  );
  const cancelledOrders = orders.filter(
    (o) => o.status === "Cancelled"
  );

  return (
    <section className="min-h-[80vh] bg-neutral-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* PAGE TITLE */}
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
          My Orders
        </h1>

        {/* ACTIVE ORDERS */}
        <div>
          <h2 className="text-lg font-medium mb-4">
            Active Orders
          </h2>

          {activeOrders.length === 0 && (
            <p className="text-gray-500 text-sm">
              You have no active orders.
            </p>
          )}

          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* LEFT */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Order ID
                  </p>
                  <p className="text-sm font-medium break-all">
                    {order._id}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹ {order.totalAmount}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col sm:items-end gap-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                  {order.status !== "Cancelled" && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CANCELLED ORDERS */}
        <div>
          <h2 className="text-lg font-medium mb-4 text-red-600">
            Cancelled Orders
          </h2>

          {cancelledOrders.length === 0 && (
            <p className="text-gray-500 text-sm">
              No cancelled orders.
            </p>
          )}

          <div className="space-y-4">
            {cancelledOrders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-50 border rounded-2xl p-5 flex justify-between items-center"
              >
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Order ID
                  </p>
                  <p className="text-sm font-medium break-all">
                    {order._id}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹ {order.totalAmount}
                  </p>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                  Cancelled
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MyOrders;
