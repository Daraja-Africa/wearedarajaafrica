import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Optional comma-separated allow-list (e.g. "https://wearedarajaafrica.org").
// When unset, falls back to "*" so local dev and existing deploys keep working.
const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
  if (origin && allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  } else if (allowedOrigins.length === 0) {
    headers["Access-Control-Allow-Origin"] = "*";
  }
  return headers;
}

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

const BLOCKED_PATTERNS = [
  { regex: /\b(kill|murder|suicide|die)\b.*\b(yourself|myself|ourselves|themselves)\b/i, reason: "Self-harm encouragement" },
  { regex: /\b(kill|murder|attack|hurt|stab|shoot)\b.*\b(people|person|children|kids|students|classmates)\b/i, reason: "Violence toward others" },
  { regex: /\b(I'?m going to|I plan to|I intend to|I will)\b.*\b(kill|murder|attack|hurt|stab|shoot)\b/i, reason: "Credible threat" },
  { regex: /\b(all\s+\w+\s+should\s+die|exterminate|ethnic\s+cleans|genocide)\b/i, reason: "Hate speech / violence advocacy" },
];

serve(async (req) => {
  const cors = corsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("SUPABASE_PROJECT_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const body = await req.json();
    const {
      text,
      emotion_category,
      sub_emotion,
      destination,
      support_name,
      support_contact,
      support_type,
      client_ip,
    } = body;

    // Trust the edge proxy's x-forwarded-for (leftmost entry) over any
    // client-supplied value; the body field is only a last-resort fallback.
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp =
      (forwardedFor ? forwardedFor.split(",")[0].trim() : "") ||
      client_ip ||
      "unknown";
    let rateLimitDegraded = false;
    const isPitEntry = !!text;
    const now = new Date().toISOString();

    if (isPitEntry && (!text || text.trim().length === 0)) {
      return new Response(
        JSON.stringify({ error: "Entry text is required" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    if (!isPitEntry && !support_contact) {
      return new Response(
        JSON.stringify({ error: "Contact information is required" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    const rateLimitResult = await checkRateLimit(supabase, clientIp);
    rateLimitDegraded = !!rateLimitResult.degraded;
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please wait a few minutes before trying again." }),
        { status: 429, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    if (isPitEntry && text) {
      const duplicateCheck = await supabase
        .from("pit_entries")
        .select("id, created_at")
        .eq("text", text.trim())
        .eq("destination", "pit")
        .order("created_at", { ascending: false })
        .limit(1);

      if (duplicateCheck.error) {
        console.error("Duplicate check error:", duplicateCheck.error);
      } else if (duplicateCheck.data && duplicateCheck.data.length > 0) {
        const lastTime = new Date(duplicateCheck.data[0].created_at).getTime();
        if (Date.now() - lastTime < DUPLICATE_WINDOW_MS) {
          await logModeration(supabase, {
            action: "duplicate_blocked",
            target_table: "pit_entries",
            reason: "Exact duplicate within 5 minutes",
            client_ip: clientIp,
            metadata: { text_length: text.length },
          });
          return new Response(
            JSON.stringify({ error: "You already submitted this recently. Please wait a few minutes." }),
            { status: 429, headers: { ...cors, "Content-Type": "application/json" } }
          );
        }
      }

      for (const rule of BLOCKED_PATTERNS) {
        if (rule.regex.test(text)) {
          await logModeration(supabase, {
            action: "content_blocked",
            target_table: "pit_entries",
            reason: rule.reason,
            client_ip: clientIp,
            metadata: { text_length: text.length, emotion: emotion_category },
          });
          return new Response(
            JSON.stringify({
              error: "This content cannot be shared in the pit. Your feelings are valid, but for everyone's safety this must go to the void.",
              routed_to_void: true,
            }),
            { status: 422, headers: { ...cors, "Content-Type": "application/json" } }
          );
        }
      }
    }

    let result;
    let targetTable;

    if (isPitEntry) {
      targetTable = "pit_entries";
      const insertPayload = {
        text: text.trim(),
        emotion_category: emotion_category || "",
        sub_emotion: sub_emotion || "",
        destination: destination || "pit",
        moderation_status: "approved",
        created_at: now,
      };
      const { data, error } = await supabase
        .from("pit_entries")
        .insert([insertPayload])
        .select();

      if (error) {
        console.error("Pit insert error:", error);
        return new Response(
          JSON.stringify({ error: "Failed to save entry" }),
          { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }
      result = data;
    } else {
      targetTable = "support_requests";
      const insertPayload = {
        support_name: (support_name || "").trim(),
        support_contact: support_contact.trim(),
        support_type: support_type,
        status: "pending",
        moderation_status: "approved",
        created_at: now,
      };
      const { data, error } = await supabase
        .from("support_requests")
        .insert([insertPayload])
        .select();

      if (error) {
        console.error("Support insert error:", error);
        return new Response(
          JSON.stringify({ error: "Failed to save support request" }),
          { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }
      result = data;
    }

    await logModeration(supabase, {
      action: "submission_approved",
      target_table: targetTable,
      reason: "Passed moderation checks",
      client_ip: clientIp,
      metadata: { destination: destination || "unknown" },
    });

    const successHeaders: Record<string, string> = {
      ...cors,
      "Content-Type": "application/json",
    };
    // Fail-open rate limiting is intentional (a DB hiccup must not lock out
    // help-seeking users), but degradation should be observable.
    if (rateLimitDegraded) {
      successHeaders["x-rate-limit-degraded"] = "true";
    }
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: successHeaders }
    );
  } catch (err) {
    console.error("Moderation error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
});

async function checkRateLimit(supabase, clientIp) {
  try {
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count, error } = await supabase
      .from("moderation_logs")
      .select("*", { count: "exact", head: true })
      .eq("client_ip", clientIp)
      .gte("created_at", windowStart);

    if (error) {
      console.error("Rate limit check error:", error);
      // Fail-open on purpose: duplicate + content checks still run.
      return { allowed: true, degraded: true };
    }

    return { allowed: (count || 0) < RATE_LIMIT_MAX, remaining: RATE_LIMIT_MAX - (count || 0), degraded: false };
  } catch (e) {
    console.error("Rate limit exception:", e);
    return { allowed: true, degraded: true };
  }
}

async function logModeration(supabase, entry) {
  try {
    await supabase.from("moderation_logs").insert([{
      action: entry.action,
      target_table: entry.target_table,
      reason: entry.reason,
      client_ip: entry.client_ip,
      metadata: entry.metadata || {},
      created_at: new Date().toISOString(),
    }]);
  } catch (e) {
    console.error("Failed to log moderation:", e);
  }
}
