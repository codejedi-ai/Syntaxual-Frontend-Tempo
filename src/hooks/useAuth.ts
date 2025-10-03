import { useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
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

  return {
    user: isAuthenticated ? user : null,
    loading,
    error: auth0Error?.message || null,
    isAuthenticated,
    login,
    logout,
    loginWithRedirect,
  };
};
