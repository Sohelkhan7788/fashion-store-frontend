// src/admin/pages/Dashboard.jsx

import AdminLayout from "../layout/AdminLayout";
import StatCard from "../components/StatCard";

import SalesLineChart from "../components/Charts/SalesLineChart";
import CategoryBarChart from "../components/Charts/CategoryBarChart";
import RevenuePieChart from "../components/Charts/RevenuePieChart";

import {
  Users,
  ShoppingCart,
  IndianRupee,
  Package,
} from "lucide-react";

const Dashboard = () => {
  // 🔥 Dummy stats (baad me backend se aayega)
  const stats = [
    {
      title: "Total Users",
      value: "1,240",
      icon: Users,
      trend: "+8%",
    },
    {
      title: "Total Orders",
      value: "320",
      icon: ShoppingCart,
      trend: "+12%",
    },
    {
      title: "Revenue",
      value: "₹1,20,000",
      icon: IndianRupee,
      trend: "+18%",
    },
    {
      title: "Products",
      value: "58",
      icon: Package,
      trend: "+5%",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            trend={item.trend}
          />
        ))}
      </div>

      {/* ===== CHARTS ROW 1 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <SalesLineChart />
        <CategoryBarChart />
      </div>

      {/* ===== CHARTS ROW 2 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <RevenuePieChart />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
