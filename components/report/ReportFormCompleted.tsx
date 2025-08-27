"use client";

import { CheckCircle2 } from "lucide-react"; // ✅ Proper icon import
import { useRouter } from "next/navigation";

interface ReportSubmittedProps {
  data: any;
  onComplete: (data: any) => void;
}

export function ReportSubmitted({ data, onComplete }: ReportSubmittedProps) {
  const router = useRouter();
  const reportId = data.reportId || "ERROR-ID-NOT-FOUND";

  return (
    <div className="text-center space-y-8">
      {/* Success Icon + Header */}
      <div className="flex flex-col items-center">
        <div className="bg-success/10 rounded-full p-4">
          <CheckCircle2 className="w-16 h-16 text-success" strokeWidth={2.5} />
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-foreground">
          Report Successfully Submitted
        </h3>
        <p className="mt-2 text-base text-muted-foreground max-w-md">
          Your report has been securely transmitted to the appropriate authority.
        </p>
      </div>

      {/* Report ID Box */}
      <div className="bg-card rounded-app-lg p-6 max-w-md mx-auto shadow-md border border-border">
        <h4 className="text-lg font-medium text-foreground mb-2">Your Report ID</h4>
        <div className="bg-secondary rounded-app p-3 flex items-center justify-between">
          <code className="text-primary font-mono">{reportId}</code>
          <button
            onClick={() => navigator.clipboard.writeText(reportId)}
            className="text-xs text-primary hover:underline"
          >
            Copy
          </button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Save this ID to check your report status or communicate securely with
          investigators.
        </p>
      </div>

      {/* Action */}
      <div className="pt-4">
        <button
          onClick={() => {
            onComplete?.(data);
            router.push("/");
          }}
          className="inline-flex items-center justify-center rounded-app-md bg-primary px-5 py-2.5 
                     text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 
                     transition-colors duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
