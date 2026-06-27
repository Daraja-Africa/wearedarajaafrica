import React from 'react';
import { BookOpen, Users } from 'lucide-react';

export default function Programs() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">What We Do</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-charcoal mt-3 mb-5">
            Our Programs
          </h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            Locally grounded. Culturally resonant. Each program is designed to meet young people where they are.
          </p>
        </div>
      </section>

      {/* Flagship programs */}
      <section className="py-14 px-4 border-b border-brand-gold/15">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold text-center mb-8">Flagship Initiatives</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* High School Outreach */}
            <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(74,122,58,0.08)', borderTop: '4px solid #4A7A3A' }}>
              <div className="mb-4 p-2.5 rounded-xl inline-block" style={{ backgroundColor: 'rgba(74,122,58,0.1)' }}>
                <BookOpen className="w-6 h-6" style={{ color: '#4A7A3A' }} />
              </div>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ color: '#4A7A3A' }}>High School Outreach</h2>
              <p className="text-brand-body text-sm leading-relaxed mb-5">
                Interactive workshops, curriculum sessions, and "Health Pop-up Days" taken directly to institutions — including Alliance High School, Limuru Girls' High School, and more.
              </p>
              <ul className="space-y-2 text-sm text-brand-body">
                {['Interactive mental health workshops', 'School "Health Pop-up Days"', 'Educator training sessions', 'Curriculum integration support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: '#B8671A' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Peer Support Circles */}
            <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(74,122,58,0.08)', borderTop: '4px solid #4A7A3A' }}>
              <div className="mb-4 p-2.5 rounded-xl inline-block" style={{ backgroundColor: 'rgba(74,122,58,0.1)' }}>
                <Users className="w-6 h-6" style={{ color: '#4A7A3A' }} />
              </div>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ color: '#4A7A3A' }}>Peer Support Circles</h2>
              <p className="text-brand-body text-sm leading-relaxed mb-5">
                Facilitated, student-led safe spaces for youth to share experiences and find solidarity. Trained peer facilitators guide sessions with empathy and structure.
              </p>
              <ul className="space-y-2 text-sm text-brand-body">
                {['Trained Peer Circle Facilitators', 'Student-led, professionally guided', 'Anonymous & judgment-free', 'Regular weekly sessions'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: '#4A7A3A' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Curriculum — full width, mission-driven */}
          <div className="mt-8 rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#1C1A14', borderTop: '4px solid #B8671A' }}>
            <div className="max-w-3xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8671A' }}>Our Curriculum</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-4 text-white">Designed by Daraja Africa. Built for Schools.</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Daraja Africa developed a six-week curriculum specifically designed to build capacity for addressing mental health challenges in high schools. Supported by ongoing school check-ins and a comprehensive educator resource pack, this program gives teachers and students the language, tools, and confidence to navigate mental health together.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  'Six-week structured mental health curriculum',
                  'Comprehensive educator resource pack',
                  'Age-appropriate emotional literacy modules',
                  'Stigma reduction and awareness content',
                  'Ongoing school check-in support',
                  'Built and implemented by Daraja Africa',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70">
                    <span style={{ color: '#F4A8B8' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}