import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faMoon,
  faSun,
  faBars,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

interface OwnerNavbarProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function OwnerNavbar({ onMenuClick, isDarkMode, onToggleDarkMode }: OwnerNavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New booking request for Luxury Suite", time: "2 min ago" },
    { id: 2, text: "Payment received: $1,200", time: "1 hour ago" },
    { id: 3, text: "New review on King Room", time: "3 hours ago" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 h-16 px-4 md:px-6 flex items-center justify-between border-b transition-colors ${
        isDarkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Left: Menu button + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"
          }`}
          data-testid="button-mobile-menu"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#59A5B2] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span
            className={`text-xl font-bold hidden sm:block ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Hotelire
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          data-testid="button-dark-mode-toggle"
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`p-2 rounded-lg transition-colors relative ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            data-testid="button-notifications"
          >
            <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg border overflow-hidden ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Notifications
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 border-b last:border-b-0 cursor-pointer transition-colors ${
                      isDarkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <p className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                      {notif.text}
                    </p>
                    <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {notif.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            data-testid="button-profile-menu"
          >
            <div className="w-8 h-8 bg-[#59A5B2] rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
            </div>
            <span
              className={`hidden md:block text-sm font-medium ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              John Owner
            </span>
          </button>

          {showProfileMenu && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border overflow-hidden ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <a
                href="/owner/settings"
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                Settings
              </a>
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
        </div>
      </div>
    </nav>
  );
}
