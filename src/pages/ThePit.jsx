import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// ─── GHOST TEXT background ───────────────────────────────────────────────────
const ghostTexts = [
  "I feel like I'm running out of time, but everyone else seems perfectly fine.",
  "Finally found the words to tell my brother what's wrong.",
  "I said I'm fine eleven times today. I counted.",
  "Nobody tells you that grief isn't a phase. It's a room you keep walking back into.",
  "I don't want advice. I don't want perspective. I just want someone to say yeah that really sucks.",
  "My therapist cancelled on me for the third time this month.",
  "I gave everything to that project and they just handed the credit to someone else.",
  "I'm so tired of being the one who reaches out first.",
  "Everyone keeps telling me how strong I am and I want to scream.",
  "She hid under the bed for four hours then came out and put her paw on my hand.",
  "I got the job and the first person I wanted to tell was the friend I cut off.",
  "My mom called and I let it go to voicemail. Then I listened to it three times.",
  "I overheard my coworkers planning lunch without me again.",
  "I finished the marathon and the first thing I thought was that my dad would never know.",
  "I don't want to disappear. I just want to rest. Completely.",
];

function GhostText({ text, style }) {
  return (
    <p
      className="absolute font-mono text-xs md:text-sm italic pointer-events-none select-none ghost-text"
      style={{
        color: 'rgba(255,255,255,0.07)',
        ...style,
      }}
    >
      {text}
    </p>
  );
}

// ─── FEELINGS WHEEL (Pit version — dark themed) ────────────────────────────
const pitWheelData = [
  {
    id: 'sad', label: 'SAD', color: '#4A6FA5', textColor: '#fff',
    subs: ['guilty', 'ashamed', 'depressed', 'lonely', 'bored', 'tired', 'remorseful', 'isolated', 'apathetic', 'distant'],
    subColor: '#6B8CAE'
  },
  {
    id: 'mad', label: 'MAD', color: '#9B2226', textColor: '#fff',
    subs: ['hostile', 'angry', 'selfish', 'hateful', 'critical', 'frustrated', 'jealous', 'irritated', 'skeptical'],
    subColor: '#C0392B'
  },
  {
    id: 'scared', label: 'SCARED', color: '#6D3B8A', textColor: '#fff',
    subs: ['confused', 'rejected', 'helpless', 'insecure', 'anxious', 'bewildered', 'discouraged', 'insignificant', 'overwhelmed'],
    subColor: '#8E44AD'
  },
  {
    id: 'joyful', label: 'JOYFUL', color: '#C9972A', textColor: '#fff',
    subs: ['excited', 'sensuous', 'energetic', 'cheerful', 'creative', 'hopeful', 'daring', 'amused', 'playful', 'optimistic'],
    subColor: '#D4AD55'
  },
  {
    id: 'powerful', label: 'POWERFUL', color: '#2D6A1E', textColor: '#fff',
    subs: ['aware', 'proud', 'respected', 'appreciated', 'important', 'confident', 'valuable', 'worthwhile', 'successful'],
    subColor: '#4A7C3F'
  },
  {
    id: 'peaceful', label: 'PEACEFUL', color: '#7A3B1E', textColor: '#fff',
    subs: ['content', 'thoughtful', 'intimate', 'loving', 'trusting', 'nurturing', 'relaxed', 'serene', 'secure', 'thankful'],
    subColor: '#A0522D'
  },
];

const NUM_SEG = pitWheelData.length;
const A_PER = 360 / NUM_SEG;
const CX = 200, CY = 200, R_IN = 55, R_MID = 110, R_OUT = 185;

function polar(cx, cy, r, deg) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx, cy, r1, r2, sA, eA) {
  const s1 = polar(cx, cy, r1, sA), e1 = polar(cx, cy, r1, eA);
  const s2 = polar(cx, cy, r2, sA), e2 = polar(cx, cy, r2, eA);
  const lg = eA - sA > 180 ? 1 : 0;
  return `M ${s1.x} ${s1.y} A ${r1} ${r1} 0 ${lg} 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${r2} ${r2} 0 ${lg} 0 ${s2.x} ${s2.y} Z`;
}

function PitWheel({ onSelect }) {
  const [selectedCore, setSelectedCore] = useState(null);
  const [hoveredSub, setHoveredSub] = useState(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 400 400" className="w-full max-w-xs md:max-w-sm">
        {pitWheelData.map((em, i) => {
          const sA = i * A_PER; const eA = sA + A_PER;
          const numSubs = em.subs.length;
          const subA = A_PER / numSubs;
          return em.subs.map((sub, j) => {
            const ssA = sA + j * subA; const seA = ssA + subA;
            const tp = polar(CX, CY, (R_MID + R_OUT) / 2, ssA + subA / 2 + 90);
            const mid = ssA + subA / 2 + 90;
            const isH = hoveredSub === sub;
            return (
              <g key={`${em.id}-${sub}`}>
                <path
                  d={arc(CX, CY, R_MID, R_OUT, ssA + 90, seA + 90)}
                  fill={isH ? em.color : em.subColor}
                  stroke="#0D0D0D"
                  strokeWidth="1.5"
                  className="cursor-pointer"
                  onClick={() => { onSelect({ category: em.label, sub }); setHoveredSub(sub); }}
                  onMouseEnter={() => setHoveredSub(sub)}
                  onMouseLeave={() => setHoveredSub(null)}
                />
                <text
                  x={tp.x} y={tp.y}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="#fff" fontSize="6.5" fontFamily="monospace"
                  transform={`rotate(${mid}, ${tp.x}, ${tp.y})`}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >{sub}</text>
              </g>
            );
          });
        })}
        {pitWheelData.map((em, i) => {
          const sA = i * A_PER + 90; const eA = sA + A_PER;
          const tp = polar(CX, CY, (R_IN + R_MID) / 2, sA + A_PER / 2);
          return (
            <g key={em.id}>
              <path
                d={arc(CX, CY, R_IN, R_MID, sA, eA)}
                fill={em.color}
                stroke="#0D0D0D"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-90"
                onClick={() => setSelectedCore(em.id === selectedCore ? null : em.id)}
              />
              <text
                x={tp.x} y={tp.y}
                textAnchor="middle" dominantBaseline="middle"
                fill="#fff" fontSize="8.5" fontWeight="700" fontFamily="monospace"
                transform={`rotate(${sA + A_PER / 2}, ${tp.x}, ${tp.y})`}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >{em.label}</text>
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={R_IN - 2} fill="#1A1A1A" stroke="#C9972A" strokeWidth="1.5" />
        <text x={CX} y={CY - 6} textAnchor="middle" fill="#C9972A" fontSize="8" fontFamily="monospace">NAME</text>
        <text x={CX} y={CY + 6} textAnchor="middle" fill="#C9972A" fontSize="8" fontFamily="monospace">IT</text>
      </svg>
      {hoveredSub && (
        <p className="text-sm font-mono text-center" style={{ color: '#C9972A' }}>
          Selected: <span className="text-white">{hoveredSub}</span>
        </p>
      )}
    </div>
  );
}

// ─── KEYWORD FILTER ─────────────────────────────────────────────────────────
const BAD_WORDS = ['kill', 'murder', 'hate', 'die', 'suicide', 'slur'];
function isInappropriate(text) {
  return BAD_WORDS.some(w => text.toLowerCase().includes(w));
}

// ─── WITNESS MODE entries ────────────────────────────────────────────────────
const mockWitnessEntries = ghostTexts.map((t, i) => ({
  id: i, text: t,
  emotion_category: ['SAD', 'MAD', 'SCARED', 'JOYFUL', 'POWERFUL', 'PEACEFUL'][i % 6],
  sub_emotion: ['lonely', 'frustrated', 'anxious', 'hopeful', 'confident', 'content'][i % 6],
}));

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function ThePit() {
  const [mode, setMode] = useState('select'); // select | write | name | released | void | witness | conduct
  const [destination, setDestination] = useState(null); // 'pit' | 'void'
  const [entryText, setEntryText] = useState('');
  const [emotion, setEmotion] = useState(null);
  const [conductAccepted, setConductAccepted] = useState(false);
  const [inappropriateDetected, setInappropriateDetected] = useState(false);
  const [witnessEntries, setWitnessEntries] = useState(mockWitnessEntries);
  const [status, setStatus] = useState('WAITING FOR RESOLVE_');
  const textareaRef = useRef(null);

  // Show conduct on first visit
  useEffect(() => {
    const accepted = sessionStorage.getItem('pit_conduct_accepted');
    if (!accepted) setConductAccepted(false);
    else setConductAccepted(true);
  }, []);

  // Load real pit entries for witness mode
  useEffect(() => {
    if (mode === 'witness') {
      base44.entities.PitEntry.filter({ destination: 'pit' }, '-created_date', 30)
        .then(entries => {
          if (entries && entries.length > 0) {
            setWitnessEntries(entries);
          }
        })
        .catch(() => {});
    }
  }, [mode]);

  const handleDestinationSelect = (dest) => {
    setDestination(dest);
    if (!conductAccepted) {
      setMode('conduct');
    } else {
      setMode('write');
      setStatus('COMPOSING_');
    }
  };

  const handleConductAccept = () => {
    sessionStorage.setItem('pit_conduct_accepted', '1');
    setConductAccepted(true);
    setMode('write');
    setStatus('COMPOSING_');
  };

  const handleNameIt = () => {
    if (!entryText.trim()) return;
    if (isInappropriate(entryText)) {
      setInappropriateDetected(true);
      setDestination('void');
    }
    setMode('name');
    setStatus('NAMING_');
    if (textareaRef.current) textareaRef.current.blur();
  };

  const handleRelease = async () => {
    setStatus('RESOLVING_');
    if (destination === 'pit' && !inappropriateDetected) {
      try {
        await base44.entities.PitEntry.create({
          text: entryText,
          emotion_category: emotion?.category || '',
          sub_emotion: emotion?.sub || '',
          destination: 'pit',
        });
      } catch (e) {}
    }
    setMode(destination === 'void' || inappropriateDetected ? 'void' : 'released');
    setStatus('RESOLVED_');
  };

  const handleReset = () => {
    setMode('select');
    setDestination(null);
    setEntryText('');
    setEmotion(null);
    setInappropriateDetected(false);
    setStatus('WAITING FOR RESOLVE_');
  };

  // Ghost text positions
  const ghostPositions = ghostTexts.slice(0, 10).map((t, i) => ({
    text: t,
    style: {
      top: `${5 + (i * 10)}%`,
      left: `${(i % 2 === 0 ? 2 : 30 + (i * 3))}%`,
      maxWidth: '45%',
      animationDuration: `${20 + i * 4}s`,
      animationDelay: `${i * 2}s`,
    }
  }));

  return (
    <div className="pit-page relative overflow-hidden" style={{ minHeight: '100vh', backgroundColor: '#0D0D0D' }}>
      {/* Ghost Text Background */}
      {mode === 'select' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {ghostPositions.map((g, i) => (
            <GhostText key={i} text={g.text} style={g.style} />
          ))}
        </div>
      )}

      {/* Pit Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(201,151,42,0.2)' }}>
        <Link to="/" className="font-mono text-sm font-bold flex items-center gap-2" style={{ color: '#C9972A' }}>
          <ArrowLeft className="w-4 h-4" />
          <img
            src="https://media.base44.com/images/public/user_6a2ac434681f299904d3a76b/37ec6e1b6_IMG-20260609-WA0015.jpg"
            alt="Daraja Africa"
            className="h-7 w-auto object-contain opacity-80"
          />
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={handleReset}
            className={`font-mono text-xs transition-colors ${mode !== 'witness' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Enter
          </button>
          <button
            onClick={() => setMode('witness')}
            className={`font-mono text-xs transition-colors ${mode === 'witness' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Read
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4">

        {/* ── CODE OF CONDUCT ── */}
        {mode === 'conduct' && (
          <div className="max-w-md w-full">
            <div className="border rounded-2xl p-8" style={{ borderColor: 'rgba(201,151,42,0.3)', backgroundColor: 'rgba(26,26,26,0.95)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-mono text-lg font-bold text-white">Code of Conduct</h2>
                <button onClick={handleConductAccept} style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 text-sm font-mono mb-8" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8' }}>
                <p>Nobody here is responsible for your feelings.</p>
                <p>You are not responsible for anyone else's.</p>
                <p>Dump freely. Read if you want. Leave when you're done.</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>
                  Explicit, hateful, or inappropriate content will not be posted to the pit. The void accepts everything — it goes nowhere and disappears.
                </p>
              </div>
              <button
                onClick={handleConductAccept}
                className="w-full py-3 font-mono text-sm font-bold rounded-xl transition-colors"
                style={{ backgroundColor: '#C9972A', color: '#0D0D0D' }}
              >
                I understand. Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── DESTINATION SELECT ── */}
        {mode === 'select' && (
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-px" style={{ borderColor: 'rgba(201,151,42,0.2)' }}>
              {/* The Pit */}
              <div className="flex flex-col items-center justify-center text-center p-12 md:p-16 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className="font-mono text-xs tracking-widest mb-4" style={{ color: 'rgba(201,151,42,0.6)' }}>DESTINATION ONE</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#C9972A' }}>The Pit</h2>
                <p className="font-mono text-sm leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '280px' }}>
                  Your words go anonymous,{' '}
                  <span className="font-bold text-white">others can read them</span>,{' '}
                  you will be witnessed.
                </p>
                <button
                  onClick={() => handleDestinationSelect('pit')}
                  className="font-mono text-sm font-bold px-8 py-3 rounded-xl border transition-all duration-200 hover:scale-105"
                  style={{ borderColor: '#C9972A', color: '#C9972A' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C9972A'; e.currentTarget.style.color = '#0D0D0D'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C9972A'; }}
                >
                  Descend
                </button>
              </div>

              {/* The Void */}
              <div className="flex flex-col items-center justify-center text-center p-12 md:p-16">
                <span className="font-mono text-xs tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>DESTINATION TWO</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: 'rgba(255,255,255,0.8)' }}>The Void</h2>
                <p className="font-mono text-sm leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '280px' }}>
                  Your words go{' '}
                  <span className="italic font-bold" style={{ color: 'rgba(255,255,255,0.65)' }}>literally nowhere</span>.{' '}
                  Pure catharsis with zero audience.
                </p>
                <button
                  onClick={() => handleDestinationSelect('void')}
                  className="font-mono text-sm font-bold px-8 py-3 rounded-xl border transition-all duration-200 hover:scale-105"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  Dissolve
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: DUMP IT ── */}
        {mode === 'write' && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Step Two of Three — {destination === 'pit' ? '→ The Pit' : '→ The Void'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-2">Dump it.</h2>
              <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Be as dramatic and one-sided as you want. This is your version.
              </p>
            </div>

            <textarea
              ref={textareaRef}
              autoFocus
              value={entryText}
              onChange={e => setEntryText(e.target.value)}
              placeholder="Start typing..."
              className="w-full min-h-[280px] md:min-h-[320px] bg-transparent border-0 outline-none resize-none font-mono text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.85)', caretColor: '#C9972A', fontSize: '0.9rem', placeholder: { color: 'rgba(255,255,255,0.2)' } }}
            />

            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <button
                onClick={handleReset}
                className="font-mono text-xs flex items-center gap-1.5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
              <button
                onClick={handleNameIt}
                disabled={!entryText.trim()}
                className="font-mono text-xs flex items-center gap-1.5 transition-colors disabled:opacity-30"
                style={{ color: '#C9972A' }}
              >
                Name it <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: NAME IT ── */}
        {mode === 'name' && (
          <div className="w-full max-w-lg">
            <div className="text-center mb-6">
              <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>Step Three of Three</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2 mb-1">Name it.</h2>
              <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Hover or tap the wheel. No need to be precise.
              </p>
            </div>

            {inappropriateDetected && (
              <div className="mb-5 p-4 rounded-xl text-center font-mono text-xs" style={{ backgroundColor: 'rgba(155,34,38,0.2)', border: '1px solid rgba(155,34,38,0.4)', color: 'rgba(255,255,255,0.7)' }}>
                This can't go in the pit. Your feelings are valid, but this content isn't safe for others to read.{' '}
                <span style={{ color: '#C9972A' }}>Sending it to the void instead →</span>
              </div>
            )}

            <PitWheel onSelect={setEmotion} />

            <div className="flex justify-center mt-6">
              <button
                onClick={handleRelease}
                className="font-mono text-sm font-bold px-10 py-3.5 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: destination === 'void' || inappropriateDetected ? 'rgba(255,255,255,0.1)' : '#C9972A',
                  color: destination === 'void' || inappropriateDetected ? 'rgba(255,255,255,0.7)' : '#0D0D0D',
                  border: destination === 'void' || inappropriateDetected ? '1px solid rgba(255,255,255,0.2)' : 'none',
                }}
              >
                {destination === 'void' || inappropriateDetected ? 'Dissolve into the Void' : 'Release into the Pit'}
              </button>
            </div>

            <div className="text-center mt-4">
              <button onClick={() => setMode('write')} className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <ArrowLeft className="w-3 h-3 inline mr-1" /> Back
              </button>
            </div>
          </div>
        )}

        {/* ── RELEASED ── */}
        {mode === 'released' && (
          <div className="max-w-md w-full text-center">
            <div className="mb-10">
              <h2 className="font-display text-5xl font-bold text-white mb-4">Released.</h2>
              <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Your words have been witnessed.
              </p>
              {emotion && (
                <p className="font-mono text-xs mt-3" style={{ color: '#C9972A' }}>
                  You named it: <span className="text-white">{emotion.sub}</span>
                </p>
              )}
            </div>
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="block w-full font-mono text-sm py-3 rounded-xl border transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                Is there more underneath?
              </button>
              <Link
                to="/"
                className="block w-full font-mono text-sm py-3 rounded-xl text-center"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                I'm done
              </Link>
            </div>
          </div>
        )}

        {/* ── VOID DISSOLVED ── */}
        {mode === 'void' && (
          <div className="max-w-md w-full text-center">
            <div className="mb-10">
              <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
              </div>
              <h2 className="font-display text-5xl font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Dissolved.</h2>
              <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Gone. Completely. Into nothing.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="block w-full font-mono text-sm py-3 rounded-xl border"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
              >
                There's more.
              </button>
              <Link to="/" className="block w-full font-mono text-sm py-3 rounded-xl text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                I'm done
              </Link>
            </div>
          </div>
        )}

        {/* ── WITNESS MODE ── */}
        {mode === 'witness' && (
          <div className="w-full max-w-2xl py-12">
            <div className="text-center mb-10">
              <h2 className="font-display text-4xl font-bold text-white mb-2">Witness.</h2>
              <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                No comments. No reactions. Just read.
              </p>
            </div>
            <div className="space-y-6">
              {witnessEntries.map((entry, i) => (
                <div
                  key={entry.id || i}
                  className="py-6 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <p className="font-mono text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    "{entry.text}"
                  </p>
                  {(entry.emotion_category || entry.sub_emotion) && (
                    <p className="font-mono text-xs mt-3" style={{ color: 'rgba(201,151,42,0.5)' }}>
                      {entry.emotion_category && `${entry.emotion_category}`}
                      {entry.sub_emotion && ` — ${entry.sub_emotion}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-2.5 font-mono text-xs"
        style={{ backgroundColor: 'rgba(13,13,13,0.95)', borderTop: '1px solid rgba(201,151,42,0.15)', color: 'rgba(255,255,255,0.3)' }}
      >
        <span>STATION: {destination ? destination.toUpperCase() : 'SELECTION'}</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.includes('RESOLVED') ? '#C9972A' : 'rgba(255,255,255,0.3)' }} />
          {status}
        </span>
      </div>
    </div>
  );
}