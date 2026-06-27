export default function WitnessWall({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          No entries yet. Be the first to witness.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl py-12">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl font-bold text-white mb-2">Witness.</h2>
        <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          No comments. No reactions. Just read.
        </p>
      </div>
      <div className="space-y-6">
        {entries.map((entry, i) => (
          <div
            key={entry.id || i}
            className="py-6 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p className="font-mono text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              &ldquo;{entry.text}&rdquo;
            </p>
            {(entry.emotion_category || entry.sub_emotion) && (
              <p className="font-mono text-xs mt-3" style={{ color: "rgba(201,151,42,0.5)" }}>
                {entry.emotion_category && `${entry.emotion_category}`}
                {entry.sub_emotion && ` &mdash; ${entry.sub_emotion}`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
