import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500" size={64} />

        <h1 className="text-2xl font-bold mt-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for shopping with us.
        </p>

        <div className="bg-gray-100 rounded-lg p-3 mt-4 text-sm">
          <span className="font-medium">Order ID:</span>
          <br />
          <span className="break-all text-gray-700">
            {orderId}
          </span>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/my-orders")}
            className="flex-1 bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
