"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faCreditCard,
  faSave,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";

type TabType = "profile" | "notifications" | "payout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Owner",
    email: "john.owner@hotelire.com",
    phone: "+1 (555) 123-4567",
    company: "Hotelire Properties Inc.",
    address: "123 Main Street",
    city: "Toronto",
    state: "Ontario",
    zip: "M5V 1A1",
    country: "Canada",
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPayments: true,
    emailReviews: true,
    emailMarketing: false,
    pushBookings: true,
    pushPayments: true,
    pushReviews: false,
    smsBookings: false,
    smsPayments: true,
  });

  // Payout state
  const [payout, setPayout] = useState({
    bankName: "Royal Bank of Canada",
    accountHolder: "John Owner",
    accountNumber: "****4567",
    routingNumber: "****9012",
    payoutSchedule: "weekly",
    minPayout: "100",
  });

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: faUser },
    { id: "notifications" as TabType, label: "Notifications", icon: faBell },
    { id: "payout" as TabType, label: "Payout", icon: faCreditCard },
  ];

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your account preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-[#59A5B2] border-b-2 border-[#59A5B2] -mb-px"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  data-testid={`tab-${tab.id}`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-[#59A5B2] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">JO</span>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#FEBC11] rounded-full flex items-center justify-center shadow-sm hover:bg-[#e5a910] transition-colors">
                      <FontAwesomeIcon icon={faCamera} className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Profile Photo</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      JPG, GIF or PNG. Max size 2MB
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={profile.state}
                      onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "emailBookings", label: "New bookings and cancellations" },
                      { key: "emailPayments", label: "Payment confirmations and payouts" },
                      { key: "emailReviews", label: "New guest reviews" },
                      { key: "emailMarketing", label: "Marketing and promotional emails" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]: !notifications[item.key as keyof typeof notifications],
                            })
                          }
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications]
                              ? "bg-[#59A5B2]"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              notifications[item.key as keyof typeof notifications]
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                    Push Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "pushBookings", label: "Booking alerts" },
                      { key: "pushPayments", label: "Payment alerts" },
                      { key: "pushReviews", label: "Review alerts" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]: !notifications[item.key as keyof typeof notifications],
                            })
                          }
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications]
                              ? "bg-[#59A5B2]"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              notifications[item.key as keyof typeof notifications]
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                    SMS Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "smsBookings", label: "Urgent booking alerts" },
                      { key: "smsPayments", label: "Large payment confirmations" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]: !notifications[item.key as keyof typeof notifications],
                            })
                          }
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications]
                              ? "bg-[#59A5B2]"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              notifications[item.key as keyof typeof notifications]
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payout Tab */}
            {activeTab === "payout" && (
              <div className="space-y-6">
                <div className="bg-[#59A5B2]/10 border border-[#59A5B2]/20 rounded-xl p-4">
                  <p className="text-sm text-[#59A5B2]">
                    Your payout information is securely encrypted. Only update if your bank details have
                    changed.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={payout.bankName}
                      onChange={(e) => setPayout({ ...payout, bankName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      value={payout.accountHolder}
                      onChange={(e) => setPayout({ ...payout, accountHolder: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={payout.accountNumber}
                      onChange={(e) => setPayout({ ...payout, accountNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      value={payout.routingNumber}
                      onChange={(e) => setPayout({ ...payout, routingNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Payout Schedule
                    </label>
                    <select
                      value={payout.payoutSchedule}
                      onChange={(e) => setPayout({ ...payout, payoutSchedule: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Payout ($)
                    </label>
                    <input
                      type="number"
                      value={payout.minPayout}
                      onChange={(e) => setPayout({ ...payout, minPayout: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#59A5B2] hover:bg-[#4a9199] text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
                data-testid="save-settings-button"
              >
                <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
