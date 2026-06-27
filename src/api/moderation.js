import { supabase } from "@/lib/supabase";

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_MODERATION_ENDPOINT ||
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/moderate-entry`;

class SubmissionError extends Error {
  status;
  routedToVoid;
  code;
  constructor(message, status, routedToVoid, code) {
    super(message);
    this.status = status;
    this.routedToVoid = routedToVoid;
    this.code = code;
  }
}

async function withTimeout(promise, ms = 10000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms)
  );
  return Promise.race([promise, timeout]);
}

async function getClientIp() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) throw new Error("IP service unavailable");
    const data = await res.json();
    return data.ip || "unknown";
  } catch (e) {
    console.warn("[PIT] IP detection failed:", e);
    return "unknown";
  }
}

export async function submitPitEntry({ text, emotion_category, sub_emotion, destination }) {
  const payload = {
    text,
    emotion_category,
    sub_emotion,
    destination,
  };

  const response = await withTimeout(
    fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY || "",
      },
      body: JSON.stringify({
        ...payload,
        client_ip: await getClientIp(),
      }),
    })
  );

  const result = await response.json();

  if (!response.ok) {
    throw new SubmissionError(
      result.error || "Submission failed",
      response.status,
      result.routed_to_void,
      result.code
    );
  }

  return result;
}

export async function submitSupportRequest({ support_name, support_contact, support_type }) {
  const response = await withTimeout(
    fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY || "",
      },
      body: JSON.stringify({
        support_name,
        support_contact,
        support_type,
        client_ip: await getClientIp(),
      }),
    })
  );

  const result = await response.json();

  if (!response.ok) {
    throw new SubmissionError(result.error || "Submission failed", response.status);
  }

  return result;
}

export async function fetchWitnessFeed() {
  const { data, error } = await supabase
    .from("witness_feed_deduped")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    throw error;
  }

  return data;
}
