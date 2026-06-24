import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Al Qibla Air Services",
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
