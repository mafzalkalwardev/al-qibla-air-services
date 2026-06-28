"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

interface AdminCrudPlaceholderProps {
  title: string;
  description: string;
  table: string;
}

type FieldType = "text" | "textarea" | "number" | "boolean";

interface FieldConfig {
  key: string;
  label: string;
  type?: FieldType;
  required?: boolean;
}

interface TableConfig {
  fields: FieldConfig[];
  titleKey: string;
  statusKey?: string;
  orderBy?: string;
}

type Row = Record<string, unknown> & { id: string };

const configs: Record<string, TableConfig> = {
  announcements: {
    titleKey: "message",
    statusKey: "active",
    orderBy: "priority",
    fields: [
      { key: "message", label: "Message", type: "textarea", required: true },
      { key: "priority", label: "Priority", type: "number" },
      { key: "active", label: "Active", type: "boolean" },
    ],
  },
  flyers: {
    titleKey: "title",
    statusKey: "active",
    orderBy: "display_order",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "category", label: "Category" },
      { key: "image_url", label: "Image URL", required: true },
      { key: "link", label: "Link" },
      { key: "display_order", label: "Display order", type: "number" },
      { key: "active", label: "Active", type: "boolean" },
    ],
  },
  umrah_packages: {
    titleKey: "title",
    statusKey: "status",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "slug", label: "Slug", required: true },
      { key: "package_code", label: "Package code" },
      { key: "category", label: "Category" },
      { key: "price", label: "Price", type: "number", required: true },
      { key: "currency", label: "Currency" },
      { key: "duration", label: "Duration", required: true },
      { key: "departure_city", label: "Departure city" },
      { key: "airline", label: "Airline" },
      { key: "hotel_makkah", label: "Makkah hotel" },
      { key: "hotel_madinah", label: "Madinah hotel" },
      { key: "image_url", label: "Image URL" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "status", label: "Status" },
    ],
  },
  tour_packages: {
    titleKey: "title",
    statusKey: "status",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "slug", label: "Slug", required: true },
      { key: "destination", label: "Destination" },
      { key: "price", label: "Price", type: "number" },
      { key: "currency", label: "Currency" },
      { key: "duration", label: "Duration", required: true },
      { key: "image_url", label: "Image URL" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "status", label: "Status" },
    ],
  },
  blog_posts: {
    titleKey: "title",
    statusKey: "published",
    orderBy: "created_at",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "slug", label: "Slug", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "content", label: "Content", type: "textarea", required: true },
      { key: "cover_image_url", label: "Cover image URL" },
      { key: "category", label: "Category" },
      { key: "author", label: "Author" },
      { key: "published", label: "Published", type: "boolean" },
    ],
  },
  gallery_items: {
    titleKey: "title",
    statusKey: "active",
    orderBy: "display_order",
    fields: [
      { key: "title", label: "Title" },
      { key: "image_url", label: "Image URL", required: true },
      { key: "alt", label: "Alt text" },
      { key: "category", label: "Category" },
      { key: "display_order", label: "Display order", type: "number" },
      { key: "active", label: "Active", type: "boolean" },
    ],
  },
  airlines: {
    titleKey: "name",
    statusKey: "active",
    fields: [
      { key: "code", label: "Code", required: true },
      { key: "name", label: "Name", required: true },
      { key: "logo_url", label: "Logo URL" },
      { key: "active", label: "Active", type: "boolean" },
    ],
  },
  site_settings: {
    titleKey: "business_name",
    orderBy: "updated_at",
    fields: [
      { key: "business_name", label: "Business name", required: true },
      { key: "tagline", label: "Tagline" },
      { key: "whatsapp_number", label: "WhatsApp number" },
      { key: "email", label: "Email" },
    ],
  },
};

function defaultValue(field: FieldConfig) {
  if (field.type === "boolean") return true;
  if (field.type === "number") return "";
  return "";
}

function emptyForm(config: TableConfig) {
  return Object.fromEntries(config.fields.map((field) => [field.key, defaultValue(field)]));
}

function normalizeValue(field: FieldConfig, value: unknown) {
  if (field.type === "boolean") return Boolean(value);
  if (field.type === "number") return value === "" || value === null ? null : Number(value);
  return value === "" ? null : value;
}

export function AdminCrudPlaceholder({ title, description, table }: AdminCrudPlaceholderProps) {
  const config = configs[table];
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>(() =>
    config ? emptyForm(config) : {}
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const configured = isSupabaseConfigured();
  const supabase = useMemo(() => (configured ? createClient() : null), [configured]);

  const loadRows = useCallback(async () => {
    if (!configured || !supabase || !config) {
      setLoading(false);
      return;
    }

    let query = supabase.from(table).select("*").limit(100);
    query = query.order(config.orderBy || "created_at", { ascending: config.orderBy !== "created_at" });
    const { data, error } = await query;
    if (error) toast.error(error.message);
    setRows((data as Row[]) || []);
    setLoading(false);
  }, [config, configured, supabase, table]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  function startEdit(row: Row) {
    setEditingId(row.id);
    setForm(Object.fromEntries(config.fields.map((field) => [field.key, row[field.key] ?? defaultValue(field)])));
  }

  function resetForm() {
    setEditingId(null);
    setForm(config ? emptyForm(config) : {});
  }

  async function save() {
    if (!supabase || !config) return;
    setSaving(true);
    const payload = Object.fromEntries(
      config.fields.map((field) => [field.key, normalizeValue(field, form[field.key])])
    );

    const { error } = editingId
      ? await supabase.from(table).update(payload).eq("id", editingId)
      : await supabase.from(table).insert(payload);

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editingId ? "Updated" : "Created");
    resetForm();
    loadRows();
  }

  async function remove(row: Row) {
    if (!supabase) return;
    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      loadRows();
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      {!configured || !config ? (
        <div className="mt-6 rounded-xl border border-border bg-white p-6">
          <p className="text-sm text-muted-foreground">
            Table: <code className="rounded bg-light-bg px-1.5 py-0.5">{table}</code>
          </p>
          <p className="mt-4 rounded-lg border border-gold/30 bg-gold/10 p-4 text-sm">
            Add Supabase environment variables and run <code>supabase/schema.sql</code> to enable
            database-backed management for {title.toLowerCase()}.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <section className="rounded-xl border border-border bg-white p-5">
            <h2 className="font-heading text-lg font-semibold text-navy">
              {editingId ? "Edit item" : "Add item"}
            </h2>
            <div className="mt-4 space-y-4">
              {config.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={`${table}-${field.key}`}>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={`${table}-${field.key}`}
                      required={field.required}
                      value={String(form[field.key] ?? "")}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  ) : field.type === "boolean" ? (
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        id={`${table}-${field.key}`}
                        type="checkbox"
                        checked={Boolean(form[field.key])}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                      />
                      Enabled
                    </label>
                  ) : (
                    <Input
                      id={`${table}-${field.key}`}
                      type={field.type === "number" ? "number" : "text"}
                      required={field.required}
                      value={String(form[field.key] ?? "")}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-2">
                <Button variant="navy" onClick={save} disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </Button>
                {editingId && (
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-white">
            {loading ? (
              <p className="p-6 text-muted-foreground">Loading...</p>
            ) : rows.length ? (
              <div className="divide-y">
                {rows.map((row) => (
                  <div key={row.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-navy">
                        {String(row[config.titleKey] || row.id)}
                      </p>
                      {config.statusKey && (
                        <p className="text-xs text-muted-foreground">
                          {config.statusKey}: {String(row[config.statusKey])}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outlineDark" onClick={() => startEdit(row)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => remove(row)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-6 text-muted-foreground">No records yet.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
