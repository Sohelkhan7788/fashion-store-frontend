// src/admin/components/Charts/RevenuePieChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Online", value: 65 },
  { name: "COD", value: 35 },
];

const COLORS = ["#000", "#999"];

const RevenuePieChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-semibold mb-4">Payment Methods</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenuePieChart;
