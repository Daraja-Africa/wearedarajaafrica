import React, { useState } from 'react';
import { Search, Headphones, BookOpen, Palette, MapPin, ExternalLink } from 'lucide-react';

const resources = [
  {
    id: 1, category: 'Wellbeing', tag: 'Self-Care',
    title: 'Five Steps to Mental Wellbeing',
    desc: 'A UK NHS guide outlining five evidence-based actions to boost your mental health: connect with others, be physically active, learn new skills, give to others, and practice mindfulness. Each step includes practical examples anyone can adopt.',
    duration: 'NHS Guide', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-forest/10 text-brand-forest',
    link: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/',
  },
  {
    id: 2, category: 'Stress', tag: 'Stress Management',
    title: '10 Stress Busters',
    desc: 'This NHS page offers 10 quick, practical tips to relieve stress — including taking regular breaks, practicing deep breathing, getting active, and thinking positively. User-friendly and stigma-free.',
    duration: 'NHS Guide', icon: <Headphones className="w-5 h-5" />,
    tagColor: 'bg-brand-blush text-brand-terracotta',
    link: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/ten-stress-busters/',
  },
  {
    id: 3, category: 'Wellbeing', tag: 'Depression',
    title: 'Self-care for Depression',
    desc: 'Mind (UK mental health charity) provides a comprehensive guide to self-care strategies for depression — covering daily habits, relaxation, journaling, and staying connected. Encouraging and non-judgmental.',
    duration: 'Mind Guide', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-gold/15 text-brand-gold-dark',
    link: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/self-care/',
  },
  {
    id: 4, category: 'Anxiety', tag: 'Anxiety',
    title: 'How to Manage Anxiety and Worry',
    desc: "Mind's self-help page offers dozens of practical coping tips for anxiety — including breathing exercises, sensory techniques, creative outlets, and mindfulness. Written in clear, supportive language.",
    duration: 'Mind Guide', icon: <Headphones className="w-5 h-5" />,
    tagColor: 'bg-brand-forest/10 text-brand-forest',
    link: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-problems/how-to-manage-anxiety-and-worry/',
  },
  {
    id: 5, category: 'Awareness', tag: 'Depression',
    title: 'What Is Depression?',
    desc: "The U.S. National Institute of Mental Health (NIMH) explains that depression goes beyond occasional sadness. It can affect anyone regardless of background. Depression is real and treatable — learning about it is a first step.",
    duration: 'NIMH Overview', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-blush text-brand-terracotta',
    link: 'https://www.nimh.nih.gov/health/topics/depression',
  },
  {
    id: 6, category: 'Stress', tag: 'Stress Management',
    title: 'Managing Stress',
    desc: 'The CDC page on stress offers healthy coping strategies: take breaks from news, practice deep breathing, keep a journal, spend time outdoors, exercise regularly, and connect with supportive people.',
    duration: 'CDC Guide', icon: <Palette className="w-5 h-5" />,
    tagColor: 'bg-brand-rust/10 text-brand-rust',
    link: 'https://www.cdc.gov/mental-health/living-with/managing-stress/index.html',
  },
  {
    id: 7, category: 'Youth', tag: 'Youth',
    title: '5 Ways to Better Mental Health Online',
    desc: "UNICEF's article gives five social-media-smart tips for young people: avoid doomscrolling, be mindful, protect online privacy, choose kindness, and stay present offline. Youth-friendly and practical.",
    duration: 'UNICEF Article', icon: <MapPin className="w-5 h-5" />,
    tagColor: 'bg-brand-gold/15 text-brand-gold-dark',
    link: 'https://www.unicef.org/stories/5-ways-better-mental-health-online',
  },
  {
    id: 8, category: 'Wellbeing', tag: 'Self-Care',
    title: 'Self-Care Strategies to Improve Your Overall Mental Health',
    desc: 'HelpGuide outlines various self-care types (physical, emotional, social, spiritual) and how they boost mental health. Tips include building a personal self-care plan with achievable goals.',
    duration: 'HelpGuide Article', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-forest/10 text-brand-forest',
    link: 'https://www.helpguide.org/mental-health/wellbeing/self-care-tips-to-prioritize-your-mental-health',
  },
  {
    id: 9, category: 'Awareness', tag: 'General',
    title: 'Mental Health: What It Is & Why It\'s Important',
    desc: "Cleveland Clinic defines mental health as how we think, feel, and act. It stresses that mental health is like physical health — and lists basic actions to improve it: connect with people, sleep well, eat well, and exercise.",
    duration: 'Cleveland Clinic', icon: <Headphones className="w-5 h-5" />,
    tagColor: 'bg-brand-blush text-brand-terracotta',
    link: 'https://my.clevelandclinic.org/health/articles/mental-health',
  },
  {
    id: 10, category: 'Youth', tag: 'Youth',
    title: 'Youth Mental Health (U.S. Surgeon General Advisory)',
    desc: "The U.S. Surgeon General's advisory highlights youth mental health challenges and practical self-care tips: stick to a routine, eat well, stay active, get sleep, and spend time outdoors. Aims to destigmatize youth mental health needs.",
    duration: 'Surgeon General', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-gold/15 text-brand-gold-dark',
    link: 'https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/index.html',
  },
  {
    id: 11, category: 'Youth', tag: 'Youth',
    title: 'WHO/UNICEF Guidance to Improve Youth Mental Health Care',
    desc: '"1 in 7 children and adolescents aged 10 to 19 are affected by mental health conditions" globally. This WHO/UNICEF guidance calls for community-based support and multi-sector collaboration to reach young people.',
    duration: 'WHO/UNICEF', icon: <MapPin className="w-5 h-5" />,
    tagColor: 'bg-brand-rust/10 text-brand-rust',
    link: 'https://www.who.int/news/item/09-10-2024-who-and-unicef-launch-guidance-to-improve-access-to-mental-health-care-for-children-and-young-people',
  },
  {
    id: 12, category: 'Awareness', tag: 'Africa',
    title: 'Access to Mental Health Support in Africa Remains Unequal',
    desc: 'At least 1 in 7 children in sub-Saharan Africa experiences significant psychological hardship. Half of all mental illnesses start by age 14, yet services remain scarce. Investing in early support can prevent long-term harm.',
    duration: 'WHO Africa', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-forest/10 text-brand-forest',
    link: 'https://www.afro.who.int/news/access-mental-health-and-psychosocial-support-services-remains-unequal-children-and',
  },
];

const amariResources = [
  {
    id: 101, category: 'Youth', tag: 'Youth & Resilience',
    title: 'Substance Abuse: Beyond Peer Pressure and Experimentation',
    desc: 'Explains addiction, common substances teens encounter, and why youth start using drugs. Outlines warning signs and how families and schools can help prevent addiction.',
    duration: 'Amari Africa', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-gold/15 text-brand-gold-dark',
    link: 'https://amari.africa',
  },
  {
    id: 102, category: 'Awareness', tag: 'Crisis & Stigma',
    title: 'Mental Health Promotion and Suicide Prevention – World Mental Health Day 2019',
    desc: 'Highlights the urgent need to prevent suicide in African youth, debunks common myths, and gives practical tips on supporting someone at risk.',
    duration: 'Amari Africa', icon: <Headphones className="w-5 h-5" />,
    tagColor: 'bg-brand-blush text-brand-terracotta',
    link: 'https://amari.africa',
  },
  {
    id: 103, category: 'Youth', tag: 'Youth & Resilience',
    title: 'Child and Adolescent Mental Health during COVID-19',
    desc: 'Explores how COVID-19 lockdowns disrupted children\'s lives, causing stress and anxiety. Gives parents and teachers strategies to protect young people\'s mental health.',
    duration: 'Amari Africa', icon: <MapPin className="w-5 h-5" />,
    tagColor: 'bg-brand-forest/10 text-brand-forest',
    link: 'https://amari.africa',
  },
  {
    id: 104, category: 'Awareness', tag: 'Crisis & Stigma',
    title: 'Gender-Based Violence and Mental Health: Breaking the Silence',
    desc: 'Explains how GBV leaves deep psychological scars. Emphasizes community awareness, support networks, and holistic care for survivors.',
    duration: 'Amari Africa', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-blush text-brand-terracotta',
    link: 'https://amari.africa',
  },
  {
    id: 105, category: 'Stress', tag: 'Stress Management',
    title: 'COVID-19 Psychological Effects',
    desc: 'Lists the emotional and physical tolls of COVID-19 and quarantine — covering common fears, grief challenges, and signs of distress like insomnia and withdrawal.',
    duration: 'Amari Africa', icon: <Headphones className="w-5 h-5" />,
    tagColor: 'bg-brand-rust/10 text-brand-rust',
    link: 'https://amari.africa',
  },
  {
    id: 106, category: 'Stress', tag: 'Stress Management',
    title: 'Impact of COVID-19 on Women\'s Mental Health',
    desc: 'Describes how lockdowns uniquely stressed women through increased caregiving, job loss, and domestic violence. Practical coping strategies included.',
    duration: 'Amari Africa', icon: <Palette className="w-5 h-5" />,
    tagColor: 'bg-brand-gold/15 text-brand-gold-dark',
    link: 'https://amari.africa',
  },
  {
    id: 107, category: 'Wellbeing', tag: 'Family Support',
    title: 'Social Support on Caregivers\' Mental Health',
    desc: 'Explores how caring for a child with disabilities causes caregiver stress and depression, and how family, peer groups, and counseling can help.',
    duration: 'Amari Africa', icon: <BookOpen className="w-5 h-5" />,
    tagColor: 'bg-brand-forest/10 text-brand-forest',
    link: 'https://amari.africa',
  },
  {
    id: 108, category: 'Youth', tag: 'Youth & Resilience',
    title: 'Road to Recovery: An ARTICULATE Ambassador\'s Story',
    desc: 'A young Zimbabwean musician\'s journey from addiction and drug-induced psychosis back to health through therapy and music — showing recovery is possible.',
    duration: 'Amari Africa', icon: <MapPin className="w-5 h-5" />,
    tagColor: 'bg-brand-blush text-brand-terracotta',
    link: 'https://amari.africa',
  },
];

const categoryFilters = ['All', 'Wellbeing', 'Stress', 'Anxiety', 'Awareness', 'Youth'];

export default function Resources() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Reorder: Amari first, then WHO (id 11), UNICEF (id 7), then mix rest
  const priorityIds = [101, 11, 7];
  const priorityResources = [...amariResources.slice(0, 1), resources.find(r => r.id === 11), resources.find(r => r.id === 7)];
  const remainingAmari = amariResources.slice(1);
  const remainingMain = resources.filter(r => r.id !== 11 && r.id !== 7);
  // Interleave remaining
  const mixed = [];
  const maxLen = Math.max(remainingMain.length, remainingAmari.length);
  for (let i = 0; i < maxLen; i++) {
    if (remainingMain[i]) mixed.push(remainingMain[i]);
    if (remainingAmari[i]) mixed.push(remainingAmari[i]);
  }
  const allResources = [...priorityResources, ...mixed];
  const filtered = allResources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) ||
      r.tag.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || r.category === category;
    return matchSearch && matchCat;
  });


  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Vetted Resource Library</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-charcoal mt-3 mb-5">Resources</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            Self-care toolkits, a curated reading list, and quick FAQs — everything you need to support your mental wellbeing, free and accessible.
          </p>

          {/* Quick FAQ */}
          <div className="mt-10 text-left max-w-2xl mx-auto space-y-4">
            {[
              { q: 'Is Daraja Africa free?', a: null, isFirst: true },
              { q: 'What happens in a peer circle?', a: 'A trained peer facilitator guides a small, safe group session where participants share experiences, listen without judgment, and support each other. Everything shared stays within the group.' },
              { q: 'How can my school invite Daraja Africa?', a: 'Reach out via the Get Involved page to apply as a partner school. We\'ll connect with your administration to schedule outreach sessions and health pop-up days.' },
              { q: 'Are these resources free?', a: 'Yes — all resources on this page are free and publicly accessible. We believe mental health support should not be gated by cost.' },
            ].map((faq, i) => (
              <details key={i} className="rounded-xl p-5 cursor-pointer" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(184,103,26,0.15)' }}>
                <summary className="font-semibold text-brand-charcoal text-sm list-none flex justify-between items-center gap-2">
                  {faq.q} <span className="text-brand-gold text-lg shrink-0">+</span>
                </summary>
                {faq.isFirst ? (
                  <p className="mt-3 text-sm text-brand-body leading-relaxed">
                    Yes. Daraja Africa provides its services free of charge. For guidance and sign-up information, visit the{' '}
                    <a href="/get-involved" className="text-brand-gold hover:underline font-medium">Get Involved page</a>{' '}
                    for{' '}
                    <a href="/get-involved" className="text-brand-gold hover:underline font-medium">volunteer opportunities</a>{' '}
                    and{' '}
                    <a href="/get-involved" className="text-brand-gold hover:underline font-medium">school partnership</a>{' '}
                    information.
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-brand-body leading-relaxed">{faq.a}</p>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-body/50" />
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-brand-cream-light border border-brand-gold/30 rounded-xl text-brand-charcoal placeholder:text-brand-body/40 focus:outline-none focus:border-brand-gold transition-colors font-body text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categoryFilters.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    category === cat
                      ? 'bg-brand-gold text-white'
                      : 'bg-brand-cream-light border border-brand-gold/30 text-brand-body hover:border-brand-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="text-sm text-brand-body/60 mb-6">
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
            {search && <span> for "<span className="text-brand-gold">{search}</span>"</span>}
          </p>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(resource => (
              <div
                key={resource.id}
                className="bg-brand-cream-light border border-brand-gold/20 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-brand-gold/10 rounded-xl text-brand-gold">{resource.icon}</div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${resource.tagColor}`}>
                    {resource.tag}
                  </span>
                </div>
                <h3 className="font-body font-semibold text-brand-charcoal mb-2 leading-snug">{resource.title}</h3>
                <p className="font-body text-sm text-brand-body leading-relaxed flex-1 mb-4">{resource.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-brand-gold/15">
                  <span className="text-xs text-brand-body/50">{resource.duration}</span>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-gold hover:underline flex items-center gap-1"
                  >
                    Read <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-brand-body text-lg">No resources match your search.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 text-brand-gold font-medium hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}