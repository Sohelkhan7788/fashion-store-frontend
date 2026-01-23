import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../layout/AdminLayout";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">
        Orders
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t">
                <td className="p-4">
                  #{order._id.slice(-6)}
                </td>
                <td className="p-4">
                  ₹{order.totalAmount}
                </td>
                <td className="p-4">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {orders.map(order => (
          /* 👇 YAHAN PASTE HOTA HAI TUMHARA CODE */
          <div
            key={order._id}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <p className="font-medium">
              Order #{order._id.slice(-6)}
            </p>

            <p className="text-gray-600">
              ₹{order.totalAmount}
            </p>

            <p className="text-sm mt-1">
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
