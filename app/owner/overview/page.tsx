"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendarCheck,
  faDollarSign,
  faStar,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { OwnerLayout } from "@/components/owner/OwnerLayout";

const statsCards = [
  {
    title: "Total Properties",
    value: "12",
    change: "+2",
    changeType: "increase",
    icon: faBuilding,
    color: "#59A5B2",
  },
  {
    title: "Bookings This Month",
    value: "48",
    change: "+12%",
    changeType: "increase",
    icon: faCalendarCheck,
    color: "#FEBC11",
  },
  {
    title: "Revenue This Month",
    value: "$24,580",
    change: "+8.5%",
    changeType: "increase",
    icon: faDollarSign,
    color: "#10B981",
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: "-0.1",
    changeType: "decrease",
    icon: faStar,
    color: "#F59E0B",
  },
];

const revenueData = [
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 15600 },
  { month: "Mar", revenue: 18200 },
  { month: "Apr", revenue: 16800 },
  { month: "May", revenue: 21400 },
  { month: "Jun", revenue: 24580 },
];

const bookingsData = [
  { month: "Jan", bookings: 28 },
  { month: "Feb", bookings: 35 },
  { month: "Mar", bookings: 42 },
  { month: "Apr", bookings: 38 },
  { month: "May", bookings: 45 },
  { month: "Jun", bookings: 48 },
];

const propertyDistribution = [
  { name: "Luxury Suites", value: 4, color: "#59A5B2" },
  { name: "Standard Rooms", value: 5, color: "#FEBC11" },
  { name: "Budget Rooms", value: 3, color: "#10B981" },
];

export default function OverviewPage() {
  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, John! Here's what's happening with your properties.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-shadow hover:shadow-lg"
              data-testid={`stat-card-${index}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {card.title}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {card.value}
                  </h3>
                  <div
                    className={`flex items-center gap-1 mt-2 text-sm ${
                      card.changeType === "increase"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={card.changeType === "increase" ? faArrowUp : faArrowDown}
                      className="w-3 h-3"
                    />
                    <span>{card.change} from last month</span>
                  </div>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <FontAwesomeIcon
                    icon={card.icon}
                    className="w-6 h-6"
                    style={{ color: card.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#59A5B2"
                  strokeWidth={3}
                  dot={{ fill: "#59A5B2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bookings Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Monthly Bookings
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="bookings" fill="#FEBC11" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Property Distribution
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={propertyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                {
                  type: "booking",
                  text: "New booking for Luxury King Suite",
                  time: "2 hours ago",
                  color: "#59A5B2",
                },
                {
                  type: "review",
                  text: "5-star review received for Oceanview Room",
                  time: "5 hours ago",
                  color: "#FEBC11",
                },
                {
                  type: "payment",
                  text: "Payment of $1,200 received",
                  time: "1 day ago",
                  color: "#10B981",
                },
                {
                  type: "booking",
                  text: "Booking cancelled for Standard Room",
                  time: "2 days ago",
                  color: "#EF4444",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activity.color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
