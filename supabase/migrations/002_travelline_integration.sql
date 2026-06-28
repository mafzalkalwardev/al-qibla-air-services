-- Travel Line integration migration
-- Run in Supabase SQL Editor if schema.sql was already applied

alter table public.tickets add column if not exists external_id text;
alter table public.tickets add column if not exists source_provider text default 'manual';
alter table public.tickets add column if not exists raw_payload jsonb;

alter table public.umrah_packages add column if not exists external_id text;
alter table public.umrah_packages add column if not exists source_provider text default 'manual';
alter table public.umrah_packages add column if not exists raw_payload jsonb;

alter table public.tour_packages add column if not exists external_id text;
alter table public.tour_packages add column if not exists source_provider text default 'manual';
alter table public.tour_packages add column if not exists raw_payload jsonb;

create unique index if not exists idx_tickets_provider_external
  on public.tickets (source_provider, external_id) where external_id is not null;
create unique index if not exists idx_umrah_provider_external
  on public.umrah_packages (source_provider, external_id) where external_id is not null;
create unique index if not exists idx_tour_provider_external
  on public.tour_packages (source_provider, external_id) where external_id is not null;

create table if not exists public.integration_sessions (
  id uuid primary key default uuid_generate_v4(),
  provider text not null default 'travelline',
  session_data jsonb not null default '{}',
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists idx_integration_sessions_provider on public.integration_sessions (provider);

create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  status text not null default 'pending_payment',
  product_type text not null,
  ticket_id uuid references public.tickets(id) on delete set null,
  umrah_package_id uuid references public.umrah_packages(id) on delete set null,
  tour_package_id uuid references public.tour_packages(id) on delete set null,
  external_product_id text,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  passenger_details jsonb not null default '{}',
  passengers int not null default 1,
  quoted_price numeric not null,
  currency text not null default 'PKR',
  travelline_booking_ref text,
  travelline_response jsonb,
  admin_notes text,
  error_message text,
  source_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.integration_sessions enable row level security;
alter table public.bookings enable row level security;

create policy "Public insert bookings" on public.bookings for insert with check (status = 'pending_payment');
create policy "Admin all integration_sessions" on public.integration_sessions for all using (public.is_admin());
create policy "Admin all bookings" on public.bookings for all using (public.is_admin());
