import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const htmlEscape = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const calendarValue = (date: string, time: string) =>
  `${date.replaceAll("-", "")}T${time.replaceAll(":", "").slice(0, 4)}00`;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const fromAddress = Deno.env.get("INTERVIEW_FROM_EMAIL");
  if (!resendKey || !fromAddress) {
    return new Response(JSON.stringify({ error: "Email delivery is not configured. Set RESEND_API_KEY and INTERVIEW_FROM_EMAIL." }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { applicant, slot } = await request.json();
    if (!applicant?.email || !applicant?.full_name || !slot?.slot_date || !slot?.starts_at || !slot?.ends_at) {
      return new Response(JSON.stringify({ error: "Applicant and slot details are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const start = calendarValue(slot.slot_date, slot.starts_at);
    const end = calendarValue(slot.slot_date, slot.ends_at);
    const summary = `Daraja Africa Network interview - ${applicant.full_name}`;
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Daraja Africa Network//Interview Scheduler//EN",
      "BEGIN:VEVENT", `DTSTART:${start}`, `DTEND:${end}`, `SUMMARY:${summary}`,
      `DESCRIPTION:Role: ${applicant.role}\\nInstitution: ${applicant.institution}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${start}/${end}&details=${encodeURIComponent(`Role: ${applicant.role}\nInstitution: ${applicant.institution}`)}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromAddress,
        to: [applicant.email],
        subject: "Your Daraja Africa Network interview is confirmed",
        html: `<p>Hello ${htmlEscape(applicant.full_name)},</p><p>Your interview is confirmed for <strong>${htmlEscape(slot.slot_date)}</strong> at <strong>${htmlEscape(slot.starts_at.slice(0, 5))}</strong>.</p><p>Role: ${htmlEscape(applicant.role)}<br>Institution: ${htmlEscape(applicant.institution)}</p><p><a href="${googleUrl}">Add to Google Calendar</a></p><p>The attached calendar file can be imported into other calendar apps.</p>`,
        attachments: [{ filename: "daraja-interview.ics", content: btoa(ics) }],
      }),
    });
    if (!response.ok) throw new Error(`Resend returned ${response.status}`);
    return new Response(JSON.stringify({ sent: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Email delivery failed." }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
