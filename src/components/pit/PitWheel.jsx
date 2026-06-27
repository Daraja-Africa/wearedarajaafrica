import React from "react";

const pitWheelData = [
  {
    id: "sad", label: "SAD", color: "#4A6FA5", textColor: "#fff",
    subs: ["guilty", "ashamed", "depressed", "lonely", "bored", "tired", "remorseful", "isolated", "apathetic", "distant"],
    subColor: "#6B8CAE"
  },
  {
    id: "mad", label: "MAD", color: "#9B2226", textColor: "#fff",
    subs: ["hostile", "angry", "selfish", "hateful", "critical", "frustrated", "jealous", "irritated", "skeptical"],
    subColor: "#C0392B"
  },
  {
    id: "scared", label: "SCARED", color: "#6D3B8A", textColor: "#fff",
    subs: ["confused", "rejected", "helpless", "insecure", "anxious", "bewildered", "discouraged", "insignificant", "overwhelmed"],
    subColor: "#8E44AD"
  },
  {
    id: "joyful", label: "JOYFUL", color: "#C9972A", textColor: "#fff",
    subs: ["excited", "sensuous", "energetic", "cheerful", "creative", "hopeful", "daring", "amused", "playful", "optimistic"],
    subColor: "#D4AD55"
  },
  {
    id: "powerful", label: "POWERFUL", color: "#2D6A1E", textColor: "#fff",
    subs: ["aware", "proud", "respected", "appreciated", "important", "confident", "valuable", "worthwhile", "successful"],
    subColor: "#4A7C3F"
  },
  {
    id: "peaceful", label: "PEACEFUL", color: "#7A3B1E", textColor: "#fff",
    subs: ["content", "thoughtful", "intimate", "loving", "trusting", "nurturing", "relaxed", "serene", "secure", "thankful"],
    subColor: "#A0522D"
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

export default function PitWheel({ onSelect }) {
  const [selectedCore, setSelectedCore] = React.useState(null);
  const [hoveredSub, setHoveredSub] = React.useState(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-xs md:max-w-sm"
        role="img"
        aria-label="Feelings wheel"
      >
        {pitWheelData.map((em, i) => {
          const sA = i * A_PER;
          const eA = sA + A_PER;
          const numSubs = em.subs.length;
          const subA = A_PER / numSubs;
          return em.subs.map((sub, j) => {
            const ssA = sA + j * subA;
            const seA = ssA + subA;
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
                  onClick={() => {
                    onSelect({ category: em.label, sub });
                    setHoveredSub(sub);
                  }}
                  onMouseEnter={() => setHoveredSub(sub)}
                  onMouseLeave={() => setHoveredSub(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${sub} — ${em.label}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSelect({ category: em.label, sub });
                      setHoveredSub(sub);
                    }
                  }}
                />
                <text
                  x={tp.x} y={tp.y}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="#fff" fontSize="6.5" fontFamily="monospace"
                  transform={`rotate(${mid}, ${tp.x}, ${tp.y})`}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {sub}
                </text>
              </g>
            );
          });
        })}
        {pitWheelData.map((em, i) => {
          const sA = i * A_PER + 90;
          const eA = sA + A_PER;
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
                role="button"
                tabIndex={0}
                aria-label={em.label}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedCore(em.id === selectedCore ? null : em.id);
                  }
                }}
              />
              <text
                x={tp.x} y={tp.y}
                textAnchor="middle" dominantBaseline="middle"
                fill="#fff" fontSize="8.5" fontWeight="700" fontFamily="monospace"
                transform={`rotate(${sA + A_PER / 2}, ${tp.x}, ${tp.y})`}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {em.label}
              </text>
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={R_IN - 2} fill="#1A1A1A" stroke="#C9972A" strokeWidth="1.5" />
        <text x={CX} y={CY - 6} textAnchor="middle" fill="#C9972A" fontSize="8" fontFamily="monospace">NAME</text>
        <text x={CX} y={CY + 6} textAnchor="middle" fill="#C9972A" fontSize="8" fontFamily="monospace">IT</text>
      </svg>
      {hoveredSub && (
        <p className="text-sm font-mono text-center" style={{ color: "#C9972A" }}>
          Selected: <span className="text-white">{hoveredSub}</span>
        </p>
      )}
    </div>
  );
}
