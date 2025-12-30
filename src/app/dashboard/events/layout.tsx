import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import { LightRays } from "@/components";
import "../../globals.css";

import { Footer } from "@/components/layout";
import { Sidebar } from "@/components/dashboardLayout";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard | DevEvent",
  description: "Manage your events and settings",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased bg-gray-900 text-gray-100 font-sans selection:bg-[#5dfeca] selection:text-black`}
      >
        {/* 1. Background (Fixed) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0.0}
            distortion={0.01}
          />
        </div>

        <Sidebar />

        <main className="pl-64 flex flex-col min-h-screen relative z-10">
          <div className="flex-1 w-full max-w-7xl mx-auto p-6">{children}</div>

          <div className="mt-auto px-6 pb-4">
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
