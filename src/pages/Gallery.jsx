import React, { useState } from 'react';

const galleryItems = [
{
  id: 1, prompt: 'Visualizing Peace After Chaos', country: 'Kenya',
  color: '#C9972A', height: 'h-64',
  desc: 'Abstract interpretation of stillness found after a period of intense emotional turbulence.',
  artist: 'Anonymous, Nairobi'
},
{
  id: 2, prompt: 'The Weight of Silence', country: 'Nigeria',
  color: '#4A7C3F', height: 'h-48',
  desc: 'Exploring what it feels like to carry unexpressed grief in a culture that valorises strength.',
  artist: 'Anonymous, Lagos'
},
{
  id: 3, prompt: 'Roots That Hold', country: 'Ghana',
  color: '#A0522D', height: 'h-80',
  desc: 'Ubuntu philosophy rendered in texture — depicting interconnection as the source of personal resilience.',
  artist: 'Anonymous, Accra'
},
{
  id: 4, prompt: 'Before the Rain', country: 'Uganda',
  color: '#6B8CAE', height: 'h-56',
  desc: 'The quiet, anxious anticipation that precedes emotional release — like the stillness before a storm.',
  artist: 'Anonymous, Kampala'
},
{
  id: 5, prompt: 'First Light', country: 'Tanzania',
  color: '#D2691E', height: 'h-72',
  desc: 'A sunrise witnessed after a night of crisis — the radical hope of simply surviving until morning.',
  artist: 'Anonymous, Dar es Salaam'
},
{
  id: 6, prompt: 'Unfolding', country: 'South Africa',
  color: '#F4A7B9', height: 'h-44',
  desc: 'Growth rendered as a slow botanical unfolding — healing is not sudden; it is incremental and persistent.',
  artist: 'Anonymous, Cape Town'
},
{
  id: 7, prompt: 'The Bridge I Cross Alone', country: 'Ethiopia',
  color: '#8E44AD', height: 'h-64',
  desc: 'A solitary crossing — representing the individual journey through mental health challenges before community support is found.',
  artist: 'Anonymous, Addis Ababa'
},
{
  id: 8, prompt: 'Breaking the Mask', country: 'Côte d\'Ivoire',
  color: '#2D5016', height: 'h-52',
  desc: 'Confronting the cultural pressure to perform wellness — the courage required to acknowledge internal struggle.',
  artist: 'Anonymous, Abidjan'
},
{
  id: 9, prompt: 'Tides of Grief', country: 'Senegal',
  color: '#1A3A5C', height: 'h-68',
  desc: 'Grief depicted as ocean waves — rhythmic, recurring, never fully resolved, but learned to move within.',
  artist: 'Anonymous, Dakar'
},
{
  id: 10, prompt: 'Found in the Field', country: 'Rwanda',
  color: '#6AAB3A', height: 'h-48',
  desc: 'Collective healing after collective trauma — the field as metaphor for community recovery and regrowth.',
  artist: 'Anonymous, Kigali'
},
{
  id: 11, prompt: 'The Spiral Returns', country: 'Zimbabwe',
  color: '#C9972A', height: 'h-60',
  desc: 'Mental health as spiral — you return to familiar struggles but at higher levels of understanding each time.',
  artist: 'Anonymous, Harare'
},
{
  id: 12, prompt: 'Belonging Everywhere and Nowhere', country: 'Sudan',
  color: '#A0522D', height: 'h-72',
  desc: 'The complex identity experience of displacement — grief, resilience, and the search for rootedness across borders.',
  artist: 'Anonymous, Khartoum'
}];


function GalleryCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative mb-6 rounded-2xl overflow-hidden cursor-pointer group ${item.height}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      
      {/* Visual placeholder with rich gradient */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${item.color}CC 0%, ${item.color}66 50%, ${item.color}99 100%)`
        }} />
      
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.2) 0%, transparent 50%)`
        }} />
      
      {/* Country tag — always visible */}
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
    </div>);

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

      







      
    </div>);

}