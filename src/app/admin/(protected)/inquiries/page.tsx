"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SITE } from "@/lib/constants";

interface InquiryRow {
  id: string;
  type: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
  status: string;
  source_page?: string;
  created_at: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [filter, setFilter] = useState("new");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setInquiries((data as InquiryRow[]) || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("inquiries").update({ status }).eq("id", id);
    load();
  }

  function exportCsv() {
    const headers = ["id", "type", "name", "phone", "email", "service", "message", "status", "created_at"];
    const rows = inquiries.map((i) =>
      headers.map((h) => JSON.stringify(String((i as unknown as Record<string, unknown>)[h] ?? ""))).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inquiries.csv";
    a.click();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-navy">Inquiries</h1>
        <Button variant="outlineDark" size="sm" onClick={exportCsv} disabled={!inquiries.length}>
          Export CSV
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["new", "contacted", "in_progress", "closed", "all"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "navy" : "outlineDark"}
            size="sm"
            onClick={() => { setFilter(f); setLoading(true); }}
          >
            {f.replace("_", " ")}
          </Button>
        ))}
      </div>
      {!isSupabaseConfigured() && (
        <p className="mt-4 rounded-lg border border-gold/30 bg-gold/10 p-4 text-sm">
          Configure Supabase to persist inquiries from contact and booking forms.
        </p>
      )}
      {loading ? (
        <p className="mt-8 text-muted-foreground">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-light-bg">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((i) => (
                <tr key={i.id} className="border-b">
                  <td className="p-3 font-medium">{i.name}</td>
                  <td className="p-3">{i.type}</td>
                  <td className="p-3">{i.phone}</td>
                  <td className="max-w-xs truncate p-3">{i.message}</td>
                  <td className="p-3">{i.status}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      <a
                        href={`${SITE.whatsapp}?text=${encodeURIComponent(`Hello ${i.name}, regarding your inquiry with Al Qibla Air Services.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-royal hover:underline"
                      >
                        WhatsApp
                      </a>
                      {i.status === "new" && (
                        <button
                          type="button"
                          className="text-xs text-gold hover:underline"
                          onClick={() => updateStatus(i.id, "contacted")}
                        >
                          Mark contacted
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!inquiries.length && <p className="p-6 text-muted-foreground">No inquiries found.</p>}
        </div>
      )}
    </div>
  );
}
