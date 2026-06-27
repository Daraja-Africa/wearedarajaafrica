import React, { useState, useEffect } from 'react';
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

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled ? 'shadow-sm' : ''
    }`} style={{ backgroundColor: '#F5EFE4', borderBottom: '1px solid rgba(184,103,26,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/images/daraja-logo-transparent.png"
              alt="Daraja Africa"
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
            <span className="font-display font-bold text-sm tracking-wide uppercase">
              <span style={{ color: '#1C1A14' }}>Daraja </span><span style={{ color: '#8B6430' }}>Africa</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative group`}
                style={{ color: isActive(link.path) ? '#B8671A' : '#4A4030' }}
              >
                {link.label}
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 transition-all duration-200 ${
                  isActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                }`} style={{ backgroundColor: '#B8671A' }} />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/get-help"
              className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-semibold rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#8B6430', color: '#FFFFFF' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#6B4A20'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#8B6430'}
            >
              Get Help
            </Link>
            <Link
              to="/the-pit"
              className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-semibold rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#1C1A14', color: '#FFFFFF' }}
            >
              Enter The Pit
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#1C1A14' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ borderTop: '1px solid rgba(184,103,26,0.2)', backgroundColor: '#F5EFE4' }}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
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
              className="block mt-2 px-3 py-2.5 text-sm font-semibold rounded-lg text-center"
              style={{ backgroundColor: '#8B6430', color: '#FFFFFF' }}
            >
              Get Help
            </Link>
            <Link
              to="/the-pit"
              className="block mt-1 px-3 py-2.5 text-sm font-semibold rounded-lg text-center"
              style={{ backgroundColor: '#1C1A14', color: '#FFFFFF' }}
            >
              Enter The Pit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}