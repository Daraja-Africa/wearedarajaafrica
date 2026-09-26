create or replace function public.ensure_interview_slots(p_week_start date)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  slot_day date;
  slot_time time;
begin
  if extract(isodow from p_week_start) <> 2 then
    raise exception 'week_start must be a Tuesday';
  end if;

  for slot_day, slot_time in
    select p_week_start, t::time from generate_series('2000-01-01 14:00'::timestamp, '2000-01-01 17:30'::timestamp, '30 minutes') t
    union all
    select p_week_start + 1, t::time from generate_series('2000-01-01 14:00'::timestamp, '2000-01-01 17:30'::timestamp, '30 minutes') t
    union all
    select p_week_start + 2, t::time from generate_series('2000-01-01 09:00'::timestamp, '2000-01-01 15:30'::timestamp, '30 minutes') t
  loop
    insert into public.interview_slots (week_start, slot_date, weekday, starts_at, ends_at)
    values (p_week_start, slot_day, extract(isodow from slot_day)::smallint, slot_time, slot_time + interval '30 minutes')
    on conflict (week_start, slot_date, starts_at) do nothing;
  end loop;
end;
$$;
