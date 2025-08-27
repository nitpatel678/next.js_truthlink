"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  User,
  LogOut,
  Filter,
  FileText,
  MapPin,
  Calendar,
  FolderOpen,
} from "lucide-react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const filteredReports = reports.filter((report) => {
    const statusMatch = filter === "ALL" || report.status === filter;
    const typeMatch = typeFilter === "ALL" || report.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING:
        "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      IN_PROGRESS:
        "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      RESOLVED:
        "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
      DISMISSED:
        "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20",
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">TruthLink Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-5 w-5" />
              <span>{session?.user?.name || "Investigator"}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-muted rounded-app-md hover:bg-muted/80 border border-border transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as ReportStatus | "ALL")
              }
              className="bg-background border border-input text-foreground rounded-app px-4 py-2 focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as ReportType | "ALL")
              }
              className="bg-background border border-input text-foreground rounded-app px-4 py-2 focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
            >
              <option value="ALL">All Report Types</option>
              {Object.values(ReportType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="text-muted-foreground">
            {filteredReports.length} Reports Found
          </div>
        </div>

        {/* Reports List */}
        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-card backdrop-blur-sm rounded-app-lg p-6 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-medium">{report.title}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {report.description}
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      {report.type}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {report.location || "Location not provided"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {report.image && (
                    <img
                      src={report.image}
                      alt="Attached Evidence"
                      className="mt-4 rounded-lg border border-border"
                    />
                  )}
                </div>

                <select
                  value={report.status}
                  onChange={(e) =>
                    updateReportStatus(
                      report.id,
                      e.target.value as ReportStatus
                    )
                  }
                  className="bg-background border border-input text-foreground rounded-app px-4 py-2 focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
                >
                  {Object.values(ReportStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-muted-foreground bg-card rounded-app-lg border border-border">
              No reports found for the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
