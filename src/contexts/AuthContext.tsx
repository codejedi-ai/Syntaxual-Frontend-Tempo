import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  loginWithRedirect: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user,
    isLoading: loading,
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout,
    error: auth0Error
  } = useAuth0();

  const login = async () => {
    await loginWithRedirect();
  };

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const value: AuthContextType = {
    user: isAuthenticated ? user || null : null,
    loading,
    error: auth0Error?.message || null,
    isAuthenticated,
    login,
    logout,
    loginWithRedirect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
