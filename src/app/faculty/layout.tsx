"use client";

import { FacultySidebar } from "@/components/shared/FacultySidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <FacultySidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
