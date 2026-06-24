"use client";

import { usePathname } from "next/navigation";

export function ConditionalSiteChrome({
  header,
  footer,
  whatsapp,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  whatsapp: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {whatsapp}
    </>
  );
}
