import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Resources', path: '/resources' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Get Involved', path: '/get-involved' },
  { label: 'Announcements', path: '/announcements' },
];

// Focus ring shared by every interactive element in the floating nav so
// keyboard users always see where they are.
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-card';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  // Floating-nav pattern: hide on scroll-down, reveal on scroll-up.
  // requestAnimationFrame throttling keeps this cheap while the blur repaints.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const delta = y - lastScrollYRef.current;
      if (Math.abs(delta) > 8) {
        setNavHidden(delta > 0 && y > 96);
        lastScrollYRef.current = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Escape closes the mobile menu and returns focus context to the toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Always keep the nav visible while the mobile menu is open.
  const isHidden = navHidden && !mobileOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div
        className={`px-3 pt-3 sm:px-5 transition-transform duration-300 ease-out will-change-transform ${
          isHidden ? '-translate-y-[130%]' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`floating-nav-pill pointer-events-auto mx-auto max-w-7xl rounded-full border transition-shadow duration-300 ${
            scrolled ? 'shadow-[0_10px_30px_rgba(28,26,20,0.14)]' : 'shadow-[0_2px_10px_rgba(28,26,20,0.06)]'
          }`}
          style={{ borderColor: 'rgba(184,103,26,0.25)' }}
        >
          <div className="flex items-center justify-between h-14 md:h-16 px-3 sm:px-4">
            {/* Logo + full brand name */}
            <Link
              to="/"
              className={`flex items-center gap-2 shrink-0 rounded-full ${focusRing}`}
              aria-label="Daraja Africa Network — home"
            >
              <img
                src="/images/daraja-logo-transparent.png"
                alt=""
                aria-hidden="true"
                className="h-9 md:h-10 w-auto object-contain mix-blend-multiply"
              />
              <span className="font-display font-bold uppercase tracking-wide leading-tight text-[13px] sm:text-sm max-w-[10rem] sm:max-w-none">
                <span style={{ color: '#1C1A14' }}>Daraja Africa </span>
                <span style={{ color: '#8B6430' }}>Network</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  className={`px-2.5 xl:px-3 py-2 text-sm font-medium rounded-full relative group transition-colors duration-200 ${focusRing}`}
                  style={{ color: isActive(link.path) ? '#B8671A' : '#4A4030' }}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0.5 left-2.5 right-2.5 xl:left-3 xl:right-3 h-0.5 rounded-full transition-all duration-200 ${
                      isActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                    style={{ backgroundColor: '#B8671A' }}
                  />
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-2">
              <Link
                to="/get-help"
                className={`hidden md:inline-flex items-center px-4 xl:px-5 py-2 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors duration-200 ${focusRing}`}
                style={{ backgroundColor: '#8B6430', color: '#FFFFFF' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6B4A20')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8B6430')}
              >
                Get Help
              </Link>
              <Link
                to="/the-pit"
                className={`hidden md:inline-flex items-center px-4 xl:px-5 py-2 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors duration-200 ${focusRing}`}
                style={{ backgroundColor: '#1C1A14', color: '#FFFFFF' }}
              >
                Enter The Pit
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${focusRing}`}
                style={{ color: '#1C1A14' }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-menu"
                type="button"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu — floating panel below the pill */}
        <div
          id="mobile-nav-menu"
          className={`lg:hidden pointer-events-auto overflow-hidden transition-all duration-300 ease-out ${
            mobileOpen ? 'mt-2 max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {mobileOpen && (
            <div
              className="floating-nav-pill rounded-2xl border px-4 py-3 shadow-[0_10px_30px_rgba(28,26,20,0.14)]"
              style={{ borderColor: 'rgba(184,103,26,0.25)' }}
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                    className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${focusRing}`}
                    style={{
                      backgroundColor: isActive(link.path) ? 'rgba(184,103,26,0.1)' : 'transparent',
                      color: isActive(link.path) ? '#B8671A' : '#4A4030',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/get-help"
                  className={`block mt-2 px-3 py-2.5 text-sm font-semibold rounded-lg text-center ${focusRing}`}
                  style={{ backgroundColor: '#8B6430', color: '#FFFFFF' }}
                >
                  Get Help
                </Link>
                <Link
                  to="/the-pit"
                  className={`block mt-1 px-3 py-2.5 text-sm font-semibold rounded-lg text-center ${focusRing}`}
                  style={{ backgroundColor: '#1C1A14', color: '#FFFFFF' }}
                >
                  Enter The Pit
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
