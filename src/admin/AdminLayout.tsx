import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Map, CalendarCheck,
  FileText, Settings, User, LogOut, Menu, ChevronRight, Bell,
} from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import logoSrc from "@/assets/Balbina-logo.png";

// ── Nav config ────────────────────────────────────────────────────────────────

const NAV_MAIN = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard              },
  { label: "Quotes",    href: "/admin/quotes",    icon: MessageSquare, badge: "4"    },
  { label: "Tours",     href: "/admin/tours",     icon: Map                          },
  { label: "Bookings",  href: "/admin/bookings",  icon: CalendarCheck                },
  { label: "Blog",      href: "/admin/blog",      icon: FileText                     },
];

const NAV_BOTTOM = [
  { label: "Settings",  href: "/admin/settings",  icon: Settings },
  { label: "Profile",   href: "/admin/profile",   icon: User     },
];

// ── Sidebar link ──────────────────────────────────────────────────────────────

const NavItem = ({
  item, collapsed, mobile, onClick,
}: {
  item: typeof NAV_MAIN[0] & { badge?: string };
  collapsed: boolean;
  mobile: boolean;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const active   = location.pathname.startsWith(item.href);
  const show     = !collapsed || mobile;

  return (
    <Link to={item.href} onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
      style={{
        background: active ? "hsl(var(--primary)/0.12)" : "transparent",
        color:      active ? "hsl(var(--primary))"      : "hsl(var(--sand)/0.45)",
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "hsl(var(--sand)/0.05)"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      {active && (
        <motion.div layoutId="activeNav"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
          style={{ background: "hsl(var(--primary))" }} />
      )}

      <item.icon className="w-4 h-4 flex-shrink-0" />

      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap">
            <span className="text-sm font-body">{item.label}</span>
            {item.badge && (
              <span className="text-xs px-1.5 py-0.5 rounded-full font-body font-semibold"
                style={{ background: "hsl(var(--primary)/0.2)", color: "hsl(var(--primary))" }}>
                {item.badge}
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
          style={{ background: "#0e1117", color: "hsl(var(--sand)/0.9)", border: "1px solid hsl(var(--sand)/0.1)" }}>
          {item.label}
        </div>
      )}
    </Link>
  );
};

// ── Sidebar content ───────────────────────────────────────────────────────────

const SidebarContent = ({
  collapsed, mobile, onClose,
}: {
  collapsed: boolean;
  mobile: boolean;
  onClose?: () => void;
}) => {
  const { adminName, logout } = useAdminAuth();
  const navigate = useNavigate();
  const show = !collapsed || mobile;

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid hsl(var(--sand)/0.07)" }}>
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img src={logoSrc} alt="" className="w-10 h-10 object-contain"
            style={{ filter: "brightness(0) invert(1)" }} />
        </div>
        <AnimatePresence>
          {show && (
            <motion.p initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-display text-base leading-none overflow-hidden whitespace-nowrap"
              style={{ fontFamily: '"Yeseva One", serif', color: "hsl(var(--sand))" }}>
              Balbina<span style={{ color: "hsl(var(--primary))" }}>Admin</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {show && (
          <p className="text-xs uppercase tracking-[0.2em] font-body px-3 mb-2"
            style={{ color: "hsl(var(--sand)/0.2)" }}>
            Main
          </p>
        )}
        {NAV_MAIN.map(item => (
          <NavItem key={item.href} item={item} collapsed={collapsed} mobile={mobile}
            onClick={mobile ? onClose : undefined} />
        ))}

        <div className="pt-4">
          {show && (
            <p className="text-xs uppercase tracking-[0.2em] font-body px-3 mb-2"
              style={{ color: "hsl(var(--sand)/0.2)" }}>
              Admin
            </p>
          )}
          {NAV_BOTTOM.map(item => (
            <NavItem key={item.href} item={item} collapsed={collapsed} mobile={mobile}
              onClick={mobile ? onClose : undefined} />
          ))}
        </div>
      </nav>

      {/* User + logout */}
      <div className="px-2 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid hsl(var(--sand)/0.07)" }}>
        <div className={`flex items-center gap-3 px-3 py-2 ${!show ? "justify-center" : ""}`}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center
            text-xs font-bold font-body flex-shrink-0"
            style={{ background: "hsl(var(--primary)/0.2)", color: "hsl(var(--primary))" }}>
            {adminName.charAt(0)}
          </div>
          <AnimatePresence>
            {show && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs font-body truncate flex-1"
                style={{ color: "hsl(var(--sand)/0.4)" }}>
                {adminName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
            transition-all duration-200"
          style={{ color: "hsl(var(--sand)/0.3)" }}
          onMouseEnter={e => { e.currentTarget.style.color = "hsl(0 70% 65%)"; e.currentTarget.style.background = "hsl(0 70% 50%/0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--sand)/0.3)";  e.currentTarget.style.background = "transparent"; }}>
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence>
            {show && (
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
};

// ── Layout ────────────────────────────────────────────────────────────────────

const AdminLayout = () => {
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { adminName } = useAdminAuth();
  const location = useLocation();

  const currentLabel = [...NAV_MAIN, ...NAV_BOTTOM]
    .find(n => location.pathname.startsWith(n.href))?.label ?? "Admin";

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ background: "hsl(var(--background))" }}>

      {/* ── Desktop sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 60 : 216 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        className="hidden lg:flex flex-col h-full flex-shrink-0 relative"
        style={{ background: "#0e1117", borderRight: "1px solid hsl(var(--sand)/0.07)" }}>
        <SidebarContent collapsed={collapsed} mobile={false} />

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(v => !v)}
          className="absolute bottom-24 -right-3 w-6 h-6 rounded-full flex items-center
            justify-center z-10 transition-colors"
          style={{ background: "#0e1117", border: "1px solid hsl(var(--sand)/0.12)", color: "hsl(var(--sand)/0.4)" }}>
          <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`} />
        </button>
      </motion.aside>

      {/* ── Mobile sidebar ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -220 }} animate={{ x: 0 }} exit={{ x: -220 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 bottom-0 w-56 z-50 flex flex-col lg:hidden"
              style={{ background: "#0e1117", borderRight: "1px solid hsl(var(--sand)/0.07)" }}>
              <SidebarContent collapsed={false} mobile={true} onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
          style={{ borderBottom: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--background))" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-1.5 rounded-lg"
              style={{ color: "hsl(var(--muted-foreground))" }}>
              <Menu className="w-5 h-5" />
            </button>
            <p className="font-body font-semibold text-sm text-foreground hidden lg:block">
              {currentLabel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg transition-colors"
              style={{ color: "hsl(var(--muted-foreground))" }}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(var(--primary))" }} />
            </button>
            <Link to="/admin/profile"
              className="w-7 h-7 rounded-full flex items-center justify-center
                text-xs font-bold font-body transition-opacity hover:opacity-80"
              style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))" }}>
              {adminName.charAt(0)}
            </Link>
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