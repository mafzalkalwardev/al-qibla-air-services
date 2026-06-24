import { AdminCrudPlaceholder } from "@/components/admin/AdminCrudPlaceholder";

export default function AdminSettingsPage() {
  return (
    <AdminCrudPlaceholder
      title="Site Settings"
      description="Business info, WhatsApp number, social links, and office details."
      table="site_settings"
    />
  );
}
