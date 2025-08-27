"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader, AlertCircle } from "lucide-react";

interface ReportDetails {
  id: string;
  reportId: string;
  status: string;
  createdAt: string;
  title: string;
  description: string;
  location: string;
}

export function ReportTracker() {
  const [reportId, setReportId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReportDetails(null);
    setLoading(true);

    if (!reportId.trim()) {
      setError("Please enter a valid Report ID.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/reports/${reportId}/details`);
      if (!response.ok) {
        throw new Error("Report not found");
      }
      const data = await response.json();
      setReportDetails(data);
    } catch (err) {
      setError(
        "Unable to find a report with that ID. Please check and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex h-9 items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 text-sm text-primary">
          <Search className="w-4 h-4" />
          Track Report Progress
        </div>
        <h1 className="mt-6 bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Follow Up on Your{" "}
          <span className="block bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">
            TruthLink Report
          </span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Enter your unique Report ID to securely check the status and updates
          of your anonymous submission.
        </p>
      </div>

      {/* Dynamic Layout Container */}
      <div className="flex justify-center">
        <div
          className={`transition-all duration-300 ease-in-out ${
            reportDetails ? "w-full grid md:grid-cols-2 gap-8" : "max-w-lg w-full"
          }`}
        >
          {/* Form Section */}
          <div
            className={`bg-card backdrop-blur-xl rounded-app-lg border 
            border-border p-6 w-full transition-all duration-300 ${
              reportDetails ? "" : "mx-auto"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="reportId"
                  className="block text-sm font-medium mb-2 text-muted-foreground"
                >
                  Report ID
                </label>
                <input
                  type="text"
                  id="reportId"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl
                           text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 
                           focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="Enter your unique Report ID"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-4 rounded-xl border border-destructive/20">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 
                         text-white py-3 px-4 rounded-xl hover:from-teal-400 
                         hover:to-teal-500 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{loading ? "Searching..." : "Track Report"}</span>
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div
            className={`transition-all duration-300 ${
              reportDetails
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 absolute"
            }`}
          >
            {reportDetails && (
              <div className="rounded-app-lg border border-border bg-card/70 backdrop-blur-xl p-6 h-full">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Report Details
                </h2>

                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={`font-medium ${getStatusColor(
                        reportDetails.status
                      )} px-3 py-1 rounded-full bg-muted/20`}
                    >
                      {reportDetails.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-muted-foreground">Report ID</span>
                    <span className="text-foreground font-mono">
                      {reportDetails.reportId || reportDetails.id}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-muted-foreground">Submitted On</span>
                    <span className="text-foreground">
                      {new Date(reportDetails.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 space-y-1.5">
                    <span className="text-muted-foreground text-sm">Title</span>
                    <span className="text-foreground block font-medium">
                      {reportDetails.title}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 space-y-1.5">
                    <span className="text-muted-foreground text-sm">Location</span>
                    <span className="text-foreground block font-medium">
                      {reportDetails.location}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 space-y-1.5">
                    <span className="text-muted-foreground text-sm">
                      Description
                    </span>
                    <p className="text-foreground text-sm leading-relaxed">
                      {reportDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    pending: "text-yellow-400",
    processing: "text-teal-400",
    completed: "text-emerald-400",
    failed: "text-red-400",
  };
  return statusColors[status.toLowerCase()] || "text-foreground";
}
