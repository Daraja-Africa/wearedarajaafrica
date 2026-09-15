import React, { useState } from 'react';

/* ─── GALLERY DATA SOURCE & ORDERING (read before editing) ──────────────
 * Items are ordered NEWEST-FIRST. Each asset's filename encodes its capture
 * date (e.g. "IMG-20260824-WA0010.jpg" → 2026-08-24) — that is the date the
 * order below is derived from. When this feed moves to Supabase
 * (gallery_items table), keep the order server-side so it is consistent
 * regardless of pagination:
 *
 *   1. Each gallery row needs a `captured_at timestamptz NOT NULL` column
 *      (equivalently `created_at`/`uploaded_at` — pick one convention and
 *      backfill it from the filename dates used below).
 *   2. Fetch with a QUERY-LEVEL order-by, not a client-side sort:
 *        supabase.from('gallery_items')
 *          .select('*')
 *          .order('captured_at', { ascending: false })
 *   3. De-duplication: enforce uniqueness on the ASSET, not the title —
 *      add a UNIQUE index on a deterministic content fingerprint, e.g.
 *        CREATE UNIQUE INDEX gallery_items_storage_key_key
 *          ON gallery_items (storage_path);
 *      plus an upload-time check hashing the file bytes (SHA-256) so the
 *      same photo uploaded twice with different titles is rejected.
 *      (Two different photos can legitimately share a title, so a title
 *      match would be the WRONG de-dupe key.)
 *   4. If a one-time cleanup of existing DB duplicates is ever needed, do
 *      it as a logged migration: SELECT the dupes INTO a backup table
 *      (e.g. gallery_items_removed_backup) before DELETE, never bare DELETE.
 *
 * NOTE (flagged per task spec): the current Supabase schema has NO
 * gallery_items table — there is no `created_at`/`uploaded_at` field to
 * order by yet. This migration must be created before any Supabase-backed
 * gallery ships; until then the static array below is the source of truth.
 * ───────────────────────────────────────────────────────────────────── */
const rawGalleryItems = [
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
    id: 22, prompt: 'Ripples', color: '#6B8CAE', height: 'h-48',
    desc: 'Facilitators and students chat together under the trees between outreach sessions.',
    image: '/images/IMG-20260625-WA0036.jpg',
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
    id: 39, prompt: 'Tent Selfie', color: '#F4A7B9', height: 'h-72',
    desc: 'Three smiling people take a selfie together under the tent canopy.',
    image: '/images/IMG-20260824-WA0032.jpg',
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
    id: 46, prompt: 'Writing on the Lawn', color: '#A0522D', height: 'h-52',
    desc: 'Seven students sit on the lawn writing in their notebooks.',
    image: '/images/IMG-20260824-WA0040.jpg',
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
  },
  {
    id: 61, prompt: 'A New Chapter', color: '#4A7C3F', height: 'h-72',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0017.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 62, prompt: 'Shared Moments', color: '#A0522D', height: 'h-48',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0018.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 63, prompt: 'Side by Side', color: '#6B8CAE', height: 'h-56',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0019.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 64, prompt: 'Bright Faces', color: '#D2691E', height: 'h-64',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0020.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 65, prompt: 'Together in Focus', color: '#F4A7B9', height: 'h-44',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0021.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 66, prompt: 'Open Arms', color: '#8E44AD', height: 'h-60',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0022.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 67, prompt: 'Carrying the Vision', color: '#2D5016', height: 'h-52',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0023.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 68, prompt: 'Waves of Joy', color: '#1A3A5C', height: 'h-80',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0024.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 69, prompt: 'Kindred Spirits', color: '#6AAB3A', height: 'h-48',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0025.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  },
  {
    id: 70, prompt: 'The Road Ahead', color: '#C9972A', height: 'h-72',
    desc: 'A recent photo from the September 2026 Daraja Africa Network community collection.',
    image: '/IMAGES_1/IMG-20260914-WA0026.jpg',
    country: 'Kenya',
    artist: 'Anonymous, Daraja Africa Network community'
  }
];

/* ─── Order + de-dupe pipeline (static-data stand-in for the SQL in the
 * migration note above) ─────────────────────────────────────────────── */

// Derive the capture/upload date from the WhatsApp filename convention
// ("IMG-20260824-WA0010.jpg" → "2026-08-24"). Non-WA filenames (logos,
// screenshots) fall back to the repo import date so they always sort last.
function captureDateFromFilename(filename) {
  const match = /(?:IMG|VID)-20(\d{2})(\d{2})(\d{2})-WA/.exec(filename);
  if (!match) return '2026-06-16'; // repo import date for non-WhatsApp assets
  return `20${match[1]}-${match[2]}-${match[3]}`;
}

// De-dupe on the ASSET, not the caption: exact filename (normalized) is the
// fingerprint here, standing in for the storage_path / byte-hash unique
// index the Supabase migration will provide. Two different photos sharing a
// title are NOT duplicates; two rows pointing at the same file are.
function dedupeByAsset(items) {
  const seen = new Map();
  return items.filter((item) => {
    const key = item.image.split('/').pop().toLowerCase();
    if (seen.has(key)) return false;
    seen.set(key, true);
    return true;
  });
}

// Newest-first: sort by capture date (desc), then WhatsApp sequence number
// (desc) within the same day. Runs once at module load.
const galleryItems = dedupeByAsset(rawGalleryItems)
  .map((item) => ({
    ...item,
    capturedAt: captureDateFromFilename(item.image),
  }))
  .sort((a, b) => {
    if (a.capturedAt !== b.capturedAt) return a.capturedAt < b.capturedAt ? 1 : -1;
    const seq = (it) => {
      const m = /-WA(\d+)/.exec(it.image);
      return m ? parseInt(m[1], 10) : 0;
    };
    return seq(b) - seq(a);
  });

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
