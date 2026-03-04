import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import logoSrc from "@/assets/Balbina-logo.png";

const CURRENCIES = ["USD", "TZS", "EUR"];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Tours",
    href: "/tours",
    dropdown: [
      { label: "Mountain Trek", href: "/tours?type=mountain" },
      { label: "Beach",         href: "/tours?type=beach" },
      { label: "Self-Drive",    href: "/tours?type=self-drive" },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "Travel Guide",  href: "/blog" },
  { label: "About Us",      href: "/about" },
  { label: "Contact",       href: "/contact" },
];

function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// ── Logo ──────────────────────────────────────────────────────────────────────

const NavLogo = () => (
  <Link
    to="/"
    className="flex items-center gap-2.5 hover:opacity-90 transition-opacity group flex-shrink-0"
    aria-label="Balbina Safaris — Home"
  >
    <img
      src={logoSrc}
      alt="Balbina Safaris"
      className="w-9 h-9 object-contain flex-shrink-0
        group-hover:scale-105 transition-transform duration-200"
      style={{ filter: "brightness(0) invert(1)" }}
    />
    <span className="font-display text-xl font-bold tracking-wide leading-none">
      <span className="text-sand">Balbina</span>
      <span className="text-primary">Safaris</span>
    </span>
  </Link>
);

// ── CurrencySwitcher ──────────────────────────────────────────────────────────

function CurrencySwitcher({ currency, setCurrency }: { currency: string; setCurrency: (c: string) => void }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapRef, () => setOpen(false));

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 text-xs tracking-widest uppercase
          text-sand/70 hover:text-primary transition-colors duration-200
          focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
      >
        {currency}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-24 bg-dark-overlay rounded-lg
              shadow-2xl border border-sand/10 overflow-hidden list-none p-0 m-0 z-50"
          >
            {CURRENCIES.map((cur) => (
              <li key={cur} className="list-none">
                <button
                  role="option"
                  aria-selected={currency === cur}
                  onClick={() => { setCurrency(cur); setOpen(false); }}
                  className={`block w-full px-4 py-2.5 text-left text-sm transition-colors duration-150
                    ${currency === cur ? "text-primary bg-primary/10 font-medium" : "text-sand/70 hover:text-primary hover:bg-sand/5"}`}
                >
                  {cur}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── DesktopDropdown ───────────────────────────────────────────────────────────

type DropdownLink = (typeof NAV_LINKS)[number] & {
  dropdown: NonNullable<(typeof NAV_LINKS)[number]["dropdown"]>;
};

function DesktopDropdown({ link, tourType }: { link: DropdownLink; tourType: string | null }) {
  const isDropdownActive = tourType && link.dropdown.some((d) => d.href.includes(tourType));

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 font-body text-sm tracking-widest uppercase
          focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
        aria-haspopup="true"
      >
        <span className={`relative transition-colors duration-200
          ${isDropdownActive ? "text-primary" : "text-sand/75 group-hover:text-primary"}`}>
          {link.label}
          <span className={`absolute left-0 -bottom-1 h-px w-full bg-primary origin-left
            transform transition-transform duration-300 ease-out
            ${isDropdownActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-sand/50 group-hover:text-primary
          transition-all duration-200 group-hover:rotate-180" />
      </button>

      <div className="absolute left-0 top-full pt-3 opacity-0 invisible
        group-hover:opacity-100 group-hover:visible transition-all duration-200
        pointer-events-none group-hover:pointer-events-auto z-50">
        <div className="absolute -top-3 left-0 right-0 h-3" />
        <div className="w-52 bg-dark-overlay rounded-xl shadow-2xl border border-sand/10 overflow-hidden">
          {link.dropdown.map((item) => {
            const active = tourType && item.href.includes(tourType);
            return (
              <Link key={item.label} to={item.href}
                className={`block px-5 py-3.5 text-sm transition-colors duration-150
                  border-b border-sand/5 last:border-0
                  ${active ? "text-primary bg-primary/10" : "text-sand/70 hover:bg-sand/5 hover:text-primary"}`}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled]                     = useState(false);
  const [mobileOpen, setMobileOpen]                 = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [currency, setCurrency]                     = useState("USD");

  const location       = useLocation();
  const [searchParams] = useSearchParams();
  const tourType       = searchParams.get("type");
  const isHome         = location.pathname === "/";
  const navWrapperRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = navWrapperRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty("--nav-total-h", `${el.getBoundingClientRect().height}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    location.pathname === href ||
    (href !== "/" && location.pathname.startsWith(href + "/"));

  const mainNavBg = mobileOpen
    ? "bg-dark-overlay"
    : !isHome || scrolled
    ? "bg-dark-overlay/95 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.05)]"
    : "bg-transparent";

  return (
    <>
      <div ref={navWrapperRef} className="fixed top-0 left-0 right-0 z-50 flex flex-col">

        {/* Top bar */}
        <div className="bg-dark-overlay/90 backdrop-blur-sm border-b border-sand/5">
          <div className="container mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-5 text-xs text-sand/60">
              <a href="tel:+255623880844"
                className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                <Phone className="w-3 h-3" />
                <span>+255 623 880844</span>
              </a>
              <a href="mailto:info@Balbinasafaris.com"
                className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                <Mail className="w-3 h-3" />
                <span>info@Balbinasafaris.com</span>
              </a>
            </div>
            <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
          </div>
        </div>

        {/* Main nav */}
        <nav className={`transition-all duration-300 ${mainNavBg}`} aria-label="Main navigation">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <NavLogo />

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                link.dropdown ? (
                  <DesktopDropdown key={link.label} link={link as DropdownLink} tourType={tourType} />
                ) : (
                  <Link key={link.label} to={link.href}
                    className={`relative group font-body text-sm tracking-widest uppercase
                      transition-colors duration-200 focus:outline-none
                      focus-visible:ring-1 focus-visible:ring-primary rounded
                      ${isActive(link.href) ? "text-primary" : "text-sand/75 hover:text-primary"}`}>
                    <span className="relative">
                      {link.label}
                      <span className={`absolute left-0 -bottom-1 h-px w-full bg-primary
                        origin-left transform transition-transform duration-300 ease-out
                        ${isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                    </span>
                  </Link>
                )
              )}
            </div>

            <Link to="/quote"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-primary
                text-dark text-xs font-semibold tracking-widest uppercase rounded-full
                hover:bg-primary/90 active:scale-95 transition-all duration-200
                shadow-lg shadow-primary/20">
              Plan Your Trip
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg:hidden p-1 text-sand/80 hover:text-primary transition-colors
                duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="open"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden border-t border-sand/10">
                <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <div key={link.label}>
                      {link.dropdown ? (
                        <>
                          <button
                            onClick={() => setOpenMobileDropdown(
                              openMobileDropdown === link.label ? null : link.label
                            )}
                            className="flex justify-between items-center w-full py-3
                              text-sand/75 uppercase text-sm tracking-widest
                              hover:text-primary transition-colors duration-200"
                          >
                            {link.label}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200
                              ${openMobileDropdown === link.label ? "rotate-180 text-primary" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {openMobileDropdown === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-4 border-l border-primary/30 ml-1 mb-1"
                              >
                                {link.dropdown.map((item) => (
                                  <Link key={item.label} to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block py-2.5 text-sm transition-colors duration-150
                                      ${tourType && item.href.includes(tourType)
                                        ? "text-primary font-medium"
                                        : "text-sand/55 hover:text-primary"}`}>
                                    {item.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link to={link.href} onClick={() => setMobileOpen(false)}
                          className={`block py-3 uppercase text-sm tracking-widest
                            transition-colors duration-200
                            ${isActive(link.href) ? "text-primary" : "text-sand/75 hover:text-primary"}`}>
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Link to="/quote" onClick={() => setMobileOpen(false)}
                    className="mt-3 flex items-center justify-center gap-2 px-5 py-3
                      bg-primary text-dark text-xs font-semibold tracking-widest uppercase
                      rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200">
                    Plan Your Trip
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            onTouchStart={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;