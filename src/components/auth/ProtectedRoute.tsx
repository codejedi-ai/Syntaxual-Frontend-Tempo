import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "./AuthModal";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Access Restricted</h2>
          <p className="text-muted-foreground">Please sign in to access this content.</p>
          <AuthModal>
            <Button>Sign In</Button>
          </AuthModal>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
