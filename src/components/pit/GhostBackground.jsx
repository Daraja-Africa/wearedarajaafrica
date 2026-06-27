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

export default function GhostBackground({ visible }) {
  if (!visible) return null;

  const ghostPositions = ghostTexts.slice(0, 10).map((t, i) => ({
    text: t,
    style: {
      top: `${5 + (i * 10)}%`,
      left: `${(i % 2 === 0 ? 2 : 30 + (i * 3))}%`,
      maxWidth: "45%",
      animationDuration: `${20 + i * 4}s`,
      animationDelay: `${i * 2}s`,
    },
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {ghostPositions.map((g, i) => (
        <GhostText key={i} text={g.text} style={g.style} />
      ))}
    </div>
  );
}

function GhostText({ text, style }) {
  return (
    <p
      className="absolute font-mono text-xs md:text-sm italic pointer-events-none select-none ghost-text"
      style={{
        color: "rgba(255,255,255,0.07)",
        ...style,
      }}
    >
      {text}
    </p>
  );
}
