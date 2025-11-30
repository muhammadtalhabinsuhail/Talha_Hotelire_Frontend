"use client";
import { useState, useMemo } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLocationDot,
  faPencil,
  faTrash,
  faPlus,
  faTimes,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import Link from "next/link";

interface Property {
  id: number;
  title: string;
  location: string;
  pricePerNight: number;
  status: "Active" | "Inactive";
  image: string;
  featured: boolean;
  rating: number;
  reviews: number;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Luxury King Suite",
    location: "Ottawa, Ontario",
    pricePerNight: 12000,
    status: "Active",
    image: "/property1.jpg",
    featured: true,
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    title: "Oceanview Deluxe Room",
    location: "Vancouver, BC",
    pricePerNight: 8500,
    status: "Active",
    image: "/property2.jpg",
    featured: false,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 3,
    title: "Downtown Studio",
    location: "Toronto, Ontario",
    pricePerNight: 4500,
    status: "Active",
    image: "/property3.jpg",
    featured: false,
    rating: 4.5,
    reviews: 203,
  },
  {
    id: 4,
    title: "Mountain Retreat Cabin",
    location: "Whistler, BC",
    pricePerNight: 15000,
    status: "Inactive",
    image: "/property4.jpg",
    featured: true,
    rating: 4.8,
    reviews: 67,
  },
  {
    id: 5,
    title: "Cozy Garden Suite",
    location: "Montreal, Quebec",
    pricePerNight: 6200,
    status: "Active",
    image: "/property5.jpg",
    featured: false,
    rating: 4.6,
    reviews: 145,
  },
  {
    id: 6,
    title: "Penthouse Paradise",
    location: "Calgary, Alberta",
    pricePerNight: 22000,
    status: "Active",
    image: "/property6.jpg",
    featured: true,
    rating: 5.0,
    reviews: 38,
  },
  {
    id: 7,
    title: "Lakeside Cottage",
    location: "Halifax, Nova Scotia",
    pricePerNight: 7800,
    status: "Active",
    image: "/property7.jpg",
    featured: false,
    rating: 4.4,
    reviews: 92,
  },
  {
    id: 8,
    title: "Urban Loft Space",
    location: "Edmonton, Alberta",
    pricePerNight: 5500,
    status: "Inactive",
    image: "/property8.jpg",
    featured: false,
    rating: 4.3,
    reviews: 56,
  },
];

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [propertyList, setPropertyList] = useState(properties);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; property: Property | null }>({
    show: false,
    property: null,
  });

  // Debounced search
  const filteredProperties = useMemo(() => {
    let result = propertyList;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((p) => p.status === statusFilter);
    }

    return result;
  }, [propertyList, searchQuery, statusFilter]);

  const toggleStatus = (id: number) => {
    setPropertyList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  const handleDelete = (property: Property) => {
    setDeleteModal({ show: true, property });
  };

  const confirmDelete = () => {
    if (deleteModal.property) {
      setPropertyList((prev) => prev.filter((p) => p.id !== deleteModal.property!.id));
    }
    setDeleteModal({ show: false, property: null });
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
              My Properties
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your property listings
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-[#59A5B2] hover:bg-[#4a9199] text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            data-testid="button-add-property"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            Add Property
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
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent"
              data-testid="input-search-properties"
            />
          </div>
          <div className="flex gap-2">
            {(["All", "Active", "Inactive"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${statusFilter === filter
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

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-lg"
              data-testid={`property-card-${property.id}`}
            >
              {/* Property Image */}
              <div className="relative h-[240px] bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-sm">Property Image</span>
                </div>
                {property.featured && (
                  <span className="absolute top-3 left-3 bg-[#FEBC11] text-black text-xs font-semibold px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full">
                  <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#FEBC11]" />
                  <span className="text-xs font-medium text-gray-800 dark:text-white">
                    {property.rating}
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-4">
                <h3
                  className="font-bold text-gray-800 dark:text-white text-lg mb-1 truncate"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {property.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5" />
                  <span className="truncate">{property.location}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span
                      className="text-xl font-bold text-[#FEBC11]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      ${property.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">/night</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${property.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                  >
                    {property.status}
                  </span>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/owner/properties/${property.id}`}
                      className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      data-testid={`edit-property-${property.id}`}
                    >
                      <FontAwesomeIcon icon={faPencil} className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(property)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      data-testid={`delete-property-${property.id}`}
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Toggle Switch */}
                  {/* <button
                    onClick={() => toggleStatus(property.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      property.status === "Active" ? "bg-[#59A5B2]" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    data-testid={`toggle-status-${property.id}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        property.status === "Active" ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button> */}

                  <button
                    onClick={() => toggleStatus(property.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${property.status === "Active"
                      ? "bg-[#59A5B2]"
                      : "bg-gray-300 dark:bg-gray-600"
                      }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${property.status === "Active" ? "translate-x-6" : "translate-x-0"
                        }`}
                    />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No properties found matching your criteria.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-bold text-gray-800 dark:text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Confirm Delete
                </h3>
                <button
                  onClick={() => setDeleteModal({ show: false, property: null })}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete "{deleteModal.property?.title}"? This action cannot
                be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteModal({ show: false, property: null })}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                  data-testid="confirm-delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}
