import { isSupabaseConfigured } from "@/lib/supabase/env";

interface AdminCrudPlaceholderProps {
  title: string;
  description: string;
  table: string;
}

export function AdminCrudPlaceholder({ title, description, table }: AdminCrudPlaceholderProps) {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 rounded-xl border border-border bg-white p-6">
        <p className="text-sm text-muted-foreground">
          Table: <code className="rounded bg-light-bg px-1.5 py-0.5">{table}</code>
        </p>
        {isSupabaseConfigured() ? (
          <p className="mt-4 text-sm">
            Supabase is connected. Full CRUD UI can be extended here. Data is readable via the
            public site when records are active/published.
          </p>
        ) : (
          <p className="mt-4 rounded-lg border border-gold/30 bg-gold/10 p-4 text-sm">
            Add Supabase environment variables and run <code>supabase/schema.sql</code> to enable
            database-backed management for {title.toLowerCase()}.
          </p>
        )}
      </div>
    </div>
  );
}
