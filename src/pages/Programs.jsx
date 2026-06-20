import React, { useState } from 'react';
import { Users, Laptop, GraduationCap, Heart, Globe, Zap } from 'lucide-react';

const programs = [
{
  id: 1,
  title: 'Sauti za Vijana',
  subtitle: 'Voices of Youth',
  tag: 'Youth',
  tagColor: 'bg-brand-blush text-brand-terracotta',
  audience: 'Ages 15–24, urban & peri-urban Kenya',
  outcomes: ['30% reduction in reported anxiety levels', 'Peer facilitator training for 500+ youth', 'Access to 24/7 digital crisis tools'],
  summary: 'A grassroots peer support network equipping young Africans with emotional literacy tools, community listening circles, and direct access to the Daraja platform ecosystem.',
  icon: <Users className="w-7 h-7 text-brand-blush" />
},
{
  id: 2,
  title: 'Campus Minds Initiative',
  subtitle: 'University Mental Health Infrastructure',
  tag: 'Campus',
  tagColor: 'bg-brand-leaf/20 text-brand-forest',
  audience: 'University students across East Africa',
  outcomes: ['Deployed across 22 campuses', 'Trained 120 peer counselors', 'Zero-cost access for all enrolled students'],
  summary: 'Embedding mental health infrastructure directly into African university ecosystems — campus-based listening rooms, peer counselor training, and digital tool onboarding.',
  icon: <GraduationCap className="w-7 h-7 text-brand-forest" />
},
{
  id: 3,
  title: 'Digital Wellness Circles',
  subtitle: 'Online Community Support',
  tag: 'Digital Communities',
  tagColor: 'bg-brand-gold/15 text-brand-gold-dark',
  audience: 'Remote communities, diaspora networks',
  outcomes: ['5,000+ monthly active participants', 'Anonymous group sessions via the Pit', 'Community-led moderation model'],
  summary: 'Structured virtual spaces for anonymous emotional sharing, group witnessing, and collective reflection — built for communities without physical mental health infrastructure.',
  icon: <Laptop className="w-7 h-7 text-brand-gold" />
},
{
  id: 4,
  title: 'Ubuntu Healing Circles',
  subtitle: 'Traditional & Modern Integration',
  tag: 'Youth',
  tagColor: 'bg-brand-blush text-brand-terracotta',
  audience: 'Rural communities, traditional healers\' networks',
  outcomes: ['Partnership with 40+ traditional healers', 'Hybrid in-person/digital model', 'Culturally contextualized tools'],
  summary: 'Bridging traditional African healing practices with modern mental health frameworks — honoring ancestral wisdom while expanding access to evidence-based emotional support.',
  icon: <Heart className="w-7 h-7 text-brand-rust" />
},
{
  id: 5,
  title: 'Pan-African Mental Health Corridor',
  subtitle: 'Cross-Border Support Networks',
  tag: 'Digital Communities',
  tagColor: 'bg-brand-gold/15 text-brand-gold-dark',
  audience: 'Diaspora, refugees, cross-border communities',
  outcomes: ['Active in 18 African nations', 'Multilingual platform support', 'Emergency routing across borders'],
  summary: 'A cross-border digital infrastructure ensuring that mental health support is not limited by national boundaries — particularly for displaced and diaspora African communities.',
  icon: <Globe className="w-7 h-7 text-brand-gold" />
},
{
  id: 6,
  title: 'First Responder Wellness',
  subtitle: 'Crisis Worker Support',
  tag: 'Campus',
  tagColor: 'bg-brand-leaf/20 text-brand-forest',
  audience: 'Healthcare workers, NGO staff, first responders',
  outcomes: ['Burnout prevention protocols', 'Peer-to-peer counselor network', 'Dedicated private Pit access'],
  summary: 'Specialized mental health support for the caregivers — healthcare workers, NGO staff, and crisis responders who bear disproportionate emotional loads without adequate support.',
  icon: <Zap className="w-7 h-7 text-brand-forest" />
}];


const filters = ['All', 'Youth', 'Campus', 'Digital Communities'];

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ?
  programs :
  programs.filter((p) => p.tag === activeFilter);

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

      {/* Two flagship programs */}
      <section className="py-14 px-4 border-b border-brand-gold/15">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold text-center mb-8">Flagship Initiatives</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#FDF8F0', borderTop: '4px solid #4A7A3A' }}>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ color: '#4A7A3A' }}>High School Curriculum & Outreach</h2>
              <p className="text-brand-body text-sm leading-relaxed mb-5">
                Interactive workshops, curriculum sessions, and "Health Pop-up Days" taken directly to institutions — including Alliance High School, Limuru Girls' High School, and more.
              </p>
              <ul className="space-y-2 text-sm text-brand-body">
                {['Interactive mental health workshops', 'School "Health Pop-up Days"', 'Educator training sessions', 'Curriculum integration support'].map((item, i) =>
                <li key={i} className="flex items-center gap-2">
                    <span style={{ color: '#B8671A' }}>✓</span> {item}
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#FDF8F0', borderTop: '4px solid #4A7A3A' }}>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ color: '#4A7A3A' }}>Peer Support Circles</h2>
              <p className="text-brand-body text-sm leading-relaxed mb-5">
                Facilitated, student-led safe spaces for youth to share experiences and find solidarity. Trained peer facilitators guide sessions with empathy and structure.
              </p>
              <ul className="space-y-2 text-sm text-brand-body">
                {['Trained Peer Circle Facilitators', 'Student-led, professionally guided', 'Anonymous & judgment-free', 'Regular weekly sessions'].map((item, i) =>
                <li key={i} className="flex items-center gap-2">
                    <span style={{ color: '#4A7A3A' }}>✓</span> {item}
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#FDF8F0', borderTop: '4px solid #4A7A3A' }}>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ color: '#4A7A3A' }}>Curriculum</h2>
              <p className="text-brand-body text-sm leading-relaxed mb-5">
                Daraja Africa provides structured mental health learning and awareness content embedded directly into school curricula — equipping students with knowledge, language, and tools for emotional wellbeing.
              </p>
              <ul className="space-y-2 text-sm text-brand-body">
                {['Age-appropriate mental health modules', 'Stigma reduction content', 'Emotional literacy frameworks', 'Educator resource packs'].map((item, i) =>
                <li key={i} className="flex items-center gap-2">
                    <span style={{ color: '#4A7A3A' }}>✓</span> {item}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* All programs */}
      


































































      
    </div>);

}