import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Toaster } from "sonner";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-light-bg">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
