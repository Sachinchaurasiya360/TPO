import { Brain } from "lucide-react";
import { StudentLayout } from "@/components/shared/StudentLayout";

export function Aptitude() {
  return (
    <StudentLayout
      title="Aptitude tests"
      subtitle="Practice problems and scheduled assessments."
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-24 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <Brain className="h-5 w-5 text-neutral-500" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-neutral-900">
            Coming soon
          </h2>
          <p className="mt-1 max-w-md text-sm text-neutral-500">
            Aptitude tests and homework assignments will appear here once the
            placement cell publishes them.
          </p>
        </div>
      </div>
    </StudentLayout>
  );
}
