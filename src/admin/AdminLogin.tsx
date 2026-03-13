import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import logoSrc from "@/assets/Balbina-logo.png";
import bgImg   from "@/assets/tour-3.jpg";

const AdminLogin = () => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const { login } = useAdminAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = (location.state as any)?.from?.pathname ?? "/admin/dashboard";

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
    // ── Fixed full-screen, no scroll ──────────────────────────────────────────
    <div className="fixed inset-0 flex overflow-hidden">

      {/* ── Left: safari image panel (desktop only) ── */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative flex-shrink-0">
        <img src={bgImg} alt="Safari landscape"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(8,6,4,0.65) 0%, rgba(8,6,4,0.25) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="text-xs tracking-[0.28em] uppercase font-body mb-3"
              style={{ color: "hsl(var(--primary))" }}>
              Admin Portal
            </p>
            <h1 className="font-display font-bold text-sand leading-tight mb-4"
              style={{ fontFamily: '"Yeseva One", serif', fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Manage Your<br />Safari Empire
            </h1>
            <p className="font-body text-sand/50 text-sm max-w-xs leading-relaxed">
              Quotes, bookings, tours, and blog — all in one place.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Right: form panel — flex-centered, no scroll ── */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden"
        style={{ background: "#0e1117" }}>

        {/* Mobile background image */}
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          <img src={bgImg} alt="" aria-hidden className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(14,17,23,0.7), #0e1117 60%)" }} />
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="w-full max-w-sm px-6 relative z-10"
        >

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <img src={logoSrc} alt="Balbina" className="w-20 h-20 object-contain"
                style={{ filter: "brightness(0) invert(1)" }} />
            </div>
            <h2 className="text-2xl text-sand mb-1" style={{ fontFamily: '"Yeseva One", serif' }}>
              Balbina<span style={{ color: "hsl(var(--primary))" }}>Safaris</span>
            </h2>
            <p className="text-xs font-body tracking-[0.2em] uppercase"
              style={{ color: "hsl(var(--sand)/0.3)" }}>Admin Portal</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-7 space-y-5"
            style={{
              background: "hsl(var(--sand)/0.04)",
              border: "1px solid hsl(var(--sand)/0.08)",
              backdropFilter: "blur(12px)",
            }}>

            <div>
              <h3 className="font-display text-lg text-sand">Sign in</h3>
              <p className="text-xs font-body mt-1" style={{ color: "hsl(var(--sand)/0.35)" }}>
                Access the management dashboard
              </p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-body"
                style={{ background: "hsl(0 70% 50%/0.1)", border: "1px solid hsl(0 70% 50%/0.25)", color: "hsl(0 70% 70%)" }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-[0.15em] font-body"
                  style={{ color: "hsl(var(--sand)/0.4)" }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder=" " required
                  className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200"
                  style={{ background: "hsl(var(--sand)/0.05)", border: "1px solid hsl(var(--sand)/0.1)", color: "hsl(var(--sand)/0.9)" }}
                  onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.6)"}
                  onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--sand)/0.1)"} />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-[0.15em] font-body"
                  style={{ color: "hsl(var(--sand)/0.4)" }}>Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="" required
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm font-body outline-none transition-all duration-200"
                    style={{ background: "hsl(var(--sand)/0.05)", border: "1px solid hsl(var(--sand)/0.1)", color: "hsl(var(--sand)/0.9)" }}
                    onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.6)"}
                    onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--sand)/0.1)"} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "hsl(var(--sand)/0.35)" }}>
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button type="submit" disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                  text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200 mt-2"
                style={{
                  background: loading ? "hsl(var(--primary)/0.4)" : "hsl(var(--primary))",
                  color: "hsl(var(--dark))",
                  cursor: loading ? "not-allowed" : "pointer",
                }}>
                {loading
                  ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  : <><LogIn className="w-3.5 h-3.5" /> Sign In</>}
              </motion.button>
            </form>
          </div>

          <p className="text-center text-xs font-body mt-5" style={{ color: "hsl(var(--sand)/0.2)" }}>
            © {new Date().getFullYear()} Balbina Safaris · Admin Only
          </p>

        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;