import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const emergencyLines = [
  { region: 'Kenya', number: '+254 710 360360' },
  { region: 'South Africa', number: '+27 800 567 567' },
  { region: 'Nigeria', number: '+234 800 800 2000' },
  { region: 'Ghana', number: '+233 800 111 222' },
];

const platformLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Resources', path: '/resources' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Enter The Pit', path: '/the-pit' },
];

const trustLinks = [
  { label: 'Get Involved', path: '/get-involved' },
  { label: 'Get Help', path: '/get-help' },
  { label: 'Announcements', path: '/announcements' },
  { label: 'Privacy Charter', path: '/privacy-charter' },
  { label: 'Data Deletion Policy', path: '/data-deletion' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A1A0E' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" style={{ borderTop: '1px solid #2E2C1E' }}>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/1bd0c3516_DarajaAfrLogo-01.jpg"
              alt="Daraja Africa"
              className="h-16 w-auto object-contain mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-xs leading-relaxed mb-3" style={{ color: '#5A5248' }}>
              © {new Date().getFullYear()} Daraja Africa. All rights reserved.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: '#5A5248' }}>
              Daraja Africa is an auxiliary emotional reflection framework, not a licensed clinical treatment program. In emergencies, please contact a qualified mental health professional.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: '#8B6914' }}>Platform</h4>
            <ul className="space-y-2.5">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm transition-colors hover:text-brand-gold" style={{ color: '#7A7060' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trust */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: '#8B6914' }}>Trust & Safety</h4>
            <ul className="space-y-2.5">
              {trustLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm transition-colors hover:text-brand-gold" style={{ color: '#7A7060' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Emergency — full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="rounded-xl p-5 h-full" style={{ backgroundColor: '#242318', border: '1px solid #2E2C1E' }}>
              <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2" style={{ color: '#8B6914' }}>
                <span className="w-2 h-2 rounded-full animate-pulse inline-block flex-shrink-0" style={{ backgroundColor: '#B8671A' }} />
                Emergency Support
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {emergencyLines.map((line) => (
                  <div key={line.region}>
                    <p className="text-xs mb-0.5" style={{ color: '#7A7060' }}>{line.region}</p>
                    <a
                      href={`tel:${line.number.replace(/\s/g, '')}`}
                      className="text-sm font-medium flex items-center gap-1.5 transition-colors hover:text-brand-gold"
                      style={{ color: '#C8BFB0' }}
                    >
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#B8671A' }} />
                      {line.number}
                    </a>
                  </div>
                ))}
              </div>
              <Link
                to="/get-help"
                className="mt-4 block text-center text-xs font-semibold rounded-lg py-2 transition-colors hover:text-brand-gold"
                style={{ color: '#8B6914', border: '1px solid #2E2C1E' }}
              >
                Full Directory →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #2E2C1E' }}>
          <p className="text-xs" style={{ color: '#5A5248' }}>Built with care for African mental health communities.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/about" className="text-xs transition-colors hover:text-brand-gold" style={{ color: '#5A5248' }}>About Us</Link>
            <Link to="/get-help" className="text-xs transition-colors hover:text-brand-gold" style={{ color: '#5A5248' }}>Get Help</Link>
            <Link to="/privacy-charter" className="text-xs transition-colors hover:text-brand-gold" style={{ color: '#5A5248' }}>Privacy</Link>
            <Link to="/data-deletion" className="text-xs transition-colors hover:text-brand-gold" style={{ color: '#5A5248' }}>Data Deletion</Link>
            <a href="mailto:info@darajaafrica.org" className="text-xs transition-colors flex items-center gap-1 hover:text-brand-gold" style={{ color: '#5A5248' }}>
              <Mail className="w-3 h-3" /> Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}