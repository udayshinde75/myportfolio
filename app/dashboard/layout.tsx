import { ReactNode } from "react";

/**
 * Dashboard pages were built for a centred, column layout. The public pages
 * now use full-width sections, so the centring lives here instead of on <body>.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center pt-24 pb-16">
      {children}
    </main>
  );
}
