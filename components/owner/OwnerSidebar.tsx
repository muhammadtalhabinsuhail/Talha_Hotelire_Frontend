"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faCalendarCheck,
  faChartLine,
  faStar,
  faCog,
  faChevronUp,
  faUser,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface OwnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const menuItems = [
  { icon: faHome, label: "Overview", path: "/owner" },
  { icon: faBuilding, label: "My Properties", path: "/owner/properties" },
  { icon: faCalendarCheck, label: "Bookings", path: "/owner/bookings" },
  { icon: faChartLine, label: "Revenue", path: "/owner/revenue" },
  { icon: faStar, label: "Reviews", path: "/owner/reviews" },
];

export function OwnerSidebar({ isOpen, onClose, isDarkMode }: OwnerSidebarProps) {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);

  const isActive = (path: string) => {
    if (path === "/owner") {
      return pathname === "/owner" || pathname === "/owner/overview";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-30 h-screen w-64 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        } border-r flex flex-col`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#59A5B2] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span
              className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Hotelire
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${
              isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* Logo - Desktop */}
        <div className="hidden lg:flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 bg-[#59A5B2] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h1
              className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Hotelire
            </h1>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Owner Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                  isActive(item.path)
                    ? "bg-[#59A5B2] text-white shadow-md"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        {/* Settings Dropup */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 relative">
          {showSettings && (
            <div
              className={`absolute bottom-full left-4 right-4 mb-2 rounded-xl shadow-lg border overflow-hidden ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <Link href="/owner/settings">
                <div
                  onClick={() => {
                    setShowSettings(false);
                    onClose();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors ${
                    isDarkMode
                      ? "text-gray-200 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  Profile
                </div>
              </Link>

              <button
                className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left transition-colors ${
                  isDarkMode
                    ? "text-red-400 hover:bg-gray-700"
                    : "text-red-600 hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              showSettings || pathname.startsWith("/owner/settings")
                ? "bg-[#59A5B2] text-white"
                : isDarkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            data-testid="nav-settings"
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
              Settings
            </div>

            <FontAwesomeIcon
              icon={faChevronUp}
              className={`w-4 h-4 transition-transform ${showSettings ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
