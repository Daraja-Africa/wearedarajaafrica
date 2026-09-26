-- Daraja Africa Network interview scheduling
-- Slots are generated per requested Tuesday-starting week; no demo bookings are inserted.

create extension if not exists pgcrypto;

create table if not exists public.interviewers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.interview_applicants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 5 and 320),
  phone text not null check (char_length(trim(phone)) between 7 and 40),
  institution text not null check (char_length(trim(institution)) between 2 and 200),
  role text not null check (role in (
    'Facilitating Sessions', 'Peer engagement', 'Events', 'Research', 'Comms',
    'IT', 'Monitoring and Evaluation', 'Training Dpt', 'Partnerships'
  )),
  interview_preferences text,
  created_at timestamptz not null default now()
);

create table if not exists public.interview_slots (
  id uuid primary key default gen_random_uuid(),
  week_start date not null,
  slot_date date not null,
  weekday smallint not null check (weekday in (2, 3, 4)),
  starts_at time not null,
  ends_at time not null,
  status text not null default 'available' check (status in ('available', 'booked', 'assigned')),
  applicant_id uuid references public.interview_applicants(id) on delete set null,
  interviewer_id uuid references public.interviewers(id) on delete set null,
  booked_at timestamptz,
  assigned_at timestamptz,
  created_at timestamptz not null default now(),
  unique (week_start, slot_date, starts_at)
);

create index if not exists interview_slots_week_idx on public.interview_slots (week_start, slot_date, starts_at);
create index if not exists interview_slots_status_idx on public.interview_slots (status);
create index if not exists interview_applicants_email_idx on public.interview_applicants (lower(email));

create or replace function public.is_interviewer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.interviewers
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and active
  );
$$;

create or replace function public.ensure_interview_slots(p_week_start date)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  slot_day date;
  slot_time time;
  last_time time;
begin
  if extract(isodow from p_week_start) <> 2 then
    raise exception 'week_start must be a Tuesday';
  end if;

  for slot_day, slot_time, last_time in
    select p_week_start, t::time
    from generate_series('2000-01-01 14:00'::timestamp, '2000-01-01 17:30'::timestamp, '30 minutes') t
    union all
    select p_week_start + 1, t::time
    from generate_series('2000-01-01 14:00'::timestamp, '2000-01-01 17:30'::timestamp, '30 minutes') t
    union all
    select p_week_start + 2, t::time
    from generate_series('2000-01-01 09:00'::timestamp, '2000-01-01 15:30'::timestamp, '30 minutes') t
  loop
    insert into public.interview_slots (week_start, slot_date, weekday, starts_at, ends_at)
    values (p_week_start, slot_day, extract(isodow from slot_day)::smallint, slot_time, slot_time + interval '30 minutes')
    on conflict (week_start, slot_date, starts_at) do nothing;
  end loop;
end;
$$;

create or replace function public.get_interview_slots(p_week_start date)
returns table (
  id uuid, week_start date, slot_date date, weekday smallint,
  starts_at time, ends_at time, status text, applicant_id uuid, interviewer_id uuid
)
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.ensure_interview_slots(p_week_start);
  return query
    select s.id, s.week_start, s.slot_date, s.weekday, s.starts_at, s.ends_at,
      s.status, case when public.is_interviewer() then s.applicant_id else null end,
      case when public.is_interviewer() then s.interviewer_id else null end
    from public.interview_slots s
    where s.week_start = p_week_start
      and (s.status = 'available' or public.is_interviewer())
    order by s.slot_date, s.starts_at;
end;
$$;

create or replace function public.book_interview(
  p_slot_id uuid,
  p_full_name text,
  p_email text,
  p_phone text,
  p_institution text,
  p_role text,
  p_interview_preferences text default null
)
returns table (applicant_id uuid, slot_id uuid, slot_date date, starts_at time, ends_at time)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_applicant public.interview_applicants;
  v_slot public.interview_slots;
begin
  if p_role not in (
    'Facilitating Sessions', 'Peer engagement', 'Events', 'Research', 'Comms',
    'IT', 'Monitoring and Evaluation', 'Training Dpt', 'Partnerships'
  ) then
    raise exception 'Invalid role';
  end if;

  insert into public.interview_applicants
    (full_name, email, phone, institution, role, interview_preferences)
  values
    (trim(p_full_name), lower(trim(p_email)), trim(p_phone), trim(p_institution), p_role, nullif(trim(p_interview_preferences), ''))
  returning * into v_applicant;

  update public.interview_slots
  set status = 'booked', applicant_id = v_applicant.id, booked_at = now()
  where id = p_slot_id and status = 'available'
  returning * into v_slot;

  if not found then
    raise exception 'That interview slot is no longer available';
  end if;

  return query select v_applicant.id, v_slot.id, v_slot.slot_date, v_slot.starts_at, v_slot.ends_at;
end;
$$;

create or replace function public.assign_interviewer(p_slot_id uuid, p_interviewer_id uuid)
returns public.interview_slots
language plpgsql
security definer
set search_path = public
as $$
declare v_slot public.interview_slots;
begin
  if not public.is_interviewer() then raise exception 'Interviewer access required'; end if;
  update public.interview_slots
  set interviewer_id = p_interviewer_id, status = 'assigned', assigned_at = now()
  where id = p_slot_id and applicant_id is not null
  returning * into v_slot;
  if not found then raise exception 'Slot is not booked or does not exist'; end if;
  return v_slot;
end;
$$;

alter table public.interviewers enable row level security;
alter table public.interview_applicants enable row level security;
alter table public.interview_slots enable row level security;

drop policy if exists "Public read active interviewers" on public.interviewers;
drop policy if exists "Interviewers manage interviewers" on public.interviewers;
drop policy if exists "Interviewers read applicants" on public.interview_applicants;
drop policy if exists "Interviewers read slots" on public.interview_slots;

create policy "Interviewers manage interviewers" on public.interviewers
  for all to authenticated using (public.is_interviewer()) with check (public.is_interviewer());
create policy "Interviewers read applicants" on public.interview_applicants
  for select to authenticated using (public.is_interviewer());
create policy "Interviewers read slots" on public.interview_slots
  for select to authenticated using (public.is_interviewer());

revoke all on public.interviewers, public.interview_applicants, public.interview_slots from anon, authenticated;
grant select on public.interviewers to authenticated;
grant select on public.interview_applicants, public.interview_slots to authenticated;
grant execute on function public.get_interview_slots(date), public.book_interview(uuid,text,text,text,text,text,text) to anon, authenticated;
grant execute on function public.assign_interviewer(uuid,uuid) to authenticated;
grant execute on function public.ensure_interview_slots(date) to anon, authenticated;

-- Initial panel roster only; no applicant or booking demo rows are created.
insert into public.interviewers (full_name, email) values
  ('Dr. Sarah Wanjiku', 'sarah.wanjiku@darajaafrica.org'),
  ('Michael Omondi', 'michael.omondi@darajaafrica.org'),
  ('Grace Muthoni', 'grace.muthoni@darajaafrica.org'),
  ('Alex Kioko', 'alex.kioko@darajaafrica.org')
on conflict (email) do nothing;
