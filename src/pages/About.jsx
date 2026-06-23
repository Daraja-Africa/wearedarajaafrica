import React from 'react';
import { Shield, Heart, Globe, Users, Leaf, Compass } from 'lucide-react';

const timeline = [
  { year: 'Origin', title: 'The Problem We Saw', body: 'In high school, students in distress often turn to their peers rather than teachers, yet peers are rarely equipped to offer adequate support.' },
  { year: 'Founded', title: 'Daraja Africa Born', body: 'Founded by Iteyo Khaisia and Basma Issack to bridge this gap by combining professional mental health expertise with peer guidance.' },
  { year: 'Mission', title: 'Bridging the gap', body: 'Committed to bridging the mental health access gap and ensuring no student has to face their struggles alone.' },
  { year: 'Approach', title: 'Peer Education', body: 'We believe in the power of the untapped resource right in front of us: the youth themselves. By teaching teens how to be effective peer educators, we cultivate environments driven by empathy rather than judgment.' },
  { year: 'Programs', title: 'Campus Initiatives', body: 'We bring dedicated mental health camps, self-checks, and educational campaigns directly to campuses, proving every day that taking care of your mind builds a better tomorrow.' },
  { year: 'Today', title: 'Growing Impact', body: 'Through our active partnerships with educational institutions, we are transforming the high school experience across African communities.' },
];

const clinicalCards = [
  {
    icon: <Heart className="w-6 h-6" style={{ color: '#F4A8B8' }} />,
    title: 'Empathy',
    body: 'We lead with empathy in everything we do — creating spaces where young people feel genuinely heard, understood, and supported without judgment.',
    accent: '#F4A8B8',
  },
  {
    icon: <Users className="w-6 h-6" style={{ color: '#F4A8B8' }} />,
    title: 'Connection',
    body: 'We believe in the power of human connection — peer-to-peer, student-to-counselor, and community-to-community — as the foundation of mental wellness.',
    accent: '#F4A8B8',
  },
  {
    icon: <Globe className="w-6 h-6" style={{ color: '#4A7A3A' }} />,
    title: 'Awareness',
    body: 'We work to normalise conversations around mental health in Sub-Saharan schools, dismantling stigma through education, campaigns, and open dialogue.',
    accent: '#4A7A3A',
  },
  {
    icon: <Shield className="w-6 h-6" style={{ color: '#C9972A' }} />,
    title: 'Support',
    body: 'We ensure every student has access to meaningful support — from trained peer counselors to licensed counseling psychologists — every step of the way.',
    accent: '#C9972A',
  },
  {
    icon: <Leaf className="w-6 h-6" style={{ color: '#6AAB3A' }} />,
    title: 'Our Methodology',
    body: 'Our approach integrates trauma recovery, behavioral guidance, and mental health education directly into the student body. We cultivate environments driven by empathy rather than judgment.',
    accent: '#6AAB3A',
  },
  {
    icon: <Compass className="w-6 h-6" style={{ color: '#F4A8B8' }} />,
    title: 'Impact & Partnerships',
    body: 'Through our active partnerships with educational institutions, we bring dedicated mental health camps, self-checks, and educational campaigns directly to campuses.',
    accent: '#F4A8B8',
  },
];

const teamMembers = [
  {
    name: 'Iteyo Khaisia',
    role: 'Founder',
    desc: 'Visionary leader focused on harnessing peer resources to bridge the mental health gap.',
    image: '/images/IMG-20260620-WA0006.jpg',
  },
  {
    name: 'Basma Issack',
    role: 'Co-Founder',
    desc: 'Advocate dedicated to breaking the stigma and creating safe spaces for youth.',
    image: '/images/IMG-20260620-WA0007.jpg',
  },
  {
    name: 'Sheila Ngome',
    role: 'Counseling Psychologist',
    desc: 'Former school principal and rehabilitation specialist grounding the team in clinical expertise.',
    image: '/images/All_Video_Downloader_684823214_18094055003023597_8483401925228313783_njpg.png.jpg',
  },
];

export default function About() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Who We Are</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-charcoal mt-3 mb-5">
            Our Story
          </h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            Born from a realization that young people need judgment-free spaces — bridging the gap between high schoolers and mental health care.
          </p>
        </div>
      </section>

      {/* Our Journey — full width standalone */}
      <section className="py-10 md:py-14 px-4 border-b border-brand-gold/15">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-brand-gold/25" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-2.5 w-3 h-3 rounded-full bg-brand-gold border-2 border-brand-cream mt-1" />
                  <span className="font-mono text-xs font-bold text-brand-gold uppercase tracking-wider">{item.year}</span>
                  <h3 className="font-body font-semibold text-brand-charcoal mt-0.5 mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-brand-body leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values, Approach, Team */}
      <section className="py-10 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Mission */}
          <div className="rounded-xl p-5 md:p-8 shadow-sm" style={{ backgroundColor: '#FDF8F0', borderLeft: '4px solid #B8671A', border: '1px solid rgba(184,103,26,0.12)' }}>
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-3">Our Mission</h2>
            <p className="font-body text-brand-body leading-relaxed">
              Daraja Africa empowers young people through empathy-driven education, peer connection and professional guidance, bridging the mental health gap within high schools.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-xl p-5 md:p-8 shadow-sm" style={{ backgroundColor: '#FDF8F0', borderLeft: '4px solid #4A7A3A', border: '1px solid rgba(74,122,58,0.12)' }}>
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-3">Our Vision</h2>
            <p className="font-body text-brand-body leading-relaxed">
              A mentally healthy generation of African students empowered to rise with hope, compassion, and resilience, transforming their schools and communities into spaces where every young person feels seen, supported, and valued.
            </p>
          </div>

          {/* Core Values */}
          <h2 className="font-display text-2xl font-bold text-brand-charcoal pt-2">Our Core Values</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Empathy', 'Authenticity', 'Community', 'Growth'].map((value, i) => (
              <div key={i} className="rounded-xl p-5 text-center shadow-sm" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(244,168,184,0.4)' }}>
                <p className="font-display text-lg font-bold" style={{ color: '#4A7A3A' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Our Approach */}
          <h2 className="font-display text-2xl font-bold text-brand-charcoal pt-2">Our Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {clinicalCards.map((card, i) => (
              <div key={i} className="bg-brand-cream-light rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm" style={{ borderTop: `4px solid ${card.accent}`, border: `1px solid rgba(244,168,184,0.2)` }}>
                <div className="mb-3 p-2 rounded-lg inline-block" style={{ backgroundColor: 'rgba(244,168,184,0.12)' }}>{card.icon}</div>
                <h3 className="font-body font-semibold mb-2" style={{ color: '#4A7A3A' }}>{card.title}</h3>
                <p className="font-body text-sm text-brand-body leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="pt-2">
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-5">Our Team</h2>
            <p className="font-body text-brand-body leading-relaxed mb-6">Daraja Africa is driven by a passionate team of mental health professionals, advocates, and innovators:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {teamMembers.map((member, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(184,103,26,0.12)' }}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-body font-semibold text-brand-charcoal">{member.name}</p>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#F4A8B8' }}>{member.role}</p>
                    <p className="font-body text-sm text-brand-body leading-relaxed">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-brand-charcoal text-brand-cream rounded-2xl p-6 md:p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Let's bridge the gap together.</h3>
            <p className="text-brand-cream/70 text-sm leading-relaxed mb-6">Reach out to bring Daraja Africa to your school or to support our ongoing initiatives.</p>
            <a href="mailto:info@darajaafrica.org" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-white font-semibold rounded-xl hover:bg-brand-gold-dark transition-colors text-sm">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}