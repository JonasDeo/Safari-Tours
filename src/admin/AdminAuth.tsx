import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  adminName: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const name  = localStorage.getItem("admin_name");
    if (token) { setIsAuthenticated(true); setAdminName(name ?? "Admin"); }
  }, []);

  // Replace this with a real API call in Phase 1 backend
  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === "admin@balbinasafaris.com" && password === "balbina2024") {
      localStorage.setItem("admin_token", "mock_token_replace_with_jwt");
      localStorage.setItem("admin_name", "Balbina Admin");
      setIsAuthenticated(true);
      setAdminName("Balbina Admin");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    setIsAuthenticated(false);
    setAdminName("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return <>{children}</>;
};
