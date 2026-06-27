import React, { useState } from 'react';

const galleryItems = [
  {
    id: 1, prompt: 'Stillness After Chaos', color: '#C9972A', height: 'h-64',
    desc: 'Finding quiet moments of peace in the aftermath of emotional turbulence — a space where youth can breathe again.',
    image: '/images/IMG-20260625-WA0008.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 2, prompt: 'The Weight of Silence', color: '#4A7C3F', height: 'h-48',
    desc: 'Exploring what it feels like to carry unexpressed grief in a culture that valorises strength and endurance.',
    image: '/images/IMG-20260625-WA0010.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 3, prompt: 'Roots That Hold', color: '#A0522D', height: 'h-80',
    desc: 'Ubuntu philosophy rendered in texture — depicting interconnection as the source of personal resilience and collective healing.',
    image: '/images/IMG-20260625-WA0011.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 4, prompt: 'Before the Rain', color: '#6B8CAE', height: 'h-56',
    desc: 'The quiet, anxious anticipation that precedes emotional release — like the stillness before a storm.',
    image: '/images/IMG-20260625-WA0015.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 5, prompt: 'First Light', color: '#D2691E', height: 'h-72',
    desc: 'A sunrise witnessed after a night of crisis — the radical hope of simply surviving until morning.',
    image: '/images/IMG-20260625-WA0017.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 6, prompt: 'Unfolding', color: '#F4A7B9', height: 'h-44',
    desc: 'Growth rendered as a slow botanical unfolding — healing is not sudden; it is incremental and persistent.',
    image: '/images/IMG-20260625-WA0018.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 7, prompt: 'The Bridge I Cross Alone', color: '#8E44AD', height: 'h-64',
    desc: 'A solitary crossing — representing the individual journey through mental health challenges before community support is found.',
    image: '/images/IMG-20260625-WA0019.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 8, prompt: 'Breaking the Mask', color: '#2D5016', height: 'h-52',
    desc: 'Confronting the cultural pressure to perform wellness — the courage required to acknowledge internal struggle.',
    image: '/images/IMG-20260625-WA0021.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 9, prompt: 'Tides of Grief', color: '#1A3A5C', height: 'h-68',
    desc: 'Grief depicted as ocean waves — rhythmic, recurring, never fully resolved, but learned to move within.',
    image: '/images/IMG-20260625-WA0022.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 10, prompt: 'Found in the Field', color: '#6AAB3A', height: 'h-48',
    desc: 'Collective healing after collective trauma — the field as metaphor for community recovery and regrowth.',
    image: '/images/IMG-20260625-WA0023.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 11, prompt: 'The Spiral Returns', color: '#C9972A', height: 'h-60',
    desc: 'Mental health as spiral — you return to familiar struggles but at higher levels of understanding each time.',
    image: '/images/IMG-20260625-WA0024.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 12, prompt: 'Belonging Everywhere and Nowhere', color: '#A0522D', height: 'h-72',
    desc: 'The complex identity experience of displacement — grief, resilience, and the search for rootedness across borders.',
    image: '/images/IMG-20260625-WA0025.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 13, prompt: 'Echoes in the Corridor', color: '#6B8CAE', height: 'h-56',
    desc: 'The lingering sounds of a school hallway where conversations about mental health are just beginning to find voice.',
    image: '/images/IMG-20260625-WA0026.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 14, prompt: 'Shared Table', color: '#8E44AD', height: 'h-64',
    desc: 'A gathering space where young people sit together, stories are exchanged, and isolation gives way to connection.',
    image: '/images/IMG-20260625-WA0027.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 15, prompt: 'Gardens of the Mind', color: '#4A7C3F', height: 'h-48',
    desc: 'Cultivating mental well-being like a garden — patience, watering, weeding, and trusting the process of growth.',
    image: '/images/IMG-20260625-WA0028.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 16, prompt: 'Holding Space', color: '#D2691E', height: 'h-80',
    desc: 'The quiet work of showing up for someone without trying to fix them — presence as the most powerful offering.',
    image: '/images/IMG-20260625-WA0029.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 17, prompt: 'Under the Same Sky', color: '#2D5016', height: 'h-56',
    desc: 'Despite different stories and struggles, youth across communities share the same fundamental need to be heard.',
    image: '/images/IMG-20260625-WA0030.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 18, prompt: 'Pages Unwritten', color: '#1A3A5C', height: 'h-72',
    desc: 'Reimagining what happens when a young person chooses to write a new chapter instead of repeating old patterns.',
    image: '/images/IMG-20260625-WA0031.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 19, prompt: 'Listening Circle', color: '#F4A7B9', height: 'h-44',
    desc: 'The ancient practice of sitting in circle — each voice matters, every story is honoured, silence is respected.',
    image: '/images/IMG-20260625-WA0032.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 20, prompt: 'Mountain Path', color: '#6AAB3A', height: 'h-52',
    desc: 'The winding road of recovery — not straight, not easy, but every step forward is a victory worth noting.',
    image: '/images/IMG-20260625-WA0033.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 21, prompt: 'Threads of Connection', color: '#C9972A', height: 'h-68',
    desc: 'Weaving a safety net from shared experience — one conversation, one act of kindness, at a time.',
    image: '/images/IMG-20260625-WA0034.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 22, prompt: 'Quiet Strength', color: '#A0522D', height: 'h-64',
    desc: 'The gentle power of knowing when to speak, when to listen, and when to simply sit beside someone.',
    image: '/images/IMG-20260625-WA0035.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 23, prompt: 'Ripples', color: '#6B8CAE', height: 'h-48',
    desc: 'One act of empathy creates waves that travel further than we can ever see — small choices, large impact.',
    image: '/images/IMG-20260625-WA0036.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 24, prompt: 'Home Within', color: '#8E44AD', height: 'h-56',
    desc: 'Finding sanctuary inside oneself — building an inner foundation strong enough to weather any outer storm.',
    image: '/images/IMG-20260625-WA0037.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  },
  {
    id: 25, prompt: 'Tomorrow Begins Today', color: '#2D5016', height: 'h-72',
    desc: 'The future is not a distant place — it is built in classrooms, corridors, and quiet conversations happening right now.',
    image: '/images/IMG-20260625-WA0038.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa community'
  }
];

function GalleryCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative mb-6 rounded-2xl overflow-hidden cursor-pointer group ${item.height}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <img
        src={item.image}
        alt={item.prompt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.2) 0%, transparent 50%)`
        }} />

      {/* Location tag — always visible */}
      <div className="absolute top-3 right-3 z-10">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
          {item.country}
        </span>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-brand-dark/85 flex flex-col justify-end p-5 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-2">
          {item.prompt}
        </span>
        <p className="font-body text-sm text-brand-cream/85 leading-relaxed mb-3">{item.desc}</p>
        <p className="text-xs text-brand-cream/50">{item.artist}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Multimedia Wellness Narratives</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-charcoal mt-3 mb-5">Gallery</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            Recaps of the school visits, conversations, and mental health initiatives Daraja Africa has carried out across partner schools and communities.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
