import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [openCurrency, setOpenCurrency] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const tourType = searchParams.get("type");

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg =
    !isHome || scrolled
      ? "bg-dark-overlay/95 backdrop-blur-md shadow-lg"
      : "bg-transparent";

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Tours",
      dropdown: [
        { label: "Mountain Trek", href: "/tours?type=mountain" },
        { label: "Beach", href: "/tours?type=beach" },
        { label: "Self-Drive", href: "/tours?type=self-drive" },
      ],
    },
    { label: "Destinations", href: "/destinations" },
    { label: "Travel Guide", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) =>
    location.pathname === href || (href !== "/" && location.pathname.startsWith(href));

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark-overlay/90 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-6 font-body text-sand">
            <a href="tel:+255685808332" className="flex items-center gap-1.5 hover:text-primary transition">
              <Phone className="w-3.5 h-3.5" /> +255 685 808332
            </a>
            <a href="mailto:info@Balbinasafaris.com" className="hidden sm:flex items-center gap-1.5 hover:text-primary transition">
              <Mail className="w-3.5 h-3.5" /> info@Balbinasafaris.com
            </a>
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setOpenCurrency(!openCurrency)}
              className="text-xs tracking-wider uppercase text-sand-dark hover:text-primary transition"
            >
              {currency}
            </button>

            {openCurrency && (
              <div className="absolute right-0 mt-2 w-24 bg-dark-overlay/95 backdrop-blur-md rounded-lg shadow-lg border border-sand/10">
                {["USD", "TZS", "EUR"].map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      setCurrency(cur);
                      setOpenCurrency(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-sm transition
                      ${currency === cur
                        ? "text-primary bg-sand/5"
                        : "text-sand/80 hover:text-primary hover:bg-sand/5"}`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`fixed top-[36px] left-0 right-0 z-40 transition-all duration-300 ${navBg}`}>
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-2xl font-bold tracking-wide text-sand">
            Balbina<span className="text-primary">Safaris</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className="relative group flex items-center gap-1 font-body text-sm tracking-wide uppercase text-sand/80 hover:text-primary transition">
                      <span className="relative">
                        {link.label}
                        {/* Animated underline */}
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] w-full bg-primary origin-left transform transition-transform duration-300 ease-out
                            ${tourType && link.dropdown.some(d => d.href.includes(tourType))
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                            }`}
                        />
                      </span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>

                    <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="w-52 bg-dark-overlay/95 backdrop-blur-md rounded-xl shadow-xl border border-sand/10 overflow-hidden">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className={`block px-5 py-3 text-sm transition
                              ${tourType && item.href.includes(tourType)
                                ? "text-primary bg-sand/5"
                                : "text-sand/80 hover:bg-sand/5 hover:text-primary"}`
                            }
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`relative group font-body text-sm tracking-wide uppercase transition
                      ${isActive(link.href)
                        ? "text-primary"
                        : "text-sand/80 hover:text-primary"}`}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] w-full bg-primary origin-left transform transition-transform duration-300 ease-out
                          ${isActive(link.href)
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-sand">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-dark-overlay/95 backdrop-blur-md border-t border-sand/10"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)
                          }
                          className="flex justify-between w-full py-2 text-sand/80 uppercase text-sm"
                        >
                          {link.label}
                          <ChevronDown
                            className={`w-4 h-4 transition ${openMobileDropdown === link.label ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {openMobileDropdown === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4 flex flex-col"
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="py-2 text-sm text-sand/60 hover:text-primary"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-sand/80 uppercase text-sm hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;