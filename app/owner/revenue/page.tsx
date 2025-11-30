"use client";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faArrowUp,
  faArrowDown,
  faCalendar,
  faBuilding,
  faFileExport,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
    title: "Total Revenue",
    value: "$148,250",
    change: "+12.5%",
    changeType: "increase",
    icon: faDollarSign,
    color: "#10B981",
  },
  {
    title: "This Month",
    value: "$24,580",
    change: "+8.2%",
    changeType: "increase",
    icon: faCalendar,
    color: "#59A5B2",
  },
  {
    title: "Avg. Per Booking",
    value: "$485",
    change: "-2.1%",
    changeType: "decrease",
    icon: faBuilding,
    color: "#FEBC11",
  },
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 12400, bookings: 28 },
  { month: "Feb", revenue: 15600, bookings: 35 },
  { month: "Mar", revenue: 18200, bookings: 42 },
  { month: "Apr", revenue: 16800, bookings: 38 },
  { month: "May", revenue: 21400, bookings: 45 },
  { month: "Jun", revenue: 24580, bookings: 48 },
  { month: "Jul", revenue: 22100, bookings: 44 },
  { month: "Aug", revenue: 19800, bookings: 40 },
  { month: "Sep", revenue: 17200, bookings: 36 },
  { month: "Oct", revenue: 20500, bookings: 42 },
  { month: "Nov", revenue: 23400, bookings: 46 },
  { month: "Dec", revenue: 26500, bookings: 52 },
];

const propertyRevenueData = [
  { name: "Luxury King Suite", revenue: 42000 },
  { name: "Oceanview Deluxe", revenue: 28500 },
  { name: "Downtown Studio", revenue: 18200 },
  { name: "Penthouse Paradise", revenue: 35600 },
  { name: "Cozy Garden Suite", revenue: 15800 },
];

interface Transaction {
  id: string;
  date: string;
  property: string;
  guest: string;
  type: "Booking" | "Refund" | "Commission";
  amount: number;
}

const transactionsData: Transaction[] = [
  { id: "TXN001", date: "2024-01-15", property: "Luxury King Suite", guest: "John Smith", type: "Booking", amount: 12000 },
  { id: "TXN002", date: "2024-01-14", property: "Oceanview Deluxe", guest: "Sarah Johnson", type: "Booking", amount: 8500 },
  { id: "TXN003", date: "2024-01-13", property: "Downtown Studio", guest: "Mike Brown", type: "Booking", amount: 4500 },
  { id: "TXN004", date: "2024-01-12", property: "Penthouse Paradise", guest: "Emily Davis", type: "Refund", amount: -22000 },
  { id: "TXN005", date: "2024-01-11", property: "Cozy Garden Suite", guest: "David Wilson", type: "Booking", amount: 6200 },
  { id: "TXN006", date: "2024-01-10", property: "Lakeside Cottage", guest: "Jessica Taylor", type: "Booking", amount: 7800 },
  { id: "TXN007", date: "2024-01-09", property: "Urban Loft Space", guest: "Robert Martinez", type: "Commission", amount: -550 },
  { id: "TXN008", date: "2024-01-08", property: "Luxury King Suite", guest: "Amanda Lee", type: "Booking", amount: 12000 },
];

export default function RevenuePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return transactionsData.slice(start, start + itemsPerPage);
  }, [currentPage]);

  const totalPages = Math.ceil(transactionsData.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ["Transaction ID", "Date", "Property", "Guest", "Type", "Amount"];
    const rows = transactionsData.map((t) => [t.id, t.date, t.property, t.guest, t.type, t.amount]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  const getTransactionStyle = (type: string, amount: number) => {
    if (type === "Refund" || type === "Commission") {
      return "text-red-500";
    }
    return "text-green-500";
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Revenue
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track your earnings and financial performance
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-[#59A5B2] hover:bg-[#4a9199] text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            data-testid="export-transactions-button"
          >
            <FontAwesomeIcon icon={faFileExport} className="w-4 h-4" />
            Export Transactions
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.title}</p>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {card.value}
                  </h3>
                  <div
                    className={`flex items-center gap-1 mt-2 text-sm ${
                      card.changeType === "increase" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={card.changeType === "increase" ? faArrowUp : faArrowDown}
                      className="w-3 h-3"
                    />
                    <span>{card.change} vs last month</span>
                  </div>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <FontAwesomeIcon icon={card.icon} className="w-6 h-6" style={{ color: card.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Monthly Revenue & Bookings
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#59A5B2"
                  strokeWidth={3}
                  dot={{ fill: "#59A5B2" }}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#FEBC11"
                  strokeWidth={3}
                  dot={{ fill: "#FEBC11" }}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Property Revenue Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Revenue by Property
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={propertyRevenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#9ca3af"
                  fontSize={10}
                  width={120}
                  tick={{ fill: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#59A5B2" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Recent Transactions
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Transaction ID
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Property</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Guest</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Type</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((txn, index) => (
                  <tr
                    key={txn.id}
                    className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"
                    }`}
                  >
                    <td className="py-4 px-4 font-medium text-[#59A5B2]">{txn.id}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{txn.date}</td>
                    <td className="py-4 px-4 text-gray-800 dark:text-white">{txn.property}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{txn.guest}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          txn.type === "Booking"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : txn.type === "Refund"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {txn.type}
                      </span>
                    </td>
                    <td className={`py-4 px-4 text-right font-semibold ${getTransactionStyle(txn.type, txn.amount)}`}>
                      {txn.amount < 0 ? `-$${Math.abs(txn.amount).toLocaleString()}` : `+$${txn.amount.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, transactionsData.length)} of {transactionsData.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#59A5B2] text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
