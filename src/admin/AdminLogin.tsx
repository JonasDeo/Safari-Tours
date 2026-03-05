import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import logoSrc from "@/assets/Balbina-logo.png";

const AdminLogin = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const { login }  = useAdminAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const from       = (location.state as any)?.from?.pathname ?? "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate(from, { replace: true });
    else setError("Invalid email or password.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "hsl(var(--dark-overlay))" }}>

      {/* Subtle warm grain overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

      {/* Top accent line */}
      <div className="fixed top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 40%, hsl(var(--primary)/0.3) 100%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-2xl"
            style={{ background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.2)" }}>
            <img src={logoSrc} alt="Balbina" className="w-9 h-9 object-contain"
              style={{ filter: "brightness(0) invert(1)" }} />
          </div>
          <h1 className="font-display text-2xl text-sand mb-1"
            style={{ fontFamily: '"Yeseva One", serif' }}>
            Balbina<span style={{ color: "hsl(var(--primary))" }}>Safaris</span>
          </h1>
          <p className="text-xs font-body tracking-[0.2em] uppercase"
            style={{ color: "hsl(var(--sand)/0.35)" }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 space-y-5"
          style={{
            background: "hsl(var(--sand)/0.04)",
            border: "1px solid hsl(var(--sand)/0.08)",
            backdropFilter: "blur(12px)",
          }}>

          <div className="mb-2">
            <h2 className="font-display text-lg text-sand">Sign in</h2>
            <p className="text-xs font-body mt-1" style={{ color: "hsl(var(--sand)/0.4)" }}>
              Access the management dashboard
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-body"
              style={{ background: "hsl(0 70% 50% / 0.1)", border: "1px solid hsl(0 70% 50% / 0.25)", color: "hsl(0 70% 70%)" }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body"
                style={{ color: "hsl(var(--sand)/0.4)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@balbinasafaris.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none
                  transition-all duration-200"
                style={{
                  background: "hsl(var(--sand)/0.05)",
                  border: "1px solid hsl(var(--sand)/0.1)",
                  color: "hsl(var(--sand)/0.9)",
                }}
                onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.6)"}
                onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--sand)/0.1)"}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body"
                style={{ color: "hsl(var(--sand)/0.4)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm font-body outline-none
                    transition-all duration-200"
                  style={{
                    background: "hsl(var(--sand)/0.05)",
                    border: "1px solid hsl(var(--sand)/0.1)",
                    color: "hsl(var(--sand)/0.9)",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.6)"}
                  onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--sand)/0.1)"}
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: "hsl(var(--sand)/0.35)" }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                text-xs font-semibold tracking-widest uppercase font-body
                transition-all duration-200 mt-2"
              style={{
                background: loading ? "hsl(var(--primary)/0.4)" : "hsl(var(--primary))",
                color: "hsl(var(--dark))",
                cursor: loading ? "not-allowed" : "pointer",
              }}>
              {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent
                  rounded-full animate-spin" />
              ) : (
                <>Sign In <LogIn className="w-3.5 h-3.5" /></>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-xs font-body mt-6"
          style={{ color: "hsl(var(--sand)/0.2)" }}>
          © {new Date().getFullYear()} Balbina Safaris · Admin Only
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
