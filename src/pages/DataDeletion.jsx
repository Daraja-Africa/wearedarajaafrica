import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Clock, Shield, Mail, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const sections = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'What Data Can Be Deleted',
    content: [
      'Upon request, Daraja Africa will delete the following categories of personal data: contact form submissions (name, email, message); volunteer application information; partner or school enquiry records; and any personally identifiable information associated with your email address.',
      'Anonymous entries submitted to The Pit are stored without any personal identifier. Because they cannot be linked to an individual, they cannot be specifically identified or deleted on request — however, all Pit entries are periodically reviewed and older entries may be removed as part of routine data hygiene.',
    ],
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'How to Request Deletion',
    content: [
      'To request deletion of your personal information, send an email to info@darajaafrica.org with the subject line "Data Deletion Request." Please include: your full name (as provided when submitting information), the email address associated with your data, a brief description of what data you would like removed, and the approximate date you submitted the information (if known).',
      'You may also reach us by phone at +254 748 047 581 during business hours. We will acknowledge your request within 5 business days.',
    ],
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Response Timelines',
    content: [
      'Daraja Africa aims to process all data deletion requests within 30 calendar days of receipt. For complex requests involving multiple data sources, we may require up to 60 days and will notify you if an extension is needed.',
      'Once deletion is confirmed, we will send you a written confirmation to the email address you used to submit the request.',
    ],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Verification Before Deletion',
    content: [
      'To protect users from unauthorized data deletion, we may ask you to verify your identity before processing a request. Verification may involve confirming details of the original submission (e.g. the email address used, approximate date of contact, or the nature of the enquiry).',
      'We will not delete data based on requests that cannot be reasonably verified. This is to protect both your data and the integrity of our records.',
    ],
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: 'Data We May Be Required to Retain',
    content: [
      'In limited circumstances, Daraja Africa may be legally or operationally required to retain certain information even after a deletion request. This includes: records required for compliance with applicable law or regulatory obligations; information necessary to resolve outstanding disputes or complaints; and records of organizational partnerships that have legal or contractual significance.',
      'Where we must retain data for these reasons, we will inform you and limit use of that data strictly to the purpose requiring retention.',
    ],
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: 'Volunteer, Partner, and School Data',
    content: [
      'Volunteer applicants may request deletion of their application records at any time before or after acceptance. Partner school and organizational data submitted during the partnership application process may be retained for a reasonable administrative period following the end of a formal partnership, unless deletion is requested.',
      'School partnership records involving institutional — rather than personal — data are not subject to individual deletion requests and are handled according to the terms of the relevant partnership agreement.',
    ],
  },
  {
    icon: <Trash2 className="w-5 h-5" />,
    title: 'Data Retention Periods',
    content: [
      'In the absence of a deletion request, Daraja Africa retains personal data only as long as necessary for the purpose for which it was collected. Contact form submissions are retained for up to 12 months. Volunteer application records are retained for up to 24 months from the date of application.',
      'Anonymous Pit entries have no defined expiration, as they contain no personal information. However, the platform reserves the right to archive or remove entries as part of ongoing content management.',
    ],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Our Commitment to Responsible Data Stewardship',
    content: [
      'Daraja Africa is a youth-focused mental health organization and we take the privacy of those we serve seriously — especially students, young people, and vulnerable communities. We collect only what we need, retain it only as long as necessary, and handle all requests with transparency and care.',
      'This policy is reviewed periodically and updated to reflect changes in our services or applicable legal standards. For questions about this policy or to submit a request, please contact us using the details below.',
    ],
  },
];

export default function DataDeletion() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Trust & Safety</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal mt-3 mb-5">Data Deletion Policy</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            You have the right to request removal of your personal information. This policy explains how Daraja Africa handles data deletion requests, timelines, and the information we are required to retain.
          </p>
          <p className="text-sm text-brand-body/60 mt-4">Effective Date: June 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: '#FDF8F0', border: '1px solid rgba(184,103,26,0.12)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg text-brand-gold" style={{ backgroundColor: '#EDE5D4' }}>
                  {section.icon}
                </div>
                <h2 className="font-display text-xl font-bold text-brand-charcoal">{section.title}</h2>
              </div>
              {section.content.map((para, j) => (
                <p key={j} className="text-brand-body text-sm leading-relaxed mb-3 last:mb-0">{para}</p>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="rounded-2xl p-6 md:p-8 bg-brand-charcoal text-brand-cream">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-brand-gold" />
              <h2 className="font-display text-xl font-bold">Submit a Deletion Request</h2>
            </div>
            <p className="text-brand-cream/70 text-sm leading-relaxed mb-4">
              To request deletion of your data, contact the Daraja Africa team with your name, email, and a description of the information you would like removed.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="text-brand-cream/50">Email:</span> <a href="mailto:info@darajaafrica.org" className="text-brand-gold hover:underline">info@darajaafrica.org</a></p>
              <p><span className="text-brand-cream/50">Phone:</span> <a href="tel:+254748047581" className="text-brand-gold hover:underline">+254 748 047 581</a></p>
              <p><span className="text-brand-cream/50">Subject line:</span> <span className="text-brand-cream/80">Data Deletion Request</span></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 text-sm">
            <Link to="/privacy-charter" className="text-brand-gold hover:underline">View Privacy Charter →</Link>
            <Link to="/" className="text-brand-gold hover:underline">← Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}