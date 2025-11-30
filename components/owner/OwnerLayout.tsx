import { useState, useEffect } from "react";
import { OwnerNavbar } from "./OwnerNavbar";
import { OwnerSidebar } from "./OwnerSidebar";

interface OwnerLayoutProps {
  children: React.ReactNode;
}

export function OwnerLayout({ children }: OwnerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("owner-dark-mode");
    if (saved === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("owner-dark-mode", String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="flex">
        <OwnerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isDarkMode={isDarkMode}
        />
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <OwnerNavbar
            onMenuClick={() => setSidebarOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
          <main
            className={`flex-1 p-4 md:p-6 lg:p-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
