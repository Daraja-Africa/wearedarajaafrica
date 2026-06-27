import React from "react";
import { X } from "lucide-react";

export default function ConductModal({ onAccept, onClose }) {
  return (
    <div className="max-w-md w-full">
      <div
        className="border rounded-2xl p-8"
        style={{ borderColor: "rgba(201,151,42,0.3)", backgroundColor: "rgba(26,26,26,0.95)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-lg font-bold text-white">Code of Conduct</h2>
          <button
            onClick={onClose}
            style={{ color: "rgba(255,255,255,0.4)" }}
            type="button"
            aria-label="Close conduct modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3 text-sm font-mono mb-8" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8" }}>
          <p>Nobody here is responsible for your feelings.</p>
          <p>You are not responsible for anyone else&apos;s.</p>
          <p>Dump freely. Read if you want. Leave when you&apos;re done.</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>
            Explicit, hateful, or inappropriate content will not be posted to the pit. The void accepts everything &mdash; it goes nowhere and disappears.
          </p>
        </div>
        <button
          onClick={onAccept}
          className="w-full py-3 font-mono text-sm font-bold rounded-xl transition-colors"
          style={{ backgroundColor: "#C9972A", color: "#0D0D0D" }}
          type="button"
        >
          I understand. Continue &rarr;
        </button>
      </div>
    </div>
  );
}
