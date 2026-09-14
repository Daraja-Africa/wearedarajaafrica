import React, { useState } from 'react';
import { HeartHandshake, Smartphone, Globe, Info, ShieldCheck } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
 * DONATIONS — PLACEHOLDER / BOILERPLATE ONLY (no live payments!)
 * ═══════════════════════════════════════════════════════════════════════
 * Both flows below are intentionally STUBBED. Nothing here charges anyone.
 *
 * PAYPAL (standard SDK pattern — inactive until approved):
 *   1. Add VITE_PAYPAL_CLIENT_ID to .env.local (never commit it):
 *        VITE_PAYPAL_CLIENT_ID=<client id from developer.paypal.com>
 *   2. Load the SDK once the client ID exists:
 *        <script src="https://www.paypal.com/sdk/js?client_id=CLIENT_ID&currency=USD"
 *                data-sdk-integration-source="button-factory"></script>
 *      (append to index.html, or inject in useEffect when window.paypal is needed)
 *   3. Render the official buttons instead of the placeholder below:
 *        window.paypal.Buttons({
 *          createOrder: (data, actions) => actions.order.create({ ... }),
 *          onApprove:   (data, actions) => actions.order.capture(),
 *        }).render('#paypal-button-container');
 *   Replace this placeholder when the Daraja Africa PayPal business
 *   account is approved.
 *
 * M-PESA (Safaricom Daraja — STK Push pattern — inactive until approved):
 *   1. Get Daraja credentials from developer.safaricom.co.ke
 *      (Consumer Key/Secret + Shortcode + Passkey) — server-side ONLY.
 *      Keys must never reach the browser; keep this in the moderation
 *      Edge Function pattern (a sibling server-side function), NOT here.
 *   2. Wire the stub below to that function:
 *        POST { phone, amount } → Lipa na M-Pesa Online (STK Push)
 *        → user enters PIN on their phone → Confirmation via callback URL
 *   3. Until then, `initiateMpesaStkPush` shows a "coming soon" state and
 *      performs NO network request.
 *
 * Style/format follows the existing VITE_* env convention used by
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.
 * ═══════════════════════════════════════════════════════════════════════ */

const AMOUNT_PRESETS = [500, 1000, 2500, 5000];

// ── STUB: replace with a call to the server-side Daraja Edge Function ──
// Expected future shape:
//   const { data, error } = await fetch('<SUPABASE_FUNCTIONS_URL>/mpesa-stk-push', {
//     method: 'POST',
//     body: JSON.stringify({ phone, amount }),   // ← only these two fields
//   }).then((r) => r.json());
function initiateMpesaStkPush({ phone, amount }) {
  console.log('[STUB] M-Pesa STK Push (NOT SENT):', { phone, amount });
  return {
    stubbed: true,
    message: 'M-Pesa giving opens soon. Online donations are not live yet.',
  };
}

const isConfiguredPaypal = Boolean(import.meta.env.VITE_PAYPAL_CLIENT_ID);
const PAYPAL_CLIENT_ID_PLACEHOLDER = import.meta.env.VITE_PAYPAL_CLIENT_ID || '<VITE_PAYPAL_CLIENT_ID>';
// TODO: replace when approved — see integration notes at top of file.

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-card';

function MethodToggle({ method, onChange }) {
  const options = [
    { id: 'mpesa', label: 'M-Pesa', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'paypal', label: 'PayPal', icon: <Globe className="w-4 h-4" /> },
  ];
  return (
    <div
      role="tablist"
      aria-label="Donation payment method"
      className="inline-flex p-1 rounded-xl"
      style={{ backgroundColor: '#E8DCC8' }}
    >
      {options.map((opt) => {
        const active = method === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${focusRing}`}
            style={{
              backgroundColor: active ? '#FFFFFF' : 'transparent',
              color: active ? '#B8671A' : '#4A4030',
              boxShadow: active ? '0 1px 3px rgba(28,26,20,0.12)' : 'none',
            }}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function MpesaForm({ amount, customAmount }) {
  const [phone, setPhone] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder handler — see initiateMpesaStkPush stub above. No network call.
    const result = initiateMpesaStkPush({ phone, amount: Number(customAmount) || amount });
    setNotice(result.message);
  };

  const normalizePhone = (v) => v.replace(/[^\d+]/g, '');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="mpesa-phone" className="block text-xs font-semibold uppercase tracking-wide text-brand-body/70 mb-1.5">
          M-Pesa phone number
        </label>
        <input
          id="mpesa-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="07XX XXX XXX"
          value={phone}
          onChange={(e) => setPhone(normalizePhone(e.target.value))}
          aria-describedby="mpesa-phone-hint"
          className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-colors ${focusRing}`}
          style={{
            borderColor: 'rgba(184,103,26,0.3)',
            backgroundColor: '#FFFFFF',
            color: '#1C1A14',
          }}
        />
        <p id="mpesa-phone-hint" className="text-xs text-brand-body/50 mt-1.5">
          You'll receive an STK push prompt on this number to confirm with your M-Pesa PIN.
        </p>
      </div>
      <p className="text-xs leading-relaxed flex gap-2" style={{ color: '#4A4030' }}>
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#8B6430' }} />
        M-Pesa giving opens soon — we're completing the Safaricom Daraja (STK Push) setup.
      </p>
      {notice && (
        <p role="status" className="text-xs font-semibold px-3 py-2 rounded-lg" style={{ backgroundColor: '#FDE8D0', color: '#944F10' }}>
          {notice}
        </p>
      )}
      <button
        type="submit"
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl opacity-60 cursor-not-allowed`}
        style={{ backgroundColor: '#4A7A3A', color: '#FFFFFF' }}
      >
        <Smartphone className="w-4 h-4" /> Send STK Push (Coming Soon)
      </button>
    </form>
  );
}

function PaypalForm() {
  const configured = isConfiguredPaypal; // becomes true when VITE_PAYPAL_CLIENT_ID is set
  return (
    <div className="space-y-4">
      {/* Official PayPal buttons replace this container once the SDK is wired —
          see the integration notes at the top of this file. */}
      <div
        id="paypal-button-container"
        className="rounded-xl border border-dashed px-4 py-6 text-center"
        style={{ borderColor: 'rgba(184,103,26,0.35)', backgroundColor: 'rgba(255,255,255,0.6)' }}
      >
        <Globe className="w-6 h-6 mx-auto mb-2" style={{ color: '#8B6430' }} />
        <p className="text-sm font-semibold" style={{ color: '#1C1A14' }}>
          PayPal checkout placeholder
        </p>
        <p className="text-xs text-brand-body/60 mt-1 leading-relaxed">
          {configured
            ? 'SDK client ID detected — wire window.paypal.Buttons() here (see file header).'
            : `SDK loads here once VITE_PAYPAL_CLIENT_ID is set (currently: ${PAYPAL_CLIENT_ID_PLACEHOLDER}).`}
        </p>
      </div>
      <p className="text-xs leading-relaxed flex gap-2" style={{ color: '#4A4030' }}>
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#8B6430' }} />
        Online PayPal giving opens soon — pending approval of the Daraja Africa business account.
      </p>
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl opacity-60 cursor-not-allowed`}
        style={{ backgroundColor: '#1C1A14', color: '#FFFFFF' }}
      >
        <Globe className="w-4 h-4" /> Donate with PayPal (Coming Soon)
      </button>
    </div>
  );
}

export default function DonationSection() {
  const [method, setMethod] = useState('mpesa');
  const [customAmount, setCustomAmount] = useState('');
  const [amount, setAmount] = useState(1000); // KES preset selection

  const effectiveAmount = Number(customAmount) || amount;

  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      className="rounded-2xl p-6 md:p-10"
      style={{
        backgroundColor: '#FDF8F0',
        border: '1px solid rgba(184,103,26,0.25)',
        boxShadow: '0 1px 3px rgba(74,122,58,0.08)',
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: '#EDE5D4' }}>
          <HeartHandshake className="w-5 h-5" style={{ color: '#B8671A' }} />
        </div>
        <h2 id="donate-heading" className="font-display text-2xl font-bold" style={{ color: '#B8671A' }}>
          Support Daraja Africa Network
        </h2>
      </div>
      <p className="text-brand-body/70 text-sm leading-relaxed mb-6">
        Every shilling expands access to mental health support for young people. Choose how you'd like
        to give — both options are launching shortly.
      </p>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* Amount selection (shared by both methods) */}
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wide text-brand-body/70 mb-2">
            Donation amount (KES)
          </span>
          <div className="grid grid-cols-2 gap-2 mb-3" role="group" aria-label="Preset donation amounts">
            {AMOUNT_PRESETS.map((preset) => {
              const active = !customAmount && amount === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount('');
                  }}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-200 ${focusRing}`}
                  style={{
                    backgroundColor: active ? 'rgba(184,103,26,0.12)' : '#FFFFFF',
                    borderColor: active ? '#B8671A' : 'rgba(184,103,26,0.25)',
                    color: active ? '#B8671A' : '#4A4030',
                  }}
                >
                  KSh {preset.toLocaleString()}
                </button>
              );
            })}
          </div>
          <label htmlFor="custom-amount" className="block text-xs font-semibold uppercase tracking-wide text-brand-body/70 mb-1.5">
            Or enter your own
          </label>
          <input
            id="custom-amount"
            type="number"
            inputMode="numeric"
            min="10"
            step="10"
            placeholder="e.g. 1500"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-colors ${focusRing}`}
            style={{
              borderColor: 'rgba(184,103,26,0.3)',
              backgroundColor: '#FFFFFF',
              color: '#1C1A14',
            }}
          />
          <p className="text-xs text-brand-body/50 mt-2">
            {effectiveAmount > 0
              ? `You chose: KSh ${effectiveAmount.toLocaleString()}`
              : 'Select a preset or enter a custom amount.'}
          </p>
        </div>

        {/* Method + entry form */}
        <div>
          <MethodToggle method={method} onChange={setMethod} />
          <div className="mt-5" role="tabpanel">
            {method === 'mpesa' ? (
              <MpesaForm amount={amount} customAmount={customAmount} />
            ) : (
              <PaypalForm />
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 pt-4 text-xs text-brand-body/50 flex items-center gap-2" style={{ borderTop: '1px solid rgba(184,103,26,0.15)' }}>
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: '#4A7A3A' }} />
        Placeholder state — no payments are processed on this page yet. Prefer giving offline in the
        meantime? Call us on +254 748 047 581.
      </p>
    </section>
  );
}
