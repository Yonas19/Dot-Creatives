import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router";
import logoImg from "@/imports/1-removebg-preview.png";

function Footer() {
  return (
    <footer
      id="contact"
      style={{ background: "transparent", padding: "0 1.5rem 2.5rem" }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "2rem",
          padding: "3.5rem 3rem",
        }}
      >
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src={logoImg}
              alt="DOT CREATIVE"
              className="h-14 w-auto object-contain mb-5"
            />
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "#6b7280", maxWidth: "340px" }}
            >
              Thank you for being part of our creative journey. We are honoured
              to tell your story and bring your vision to life — one frame at a
              time.
            </p>
            <div className="flex gap-2 flex-wrap">
              {[
                { short: "Pr", color: "#9999FF" },
                { short: "Ae", color: "#9999FF" },
                { short: "Ps", color: "#31A8FF" },
                { short: "Lr", color: "#31C5F0" },
              ].map((t) => (
                <span
                  key={t.short}
                  className="inline-flex items-center justify-center w-8 h-8 rounded text-xs font-bold"
                  style={{
                    backgroundColor: t.color + "22",
                    color: t.color,
                    border: `1px solid ${t.color}44`,
                  }}
                >
                  {t.short}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3
              className="text-lg font-bold mb-6"
              style={{ fontFamily: "Poppins, sans-serif", color: "#c4b5fd" }}
            >
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/251991670103"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#25D36622" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "#6b7280" }}>
                    WhatsApp
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#e5e7eb" }}
                  >
                    +251 991 670 103
                  </div>
                </div>
              </a>
              <a
                href="https://t.me/+251991670103"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#229ED922" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#229ED9"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "#6b7280" }}>
                    Telegram
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#e5e7eb" }}
                  >
                    +251 991 670 103
                  </div>
                </div>
              </a>
              <a
                href="mailto:Mikiglife@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(196,181,253,0.1)" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c4b5fd"
                    strokeWidth="1.8"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "#6b7280" }}>
                    Email
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#e5e7eb" }}
                  >
                    Mikiglife@gmail.com
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "#4b5563",
          }}
        >
          Developed by{" "}
          <a
            href="https://www.novacreativess.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#c4b5fd" }}
            className="hover:underline"
          >
            Nova Creatives
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: isHome ? "#about" : "/#about" },
    { label: "Service", to: isHome ? "#service" : "/#service" },
    { label: "Projects", to: "/projects" },
  ];

  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.5)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="DOT CREATIVE"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => {
              const isActive =
                label === "Projects"
                  ? location.pathname === "/projects"
                  : label === "Home"
                    ? location.pathname === "/"
                    : false;
              return to.startsWith("/") && !to.includes("#") ? (
                <Link
                  key={label}
                  to={to}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? "#c4b5fd" : "#d1d5db" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#c4b5fd")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "#c4b5fd"
                      : "#d1d5db")
                  }
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={to}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "#d1d5db" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#c4b5fd")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#d1d5db")
                  }
                >
                  {label}
                </a>
              );
            })}
            <a
              href={isHome ? "#contact" : "/#contact"}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff",
              }}
            >
              Contact Us
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-0.5 bg-white transition-all"
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {navLinks.map(({ label, to }) =>
              to.startsWith("/") && !to.includes("#") ? (
                <Link
                  key={label}
                  to={to}
                  className="text-sm font-medium py-2"
                  style={{ color: "#d1d5db" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={to}
                  className="text-sm font-medium py-2"
                  style={{ color: "#d1d5db" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ),
            )}
          </div>
        )}
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
}
