import React, { useState } from 'react';

// Captions describe what is actually visible in each photograph.
const galleryItems = [
  {
    id: 1, prompt: 'The Weight of Silence', color: '#4A7C3F', height: 'h-48',
    desc: 'A team member photographs the Daraja Africa roll-up banner during an outdoor school visit.',
    image: '/images/IMG-20260625-WA0010.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 2, prompt: 'Roots That Hold', color: '#A0522D', height: 'h-80',
    desc: 'A smiling team member in a Daraja Africa t-shirt poses beside the mission banner.',
    image: '/images/IMG-20260625-WA0011.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 3, prompt: 'Before the Rain', color: '#6B8CAE', height: 'h-56',
    desc: 'A team member stands beside the mission-and-vision banner at an outdoor outreach event.',
    image: '/images/IMG-20260625-WA0015.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 4, prompt: 'First Light', color: '#D2691E', height: 'h-72',
    desc: 'A smiling team member points excitedly at the Daraja Africa banner outside a school building.',
    image: '/images/IMG-20260625-WA0017.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 5, prompt: 'Unfolding', color: '#F4A7B9', height: 'h-44',
    desc: 'Two students in school uniforms stand beside the Daraja Africa banner during a school visit.',
    image: '/images/IMG-20260625-WA0018.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 6, prompt: 'The Bridge I Cross Alone', color: '#8E44AD', height: 'h-64',
    desc: 'Three team members in matching Daraja Africa t-shirts stand arm-in-arm on a green lawn.',
    image: '/images/IMG-20260625-WA0019.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 7, prompt: 'Breaking the Mask', color: '#2D5016', height: 'h-52',
    desc: 'A smiling team member wearing sunglasses stands beside the mission-and-vision banner.',
    image: '/images/IMG-20260625-WA0021.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 8, prompt: 'Tides of Grief', color: '#1A3A5C', height: 'h-68',
    desc: 'A young man gives a thumbs-up beside the Daraja Africa banner after a school session.',
    image: '/images/IMG-20260625-WA0022.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 9, prompt: 'Found in the Field', color: '#6AAB3A', height: 'h-48',
    desc: 'A team member stands beside the banner during an outdoor school visit.',
    image: '/images/IMG-20260625-WA0023.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 10, prompt: 'The Spiral Returns', color: '#C9972A', height: 'h-60',
    desc: 'Five young people in matching Daraja Africa t-shirts stand together with arms linked.',
    image: '/images/IMG-20260625-WA0024.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 11, prompt: 'Belonging Everywhere and Nowhere', color: '#A0522D', height: 'h-72',
    desc: 'Two young men in Daraja Africa t-shirts pose confidently in front of the mission banner.',
    image: '/images/IMG-20260625-WA0025.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 12, prompt: 'Echoes in the Corridor', color: '#6B8CAE', height: 'h-56',
    desc: 'A team member strikes a celebratory pose beside the banner listing the program values.',
    image: '/images/IMG-20260625-WA0026.jpg',
    country: 'Nairobi',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 13, prompt: 'Shared Table', color: '#8E44AD', height: 'h-64',
    desc: 'A team member poses in front of the Daraja Africa banner at an outdoor outreach event.',
    image: '/images/IMG-20260625-WA0027.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 14, prompt: 'Gardens of the Mind', color: '#4A7C3F', height: 'h-48',
    desc: 'A team member stands beside the mission-and-vision banner on a school campus.',
    image: '/images/IMG-20260625-WA0028.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 15, prompt: 'Holding Space', color: '#D2691E', height: 'h-80',
    desc: 'A smiling team member holds up a compact camera on a school lawn during an outreach day.',
    image: '/images/IMG-20260625-WA0029.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 16, prompt: 'Under the Same Sky', color: '#2D5016', height: 'h-56',
    desc: 'A team member in sunglasses stands beside the Daraja Africa banner during a school visit.',
    image: '/images/IMG-20260625-WA0030.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 17, prompt: 'Pages Unwritten', color: '#1A3A5C', height: 'h-72',
    desc: 'A team member gives an enthusiastic double thumbs-up in front of the Daraja Africa banner.',
    image: '/images/IMG-20260625-WA0031.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 18, prompt: 'Listening Circle', color: '#F4A7B9', height: 'h-44',
    desc: 'A team member smiles on the lawn of a partner school during an outreach visit.',
    image: '/images/IMG-20260625-WA0032.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 19, prompt: 'Mountain Path', color: '#6AAB3A', height: 'h-52',
    desc: 'A participant seated outdoors listens during a group session in a green, rural setting.',
    image: '/images/IMG-20260625-WA0033.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 20, prompt: 'Threads of Connection', color: '#C9972A', height: 'h-68',
    desc: 'A participant takes notes while seated on the grass during an outdoor session.',
    image: '/images/IMG-20260625-WA0034.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 21, prompt: 'Quiet Strength', color: '#A0522D', height: 'h-64',
    desc: 'A team member addresses seated students beside the Daraja Africa banner under the trees.',
    image: '/images/IMG-20260625-WA0035.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 22, prompt: 'Ripples', color: '#6B8CAE', height: 'h-48',
    desc: 'Facilitators and students chat together under the trees between outreach sessions.',
    image: '/images/IMG-20260625-WA0036.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 23, prompt: 'Home Within', color: '#8E44AD', height: 'h-56',
    desc: 'A team member speaks beside the banner during an outdoor outreach event.',
    image: '/images/IMG-20260625-WA0037.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 24, prompt: 'Tomorrow Begins Today', color: '#2D5016', height: 'h-72',
    desc: 'Facilitators engage with students during an outdoor session at a partner school.',
    image: '/images/IMG-20260625-WA0038.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 25, prompt: 'Celebration Cakes', color: '#4A7C3F', height: 'h-72',
    desc: 'Two two-tier celebration cakes with Daraja Africa toppers stand on an outdoor table.',
    image: '/images/IMG-20260824-WA0018.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 26, prompt: 'Branded Cake Toppers', color: '#A0522D', height: 'h-48',
    desc: 'A second view of the two celebration cakes topped with Daraja Africa branding.',
    image: '/images/IMG-20260824-WA0019.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 27, prompt: 'Students on the Grass', color: '#6B8CAE', height: 'h-52',
    desc: 'Eleven students in grey sweaters and red ties pose together on a school lawn.',
    image: '/images/IMG-20260824-WA0020.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 28, prompt: 'Uniformed Students', color: '#D2691E', height: 'h-80',
    desc: 'A group of uniformed students smiles together on the grass during the outreach day.',
    image: '/images/IMG-20260824-WA0021.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 29, prompt: 'Playful Posing', color: '#F4A7B9', height: 'h-56',
    desc: 'Nine students strike playful poses in front of the school building.',
    image: '/images/IMG-20260824-WA0022.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 30, prompt: 'Before the School Building', color: '#8E44AD', height: 'h-44',
    desc: 'Ten students pose cheerfully outside the school building during the visit.',
    image: '/images/IMG-20260824-WA0023.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 31, prompt: 'Science Complex Group', color: '#2D5016', height: 'h-60',
    desc: 'Twelve girls stand arm-in-arm on the lawn beside the Science Complex sign.',
    image: '/images/IMG-20260824-WA0024.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 32, prompt: 'Team Line-Up', color: '#1A3A5C', height: 'h-48',
    desc: 'About twenty team members and facilitators pose in a line wearing matching white t-shirts.',
    image: '/images/IMG-20260824-WA0025.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 33, prompt: 'Circle Session', color: '#6AAB3A', height: 'h-56',
    desc: 'Eight students sit in a circle on the grass with notebooks and pens during a session.',
    image: '/images/IMG-20260824-WA0026.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 34, prompt: 'Thumbs-Up Line', color: '#C9972A', height: 'h-44',
    desc: 'Eleven uniformed students line up giving thumbs-up and peace signs.',
    image: '/images/IMG-20260824-WA0027.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 35, prompt: 'Under the Tent', color: '#4A7C3F', height: 'h-72',
    desc: 'Guests sit beneath a tent beneath a Limuru Girls\' School banner, beside a table of gift bags.',
    image: '/images/IMG-20260824-WA0028.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 36, prompt: 'Students and Facilitator', color: '#A0522D', height: 'h-52',
    desc: 'Ten uniformed students pose in a line alongside a facilitator in a white t-shirt.',
    image: '/images/IMG-20260824-WA0029.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 37, prompt: 'Group with Gift Basket', color: '#6B8CAE', height: 'h-80',
    desc: 'About twenty young adults in white t-shirts pose in two loose rows around a woven basket.',
    image: '/images/IMG-20260824-WA0030.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 38, prompt: 'Dusk Group Photo', color: '#D2691E', height: 'h-72',
    desc: 'Eighteen adults stand in a single row for a group photo taken at dusk.',
    image: '/images/IMG-20260824-WA0031.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 39, prompt: 'Tent Selfie', color: '#F4A7B9', height: 'h-72',
    desc: 'Three smiling people take a selfie together under the tent canopy.',
    image: '/images/IMG-20260824-WA0032.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 40, prompt: 'Peace Signs', color: '#8E44AD', height: 'h-48',
    desc: 'Ten students pose playfully with peace signs during the outreach day.',
    image: '/images/IMG-20260824-WA0033.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 41, prompt: 'Chemistry Laboratory Visit', color: '#2D5016', height: 'h-80',
    desc: 'Two women pose in front of the Chemistry Laboratory building.',
    image: '/images/IMG-20260824-WA0034.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 42, prompt: 'Gift Table', color: '#1A3A5C', height: 'h-56',
    desc: 'A long table holds gift bags and wrapped parcels bearing round Daraja stacked-stones stickers.',
    image: '/images/IMG-20260824-WA0035.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 43, prompt: 'Favor Table Close-Up', color: '#6AAB3A', height: 'h-72',
    desc: 'A closer view of the favour table with wrapped gifts and branded stickers.',
    image: '/images/IMG-20260824-WA0036.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 44, prompt: 'Outside the Laboratories', color: '#C9972A', height: 'h-80',
    desc: 'Two women smile together in front of the school laboratory building.',
    image: '/images/IMG-20260824-WA0038.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 45, prompt: 'Team Close-Up', color: '#4A7C3F', height: 'h-44',
    desc: 'Three people smile together under the tent, one wearing a Daraja Africa t-shirt.',
    image: '/images/IMG-20260824-WA0039.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 46, prompt: 'Writing on the Lawn', color: '#A0522D', height: 'h-52',
    desc: 'Seven students sit on the lawn writing in their notebooks.',
    image: '/images/IMG-20260824-WA0040.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 47, prompt: 'Booklets Under the Tree', color: '#6B8CAE', height: 'h-60',
    desc: 'Seven students gather under a large tree holding pink booklets.',
    image: '/images/IMG-20260824-WA0041.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 48, prompt: 'Line of Students', color: '#D2691E', height: 'h-48',
    desc: 'Ten uniformed students line up flashing peace signs and thumbs-up.',
    image: '/images/IMG-20260824-WA0042.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 49, prompt: 'On the Lawn', color: '#F4A7B9', height: 'h-56',
    desc: 'Eight young women pose together on the school lawn.',
    image: '/images/IMG-20260824-WA0043.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 50, prompt: 'Group Selfie', color: '#8E44AD', height: 'h-80',
    desc: 'A dozen teenage girls crowd into a playful group selfie.',
    image: '/images/IMG-20260824-WA0044.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 51, prompt: 'Queue at the Stage', color: '#2D5016', height: 'h-64',
    desc: 'Students queue beside a raised stage set up under marquee tents.',
    image: '/images/IMG-20260824-WA0045.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 52, prompt: 'Folders Under the Tree', color: '#1A3A5C', height: 'h-44',
    desc: 'Seven young women stand under a tree holding pink folders.',
    image: '/images/IMG-20260824-WA0046.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 53, prompt: 'Arm in Arm', color: '#6AAB3A', height: 'h-52',
    desc: 'Six young women stand arm-in-arm holding pink envelopes and booklets.',
    image: '/images/IMG-20260824-WA0047.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 54, prompt: 'Wrapped Parcels', color: '#C9972A', height: 'h-48',
    desc: 'A gift table displays parcels wrapped in pink gingham and polka-dot paper.',
    image: '/images/IMG-20260824-WA0048.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 55, prompt: 'Greeting Under the Tent', color: '#4A7C3F', height: 'h-72',
    desc: 'Three women greet each other beneath the Limuru Girls\' School banner.',
    image: '/images/IMG-20260824-WA0049.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 56, prompt: 'Cutting the Cake', color: '#A0522D', height: 'h-80',
    desc: 'A woman cuts the celebration cake while smiling students gather around the table.',
    image: '/images/IMG-20260824-WA0050.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 57, prompt: 'Mingling Under the Tent', color: '#6B8CAE', height: 'h-72',
    desc: 'Guests mingle under the tent during the celebration event.',
    image: '/images/IMG-20260824-WA0051.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 58, prompt: 'Cake Topper Close-Up', color: '#D2691E', height: 'h-80',
    desc: 'A close-up of the two-tier cake with its Daraja Africa topper and baby\'s breath flowers.',
    image: '/images/IMG-20260824-WA0052.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 59, prompt: 'Envelope Line-Up', color: '#F4A7B9', height: 'h-52',
    desc: 'Eleven young women line up holding pink envelopes and booklets.',
    image: '/images/IMG-20260824-WA0053.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 60, prompt: 'Closing Group Photo', color: '#8E44AD', height: 'h-60',
    desc: 'Sixteen young adults, most in white logo t-shirts, pose for a group photo at dusk.',
    image: '/images/IMG-20260824-WA0057.jpg',
    country: 'Limuru',
    artist: 'Anonymous, Daraja Africa Network community'
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
        alt={item.desc}
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
            Recaps of the school visits, conversations, and mental health initiatives Daraja Africa Network has carried out across partner schools and communities.
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
