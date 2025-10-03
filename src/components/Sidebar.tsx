import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Plus, Settings, FileCode } from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Create Agent", path: "/create-agent", icon: Plus },
  ];

  return (
    <aside className="w-64 bg-gray-900/50 border-r border-gray-700 min-h-screen fixed left-0 top-20 backdrop-blur-sm">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  : "text-white/70 hover:text-white hover:bg-gray-800/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
