"use client";

import { ReportWizard } from "@/components/report/ReportWizard";
import { ShieldCheck } from "lucide-react";

export default function SubmitReport() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-teal-500/20 overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <main className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-9 items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 text-sm text-teal-600">
              <ShieldCheck className="h-4 w-4" />
              Secure & Anonymous
            </div>

            <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Submit Anonymous Report
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Your safety is our priority. All submissions are encrypted and anonymized
              before reaching the proper authorities.
            </p>
          </div>

          {/* Wizard Container */}
          <div className="mt-16 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm p-8 shadow-lg">
            <ReportWizard />
          </div>
        </div>
      </main>
    </div>
  );
}
