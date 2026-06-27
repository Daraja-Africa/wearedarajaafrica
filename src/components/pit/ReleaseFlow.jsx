import PitWheel from "./PitWheel";

export default function ReleaseFlow({
  emotion,
  setEmotion,
  inappropriateDetected,
  handleRelease,
  handleBack,
  destination,
  submitting,
}) {
  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-6">
        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
          Step Three of Three
        </span>
        <h2 className="font-display text-3xl font-bold text-white mt-2 mb-1">Name it.</h2>
        <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          Hover or tap the wheel. No need to be precise.
        </p>
      </div>

      {inappropriateDetected && (
        <div className="mb-5 p-4 rounded-xl text-center font-mono text-xs" style={{ backgroundColor: "rgba(155,34,38,0.2)", border: "1px solid rgba(155,34,38,0.4)", color: "rgba(255,255,255,0.7)" }}>
          This can&apos;t go in the pit. Your feelings are valid, but this content isn&apos;t safe for others to read.{" "}
          <span style={{ color: "#C9972A" }}>Sending it to the void instead &rarr;</span>
        </div>
      )}

      <PitWheel onSelect={setEmotion} />

      <div className="flex justify-center mt-6">
        <button
          onClick={handleRelease}
          disabled={submitting}
          className="font-mono text-sm font-bold px-10 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            backgroundColor: destination === "void" || inappropriateDetected ? "rgba(255,255,255,0.1)" : "#C9972A",
            color: destination === "void" || inappropriateDetected ? "rgba(255,255,255,0.7)" : "#0D0D0D",
            border: destination === "void" || inappropriateDetected ? "1px solid rgba(255,255,255,0.2)" : "none",
          }}
        >
          {destination === "void" || inappropriateDetected ? "Dissolve into the Void" : "Release into the Pit"}
        </button>
      </div>

      <div className="text-center mt-4">
        <button onClick={handleBack} className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }} type="button">
          &larr; Back
        </button>
      </div>
    </div>
  );
}
