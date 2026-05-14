"use client";

import { AlumniSidebar } from "@/components/shared/AlumniSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AlumniSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
