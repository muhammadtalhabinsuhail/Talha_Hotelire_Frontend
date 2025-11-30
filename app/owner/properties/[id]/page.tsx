"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPencil,
  faWifi,
  faSquareParking,
  faSwimmingPool,
  faDumbbell,
  faSnowflake,
  faTv,
  faUtensils,
  faMugHot,
  faBell,
  faFireExtinguisher,
  faBriefcaseMedical,
  faKey,
  faShieldHalved,
  faCouch,
  faMountainSun,
  faTree,
  faChevronLeft,
  faChevronRight,
  faStar,
  faLocationDot,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";

// Mock data for property
const propertyData = {
  id: 1,
  title: "Luxury King Suite",
  subtitle: "Premium Waterfront Property",
  city: "Ottawa",
  state: "Ontario",
  rating: 4.9,
  reviews: 124,
  images: [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
  ],
  description: `Welcome to our Luxury King Suite, a premium waterfront property offering breathtaking views and world-class amenities. This exquisite accommodation features a spacious living area, state-of-the-art entertainment system, and a private balcony overlooking the serene waters.

Perfect for both business and leisure travelers, our suite provides a sanctuary of comfort and elegance. The property is conveniently located near major attractions, fine dining restaurants, and shopping districts.`,
  rules: [
    "Check-in: 3:00 PM - Check-out: 11:00 AM",
    "No smoking on premises",
    "No parties or events",
    "Pets allowed with prior approval",
    "Quiet hours: 10:00 PM - 8:00 AM",
  ],
  amenities: [
    { icon: faWifi, label: "High-Speed Wi-Fi" },
    { icon: faSquareParking, label: "Free Parking" },
    { icon: faSwimmingPool, label: "Pool Access" },
    { icon: faDumbbell, label: "Fitness Center" },
    { icon: faSnowflake, label: "Air Conditioning" },
    { icon: faTv, label: "Smart TV" },
    { icon: faUtensils, label: "Full Kitchen" },
    { icon: faMugHot, label: "Coffee Maker" },
  ],
  safetyFeatures: [
    { icon: faBell, label: "Smoke Detector" },
    { icon: faBell, label: "CO Detector" },
    { icon: faFireExtinguisher, label: "Fire Extinguisher" },
    { icon: faBriefcaseMedical, label: "First Aid Kit" },
    { icon: faKey, label: "Keyless Entry" },
    { icon: faShieldHalved, label: "24/7 Security" },
  ],
  sharedSpaces: [
    { icon: faCouch, label: "Lounge Area" },
    { icon: faMountainSun, label: "Rooftop Terrace" },
    { icon: faTree, label: "Garden" },
    { icon: faSwimmingPool, label: "Pool Deck" },
  ],
  rooms: [
    {
      id: 1,
      name: "King Suite",
      image1: "/room1a.jpg",
      image2: "/room1b.jpg",
      type: "Suite",
      pricePerNight: 12000,
      count: 4,
      enabled: true,
    },
    {
      id: 2,
      name: "Queen Deluxe",
      image1: "/room2a.jpg",
      image2: "/room2b.jpg",
      type: "Deluxe",
      pricePerNight: 8500,
      count: 6,
      enabled: true,
    },
    {
      id: 3,
      name: "Standard Double",
      image1: "/room3a.jpg",
      image2: "/room3b.jpg",
      type: "Standard",
      pricePerNight: 5500,
      count: 10,
      enabled: true,
    },
    {
      id: 4,
      name: "Budget Single",
      image1: "/room4a.jpg",
      image2: "/room4b.jpg",
      type: "Economy",
      pricePerNight: 3000,
      count: 8,
      enabled: false,
    },
  ],
};

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();

  const propertyId = params?.id;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: propertyData.title,
    subtitle: propertyData.subtitle,
    city: propertyData.city,
    state: propertyData.state,
  });
  const [rooms, setRooms] = useState(propertyData.rooms);

  console.log("Property ID from route:", propertyId);
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? propertyData.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === propertyData.images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleRoomStatus = (roomId: number) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, enabled: !room.enabled } : room
      )
    );
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/owner/properties"
          className="inline-flex items-center gap-2 text-[#59A5B2] hover:text-[#4a9199] transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          <span className="font-medium">Back to Properties</span>
        </Link>


        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            {isEditing ? (
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-[#59A5B2] focus:outline-none text-gray-800 dark:text-white pb-1"
                />
                <input
                  type="text"
                  value={editData.subtitle}
                  onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                  className="w-full text-gray-500 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-[#59A5B2] focus:outline-none pb-1"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                    className="flex-1 text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-[#59A5B2] focus:outline-none pb-1"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    value={editData.state}
                    onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                    className="flex-1 text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-[#59A5B2] focus:outline-none pb-1"
                    placeholder="State"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {editData.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{editData.subtitle}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-[#59A5B2]" />
                    <span>{editData.city}, {editData.state}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-[#FEBC11]" />
                    <span className="font-medium text-gray-800 dark:text-white">
                      {propertyData.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({propertyData.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors ${isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-[#59A5B2] hover:bg-[#4a9199] text-white"
                }`}
              data-testid="edit-property-button"
            >
              <FontAwesomeIcon icon={isEditing ? faCheck : faPencil} className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Edit Property"}
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Gallery
          </h2>
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span>Gallery Image {currentImageIndex + 1}</span>
              </div>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-800 dark:text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-800 dark:text-white" />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {propertyData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all ${currentImageIndex === index
                      ? "ring-2 ring-[#59A5B2] ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                    }`}
                >
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xs text-gray-400">{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview & Rules */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Overview & Rules
          </h2>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line mb-6">
            {propertyData.description}
          </p>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">House Rules</h3>
            <ul className="space-y-2">
              {propertyData.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#59A5B2] mt-2 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Most Popular Amenities
          </h2>
          <div className="flex flex-wrap gap-3">
            {propertyData.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={amenity.icon} className="w-4 h-4 text-[#59A5B2]" />
                {amenity.label}
              </span>
            ))}
          </div>
        </div>

        {/* Safety Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Safety Features
          </h2>
          <div className="flex flex-wrap gap-3">
            {propertyData.safetyFeatures.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 text-[#59A5B2]" />
                {feature.label}
              </span>
            ))}
          </div>
        </div>

        {/* Shared Spaces */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Shared Spaces
          </h2>
          <div className="flex flex-wrap gap-3">
            {propertyData.sharedSpaces.map((space, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={space.icon} className="w-4 h-4 text-[#59A5B2]" />
                {space.label}
              </span>
            ))}
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Available Rooms
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FEBC11] text-black">
                  <th className="text-left py-3 px-4 rounded-tl-lg font-semibold">Room Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Images</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Price/Night</th>
                  <th className="text-center py-3 px-4 font-semibold">Count</th>
                  <th className="text-center py-3 px-4 rounded-tr-lg font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <tr
                    key={room.id}
                    className={`border-b border-gray-100 dark:border-gray-700 ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : ""
                      }`}
                  >
                    <td className="py-4 px-4 font-medium text-gray-800 dark:text-white">
                      {room.name}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-400">
                          Img 1
                        </div>
                        <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-400">
                          Img 2
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-[#59A5B2]/10 text-[#59A5B2] rounded-full text-sm font-medium">
                        {room.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[#FEBC11] font-bold">
                        ${room.pricePerNight.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">
                      {room.count}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleRoomStatus(room.id)}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${room.enabled
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          data-testid={`toggle-room-${room.id}`}
                        >
                          {room.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
