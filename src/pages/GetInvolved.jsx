import React from 'react';
import { ArrowRight, Phone, Instagram, Video } from 'lucide-react';

export default function GetInvolved() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Join The Movement</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-charcoal mt-3 mb-5">Get Involved</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            Change happens when we build bridges together. Every contribution — of time, expertise, or resources — directly expands access to mental health support.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Volunteer Card */}
          <div className="rounded-2xl p-6 md:p-10" style={{ backgroundColor: '#1C1A14' }}>
            <h2 className="font-display text-2xl font-bold text-white mb-2">Volunteer with Daraja Africa</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Join our network of community advocates and peer counselors working to normalise mental health conversations across Sub-Saharan Africa.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScVQSuS5AqRXBe9ITIiCo5AtU9ACG0i3-8T35i2RPkG5q3wLw/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all"
              style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E08898'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4A8B8'}
            >
              Apply as a Volunteer <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* School Partnerships Card */}
          <div className="rounded-2xl p-6 md:p-10" style={{ backgroundColor: '#1C1A14' }}>
            <h2 className="font-display text-2xl font-bold text-white mb-2">School &amp; Organization Partnerships</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Partner with Daraja Africa to support school mental health programs and outreach initiatives.
            </p>
            <a
              href="https://wa.me/254748047581?text=Hello%20Daraja%20Africa%2C%20I%27m%20interested%20in%20a%20school%20partnership."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all"
              style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E08898'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F4A8B8'}
            >
              Apply as Partner School <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Get In Touch */}
          <div id="get-in-touch" className="rounded-2xl p-6 md:p-10" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(184,103,26,0.2)' }}>
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-2">Get in Touch</h2>
            <p className="text-brand-body text-sm mb-6 leading-relaxed">
              Reach out directly to connect with the Daraja Africa team — whether you're a prospective volunteer, partner, or supporter.
            </p>
            <div className="flex flex-col gap-5">
              <a href="tel:+254748047581" className="flex items-center gap-3 text-brand-charcoal hover:text-brand-gold transition-colors">
                <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: '#EDE5D4' }}>
                  <Phone className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-brand-body/60 uppercase tracking-wide font-semibold">Phone</p>
                  <p className="text-sm font-semibold">+254 748 047 581</p>
                </div>
              </a>
              <a href="https://instagram.com/daraja_africa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-charcoal hover:text-brand-gold transition-colors">
                <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: '#EDE5D4' }}>
                  <Instagram className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-brand-body/60 uppercase tracking-wide font-semibold">Instagram</p>
                  <p className="text-sm font-semibold">@daraja_africa</p>
                </div>
              </a>
              <a href="https://tiktok.com/@daraja_africa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-charcoal hover:text-brand-gold transition-colors">
                <div className="p-2.5 rounded-lg shrink-0" style={{ backgroundColor: '#EDE5D4' }}>
                  <Video className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs text-brand-body/60 uppercase tracking-wide font-semibold">TikTok</p>
                  <p className="text-sm font-semibold">@daraja_africa</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}