// src/admin/components/Charts/SalesLineChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", sales: 12000 },
  { day: "Tue", sales: 18000 },
  { day: "Wed", sales: 14000 },
  { day: "Thu", sales: 22000 },
  { day: "Fri", sales: 26000 },
  { day: "Sat", sales: 30000 },
  { day: "Sun", sales: 28000 },
];

const SalesLineChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-semibold mb-4">Weekly Sales</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#000"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesLineChart;
