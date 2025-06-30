import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative group">
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
          {user.displayName ? getInitials(user.displayName) : "U"}
        </div>
      </Button>
      
      {/* Simple dropdown menu */}
      <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3 border-b border-gray-700">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-white">
              {user.displayName || "User"}
            </p>
            <p className="text-xs text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        <div className="p-1">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};