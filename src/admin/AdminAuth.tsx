import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authApi, setToken, clearToken, getToken } from "@/lib/api";

interface Admin {
  id:    number;
  name:  string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading:       boolean;
  admin:           Admin | null;
  adminName:       string;           // kept for convenience
  login:           (email: string, password: string) => Promise<boolean>;
  logout:          () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin,           setAdmin]           = useState<Admin | null>(null);
  const [isLoading,       setIsLoading]       = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    // Verify token is still valid — ask the backend
    authApi.me()
      .then(data => {
        setAdmin(data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        // Expired, invalid, or user deleted — clear everything
        clearToken();
        setIsAuthenticated(false);
        setAdmin(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.login(email, password);
      setToken(data.access_token, data.admin.name);
      setAdmin(data.admin);
      setIsAuthenticated(true);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    clearToken();
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      admin,
      adminName: admin?.name ?? localStorage.getItem('admin_name') ?? 'Admin',
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) return null;                          // wait for /me to resolve
  if (!isAuthenticated) return (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
  return <>{children}</>;
};