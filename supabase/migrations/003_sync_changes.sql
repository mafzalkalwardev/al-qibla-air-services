-- Sync change history for admin-visible inventory diffs

create table if not exists public.sync_changes (
  id uuid primary key default uuid_generate_v4(),
  sync_log_id uuid references public.sync_logs(id) on delete cascade,
  provider text not null,
  entity_type text not null check (entity_type in ('ticket', 'umrah_package', 'tour_package', 'promo')),
  entity_id uuid,
  external_id text,
  change_type text not null check (change_type in ('created', 'updated', 'deactivated')),
  field_changes jsonb not null default '{}',
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_sync_changes_log
  on public.sync_changes(sync_log_id, created_at desc);

create index if not exists idx_sync_changes_entity
  on public.sync_changes(entity_type, external_id, created_at desc);

alter table public.sync_changes enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'sync_changes'
      and policyname = 'Admin all sync_changes'
  ) then
    create policy "Admin all sync_changes"
      on public.sync_changes for all using (public.is_admin());
  end if;
end $$;
