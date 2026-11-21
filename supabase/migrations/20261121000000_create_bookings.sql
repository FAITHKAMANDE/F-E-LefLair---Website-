-- Consultation bookings for F'E LefLair.
-- Run in the Supabase SQL editor (or `supabase db push`).
--
-- Rows are both customer bookings (kind = 'booking') and slots the admin has
-- blocked off (kind = 'block'). Cancelling keeps the row for history.

create table if not exists public.bookings (
  id           uuid primary key default gen_random_uuid(),
  kind         text not null default 'booking' check (kind in ('booking', 'block')),
  status       text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  slot_date    date not null,                         -- business-local calendar date
  slot_time    text not null check (slot_time ~ '^[0-2][0-9]:[0-5][0-9]$'), -- business-local HH:MM
  name         text check (char_length(name) <= 100),
  email        text check (char_length(email) <= 200),
  phone        text check (char_length(phone) <= 40),
  note         text check (char_length(note) <= 1000),
  created_at   timestamptz not null default now(),
  cancelled_at timestamptz,
  constraint bookings_contact_required
    check (kind = 'block' or (name is not null and email is not null))
);

-- The double-booking guard: at most one confirmed row per slot.
create unique index if not exists bookings_one_confirmed_per_slot
  on public.bookings (slot_date, slot_time)
  where status = 'confirmed';

create index if not exists bookings_slot_date_idx on public.bookings (slot_date);

-- Only the server (service-role key) may touch this table. With RLS on and no
-- policies, the public anon/authenticated keys can neither read nor write it.
alter table public.bookings enable row level security;
revoke all on public.bookings from anon, authenticated;
