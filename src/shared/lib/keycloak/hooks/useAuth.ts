import { useKeycloak } from '@react-keycloak/web';

export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  const login = () => {
    return keycloak?.login();
  };

  const logout = () => {
    return keycloak?.logout();
  };

  const register = () => {
    return keycloak?.register();
  };

  const getToken = async (): Promise<string | undefined> => {
    if (keycloak?.authenticated) {
      try {
        await keycloak.updateToken(30);
        if (keycloak.token) {
          localStorage.setItem('accessToken', keycloak.token);
          return keycloak.token;
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }
    return keycloak?.token;
  };

  const hasRole = (role: string): boolean => {
    if (!keycloak?.authenticated || !keycloak?.realmAccess?.roles) {
      return false;
    }
    return keycloak.realmAccess.roles.includes(role);
  };

  const hasClientRole = (clientId: string, role: string): boolean => {
    if (!keycloak?.authenticated || !keycloak?.resourceAccess) {
      return false;
    }
    const clientAccess = keycloak.resourceAccess[clientId];
    return clientAccess ? clientAccess.roles.includes(role) : false;
  };

  return {
    isAuthenticated: keycloak?.authenticated || false,
    isLoading: !initialized,
    user: keycloak?.idTokenParsed,
    username: keycloak?.idTokenParsed?.preferred_username,
    email: keycloak?.idTokenParsed?.email,
    roles: keycloak?.realmAccess?.roles || [],
    login,
    logout,
    register,
    getToken,
    hasRole,
    hasClientRole,
    keycloak,
  };
};