import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback
}) => {
  const { isAuthenticated, loading, login } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
          <p className="text-white/70">Please sign in to access this content.</p>
          <Button onClick={login} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">Sign In</Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
