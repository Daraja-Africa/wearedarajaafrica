import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Circle, BookOpen, Archive, ArrowRight } from 'lucide-react';
import FeelingsWheel from '../components/home/FeelingsWheel';
import PulseCarousel from '../components/home/PulseCarousel';

export default function Home() {
  const [wheelVisible, setWheelVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  return (
    <div className="bg-brand-cream">

      {/* LOGO */}
      <div className="flex justify-center pt-10 pb-2 px-4">
        <img
          src="https://media.base44.com/images/public/6a2c406ed74dbec7d1ceb134/1bd0c3516_DarajaAfrLogo-01.jpg"
          alt="Daraja Africa"
          className="h-36 sm:h-48 md:h-64 w-auto object-contain"
        />
      </div>

      {/* HERO */}
      <section className="py-14 md:py-28 px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-gold/50 text-brand-gold bg-brand-gold/5 mb-8">
            Empathy · Peer Connection · Professional Guidance
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight text-brand-charcoal tracking-tight">
            Bridging the Youth Mental Health Gap.
          </h1>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed max-w-2xl mb-10">
            Safe spaces, peer-led support circles, and mental health resources designed by youth, for youth.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 justify-center w-full max-w-md mx-auto sm:max-w-none">
            <Link
              to="/programs"
              className="px-7 py-3.5 font-semibold rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E08898'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4A8B8'}>
              
              Our Programs
            </Link>
            <Link
              to="/get-help"
              className="px-7 py-3.5 font-semibold rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E08898'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4A8B8'}>
              
              Get Help
            </Link>
            <Link
              to="/resources"
              className="px-7 py-3.5 font-semibold rounded-xl transition-all duration-200"
              style={{ border: '2px solid #1C1A14', color: '#1C1A14' }}>
              
              Resources
            </Link>
            <Link
              to="/get-involved"
              className="px-7 py-3.5 font-semibold rounded-xl transition-all duration-200"
              style={{ border: '2px solid #1C1A14', color: '#1C1A14' }}>
              
              Get Involved
            </Link>
          </div>

          {/* Impact Counters */}
          <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg mx-auto">
            {[
            { num: '3+', label: 'High Schools Reached' },
            { num: '10+', label: 'Peer Circles Hosted' },
            { num: '200+', label: 'Youth Empowered' }].
            map((stat, i) =>
            <div key={i} className="text-center">
                
                
              </div>
            )}
          </div>
        </div>

        {/* Feelings Wheel */}
        {wheelVisible &&
        <div className="mt-16 max-w-lg mx-auto">
            <FeelingsWheel onSelect={setSelectedEmotion} />
            {selectedEmotion &&
          <div className="mt-6 text-center">
                <p className="text-brand-body mb-4">
                  You're feeling <span className="font-semibold text-brand-gold">{selectedEmotion.sub}</span> — that's valid.
                </p>
                <Link
              to="/the-pit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-charcoal text-brand-cream font-medium rounded-xl hover:bg-brand-dark-mid transition-colors">
              
                  Release it in The Pit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
          }
          </div>
        }
      </section>

      {/* CORE VALUES */}
      <section className="py-16 md:py-20 px-4 border-t border-brand-gold/15">
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
              { label: 'Support', desc: 'Providing sound guidance backed by expert psychological steering advisors.' },
            ].map((val, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ backgroundColor: '#FDF8F0', borderTop: '4px solid #4A7A3A' }}>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: '#4A7A3A' }}>{val.label}</h3>
                <p className="text-sm text-brand-body leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 md:py-28 px-4 border-t border-brand-gold/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Who We Are</h2>
            <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
              Daraja Africa is a mental health initiative committed to changing the narrative around youth mental well-being. We understand that when high school students face challenges, they instinctively turn to their peers. We are here to bridge the mental health gap within high schools. We empower young people through empathy-driven education, peer connection and professional guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
            { label: 'Peer-to-Peer Therapy', desc: 'We train students to effectively support one another in times of crisis.' },
            { label: 'Professional Counseling', desc: 'We provide expert guidance from licensed psychologists to handle deep trauma and addiction.' },
            { label: 'School Partnerships', desc: 'We create embedded safe spaces where students feel seen, understood, and supported.' }].
            map((item, i) =>
            <div key={i} className="text-center px-4 py-4 rounded-2xl" style={{ backgroundColor: '#FDF8F0', borderTop: '4px solid #4A7A3A' }}>
                <p className="font-display text-xl font-bold text-brand-charcoal mb-3">{item.label}</p>
                <p className="font-body text-brand-body leading-relaxed">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* IMPACT HIGHLIGHTS */}
      






































      

      {/* WHY SUPPORT */}
      <section className="py-16 md:py-28 px-4 border-t border-brand-gold/15" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Why Support Daraja Africa?</h2>
            <p className="text-brand-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Mental health matters, yet it remains an overlooked and often shunned topic in many Sub-Saharan schools. By supporting us, you are directly investing in a mentally healthy generation of African students empowered to rise with hope, compassion, and resilience.
            </p>
          </div>
          <div className="space-y-8 md:space-y-12">
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
                  <span className="font-display text-6xl md:text-8xl font-extrabold text-brand-gold/15 leading-none select-none">
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

      {/* PULSE CAROUSEL */}
      <section className="py-20 md:py-28 px-4 border-t border-brand-gold/15 overflow-hidden">
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-rust">Live · Anonymous · Real</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mt-2">Community Pulse</h2>
          <p className="text-brand-body mt-3 max-w-lg mx-auto">You're not alone. Join our mission to end the stigma.</p>
        </div>
        <PulseCarousel />
        <div className="text-center mt-8">
          <Link
            to="/the-pit"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline">
            
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="px-8 py-4 font-semibold rounded-xl transition-colors"
              style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E08898'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4A8B8'}>
              
              Support Our Mission
            </Link>
            <Link
              to="/get-involved#get-in-touch"
              className="px-8 py-4 font-semibold rounded-xl transition-colors"
              style={{ border: '1px solid rgba(245,239,228,0.3)', color: '#F5EFE4' }}>
              
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>);

}