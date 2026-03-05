import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Map, CalendarCheck,
  LogOut, Menu, X, ChevronRight, Bell,
} from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import logoSrc from "@/assets/Balbina-logo.png";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Quotes",    href: "/admin/quotes",    icon: MessageSquare,  badge: "12" },
  { label: "Tours",     href: "/admin/tours",     icon: Map },
  { label: "Bookings",  href: "/admin/bookings",  icon: CalendarCheck },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { adminName, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  const isActive = (href: string) => location.pathname.startsWith(href);

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid hsl(var(--sand)/0.07)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "hsl(var(--primary)/0.15)", border: "1px solid hsl(var(--primary)/0.25)" }}>
          <img src={logoSrc} alt="" className="w-5 h-5 object-contain"
            style={{ filter: "brightness(0) invert(1)" }} />
        </div>
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
              <p className="font-display text-base leading-none"
                style={{ fontFamily: '"Yeseva One", serif', color: "hsl(var(--sand))" }}>
                Balbina<span style={{ color: "hsl(var(--primary))" }}>Admin</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon, badge }) => {
          const active = isActive(href);
          return (
            <Link key={href} to={href}
              onClick={() => mobile && setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 group relative"
              style={{
                background: active ? "hsl(var(--primary)/0.12)" : "transparent",
                color: active ? "hsl(var(--primary))" : "hsl(var(--sand)/0.5)",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "hsl(var(--sand)/0.04)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              {/* Active indicator */}
              {active && (
                <motion.div layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                  style={{ background: "hsl(var(--primary))" }} />
              )}

              <Icon className="w-4 h-4 flex-shrink-0" />

              <AnimatePresence>
                {(!collapsed || mobile) && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center justify-between flex-1 overflow-hidden">
                    <span className="text-sm font-body whitespace-nowrap">{label}</span>
                    {badge && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-body font-semibold"
                        style={{ background: "hsl(var(--primary)/0.2)", color: "hsl(var(--primary))" }}>
                        {badge}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tooltip when collapsed */}
              {collapsed && !mobile && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-body
                  whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none
                  transition-opacity duration-150 z-50"
                  style={{ background: "hsl(var(--dark-overlay))", color: "hsl(var(--sand)/0.9)",
                    border: "1px solid hsl(var(--sand)/0.1)" }}>
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid hsl(var(--sand)/0.07)" }}>
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1
          ${collapsed && !mobile ? "justify-center" : ""}`}>
          {/* Avatar */}
          <div className="w-7 h-7 rounded-full flex items-center justify-center
            text-xs font-bold font-body flex-shrink-0"
            style={{ background: "hsl(var(--primary)/0.2)", color: "hsl(var(--primary))" }}>
            {adminName.charAt(0)}
          </div>
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs font-body truncate flex-1"
                style={{ color: "hsl(var(--sand)/0.5)" }}>
                {adminName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
            transition-all duration-200 group"
          style={{ color: "hsl(var(--sand)/0.35)" }}
          onMouseEnter={e => { e.currentTarget.style.color = "hsl(0 70% 65%)"; e.currentTarget.style.background = "hsl(0 70% 50% / 0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--sand)/0.35)"; e.currentTarget.style.background = "transparent"; }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence>
            {(!collapsed || mobile) && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-sm font-body whitespace-nowrap">
                Sign out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ background: "hsl(var(--background))" }}>

      {/* ── Desktop sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        className="hidden lg:flex flex-col h-full flex-shrink-0 relative overflow-hidden"
        style={{ background: "#0e1117", borderRight: "1px solid hsl(var(--sand)/0.07)" }}>
        <SidebarContent />

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(v => !v)}
          className="absolute bottom-24 -right-3 w-6 h-6 rounded-full flex items-center
            justify-center transition-all duration-200 z-10"
          style={{ background: "#0e1117", border: "1px solid hsl(var(--sand)/0.12)",
            color: "hsl(var(--sand)/0.4)" }}>
          <ChevronRight className={`w-3 h-3 transition-transform duration-300
            ${collapsed ? "" : "rotate-180"}`} />
        </button>
      </motion.aside>

      {/* ── Mobile sidebar overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 bottom-0 w-60 z-50 flex flex-col lg:hidden"
              style={{ background: "#0e1117", borderRight: "1px solid hsl(var(--sand)/0.07)" }}>
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--background))" }}>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-1.5 rounded-lg transition-colors"
            style={{ color: "hsl(var(--muted-foreground))" }}>
            <Menu className="w-5 h-5" />
          </button>

          {/* Page title — pulled from current route */}
          <p className="font-display text-base hidden lg:block"
            style={{ color: "hsl(var(--foreground))" }}>
            {NAV.find(n => isActive(n.href))?.label ?? "Admin"}
          </p>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-lg transition-colors"
              style={{ color: "hsl(var(--muted-foreground))" }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(var(--primary))" }} />
            </button>
            <div className="w-7 h-7 rounded-full flex items-center justify-center
              text-xs font-bold font-body"
              style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))" }}>
              {adminName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
