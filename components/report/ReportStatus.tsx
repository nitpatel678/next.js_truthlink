"use client";

import {
  Clock,
  Loader2,
  CheckCircle2,
  FileWarning,
  CircleDot,
} from "lucide-react";

interface ReportStatusProps {
  report: any;
}

export function ReportStatus({ report }: ReportStatusProps) {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { color: "text-yellow-500", icon: Clock };
      case "in progress":
        return { color: "text-info", icon: Loader2 };
      case "resolved":
        return { color: "text-success", icon: CheckCircle2 };
      default:
        return { color: "text-muted-foreground", icon: FileWarning };
    }
  };

  const statusConfig = getStatusConfig(report.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="rounded-app-lg bg-card border border-border p-6 space-y-8 shadow-md">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
          <div>
            <p className="text-sm text-muted-foreground">Report Status</p>
            <p
              className={`text-lg font-semibold ${statusConfig.color} capitalize`}
            >
              {report.status || "Pending Review"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Report ID</p>
          <p className="text-sm font-mono text-foreground">
            {report.reportId}
          </p>
        </div>
      </div>

      {/* Report Details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Incident Type</p>
          <p className="text-sm text-foreground mt-1">{report.incidentType}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Submitted On</p>
          <p className="text-sm text-foreground mt-1">
            {new Date(report.timestamp).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Priority Level</p>
          <p className="text-sm text-foreground mt-1">
            {report.analysis?.priority}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Assigned Department</p>
          <p className="text-sm text-foreground mt-1">
            {report.analysis?.department}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-4">Timeline</p>
        <div className="space-y-5">
          {report.timeline?.map((event: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex-none">
                <CircleDot className="w-3.5 h-3.5 mt-1 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground">{event.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          )) || (
            <p className="text-sm text-muted-foreground">
              No updates available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
