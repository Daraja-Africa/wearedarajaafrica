import React, { useState } from "react";
import { Phone, AlertCircle, ExternalLink, Loader2 } from "lucide-react";
import { submitSupportRequest } from "@/api/moderation";

const sections = [
  {
    name: "Emergency & Crisis Support",
    color: "#B8671A",
    lines: [
      {
        org: "Kenya Red Cross Society (KRCS)",
        desc: "Free 24/7 counseling and psychosocial support in crises (suicide, trauma, disaster response).",
        number: "1190",
        altNumber: "1199",
        hours: "24/7",
        website: "redcross.or.ke",
      },
      {
        org: "NACADA",
        desc: "24/7 toll-free helpline offering counseling, advice and referrals for alcohol/drug problems.",
        number: "1192",
        hours: "24/7",
        website: "nacada.go.ke",
      },
      {
        org: "HealthCare Assistance Kenya (HAK)",
        desc: "National GBV hotline providing immediate counseling, medical referrals, legal aid and psychosocial support.",
        number: "1195",
        hours: "24/7",
        website: "hakgbv1195.org",
      },
      {
        org: "Kimbilio Trust",
        desc: "Free counseling, advocacy, legal aid and shelter support for survivors of abuse.",
        number: "1193",
        hours: "24/7",
        website: "kimbiliotrust.com",
      },
      {
        org: "Centre for Rights, Education and Awareness (CREAW)",
        desc: "24/7 toll-free hotline for survivors of gender violence; offers free legal aid, psychosocial counseling, and emergency referrals.",
        number: "0800-720-186",
        hours: "24/7",
        website: "creawkenya.org",
      },
      {
        org: "National Emergency Services",
        desc: "For any emergency — police, ambulance, fire. Call immediately if life is at risk.",
        number: "999 / 112",
        hours: "24/7",
      },
    ],
  },
  {
    name: "Teen & Youth Mental Health Services",
    color: "#4A7A3A",
    lines: [
      {
        org: "Childline Kenya",
        desc: "24/7 toll-free helpline providing immediate counseling, referrals and child protection for children and teens facing abuse, neglect or emotional crises.",
        number: "116",
        hours: "24/7",
        website: "childlinekenya.co.ke",
      },
      {
        org: "Tele-Counseling Hotline (LVCT Health)",
        desc: "24/7 toll-free hotline offering tele-counseling and referrals for emotional, stress or relationship issues. Peer counselors available for youth.",
        number: "1190",
        hours: "24/7",
        website: "lvcthealth.org",
      },
    ],
  },
  {
    name: "Counseling & Therapy Resources",
    color: "#6B8CAE",
    lines: [
      {
        org: "Chiromo Mental Health Hospital",
        desc: "Outpatient and inpatient psychiatric treatment, psychotherapy, counseling and rehabilitation for anxiety, depression, PTSD, substance abuse and more.",
        number: "+254-750-927-232",
        hours: "Walk-in & Referred",
        website: "chiromohospitalgroup.co.ke",
      },
      {
        org: "Mathari National Teaching & Referral Hospital (MNTRH)",
        desc: "Kenya's national psychiatric hospital. Comprehensive mental health care including emergency psychiatry, inpatient and outpatient services, counseling and psychotherapy.",
        number: "+254-20-2337694",
        hours: "24/7 Emergency",
        website: "mntrh.go.ke",
      },
      {
        org: "Nairobi County Referral Hospitals",
        desc: "Many public hospitals have mental health departments (e.g. Mama Lucy, Pumwani, Mbagathi). General counseling and psychiatric care at county level.",
        number: "Nearest hospital",
        hours: "Check locally",
      },
    ],
  },
  {
    name: "Community & NGO Support Services",
    color: "#B8671A",
    lines: [
      {
        org: "Africa Mental Health Foundation (AMHF)",
        desc: "Mental health research and training organization. Community projects and training in low-resource settings.",
        number: "Email only",
        hours: "See website",
        website: "ccgmh.org",
      },
      {
        org: "Ministry of Health – Mental Health Department",
        desc: "Oversees Kenya's mental health programs and policies. Website provides official resources, policies and updates.",
        number: "No hotline",
        hours: "Website only",
        website: "mental.health.go.ke",
      },
    ],
  },
];

function isValidPhone(value) {
  return /^[\+]?[\d][\d\s\-()+.]{2,}$/.test(value.trim());
}

function extractPhoneNumbers(numberStr) {
  return numberStr
    .split("/")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && isValidPhone(s));
}

export default function GetHelp() {
  const [supportName, setSupportName] = useState("");
  const [supportContact, setSupportContact] = useState("");
  const [supportType, setSupportType] = useState("");
  const [supportSent, setSupportSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    if (!supportContact.trim()) {
      setSubmitError("Please enter your contact information.");
      return;
    }

    const trimmedContact = supportContact.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const isValidPhone = /^[\+]?[\d][\d\s\-()+.]{2,}$/.test(trimmedContact);

    if (!isValidEmail && !isValidPhone) {
      setSubmitError("Please enter a valid email address or phone number.");
      return;
    }

    if (!supportType) {
      setSubmitError("Please select a support type.");
      return;
    }

    setSubmitting(true);

    try {
      await submitSupportRequest({
        support_name: supportName.trim(),
        support_contact: supportContact.trim(),
        support_type: supportType,
      });
      setSupportName("");
      setSupportContact("");
      setSupportType("");
      setSupportSent(true);
    } catch (error) {
      console.error("Support request error:", error);
      setSubmitError(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#F5EFE4" }} className="min-h-screen">
      {/* Urgent Banner */}
      <div className="py-4 px-4" style={{ backgroundColor: "#B8671A" }}>
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <p className="text-white font-semibold text-sm">
            If you are in immediate danger or crisis, call emergency services
            immediately — <strong>Kenya Police/Ambulance: 999 or 112</strong>.
            If you or someone's life is at risk, go to your nearest emergency
            room.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-brand-charcoal">
            You don't have to carry it all alone.
          </h1>
          <p className="text-lg leading-relaxed text-brand-body max-w-xl mx-auto">
            Mental health support in Kenya is available through a range of free
            and low-cost resources, including helplines, counseling centres,
            community services, and peer support circles. All services listed
            are confidential and designed to help you access support when you
            need it. You are not alone.
          </p>
        </div>

        {/* Support Form */}
        <div
          className="mb-14 rounded-2xl p-8 border"
          style={{
            backgroundColor: "#FDF8F0",
            borderColor: "rgba(184,103,26,0.2)",
          }}
        >
          <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-2">
            Reach Out for Support
          </h2>
          <p className="text-brand-body text-sm mb-6 leading-relaxed">
            Want to connect with a peer circle or speak to an advocate? Fill
            this in and we'll reach out.
          </p>
          {!supportSent ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="support-name"
                  className="block text-sm font-medium text-brand-charcoal mb-1"
                >
                  Name / Alias
                </label>
                <input
                  id="support-name"
                  type="text"
                  placeholder="Name or Alias (optional)"
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{
                    backgroundColor: "#E8DCC8",
                    border: "1px solid rgba(184,103,26,0.2)",
                    color: "#1C1A14",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="support-contact"
                  className="block text-sm font-medium text-brand-charcoal mb-1"
                >
                  Contact
                </label>
                <input
                  id="support-contact"
                  type="text"
                  placeholder="Contact (email or phone)"
                  value={supportContact}
                  onChange={(e) => setSupportContact(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{
                    backgroundColor: "#E8DCC8",
                    border: "1px solid rgba(184,103,26,0.2)",
                    color: "#1C1A14",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="support-type"
                  className="block text-sm font-medium text-brand-charcoal mb-1"
                >
                  Support Type
                </label>
                <select
                  id="support-type"
                  value={supportType}
                  onChange={(e) => setSupportType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                  style={{
                    backgroundColor: "#E8DCC8",
                    border: "1px solid rgba(184,103,26,0.2)",
                    color: supportType ? "#1C1A14" : "#9A8E7E",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-required="true"
                >
                  <option value="">I'd like to...</option>
                  <option value="circle">Join a peer circle</option>
                  <option value="advocate">Speak to a peer advocate</option>
                </select>
              </div>

              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2" role="alert">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-[#E08898] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: "#F4A8B8", color: "#5A1A28" }}
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="font-display text-xl font-bold text-brand-charcoal mb-2">
                We've received your request.
              </p>
              <p className="text-brand-body text-sm">
                Someone from the Daraja team will be in touch soon. You took a
                brave step.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.name}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: section.color }}
                />
                <h2 className="font-display text-xl font-bold text-brand-charcoal">
                  {section.name}
                </h2>
              </div>
              <div className="space-y-3">
                {section.lines.map((line, i) => {
                  const validNumbers = extractPhoneNumbers(line.number);

                  return (
                    <div
                      key={i}
                      className="rounded-xl p-4"
                      style={{
                        backgroundColor: "#E8DCC8",
                        border: "1px solid rgba(184,103,26,0.2)",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-brand-charcoal mb-1">
                            {line.org}
                          </p>
                          <p className="text-xs text-brand-body leading-relaxed mb-2">
                            {line.desc}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs text-brand-body/60">
                            <span>{line.hours}</span>
                            {line.website && (
                              <>
                                <span aria-hidden="true">·</span>
                                <a
                                  href={`https://${line.website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-gold hover:underline flex items-center gap-0.5"
                                >
                                  {line.website}{" "}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          {validNumbers.length > 0 ? (
                            validNumbers.map((num) => (
                              <a
                                key={num}
                                href={`tel:${num.replace(/[\s\-()+.]/g, "")}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white text-sm transition-opacity hover:opacity-90 justify-center"
                                style={{ backgroundColor: section.color }}
                              >
                                <Phone className="w-4 h-4" />
                                {num}
                              </a>
                            ))
                          ) : (
                            <span className="px-4 py-2 text-sm text-brand-body/70">
                              {line.number}
                            </span>
                          )}
                          {line.altNumber && (() => {
                            const validAlts = extractPhoneNumbers(line.altNumber);
                            return validAlts.length > 0 ? (
                              validAlts.map((num) => (
                                <a
                                  key={num}
                                  href={`tel:${num.replace(/[\s\-()+.]/g, "")}`}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white text-sm transition-opacity hover:opacity-90 justify-center"
                                  style={{
                                    backgroundColor: section.color,
                                    opacity: 0.75,
                                  }}
                                >
                                  <Phone className="w-4 h-4" />
                                  {num}
                                </a>
                              ))
                            ) : (
                              <span className="px-4 py-2 text-sm text-brand-body/70">
                                {line.altNumber}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className="mt-12 p-6 rounded-2xl"
          style={{ backgroundColor: "#1C1A14" }}
        >
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: "#B8671A" }}
          >
            Disclaimer
          </p>
          <p className="text-white/80 text-sm leading-relaxed">
            These resources are provided for general information. They do not
            replace professional advice. If you are at risk of harming yourself
            or others, please seek emergency help immediately (call 999/112 or
            go to the nearest hospital). You are not alone, and help is
            available. Reaching out is a sign of strength, not weakness.
          </p>
        </div>

        <p className="text-xs text-center mt-8 text-brand-body/50">
          Daraja Africa is an auxiliary reflection platform. The above are
          independent services. We are not affiliated with any listed
          organisation.
        </p>
      </div>
    </div>
  );
}
