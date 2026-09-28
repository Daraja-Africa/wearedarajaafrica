import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Download, LogIn, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ROLES = ['Facilitating Sessions', 'Peer engagement', 'Events', 'Research', 'Comms', 'IT', 'Monitoring and Evaluation', 'Training Dpt', 'Partnerships'];
const WEEKDAYS = [{ day: 2, label: 'Tuesday', hours: '2:00 PM - 6:00 PM' }, { day: 3, label: 'Wednesday', hours: '2:00 PM - 6:00 PM' }, { day: 4, label: 'Thursday', hours: '9:00 AM - 4:00 PM' }];
const pad = (n) => String(n).padStart(2, '0');
const nextTuesday = () => {
  const date = new Date();
  const offset = (9 - date.getDay()) % 7 || 7;
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
const tuesdayStart = (dateValue) => {
  const date = new Date(`${dateValue}T12:00:00`);
  date.setDate(date.getDate() - ((date.getDay() + 5) % 7));
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
const formatTime = (time) => new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
const formatDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const describeError = (error) => {
  if (error?.message && error.message !== 'TypeError: Failed to fetch') return error.message;
  return 'We could not reach the scheduling service. Please refresh and try again.';
};

function calendarLinks(slot, applicant) {
  const start = `${slot.slot_date.replaceAll('-', '')}T${slot.starts_at.replaceAll(':', '').slice(0, 4)}00`;
  const end = `${slot.slot_date.replaceAll('-', '')}T${slot.ends_at.replaceAll(':', '').slice(0, 4)}00`;
  const title = encodeURIComponent(`Daraja Africa Network interview - ${applicant.full_name}`);
  const details = encodeURIComponent(`Role: ${applicant.role}\nInstitution: ${applicant.institution}`);
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`,
    ics: `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Daraja Africa Network//Interview Scheduler//EN\r\nBEGIN:VEVENT\r\nDTSTART:${start}\r\nDTEND:${end}\r\nSUMMARY:Daraja Africa Network interview - ${applicant.full_name}\r\nDESCRIPTION:Role: ${applicant.role}\\nInstitution: ${applicant.institution}\r\nEND:VEVENT\r\nEND:VCALENDAR`,
  };
}

function Stat({ value, label }) {
  return <div className="rounded-2xl border border-brand-cream-light bg-brand-card p-4"><p className="text-2xl font-bold text-brand-charcoal">{value}</p><p className="text-xs text-brand-body">{label}</p></div>;
}

export default function InterviewScheduler() {
  const [weekStart, setWeekStart] = useState(nextTuesday);
  const [day, setDay] = useState(2);
  const [slots, setSlots] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [interviewer, setInterviewer] = useState(null);
  const [session, setSession] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', institution: '', role: '', interview_preferences: '' });
  const [view, setView] = useState('applicant');
  const [message, setMessage] = useState('');
  const [confirmed, setConfirmed] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState({});
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const chartRef = useRef(null);

  const loadSlots = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const { data, error: loadError } = await supabase.rpc('get_interview_slots', { p_week_start: weekStart });
      if (loadError) setError(describeError(loadError)); else setSlots(data || []);
    } catch (loadError) {
      setError(describeError(loadError));
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => { loadSlots(); }, [loadSlots]);
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session?.user?.email) {
      setInterviewer(null);
      setInterviewers([]);
      return;
    }
    supabase.from('interviewers').select('id,full_name,email').eq('active', true).order('full_name').then(({ data, error: interviewerError }) => {
      if (interviewerError) {
        setError(describeError(interviewerError));
        setInterviewer(null);
        return;
      }
      const activeInterviewer = (data || []).find((person) => person.email?.toLowerCase() === session.user.email.toLowerCase()) || null;
      setInterviewer(activeInterviewer);
      setInterviewers(data || []);
      if (!activeInterviewer) setError('This account is not an active interviewer.');
    });
  }, [session]);
  useEffect(() => {
    if (interviewer) loadSlots();
  }, [interviewer, loadSlots]);
  useEffect(() => {
    if (!interviewer || !slots.length) {
      setApplicants({});
      return;
    }
    const applicantIds = [...new Set(slots.map((slot) => slot.applicant_id).filter(Boolean))];
    if (!applicantIds.length) {
      setApplicants({});
      return;
    }
    let cancelled = false;
    setApplicantsLoading(true);
    supabase.from('interview_applicants').select('id,full_name,email,institution,role').in('id', applicantIds).then(({ data, error: applicantsError }) => {
      if (cancelled) return;
      if (applicantsError) {
        setApplicants({});
        setError(`Could not load applicant details: ${describeError(applicantsError)}`);
      } else {
        setApplicants(Object.fromEntries((data || []).map((applicant) => [applicant.id, applicant])));
      }
      setApplicantsLoading(false);
    });
    return () => { cancelled = true; };
  }, [interviewer, slots]);

  const visibleSlots = useMemo(() => slots.filter((slot) => slot.weekday === day && slot.status === 'available'), [slots, day]);
  const assignedCount = slots.filter((slot) => slot.status === 'assigned').length;
  const bookedCount = slots.filter((slot) => slot.status === 'booked').length;

  const signIn = async () => {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/schedule`, scopes: 'https://www.googleapis.com/auth/calendar.events', queryParams: { access_type: 'offline', prompt: 'consent' } },
    });
    if (authError) setError(authError.message);
  };
  const book = async (event) => {
    event.preventDefault(); setError(''); setMessage('');
    if (!selectedSlot) return setError('Choose an available time slot first.');
    const { data, error: bookingError } = await supabase.rpc('book_interview', {
      p_slot_id: selectedSlot.id,
      p_full_name: form.full_name,
      p_email: form.email,
      p_phone: form.phone,
      p_institution: form.institution,
      p_role: form.role,
      p_interview_preferences: form.interview_preferences || null,
    });
    if (bookingError) return setError(describeError(bookingError));
    const bookedRow = Array.isArray(data) ? data[0] : data;
    if (!bookedRow) return setError('The booking service did not return a confirmation. Please try again.');
    const booked = { ...bookedRow, ...form };
    setConfirmed({ slot: booked, applicant: form });
    const { error: emailError } = await supabase.functions.invoke('send-interview-confirmation', { body: { applicant: form, slot: booked } });
    setMessage(`Confirmed for ${formatDate(booked.slot_date)} at ${formatTime(booked.starts_at)}.${emailError ? ' Save a calendar invite below; email delivery needs administrator configuration.' : ' A confirmation email with a calendar attachment has been sent.'}`);
    setSelectedSlot(null); setForm({ full_name: '', email: '', phone: '', institution: '', role: '', interview_preferences: '' }); loadSlots();
  };
  const claim = async (slotId) => {
    setError('');
    const { error: claimError } = await supabase.rpc('claim_interview_slot', { p_slot_id: slotId });
    if (claimError) setError(describeError(claimError));
    await loadSlots();
  };
  const addToGoogleCalendar = (slot, applicant) => {
    if (!applicant) return;
    window.open(calendarLinks(slot, applicant).google, '_blank', 'noopener,noreferrer');
  };
  const drawChart = async () => {
    if (!chartRef.current || !session) return;
    const { data } = await supabase.from('interview_slots').select('interviewer_id').eq('week_start', weekStart).not('interviewer_id', 'is', null);
    const counts = interviewers.map((person) => (data || []).filter((row) => row.interviewer_id === person.id).length);
    const { Chart, DoughnutController, ArcElement, Tooltip, Legend } = await import('chart.js');
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    if (chartRef.current._chart) chartRef.current._chart.destroy();
    chartRef.current._chart = new Chart(chartRef.current, { type: 'doughnut', data: { labels: interviewers.map((person) => person.full_name), datasets: [{ data: counts, backgroundColor: ['#B8671A', '#4A7A3A', '#F4A8B8', '#8B6914', '#2E5E22'] }] }, options: { responsive: true, plugins: { legend: { position: 'bottom' } } } });
  };
  useEffect(() => { drawChart(); return () => chartRef.current?._chart?.destroy(); }, [session, weekStart, interviewers, slots]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="min-h-screen bg-brand-cream px-4 py-8 sm:px-6">
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl bg-brand-charcoal px-6 py-8 text-white sm:px-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-blush">Live interview scheduler</p><h1 className="max-w-2xl text-3xl font-bold sm:text-5xl">Reserve the right conversation, at the right time.</h1><p className="mt-3 max-w-2xl text-sm text-stone-300">Thirty secure weekly interview slots across Tuesday, Wednesday, and Thursday. Availability is always read from the live database.</p></div>
          <div className="flex gap-2"><button onClick={() => setView('applicant')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${view === 'applicant' ? 'bg-brand-gold text-white' : 'bg-white/10'}`}>Applicant portal</button><button onClick={() => setView('admin')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${view === 'admin' ? 'bg-brand-gold text-white' : 'bg-white/10'}`}>Interviewer hub</button></div>
        </div>
      </section>
      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      {message && <div role="status" className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />{message}</div>}
      {confirmed && <div className="flex flex-wrap items-center gap-3 rounded-xl border border-brand-cream-light bg-brand-card p-4 text-sm"><strong>Calendar:</strong><a className="inline-flex items-center gap-2 rounded-lg bg-brand-charcoal px-3 py-2 font-semibold text-white" href={calendarLinks(confirmed.slot, confirmed.applicant).google} target="_blank" rel="noreferrer"><CalendarDays className="h-4 w-4" />Add to Google Calendar</a><button className="inline-flex items-center gap-2 rounded-lg border border-brand-cream-light bg-white px-3 py-2 font-semibold" onClick={() => { const blob = new Blob([calendarLinks(confirmed.slot, confirmed.applicant).ics], { type: 'text/calendar;charset=utf-8' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'daraja-interview.ics'; link.click(); URL.revokeObjectURL(url); }}><Download className="h-4 w-4" />Download .ics</button></div>}
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-brand-cream-light bg-brand-card p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Step 1</p><h2 className="text-2xl font-bold">Choose a live slot</h2></div><input type="date" value={weekStart} onChange={(event) => setWeekStart(tuesdayStart(event.target.value))} className="rounded-lg border border-brand-cream-light bg-white px-3 py-2 text-sm" /></div>
          <div className="mb-5 grid grid-cols-3 gap-2">{WEEKDAYS.map((item) => <button key={item.day} onClick={() => setDay(item.day)} className={`rounded-xl border p-3 text-left ${day === item.day ? 'border-brand-gold bg-brand-cta-surface' : 'border-brand-cream-light bg-white'}`}><p className="font-bold">{item.label}</p><p className="text-xs text-brand-body">{item.hours}</p></button>)}</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{visibleSlots.map((slot) => <button key={slot.id} disabled={slot.status !== 'available'} onClick={() => setSelectedSlot(slot)} className={`rounded-xl border p-3 text-left transition ${selectedSlot?.id === slot.id ? 'border-brand-gold bg-brand-gold text-white' : slot.status === 'available' ? 'border-green-200 bg-green-50 hover:border-brand-forest' : 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-700'}`}><Clock3 className="mb-2 h-4 w-4" /><p className="font-bold">{formatTime(slot.starts_at)}</p><p className="text-xs">{slot.status === 'available' ? 'Available' : 'Booked'}</p></button>)}</div>
          {loading && <p className="mt-4 text-sm text-brand-body">Loading live availability…</p>}
        </div>
        <form onSubmit={book} className="rounded-3xl border border-brand-cream-light bg-brand-card p-5 sm:p-7"><p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Step 2</p><h2 className="mb-1 text-2xl font-bold">Applicant details</h2><p className="mb-5 text-sm text-brand-body">{selectedSlot ? `${formatDate(selectedSlot.slot_date)} · ${formatTime(selectedSlot.starts_at)}` : 'Select a green slot to continue.'}</p><div className="space-y-3">{[['full_name', 'Full name'], ['email', 'Email address'], ['phone', 'Phone number'], ['institution', 'Institution / Organization']].map(([name, label]) => <label key={name} className="block text-sm font-semibold">{label}<input required value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} type={name === 'email' ? 'email' : 'text'} className="mt-1 w-full rounded-lg border border-brand-cream-light bg-white px-3 py-2.5 font-normal" /></label>)}<label className="block text-sm font-semibold">Role / Department<select required value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="mt-1 w-full rounded-lg border border-brand-cream-light bg-white px-3 py-2.5 font-normal"><option value="">Select a role</option>{ROLES.map((role) => <option key={role}>{role}</option>)}</select></label><label className="block text-sm font-semibold">Interview method & accommodation requests<textarea value={form.interview_preferences} onChange={(event) => setForm({ ...form, interview_preferences: event.target.value })} placeholder="Preferred method for interview (e.g. Google Meet, Zoom), specific needs, or accommodation requests..." className="mt-1 min-h-28 w-full rounded-lg border border-brand-cream-light bg-white px-3 py-2.5 font-normal" /></label><button disabled={!selectedSlot} className="w-full rounded-xl bg-brand-gold px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Confirm & reserve slot</button></div></form>
      </section>
      {view === 'admin' && <section className="space-y-6 rounded-3xl border border-brand-cream-light bg-brand-card p-5 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Protected interviewer hub</p><h2 className="text-2xl font-bold">Weekly delegation dashboard</h2></div>{session ? <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-xl border border-brand-cream-light px-4 py-2 text-sm font-semibold"><LogOut className="h-4 w-4" />Sign out</button> : <button onClick={signIn} className="inline-flex items-center gap-2 rounded-xl bg-brand-charcoal px-4 py-2 text-sm font-semibold text-white"><LogIn className="h-4 w-4" />Sign in with Google</button>}</div>{!session ? <div className="rounded-2xl bg-brand-cream p-5 text-sm text-brand-body"><ShieldCheck className="mb-2 h-6 w-6 text-brand-forest" />Only active interviewers in the Supabase allowlist can view candidates and assign sessions. Google Calendar permission is requested during sign-in.</div> : !interviewer ? <div className="rounded-2xl bg-brand-cream p-5 text-sm text-brand-body"><ShieldCheck className="mb-2 h-6 w-6 text-brand-forest" />This account does not match an active interviewer record.</div> : <><div className="grid grid-cols-3 gap-3"><Stat value={slots.length} label="Weekly slots" /><Stat value={bookedCount} label="Booked" /><Stat value={assignedCount} label="Assigned" /></div><div className="grid gap-6 lg:grid-cols-[1fr_320px]"><div className="space-y-3">{slots.map((slot) => <div key={slot.id} className="flex flex-col justify-between gap-3 rounded-xl border border-brand-cream-light bg-white p-4 sm:flex-row sm:items-center"><div><p className="font-bold">{formatDate(slot.slot_date)} · {formatTime(slot.starts_at)}</p><p className="text-xs uppercase tracking-wide text-brand-body">{slot.status}</p></div>{slot.status === 'booked' && !slot.interviewer_id && <button type="button" onClick={() => claim(slot.id)} className="rounded-lg bg-brand-gold px-3 py-2 text-sm font-semibold text-white">Claim</button>}{slot.interviewer_id && <p className="text-sm font-semibold text-brand-forest">Assigned</p>}</div>)}</div><div className="rounded-2xl bg-brand-cream p-4"><h3 className="mb-3 font-bold">Workload</h3><canvas ref={chartRef} aria-label="Interview allocation per interviewer" role="img" /><div className="mt-4 flex gap-2"><button onClick={loadSlots} className="inline-flex items-center gap-2 rounded-lg border border-brand-cream-light bg-white px-3 py-2 text-xs font-semibold"><RefreshCw className="h-3.5 w-3.5" />Refresh</button><span className="text-xs text-brand-body">Use the confirmed booking details to create a Google Calendar event.</span></div></div><div className="space-y-3"><h3 className="text-lg font-bold">Booked interview details</h3>{applicantsLoading && <p className="text-sm text-brand-body">Loading applicant details…</p>}{slots.filter((slot) => slot.status === 'booked' || slot.status === 'assigned').map((slot) => { const applicant = applicants[slot.applicant_id]; return <div key={`details-${slot.id}`} className="rounded-xl border border-brand-cream-light bg-brand-cream p-4"><p className="font-bold">{formatDate(slot.slot_date)} · {formatTime(slot.starts_at)}–{formatTime(slot.ends_at)}</p>{slot.applicant_id && !applicant && !applicantsLoading ? <p className="mt-2 text-sm text-brand-body">Applicant details are unavailable for this slot.</p> : applicant ? <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2"><p><strong>Full name:</strong> {applicant.full_name}</p><p><strong>Email:</strong> {applicant.email}</p><p><strong>Institution:</strong> {applicant.institution}</p><p><strong>Applied-for role:</strong> {applicant.role}</p><p><strong>Interview time:</strong> {formatDate(slot.slot_date)} at {formatTime(slot.starts_at)}</p><button type="button" onClick={() => addToGoogleCalendar(slot, applicant)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-charcoal px-3 py-2 font-semibold text-white"><CalendarDays className="h-4 w-4" />Add to Google Calendar</button></div> : <p className="mt-2 text-sm text-brand-body">No applicant is linked to this slot.</p>}</div>; })}</div></div></>}</section>}
      <footer className="flex items-center gap-2 pb-6 text-xs text-brand-body"><CalendarDays className="h-4 w-4" />Calendar invites are generated from confirmed booking details. No sample bookings are displayed.</footer>
    </div>
  </div>;
}
