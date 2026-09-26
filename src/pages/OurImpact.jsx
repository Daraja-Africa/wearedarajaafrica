import React, { useState } from 'react';
import { ArrowDownRight, ArrowRight, ExternalLink, HeartHandshake, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const sdgs = [
  {
    number: 3,
    title: 'Good Health & Well-being',
    role: 'Primary anchor',
    color: '#4C9F38',
    target: 'Target 3.4',
    copy: 'Supporting young people to build mental-health literacy, find safe peer connection, and reach professional care earlier.',
    evidence: ['Peer support circles', 'Mental health camps', 'Professional referral pathways'],
  },
  {
    number: 4,
    title: 'Quality Education',
    role: 'Primary anchor',
    color: '#C5192D',
    target: 'Target 4.7',
    copy: 'Making emotional literacy part of everyday learning so students and educators can create healthier school communities.',
    evidence: ['Six-week school curriculum', 'Educator resource pack', 'Campus and school workshops'],
  },
  {
    number: 5,
    title: 'Gender Equality',
    role: 'Supporting goal',
    color: '#FF3A21',
    target: 'Target 5.1',
    copy: 'Creating spaces where every young person can speak about mental health without gendered stigma or exclusion.',
    evidence: ['Inclusive peer spaces', 'Stigma reduction education', 'Youth-led advocacy'],
  },
  {
    number: 10,
    title: 'Reduced Inequalities',
    role: 'Supporting goal',
    color: '#DD1367',
    target: 'Target 10.2',
    copy: 'Bridging the access gap by bringing practical support and trusted information closer to young people in schools and communities.',
    evidence: ['Low-barrier support', 'Youth-tailored resources', 'Community partnerships'],
  },
  {
    number: 17,
    title: 'Partnerships for the Goals',
    role: 'Enabling goal',
    color: '#19486A',
    target: 'Target 17.17',
    copy: 'Working with schools, counselors, families, and aligned organizations to make youth mental wellness a shared responsibility.',
    evidence: ['School partnerships', 'Clinical guidance', 'Community collaboration'],
  },
];

function SdgMark({ number, color }) {
  const [imageFailed, setImageFailed] = useState(false);
  const iconUrl = `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(number).padStart(2, '0')}.jpg`;

  return imageFailed ? (
    <div
      aria-label={`United Nations Sustainable Development Goal ${number}`}
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-3xl font-bold text-white shadow-sm"
      style={{ backgroundColor: color }}
    >
      {number}
    </div>
  ) : (
    <img
      src={iconUrl}
      alt={`United Nations Sustainable Development Goal ${number}`}
      className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-sm"
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  );
}

export default function OurImpact() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="relative overflow-hidden border-b border-brand-gold/15 px-4 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[32px] border-brand-blush/30" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">Our impact</p>
            <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.02] text-brand-charcoal md:text-7xl">
              Building a mentally healthy generation, together.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-body md:text-xl">
              Daraja Africa Network turns empathy, peer connection, and professional guidance into practical change for young people. This is how our work connects to the Sustainable Development Goals.
            </p>
            <a
              href="#sdg-framework"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-charcoal px-5 py-3 text-sm font-semibold text-brand-cream transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
            >
              Explore our SDG alignment <ArrowDownRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-brand-charcoal/10 bg-brand-charcoal/10 sm:grid-cols-3">
            {[
              ['01', 'Listen', 'We start with the lived realities of young people.'],
              ['02', 'Equip', 'We share language, tools, and trusted support.'],
              ['03', 'Connect', 'We build bridges to people and care pathways.'],
            ].map(([number, title, copy]) => (
              <div key={number} className="bg-brand-card p-6 md:p-7">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-brand-gold">{number}</span>
                <h2 className="mt-8 font-display text-2xl font-bold text-brand-charcoal">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-body">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-gold/15 bg-brand-cream-light px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest">From intention to evidence</p>
            <h2 className="font-display text-4xl font-bold leading-tight text-brand-charcoal md:text-5xl">Impact is a bridge, not a badge.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-brand-body">
            We use the SDGs as a shared language for accountability, not as decoration. Our strongest contribution is focused and human: helping young people feel seen, supported, and better equipped to navigate school and life.
          </p>
        </div>
      </section>

      <section id="sdg-framework" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">United Nations alignment</p>
              <h2 className="font-display text-4xl font-bold text-brand-charcoal md:text-5xl">Our SDG framework</h2>
            </div>
            <a
              href="https://sdgs.un.org/goals"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-forest underline decoration-brand-forest/30 underline-offset-4 hover:decoration-brand-forest"
            >
              View all 17 goals <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4">
            {sdgs.map((sdg, index) => (
              <article
                key={sdg.number}
                className="group grid gap-6 rounded-2xl border border-brand-charcoal/10 bg-brand-card p-5 shadow-sm transition-shadow hover:shadow-md md:grid-cols-[auto_1fr_auto] md:items-start md:p-7"
                style={{ borderTop: `3px solid ${sdg.color}` }}
              >
                <SdgMark number={sdg.number} color={sdg.color} />
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: sdg.color }}>{sdg.role}</span>
                    <span className="text-xs text-brand-body/70">·</span>
                    <span className="text-xs font-semibold text-brand-body">{sdg.target}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-brand-charcoal">{sdg.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-body">{sdg.copy}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sdg.evidence.map((item) => (
                      <span key={item} className="rounded-full bg-brand-cream px-3 py-1 text-xs text-brand-body">{item}</span>
                    ))}
                  </div>
                </div>
                <span className="hidden font-display text-6xl font-bold leading-none text-brand-charcoal/10 md:block">{String(index + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-brand-body/70">
            SDG iconography is used for identification and links to the official United Nations Sustainable Development Goals resource. Daraja’s alignment describes our contribution; it does not claim ownership of the goals.
          </p>
        </div>
      </section>

      <section className="bg-brand-charcoal px-4 py-16 text-brand-cream md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-blush">The change we want to see</p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">When a young person has support, a whole community gets stronger.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-brand-cream/70">
              Join us in making mental health support more visible, more trusted, and closer to the young people who need it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/get-involved" className="inline-flex items-center gap-2 rounded-xl bg-brand-blush px-5 py-3 text-sm font-semibold text-brand-blush-text transition-colors hover:bg-brand-blush-hover">
                Partner with us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/programs" className="inline-flex items-center gap-2 rounded-xl border border-brand-cream/30 px-5 py-3 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-cream/70">
                See our programs
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              [HeartHandshake, 'Empathy', 'Lead with care'],
              [Users, 'Connection', 'Never alone'],
              [Sparkles, 'Awareness', 'Change the story'],
              [ArrowRight, 'Action', 'Build the bridge'],
            ].map(([Icon, title, copy]) => (
              <div key={title} className="border border-brand-cream/15 bg-brand-cream/5 p-5">
                <Icon className="h-5 w-5 text-brand-blush" />
                <p className="mt-8 font-display text-xl font-bold">{title}</p>
                <p className="mt-1 text-xs text-brand-cream/60">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
