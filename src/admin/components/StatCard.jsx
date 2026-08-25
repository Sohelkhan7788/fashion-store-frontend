import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, trend }) => {
  const isPositive = trend?.startsWith("+");

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>

        {trend && (
          <p
            className={`text-xs mt-1 ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend} this month
          </p>
        )}
      </div>

      {Icon && (
        <div className="p-3 rounded-full bg-gray-100">
          <Icon className="text-xl text-black" />
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
