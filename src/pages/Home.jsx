import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PulseCarousel from '../components/home/PulseCarousel';

export default function Home() {
  return (
    <div className="bg-brand-cream">

      {/* LOGO + TAGLINE */}
      <div className="flex flex-col items-center pt-12 pb-6 px-4">
        <img
          src="/images/daraja-logo-transparent.png"
          alt="Daraja Africa"
          className="h-52 sm:h-72 md:h-96 w-auto object-contain mix-blend-multiply" />
        
        <p className="text-sm md:text-base font-medium tracking-widest text-brand-body/70 mt-3 text-center">
          Empathy · Peer Connection · Professional Guidance
        </p>
      </div>

      {/* HERO — Bridging the Youth Mental Health Gap */}
      <section className="py-16 md:py-24 px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight text-brand-charcoal tracking-tight">
            Bridging the Youth Mental Health Gap.
          </h1>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed max-w-2xl mb-6">
            Safe spaces, peer-led support circles, and mental health resources designed by youth, for youth.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-16 md:py-24 px-4 border-t border-brand-gold/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: 'url(/images/IMG-20260625-WA0007-2.jpg)' }}></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Who We Are</h2>
            <p className="text-brand-body text-lg leading-relaxed max-w-3xl mx-auto">
              Daraja Africa is a mental health initiative committed to changing the narrative around youth mental well-being. We understand that when high school students face challenges, they instinctively turn to their peers. We are here to bridge the mental health gap within high schools. We empower young people through empathy-driven education, peer connection and professional guidance.
            </p>
            <p className="text-brand-body text-lg leading-relaxed max-w-3xl mx-auto mt-4">
              That is why Daraja Africa developed a six-week curriculum, supported by school check-ins and a comprehensive educator resource pack, to build capacity for addressing mental health challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
            { label: 'Peer-to-Peer Therapy', desc: 'We train students to effectively support one another in times of crisis.' },
            { label: 'Professional Counseling', desc: 'We provide expert guidance from licensed psychologists to handle deep trauma and addiction.' },
            { label: 'School Partnerships', desc: 'We create embedded safe spaces where students feel seen, understood, and supported.' }].
            map((item, i) =>
             <div key={i} className="rounded-2xl p-6 shadow-sm hidden" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(74,122,58,0.15)' }}>
                <h3 className="font-display text-lg font-bold mb-2 text-brand-charcoal">{item.label}</h3>
                <p className="text-sm text-brand-body leading-relaxed">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY SUPPORT */}
      <section className="py-16 md:py-24 px-4 border-t border-brand-gold/10" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Why Support Daraja Africa?</h2>
            <p className="text-brand-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Mental health matters, yet it remains an overlooked and often shunned topic in many Sub-Saharan schools. By supporting us, you are directly investing in a mentally healthy generation of African students empowered to rise with hope, compassion, and resilience.
            </p>
          </div>
          <div className="space-y-10">
            {[
            {
              num: '01',
              title: 'Peer-to-Peer Therapy',
              body: 'We train students to effectively support one another in times of crisis — recognising that peers are often the first point of contact for young people in distress.'
            },
            {
              num: '02',
              title: 'Professional Counseling',
              body: 'We provide expert guidance from licensed psychologists to handle deep trauma and addiction, ensuring every student has access to qualified clinical support.'
            },
            {
              num: '03',
              title: 'School Partnerships',
              body: 'We create embedded safe spaces where students feel seen, understood, and supported — transforming schools into emotionally intelligent communities.'
            }].
            map((lane, i) =>
            <div key={i} className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 items-start md:items-center">
                <div className="md:col-span-2 flex">
                  <span className="font-display text-6xl md:text-8xl font-extrabold leading-none select-none" style={{ color: 'rgba(184,103,26,0.12)' }}>
                    {lane.num}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-display text-xl md:text-3xl font-bold text-brand-charcoal mb-2">{lane.title}</h3>
                  <p className="font-body text-brand-body leading-relaxed text-base md:text-lg max-w-2xl">{lane.body}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OUR FOUNDATION / CORE PILLARS */}
      <section className="py-16 md:py-20 px-4 border-t border-brand-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Our Foundation</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-2" style={{ color: '#4A7A3A' }}>Core Pillars</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
            { label: 'Empathy', desc: 'Validating lived high school experiences without judgement or labels.' },
            { label: 'Connection', desc: 'Building safe, reliable peer-to-peer counseling relationships.' },
            { label: 'Awareness', desc: 'Dismantling social stigmas in schools through clear, open education.' },
            { label: 'Support', desc: 'Providing sound guidance backed by expert psychological steering advisors.' }].
            map((val, i) =>
             <div key={i} className="rounded-2xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(74,122,58,0.08)', borderTop: '4px solid #4A7A3A', boxShadow: '0 1px 3px rgba(74,122,58,0.05)' }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#4A7A3A' }}>{val.label}</h3>
                <p className="text-sm text-brand-body leading-relaxed">{val.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PULSE CAROUSEL */}
      <section className="py-16 md:py-20 px-4 border-t border-brand-gold/10 overflow-hidden">
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-rust">Live · Anonymous · Real</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mt-2">Community Pulse</h2>
          <p className="text-brand-body mt-3 max-w-lg mx-auto">You're not alone. Join our mission to end the stigma.</p>
        </div>
        <PulseCarousel />
        <div className="text-center mt-8">
          <Link to="/the-pit" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline">
            Read the full archive <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 md:py-28 px-4 bg-brand-charcoal text-brand-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">You're not alone. Join our mission to end the stigma.</h2>
          <p className="text-brand-cream/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Mental health matters, yet it remains an overlooked and often shunned topic in many Sub-Saharan schools. By supporting us, you are directly investing in a mentally healthy generation of African students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              to="/programs"
              className="px-7 py-3.5 font-semibold rounded-xl shadow-md transition-all duration-200"
              style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E08898'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4A8B8'}>
              Our Programs
            </Link>
            <Link
              to="/get-help"
              className="px-7 py-3.5 font-semibold rounded-xl shadow-md transition-all duration-200"
              style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E08898'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4A8B8'}>
              Get Help
            </Link>
            <Link
              to="/resources"
              className="px-7 py-3.5 font-semibold rounded-xl transition-all duration-200"
              style={{ border: '2px solid rgba(245,239,228,0.4)', color: '#F5EFE4' }}>
              Resources
            </Link>
            <Link
              to="/get-involved"
              className="px-7 py-3.5 font-semibold rounded-xl transition-all duration-200"
              style={{ border: '2px solid rgba(245,239,228,0.4)', color: '#F5EFE4' }}>
              Get Involved
            </Link>
            <Link
              to="/get-involved#get-in-touch"
              className="px-7 py-3.5 font-semibold rounded-xl transition-all duration-200"
              style={{ border: '1px solid rgba(245,239,228,0.3)', color: '#F5EFE4' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>);

}