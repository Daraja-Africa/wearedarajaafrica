import React from 'react';

const pulseEntries = [
  { text: "I feel like I'm running out of time, but everyone else seems perfectly fine.", feeling: "Overwhelmed", time: "2m ago" },
  { text: "Finally found the words to tell my brother what's wrong.", feeling: "Hopeful", time: "5m ago" },
  { text: "I said I'm fine eleven times today. I counted.", feeling: "Exhausted", time: "8m ago" },
  { text: "She hid under the bed for four hours then came out and put her paw on my hand.", feeling: "Grateful", time: "11m ago" },
  { text: "I got the job and the first person I wanted to tell was the friend I cut off.", feeling: "Bittersweet", time: "14m ago" },
  { text: "Nobody tells you that grief isn't a phase. It's a room you keep walking back into.", feeling: "Grieving", time: "17m ago" },
  { text: "I don't want advice. I don't want perspective. I just want someone to say yeah that really sucks.", feeling: "Unheard", time: "20m ago" },
  { text: "Everyone keeps telling me how strong I am and I want to scream.", feeling: "Isolated", time: "23m ago" },
  { text: "I overheard my coworkers planning lunch without me again.", feeling: "Lonely", time: "26m ago" },
  { text: "I finished the marathon and the first thing I thought was that my dad would never know.", feeling: "Sad", time: "30m ago" },
];

function PulseCard({ entry }) {
  return (
    <div className="shrink-0 w-72 bg-brand-cream-light border border-brand-gold/25 rounded-2xl p-5 hover:border-brand-gold/50 transition-colors">
      <p className="font-body text-sm text-brand-charcoal italic leading-relaxed mb-4">
        "{entry.text}"
      </p>
      <div className="border-t border-brand-gold/20 pt-3 flex items-center justify-between">
        <span className="text-xs font-medium text-brand-forest bg-brand-leaf/10 px-2 py-0.5 rounded-full">
          Feeling: {entry.feeling}
        </span>
        <span className="text-xs text-brand-body/50">{entry.time}</span>
      </div>
    </div>
  );
}

export default function PulseCarousel() {
  const doubled = [...pulseEntries, ...pulseEntries];
  return (
    <div className="overflow-hidden">
      <div className="flex gap-5 animate-marquee" style={{ width: 'max-content' }}>
        {doubled.map((entry, i) => (
          <PulseCard key={i} entry={entry} />
        ))}
      </div>
    </div>
  );
}