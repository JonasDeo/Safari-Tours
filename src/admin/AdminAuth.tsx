import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authApi, setToken, clearToken, getToken, ApiError } from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  adminName:       string;
  login:           (email: string, password: string) => Promise<boolean>;
  logout:          () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName,       setAdminName]       = useState("");

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = getToken();
    const name  = localStorage.getItem('admin_name');
    if (token) {
      setIsAuthenticated(true);
      setAdminName(name ?? 'Admin');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.login(email, password);
      setToken(data.access_token, data.admin.name);
      setIsAuthenticated(true);
      setAdminName(data.admin.name);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Token may already be expired — clear locally regardless
    } finally {
      clearToken();
      setIsAuthenticated(false);
      setAdminName('');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
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
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return <>{children}</>;
};