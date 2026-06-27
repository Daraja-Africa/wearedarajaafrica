import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function EntryForm({ entryText, onTextChange, onNameIt, onBack, destination }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
          Step Two of Three &mdash; {destination === "pit" ? "&rarr; The Pit" : "&rarr; The Void"}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-2">Dump it.</h2>
        <p className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Be as dramatic and one-sided as you want. This is your version.
        </p>
      </div>

      <textarea
        ref={textareaRef}
        value={entryText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Start typing..."
        className="w-full min-h-[280px] md:min-h-[320px] bg-transparent border-0 outline-none resize-none font-mono text-sm leading-relaxed"
        style={{ color: "rgba(255,255,255,0.85)", caretColor: "#C9972A", fontSize: "0.9rem" }}
        aria-label="Entry text"
      />

      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          onClick={onBack}
          className="font-mono text-xs flex items-center gap-1.5"
          style={{ color: "rgba(255,255,255,0.3)" }}
          type="button"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <button
          onClick={onNameIt}
          disabled={!entryText.trim()}
          className="font-mono text-xs flex items-center gap-1.5 transition-colors disabled:opacity-30"
          style={{ color: "#C9972A" }}
          type="button"
        >
          Name it <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
