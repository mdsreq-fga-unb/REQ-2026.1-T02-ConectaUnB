import React from "react";
import { Sidebar } from "@/components/Sidebar";

export default function ConectaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}