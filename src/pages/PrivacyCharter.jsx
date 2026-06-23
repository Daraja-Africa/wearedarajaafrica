import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Mail, Users, RefreshCw, AlertCircle } from 'lucide-react';

const sections = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'What Information We Collect',
    content: [
      'When you use Daraja Africa\'s platform or services, we may collect limited information including: your name or alias (if voluntarily provided), email address (if you sign up or contact us), messages submitted via contact or support forms, and anonymous emotional entries submitted to The Pit (no account required).',
      'We do not require you to create an account to access most of the platform. Anonymous entries to The Pit are stored without any identifying information attached.',
    ],
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: 'Why We Collect Information',
    content: [
      'Information is collected solely to: respond to enquiries from volunteers, partners, and supporters; facilitate school and organizational partnership applications; improve the platform and user experience; and maintain the safety and integrity of The Pit and community features.',
      'We do not collect information for advertising, profiling, or commercial purposes.',
    ],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'How We Use Your Information',
    content: [
      'Your information is used only for the purpose for which it was provided. Contact form submissions are used to respond to your message. Volunteer applications are reviewed by our team and used to match you with appropriate opportunities. Anonymous emotional entries are displayed within The Pit to foster community solidarity — they are not linked to any individual.',
      'We do not sell, rent, or share your personal information with third parties for marketing or commercial purposes.',
    ],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'How We Store and Protect Your Data',
    content: [
      'Daraja Africa uses industry-standard security practices to protect your information. Data is stored on secure servers with access controls limiting who can view submitted information. We regularly review our data handling practices to ensure they remain appropriate and up to date.',
      'While we take reasonable precautions, no internet transmission is completely secure. We encourage you not to share sensitive clinical or medical information through our platform.',
    ],
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Protection of Minors and Youth Data',
    content: [
      'Daraja Africa primarily serves high school students and young people. We are committed to protecting the privacy of minors. We do not knowingly collect personally identifiable information from children under 13 without parental consent.',
      'Anonymous entries to The Pit are designed to be completely untraceable to any individual, including minors. School partnerships are governed by institutional agreements that include data protection provisions appropriate to the age group being served.',
    ],
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: 'Third-Party Services',
    content: [
      'Daraja Africa uses a limited number of trusted third-party services to operate its platform, including hosting and form services. These services are selected based on their compliance with data protection standards.',
      'We do not integrate advertising networks, social tracking pixels, or data brokers into our platform. External links (such as mental health resources) are provided for your convenience — please review the privacy policies of those external websites independently.',
    ],
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'Cookies and Analytics',
    content: [
      'Daraja Africa may use minimal, privacy-respecting analytics to understand how the platform is being used (e.g. which pages are visited most frequently). This data is aggregated and does not identify individual users.',
      'We do not use tracking cookies for advertising purposes. You may disable cookies through your browser settings without losing access to core platform features.',
    ],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Your Rights',
    content: [
      'You have the right to: request access to the personal information we hold about you; request correction of any inaccurate information; request deletion of your personal information (see our Data Deletion Policy); and withdraw consent for any voluntary data use at any time.',
      'To exercise any of these rights, contact us at the details below. We will respond within 30 days.',
    ],
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: 'Changes to This Privacy Charter',
    content: [
      'We may update this Privacy Charter from time to time to reflect changes in our services or legal obligations. Any material changes will be noted on this page with an updated effective date. We encourage you to review this page periodically.',
      'Continued use of the Daraja Africa platform after changes are posted constitutes acceptance of the revised Charter.',
    ],
  },
];

export default function PrivacyCharter() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <section className="py-20 md:py-28 px-4 border-b border-brand-gold/15">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Trust & Safety</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal mt-3 mb-5">Privacy Charter</h1>
          <p className="text-brand-body text-lg leading-relaxed max-w-2xl mx-auto">
            Daraja Africa is committed to protecting your privacy and handling your information with transparency, care, and respect — especially when working with young people and vulnerable communities.
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
              <h2 className="font-display text-xl font-bold">Contact Us About Privacy</h2>
            </div>
            <p className="text-brand-cream/70 text-sm leading-relaxed mb-4">
              For any privacy-related questions, data access requests, or concerns, please reach out to the Daraja Africa team directly.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="text-brand-cream/50">Email:</span> <a href="mailto:info@darajaafrica.org" className="text-brand-gold hover:underline">info@darajaafrica.org</a></p>
              <p><span className="text-brand-cream/50">Phone:</span> <a href="tel:+254748047581" className="text-brand-gold hover:underline">+254 748 047 581</a></p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link to="/" className="text-sm text-brand-gold hover:underline">← Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}