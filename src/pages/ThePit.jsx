import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import GhostBackground from "@/components/pit/GhostBackground";
import WitnessWall from "@/components/pit/WitnessWall";
import EntryForm from "@/components/pit/EntryForm";
import ReleaseFlow from "@/components/pit/ReleaseFlow";
import ConductModal from "@/components/pit/ConductModal";
import { submitPitEntry, fetchWitnessFeed } from "@/api/moderation";
import { useRateLimit, useSubmissionCooldown } from "@/hooks/useModeration";

// ─── KEYWORD FILTER ─────────────────────────────────────────────────────────
const BAD_WORDS = ["kill", "murder", "hate", "die", "suicide", "slur"];
function isInappropriate(text) {
  return BAD_WORDS.some(w => text.toLowerCase().includes(w));
}

export default function ThePit() {
  const [mode, setMode] = useState("select");
  const [destination, setDestination] = useState(null);
  const [entryText, setEntryText] = useState("");
  const [emotion, setEmotion] = useState(null);
  const [conductAccepted, setConductAccepted] = useState(false);
  const [inappropriateDetected, setInappropriateDetected] = useState(false);
  const [witnessEntries, setWitnessEntries] = useState([]);
  const [status, setStatus] = useState("WAITING FOR RESOLVE_");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState("");
  const textareaRef = useRef(null);
  const rateLimiter = useRateLimit("pit", 10, 5 * 60 * 1000);
  const { canSubmit } = useSubmissionCooldown("pit", 3000);

  useEffect(() => {
    const accepted = sessionStorage.getItem("pit_conduct_accepted");
    if (!accepted) setConductAccepted(false);
    else setConductAccepted(true);
  }, []);

  useEffect(() => {
    if (mode !== "witness") return;
    let cancelled = false;

    async function load() {
      setFeedLoading(true);
      setFeedError("");
      try {
        const data = await fetchWitnessFeed();
        if (!cancelled) setWitnessEntries(data || []);
      } catch (e) {
        if (!cancelled) setFeedError("Failed to load entries. Please try again.");
      } finally {
        if (!cancelled) setFeedLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [mode]);

  const handleDestinationSelect = (dest) => {
    setDestination(dest);
    if (!conductAccepted) {
      setMode("conduct");
    } else {
      setMode("write");
      setStatus("COMPOSING_");
    }
  };

  const handleConductAccept = () => {
    sessionStorage.setItem("pit_conduct_accepted", "1");
    setConductAccepted(true);
    setMode("write");
    setStatus("COMPOSING_");
  };

  const handleConductClose = () => {
    setMode("select");
  };

  const handleNameIt = () => {
    if (!entryText.trim()) return;
    if (isInappropriate(entryText)) {
      setInappropriateDetected(true);
      setDestination("void");
    }
    setMode("name");
    setStatus("NAMING_");
  };

  const handleRelease = async () => {
    if (!canSubmit()) {
      setSubmitError("Please wait a moment before submitting again.");
      return;
    }

    const rateCheck = rateLimiter.enforce();
    if (!rateCheck.allowed) {
      setSubmitError("Too many submissions. Please take a few minutes to breathe and try again.");
      return;
    }

    setStatus("RESOLVING_");
    setSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitPitEntry({
        text: entryText,
        emotion_category: emotion?.category || "",
        sub_emotion: emotion?.sub || "",
        destination: destination === "void" || inappropriateDetected ? "void" : "pit",
      });

      if (result.routedToVoid || result.routed_to_void) {
        setMode("void");
      } else if (destination !== "void" && !inappropriateDetected && result.data) {
        setWitnessEntries((prev) => [...(result.data || []), ...prev]);
        setMode("released");
      } else {
        setMode("void");
      }
      setStatus("RESOLVED_");
    } catch (e) {
      console.error("Release error:", e);
      if (e.routedToVoid) {
        setMode("void");
        setStatus("RESOLVED_");
      } else {
        setSubmitError(e.message || "Something went wrong. Please try again.");
        setStatus("COMPOSING_");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setMode("select");
    setDestination(null);
    setEntryText("");
    setEmotion(null);
    setInappropriateDetected(false);
    setSubmitError("");
    setStatus("WAITING FOR RESOLVE_");
  };

  return (
    <div className="pit-page relative overflow-hidden" style={{ minHeight: "100vh", backgroundColor: "#0D0D0D" }}>
      <GhostBackground visible={mode === "select"} />

      {/* Pit Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(201,151,42,0.2)" }}>
        <Link to="/" className="font-mono text-sm font-bold flex items-center gap-2" style={{ color: "#C9972A" }}>
          <ArrowLeft className="w-4 h-4" />
          <img
            src="/images/daraja-logo-transparent.png"
            alt="Daraja Africa"
            className="h-7 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={handleReset}
            className={`font-mono text-xs transition-colors ${mode !== "witness" ? "text-white" : "text-white/40 hover:text-white/70"}`}
            type="button"
          >
            Enter
          </button>
          <button
            onClick={() => setMode("witness")}
            className={`font-mono text-xs transition-colors ${mode === "witness" ? "text-white" : "text-white/40 hover:text-white/70"}`}
            type="button"
          >
            Read
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-60px)] px-4">
        {mode === "conduct" && (
          <ConductModal onAccept={handleConductAccept} onClose={handleConductClose} />
        )}

        {mode === "select" && (
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-px" style={{ borderColor: "rgba(201,151,42,0.2)" }}>
              <div className="flex flex-col items-center justify-center text-center p-12 md:p-16 border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="font-mono text-xs tracking-widest mb-4" style={{ color: "rgba(201,151,42,0.6)" }}>DESTINATION ONE</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "#C9972A" }}>The Pit</h2>
                <p className="font-mono text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "280px" }}>
                  Your words go anonymous,{" "}
                  <span className="font-bold text-white">others can read them</span>,{" "}
                  you will be witnessed.
                </p>
                <button
                  onClick={() => handleDestinationSelect("pit")}
                  className="font-mono text-sm font-bold px-8 py-3 rounded-xl border transition-all duration-200 hover:scale-105"
                  style={{ borderColor: "#C9972A", color: "#C9972A" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C9972A"; e.currentTarget.style.color = "#0D0D0D"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C9972A"; }}
                  type="button"
                >
                  Descend
                </button>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-12 md:p-16">
                <span className="font-mono text-xs tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>DESTINATION TWO</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "rgba(255,255,255,0.8)" }}>The Void</h2>
                <p className="font-mono text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "280px" }}>
                  Your words go{" "}
                  <span className="italic font-bold" style={{ color: "rgba(255,255,255,0.65)" }}>literally nowhere</span>.{" "}
                  Pure catharsis with zero audience.
                </p>
                <button
                  onClick={() => handleDestinationSelect("void")}
                  className="font-mono text-sm font-bold px-8 py-3 rounded-xl border transition-all duration-200 hover:scale-105"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  type="button"
                >
                  Dissolve
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === "write" && (
          <EntryForm
            entryText={entryText}
            onTextChange={setEntryText}
            onNameIt={handleNameIt}
            onBack={handleReset}
            destination={destination}
          />
        )}

        {mode === "name" && (
          <ReleaseFlow
            emotion={emotion}
            setEmotion={setEmotion}
            inappropriateDetected={inappropriateDetected}
            handleRelease={handleRelease}
            handleBack={() => setMode("write")}
            destination={destination}
            submitting={submitting}
          />
        )}

        {mode === "released" && (
          <div className="max-w-md w-full text-center">
            <div className="mb-10">
              <h2 className="font-display text-5xl font-bold text-white mb-4">Released.</h2>
              <p className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                Your words have been witnessed.
              </p>
              {emotion && (
                <p className="font-mono text-xs mt-3" style={{ color: "#C9972A" }}>
                  You named it: <span className="text-white">{emotion.sub}</span>
                </p>
              )}
            </div>
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="block w-full font-mono text-sm py-3 rounded-xl border transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                type="button"
              >
                Is there more underneath?
              </button>
              <Link
                to="/"
                className="block w-full font-mono text-sm py-3 rounded-xl text-center"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                I&apos;m done
              </Link>
            </div>
          </div>
        )}

        {mode === "void" && (
          <div className="max-w-md w-full text-center">
            <div className="mb-10">
              <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
              </div>
              <h2 className="font-display text-5xl font-bold mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>Dissolved.</h2>
              <p className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                Gone. Completely. Into nothing.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleReset}
                className="block w-full font-mono text-sm py-3 rounded-xl border"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}
                type="button"
              >
                There&apos;s more.
              </button>
              <Link to="/" className="block w-full font-mono text-sm py-3 rounded-xl text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                I&apos;m done
              </Link>
            </div>
          </div>
        )}

        {mode === "witness" && (
          <div className="w-full max-w-2xl py-12">
            {feedLoading && (
              <div className="text-center py-12">
                <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: "rgba(255,255,255,0.3)" }} />
              </div>
            )}
            {feedError && (
              <div className="text-center py-8">
                <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{feedError}</p>
                <button
                  onClick={() => setMode("witness")}
                  className="mt-3 font-mono text-xs px-4 py-2 rounded-lg border"
                  style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}
                  type="button"
                >
                  Retry
                </button>
              </div>
            )}
            {!feedLoading && !feedError && <WitnessWall entries={witnessEntries} />}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-2.5 font-mono text-xs"
        style={{ backgroundColor: "rgba(13,13,13,0.95)", borderTop: "1px solid rgba(201,151,42,0.15)", color: "rgba(255,255,255,0.3)" }}
      >
        <span>STATION: {destination ? destination.toUpperCase() : "SELECTION"}</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.includes("RESOLVED") ? "#C9972A" : "rgba(255,255,255,0.3)" }} />
          {status}
        </span>
      </div>
    </div>
  );
}
