# Supabase Setup — Al Qibla Air Services

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Copy the **Project URL** and **anon public key** from Settings → API.
3. Copy the **service role key** (server only — never expose to the browser).

## 2. Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_PASSWORD=your-database-password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=923315576169
CRON_SECRET=your-random-cron-secret
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=use-a-strong-password
```

## 3. Run database schema

In Supabase SQL Editor, run:

1. `supabase/schema.sql` — tables, indexes, RLS policies
2. `supabase/seed.sql` — optional development seed data

If you add `SUPABASE_DB_PASSWORD` from Supabase Dashboard > Settings > Database, you can apply the schema locally:

```bash
node scripts/apply-schema.js
npm run check-db
```

## 4. Storage buckets

Create these buckets in Supabase Storage:

| Bucket     | Public read |
|------------|-------------|
| flyers     | yes         |
| gallery    | yes         |
| packages   | yes         |
| blog       | yes         |
| airlines   | yes         |
| heroes     | yes         |
| reviews    | no          |

## 5. Create admin user

1. Supabase Dashboard → Authentication → Users → Add user (email + password).
2. After signup, insert profile row:

```sql
insert into public.profiles (id, email, full_name, role)
select id, email, 'Admin', 'admin'
from auth.users
where email = 'your-admin@email.com';
```

## 6. Row Level Security

RLS is defined in `schema.sql`:

- **Public** can read active/published/approved content only.
- **Public** can insert inquiries and pending reviews (with consent).
- **Admin** (profiles.role = admin) has full CRUD via `is_admin()` helper.

## 7. Cron ticket sync

Configure Vercel Cron to call:

```
GET /api/cron/sync-tickets/
Authorization: Bearer YOUR_CRON_SECRET
```

This logs results to `sync_logs` and uses approved providers only (no scraping).

## 8. Local development without Supabase

If env vars are missing, the site uses **fallback seed data** from `src/data/*` and shows setup notices in admin. Reviews and inquiries return success messages in dev mode but are not persisted until Supabase is configured.
