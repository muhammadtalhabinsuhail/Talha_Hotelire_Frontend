"use client";

import { PropertyProvider } from "./PropertyContext";


export default function AddPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PropertyProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </PropertyProvider>
  );
}
