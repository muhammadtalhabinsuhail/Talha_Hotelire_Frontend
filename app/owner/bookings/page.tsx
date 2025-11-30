"use client";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
  faEye,
  faCheck,
  faTimes,
  faFileExport,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";

interface Booking {
  id: string;
  guestName: string;
  property: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: "Pending" | "Confirmed" | "Cancelled";
}

const bookingsData: Booking[] = [
  {
    id: "BK001",
    guestName: "John Smith",
    property: "Luxury King Suite",
    room: "King Room",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    guests: 2,
    amount: 60000,
    status: "Confirmed",
  },
  {
    id: "BK002",
    guestName: "Sarah Johnson",
    property: "Oceanview Deluxe Room",
    room: "Queen Deluxe",
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    guests: 3,
    amount: 34000,
    status: "Pending",
  },
  {
    id: "BK003",
    guestName: "Michael Brown",
    property: "Downtown Studio",
    room: "Standard Room",
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    guests: 1,
    amount: 13500,
    status: "Confirmed",
  },
  {
    id: "BK004",
    guestName: "Emily Davis",
    property: "Mountain Retreat Cabin",
    room: "Premium Suite",
    checkIn: "2024-01-25",
    checkOut: "2024-01-30",
    guests: 4,
    amount: 75000,
    status: "Cancelled",
  },
  {
    id: "BK005",
    guestName: "David Wilson",
    property: "Cozy Garden Suite",
    room: "Garden View",
    checkIn: "2024-01-28",
    checkOut: "2024-02-02",
    guests: 2,
    amount: 31000,
    status: "Confirmed",
  },
  {
    id: "BK006",
    guestName: "Jessica Taylor",
    property: "Penthouse Paradise",
    room: "Penthouse",
    checkIn: "2024-02-01",
    checkOut: "2024-02-05",
    guests: 2,
    amount: 88000,
    status: "Pending",
  },
  {
    id: "BK007",
    guestName: "Robert Martinez",
    property: "Lakeside Cottage",
    room: "Lakefront Room",
    checkIn: "2024-02-05",
    checkOut: "2024-02-08",
    guests: 3,
    amount: 23400,
    status: "Confirmed",
  },
  {
    id: "BK008",
    guestName: "Amanda Lee",
    property: "Urban Loft Space",
    room: "Loft Suite",
    checkIn: "2024-02-10",
    checkOut: "2024-02-14",
    guests: 2,
    amount: 22000,
    status: "Pending",
  },
];

type SortKey = keyof Booking;

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Confirmed" | "Cancelled">("All");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAndSorted = useMemo(() => {
    let result = [...bookingsData];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.id.toLowerCase().includes(query) ||
          b.guestName.toLowerCase().includes(query) ||
          b.property.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      result = result.filter((b) => b.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, currentPage]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return faSort;
    return sortDirection === "asc" ? faSortUp : faSortDown;
  };

  const exportToCSV = () => {
    const headers = ["Booking ID", "Guest Name", "Property", "Room", "Check-In", "Check-Out", "Guests", "Amount", "Status"];
    const rows = filteredAndSorted.map((b) => [
      b.id,
      b.guestName,
      b.property,
      b.room,
      b.checkIn,
      b.checkOut,
      b.guests,
      b.amount,
      b.status,
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Confirmed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return styles[status as keyof typeof styles] || "";
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
              Bookings
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage all your property bookings
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-[#59A5B2] hover:bg-[#4a9199] text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-md"
            data-testid="export-csv-button"
          >
            <FontAwesomeIcon icon={faFileExport} className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search by ID, guest name, or property..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent"
              data-testid="input-search-bookings"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["All", "Pending", "Confirmed", "Cancelled"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setStatusFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
                  statusFilter === filter
                    ? "bg-[#59A5B2] text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                data-testid={`filter-${filter.toLowerCase()}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  {[
                    { key: "id", label: "Booking ID" },
                    { key: "guestName", label: "Guest Name" },
                    { key: "property", label: "Property" },
                    { key: "room", label: "Room" },
                    { key: "checkIn", label: "Dates" },
                    { key: "guests", label: "Guests" },
                    { key: "amount", label: "Amount" },
                    { key: "status", label: "Status" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => handleSort(col.key as SortKey)}
                    >
                      <div className="flex items-center gap-2">
                        {col.label}
                        <FontAwesomeIcon
                          icon={getSortIcon(col.key as SortKey)}
                          className="w-3 h-3 text-gray-400"
                        />
                      </div>
                    </th>
                  ))}
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"
                    }`}
                  >
                    <td className="py-4 px-4 font-medium text-[#59A5B2]">{booking.id}</td>
                    <td className="py-4 px-4 text-gray-800 dark:text-white">{booking.guestName}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300 max-w-[150px] truncate">
                      {booking.property}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{booking.room}</td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-sm">
                      {booking.checkIn} → {booking.checkOut}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-center">
                      {booking.guests}
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#FEBC11]">
                      ${booking.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="View Details"
                        >
                          <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                        </button>
                        {booking.status === "Pending" && (
                          <>
                            <button
                              className="p-2 rounded-lg text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                              title="Confirm"
                            >
                              <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Cancel"
                            >
                              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
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
              {Math.min(currentPage * itemsPerPage, filteredAndSorted.length)} of{" "}
              {filteredAndSorted.length} bookings
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
