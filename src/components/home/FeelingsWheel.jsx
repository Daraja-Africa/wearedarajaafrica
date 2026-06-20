import React, { useState } from 'react';

const wheelData = [
  {
    id: 'sad', label: 'SAD', color: '#6B8CAE', textColor: '#fff',
    subs: ['guilty', 'ashamed', 'depressed', 'lonely', 'bored', 'tired', 'remorseful', 'isolated', 'apathetic', 'distant'],
    subColor: '#8FAEC8'
  },
  {
    id: 'mad', label: 'MAD', color: '#C0392B', textColor: '#fff',
    subs: ['hostile', 'angry', 'selfish', 'hateful', 'critical', 'frustrated', 'jealous', 'irritated', 'skeptical'],
    subColor: '#E05A4E'
  },
  {
    id: 'scared', label: 'SCARED', color: '#8E44AD', textColor: '#fff',
    subs: ['confused', 'rejected', 'helpless', 'insecure', 'anxious', 'bewildered', 'discouraged', 'insignificant', 'overwhelmed'],
    subColor: '#A86CC1'
  },
  {
    id: 'joyful', label: 'JOYFUL', color: '#C9972A', textColor: '#fff',
    subs: ['excited', 'sensuous', 'energetic', 'cheerful', 'creative', 'hopeful', 'daring', 'amused', 'playful', 'optimistic'],
    subColor: '#D4AD55'
  },
  {
    id: 'powerful', label: 'POWERFUL', color: '#4A7C3F', textColor: '#fff',
    subs: ['aware', 'proud', 'respected', 'appreciated', 'important', 'confident', 'valuable', 'worthwhile', 'successful'],
    subColor: '#6AAB3A'
  },
  {
    id: 'peaceful', label: 'PEACEFUL', color: '#A0522D', textColor: '#fff',
    subs: ['content', 'thoughtful', 'intimate', 'loving', 'trusting', 'nurturing', 'relaxed', 'serene', 'secure', 'thankful'],
    subColor: '#C4784E'
  },
];

const NUM_SEGMENTS = wheelData.length;
const ANGLE_PER = 360 / NUM_SEGMENTS;
const CX = 200, CY = 200, R_INNER = 55, R_MID = 110, R_OUTER = 185;

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r1, r2, startAngle, endAngle) {
  const s1 = polarToCartesian(cx, cy, r1, startAngle);
  const e1 = polarToCartesian(cx, cy, r1, endAngle);
  const s2 = polarToCartesian(cx, cy, r2, startAngle);
  const e2 = polarToCartesian(cx, cy, r2, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${s1.x} ${s1.y} A ${r1} ${r1} 0 ${large} 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${r2} ${r2} 0 ${large} 0 ${s2.x} ${s2.y} Z`;
}

export default function FeelingsWheel({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const [hoveredSub, setHoveredSub] = useState(null);

  const handleCoreClick = (emotion) => {
    setSelected(emotion.id === selected?.id ? null : emotion);
  };

  const handleSubClick = (emotion, sub) => {
    if (onSelect) onSelect({ category: emotion.label, sub });
    setHoveredSub(sub);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 400 400" className="w-full max-w-sm md:max-w-md" aria-label="Feelings Wheel">
        {/* Outer sub-emotion ring */}
        {wheelData.map((emotion, i) => {
          const startAngle = i * ANGLE_PER - 90;
          const endAngle = startAngle + ANGLE_PER;
          const numSubs = emotion.subs.length;
          const subAngle = ANGLE_PER / numSubs;
          return emotion.subs.map((sub, j) => {
            const sA = startAngle + j * subAngle;
            const eA = sA + subAngle;
            const mid = (sA + eA) / 2 + 90;
            const tp = polarToCartesian(CX, CY, (R_MID + R_OUTER) / 2, sA + subAngle / 2 + 90);
            const isHovered = hoveredSub === sub;
            return (
              <g key={`${emotion.id}-${sub}`}>
                <path
                  d={describeArc(CX, CY, R_MID, R_OUTER, sA + 90, eA + 90)}
                  fill={isHovered ? emotion.color : emotion.subColor}
                  stroke="#F5EDD8"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-opacity duration-200 hover:opacity-90"
                  onClick={() => handleSubClick(emotion, sub)}
                  onMouseEnter={() => setHoveredSub(sub)}
                  onMouseLeave={() => setHoveredSub(null)}
                />
                <text
                  x={tp.x}
                  y={tp.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize="7"
                  fontFamily="Inter, sans-serif"
                  transform={`rotate(${mid}, ${tp.x}, ${tp.y})`}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {sub}
                </text>
              </g>
            );
          });
        })}

        {/* Inner core segments */}
        {wheelData.map((emotion, i) => {
          const startAngle = i * ANGLE_PER + 90;
          const endAngle = startAngle + ANGLE_PER;
          const midAngle = startAngle + ANGLE_PER / 2;
          const tp = polarToCartesian(CX, CY, (R_INNER + R_MID) / 2, midAngle);
          const isSelected = selected?.id === emotion.id;
          return (
            <g key={emotion.id}>
              <path
                d={describeArc(CX, CY, R_INNER, R_MID, startAngle, endAngle)}
                fill={emotion.color}
                stroke="#F5EDD8"
                strokeWidth="2"
                opacity={isSelected ? 1 : 0.88}
                className="cursor-pointer transition-opacity duration-200 hover:opacity-100"
                onClick={() => handleCoreClick(emotion)}
              />
              <text
                x={tp.x}
                y={tp.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize="9"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
                transform={`rotate(${midAngle}, ${tp.x}, ${tp.y})`}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {emotion.label}
              </text>
            </g>
          );
        })}

        {/* Center */}
        <circle cx={CX} cy={CY} r={R_INNER - 2} fill="#F5EFE4" stroke="#B8671A" strokeWidth="2" />
        <text x={CX} y={CY - 7} textAnchor="middle" fill="#1C1C1C" fontSize="9" fontWeight="700" fontFamily="Playfair Display, serif">
          How do
        </text>
        <text x={CX} y={CY + 5} textAnchor="middle" fill="#1C1C1C" fontSize="9" fontWeight="700" fontFamily="Playfair Display, serif">
          you feel?
        </text>
      </svg>

      {/* Selection indicator */}
      {(selected || hoveredSub) && (
        <div className="text-center">
          {hoveredSub ? (
            <p className="font-body text-sm text-brand-body">
              Feeling: <span className="font-semibold text-brand-gold">{hoveredSub}</span>
              {selected && <span className="text-brand-body/60"> ({selected.label})</span>}
            </p>
          ) : selected ? (
            <p className="font-body text-sm text-brand-body">
              Exploring: <span className="font-semibold" style={{ color: selected.color }}>{selected.label}</span>
              <span className="text-brand-body/60 ml-2">— hover the outer ring</span>
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}