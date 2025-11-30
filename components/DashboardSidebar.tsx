"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: any
}

interface DashboardSidebarProps {
  navItems: NavItem[]
  userType: "admin" | "owner"
}

export function DashboardSidebar({ navItems, userType }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#59A5B2] text-xl">
          {userType === "admin" ? "Super Admin" : "Property Owner"}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "[font-family:'Inter',Helvetica] font-medium text-sm",
                isActive ? "bg-[#59A5B2] text-white shadow-md" : "text-gray-700 hover:bg-gray-100 hover:text-[#59A5B2]",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/settings"
          onClick={() => setMobileOpen(false)}
          data-testid="link-settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            "[font-family:'Inter',Helvetica] font-medium text-sm",
            pathname === "/settings"
              ? "bg-[#59A5B2] text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#59A5B2]",
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 bg-white shadow-md"
            data-testid="button-mobile-menu"
          >
            <Menu className="w-6 h-6 text-[#59A5B2]" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  )
}