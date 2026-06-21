import React, { useState } from 'react';
// useState already imported above — NewsletterSignup uses it too
import { ChevronDown, Loader2 } from 'lucide-react';

const initialAnnouncements = [
{
  id: 1,
  date: 'JUNE 2026',
  version: 'v2.3.0-stable',
  title: 'Platform Milestone: 250,000 Anonymous Entries',
  type: 'MILESTONE',
  typeColor: 'bg-brand-gold/15 text-brand-gold',
  updates: [
  'The Living Archives has surpassed 250,000 anonymous community entries',
  'Feelings Wheel mobile touch interaction redesigned for one-handed use',
  'Emergency hotline network expanded to 18 African nations',
  'New Ubuntu Healing Circles program launched in partnership with 3 NGOs']

},
{
  id: 2,
  date: 'MAY 2026',
  version: 'v2.2.1-stable',
  title: 'Crisis Infrastructure Hardening',
  type: 'SECURITY',
  typeColor: 'bg-brand-forest/10 text-brand-forest',
  updates: [
  'All Pit entry transmission pathways migrated to end-to-end encrypted channels',
  'Void entries now cryptographically irretrievable within 200ms of submission',
  'Third-party dependency audit completed — zero external trackers confirmed',
  'Crisis banner redundancy protocols updated for 99.99% uptime']

},
{
  id: 3,
  date: 'APRIL 2026',
  version: 'v2.2.0-stable',
  title: 'The Feelings Wheel: Major Expansion',
  type: 'FEATURE',
  typeColor: 'bg-brand-blush text-brand-terracotta',
  updates: [
  'Feelings Wheel expanded with 60+ culturally contextualised African sub-emotions',
  'Swahili, Yoruba, and Amharic emotion labels added as language options',
  'Wheel state now persists within session for multi-step emotional mapping',
  'New "Name It + Release" direct pipeline from Wheel to Pit implemented']

},
{
  id: 4,
  date: 'MARCH 2026',
  version: 'v2.1.2-patch',
  title: 'Performance & Accessibility Patches',
  type: 'PATCH',
  typeColor: 'bg-brand-charcoal/10 text-brand-charcoal',
  updates: [
  'Sub-Saharan mobile network performance optimisation — 40% load time reduction',
  'WCAG 2.1 AA accessibility compliance audit completed across all pages',
  'Screen reader support fully implemented on the Feelings Wheel SVG',
  'Offline mode detection with graceful degradation messaging deployed']

}];


const olderAnnouncements = [
{
  id: 5,
  date: 'FEBRUARY 2026',
  version: 'v2.1.0-stable',
  title: 'Campus Minds Initiative — 22 Universities',
  type: 'MILESTONE',
  typeColor: 'bg-brand-gold/15 text-brand-gold',
  updates: [
  'Campus Minds Initiative expanded to 22 universities across East Africa',
  'Peer counselor training materials fully digitised and self-serve',
  'University dashboard for aggregate (non-identifiable) emotional trend monitoring',
  'Monthly community reports now available to partnered institutions']

},
{
  id: 6,
  date: 'JANUARY 2026',
  version: 'v2.0.0-stable',
  title: 'Platform v2.0 Launch — The Living Archives',
  type: 'LAUNCH',
  typeColor: 'bg-brand-rust/10 text-brand-rust',
  updates: [
  'Living Archives community stream launched — real-time anonymous emotional pulse',
  'Full platform redesign with Daraja Africa logo color palette integration',
  'Gallery section launched featuring anonymous African wellness art submissions',
  'Get Involved sponsorship module deployed with full cost transparency']

}];


export default function Announcements() {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setShowMore(true);
      setLoading(false);
    }, 1200);
  };

  const displayedItems = showMore ?
  [...initialAnnouncements, ...olderAnnouncements] :
  initialAnnouncements;

  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Updates & Events</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-charcoal mt-3 mb-5">Announcements</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            Event recaps, upcoming peer circle dates, and platform updates — stay connected with our journey.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {displayedItems.map((item, i) =>
          <div
            key={item.id}
            className="bg-brand-cream-light border border-brand-gold/20 rounded-2xl p-7 hover:border-brand-gold/40 transition-colors hidden"
            style={{ animationDelay: `${i * 0.05}s` }}>
            
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs font-bold tracking-widest text-brand-gold bg-brand-gold/8 px-3 py-1 rounded-full">
                    DEPLOYED: {item.date}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.typeColor}`}>
                    {item.type}
                  </span>
                </div>
                <span className="font-mono text-xs text-brand-body/50 bg-brand-gold/5 px-2.5 py-1 rounded-full">
                  {item.version}
                </span>
              </div>

              <h2 className="font-display text-xl font-bold text-brand-charcoal mb-4">{item.title}</h2>

              <ul className="space-y-2">
                {item.updates.map((update, j) =>
              <li key={j} className="flex items-start gap-2.5 text-sm text-brand-body">
                    <span className="text-brand-gold mt-0.5 shrink-0">—</span>
                    {update}
                  </li>
              )}
              </ul>
            </div>
          )}

          {/* Load More */}
          {!showMore &&
          <div className="text-center pt-4">
              <button
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-cream-light border border-brand-gold/30 text-brand-gold font-semibold rounded-xl hover:border-brand-gold hover:bg-brand-gold/5 transition-all duration-200 disabled:opacity-60">
              
                {loading ?
              <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading updates...
                  </> :

              <>
                    <ChevronDown className="w-4 h-4" />
                    Load Earlier Updates
                  </>
              }
              </button>
            </div>
          }

          {showMore &&
          <div className="text-center pt-4">
              <p className="text-xs text-brand-body/40">You've reached the beginning of our updates.</p>
            </div>
          }
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-14 px-4 border-t border-brand-gold/15">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-2">Stay connected with our journey.</h2>
          <p className="text-brand-body text-sm mb-6">Get event recaps, upcoming peer circle dates, and Daraja Africa news — no spam, ever.</p>
          <NewsletterSignup />
        </div>
      </section>
    </div>);

}

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return done ?
  <p className="text-brand-forest font-semibold">You're subscribed. Thank you! 🌿</p> :

  <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
      <input
      type="email"
      placeholder="your@email.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none border"
      style={{ backgroundColor: '#E8DCC8', borderColor: 'rgba(184,103,26,0.3)', color: '#1C1A14', fontFamily: 'var(--font-body)' }} />
    
      <button
      onClick={() => {if (email.includes('@')) setDone(true);}}
      className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
      style={{ backgroundColor: '#F4A8B8', color: '#5A1A28' }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E08898'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F4A8B8'}>
      
        Subscribe
      </button>
    </div>;

}