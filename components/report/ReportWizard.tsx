"use client";

import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";
import { FileText, CheckCircle2 } from "lucide-react";

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<any>(null);

  const handleStepComplete = async (data: any) => {
    setReportData({ ...reportData, ...data });

    if (currentStep === 4) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    { id: 1, label: "Submit Report", icon: FileText },
    { id: 2, label: "Completed", icon: CheckCircle2 },
  ];

  return (
    <div className="rounded-2xl bg-zinc-900 p-8 shadow-lg">
      {/* Stepper Header */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className="flex flex-col items-center text-sm">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : isActive
                      ? "border-teal-500 text-teal-600"
                      : "border-gray-600 text-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`mt-2 ${
                    isCompleted || isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Content */}
      <div>
        {currentStep === 1 && <ReportForm onComplete={handleStepComplete} />}
        {currentStep === 2 && (
          <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
        )}
      </div>
    </div>
  );
}
