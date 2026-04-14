import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/lib/useLogout";
import { extractErrorMessage } from "@/lib/api";
import {
  studentListEligibleJobs,
  studentApplyToJob,
  type StudentJob,
  type ApplicationStatus,
} from "@/lib/jobsApi";

const statusColor = (s: ApplicationStatus) => {
  switch (s) {
    case "APPLIED":
      return "bg-blue-100 text-blue-800";
    case "SHORTLISTED":
      return "bg-amber-100 text-amber-800";
    case "INTERVIEW":
      return "bg-purple-100 text-purple-800";
    case "SELECTED":
      return "bg-emerald-100 text-emerald-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
  }
};

export function StudentJobs() {
  const handleLogout = useLogout();
  const [jobs, setJobs] = useState<StudentJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<StudentJob | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setJobs(await studentListEligibleJobs());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleApply = async (job: StudentJob) => {
    setApplyingId(job.id);
    try {
      await studentApplyToJob(job.id);
      toast.success("Applied successfully");
      load();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setApplyingId(null);
    }
  };

  const term = search.trim().toLowerCase();
  const filtered = term
    ? jobs.filter(
        (j) =>
          j.companyName.toLowerCase().includes(term) ||
          j.jobTitle.toLowerCase().includes(term)
      )
    : jobs;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar buttonName="Logout" onClick={handleLogout} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Jobs for you</h1>
            <Input
              className="max-w-xs"
              placeholder="Search company or role…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                No eligible jobs right now. Check back later.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {filtered.map((j) => (
                <Card key={j.id}>
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <div
                      className="flex items-start gap-3 flex-1 cursor-pointer"
                      onClick={() => setSelected(j)}
                    >
                      {j.companyLogo ? (
                        <img
                          src={j.companyLogo}
                          alt=""
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                          {j.companyName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-semibold">{j.jobTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          {j.companyName} · {j.location} · {j.package}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Deadline: {new Date(j.deadline).toLocaleDateString()}
                          {j.minCgpa != null && ` · Min CGPA ${j.minCgpa}`}
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            {j.jobType}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            {j.locationType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {j.myApplication ? (
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${statusColor(
                            j.myApplication.status
                          )}`}
                        >
                          {j.myApplication.status}
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          disabled={applyingId === j.id}
                          onClick={() => handleApply(j)}
                        >
                          {applyingId === j.id ? "Applying…" : "Apply"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selected && (
            <JobDetailDrawer
              job={selected}
              onClose={() => setSelected(null)}
              onApply={() => {
                handleApply(selected);
                setSelected(null);
              }}
              applying={applyingId === selected.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function JobDetailDrawer({
  job,
  onClose,
  onApply,
  applying,
}: {
  job: StudentJob;
  onClose: () => void;
  onApply: () => void;
  applying: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-xl h-full overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
            <div className="text-sm text-muted-foreground">{job.companyName}</div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="space-y-3 text-sm">
          <Row label="Package" value={job.package} />
          <Row label="Location" value={`${job.location} (${job.locationType})`} />
          <Row label="Job Type" value={job.jobType} />
          <Row
            label="Deadline"
            value={new Date(job.deadline).toLocaleString()}
          />
          {job.minCgpa != null && <Row label="Min CGPA" value={String(job.minCgpa)} />}
          {job.openings != null && <Row label="Openings" value={String(job.openings)} />}
          <Row
            label="Eligible Years"
            value={job.eligibleYears.map((y) => y.replace("_", " ")).join(", ")}
          />
          <Row
            label="Eligible Departments"
            value={job.eligibleDepartments.join(", ")}
          />
          {job.rounds.length > 0 && (
            <Row label="Rounds" value={job.rounds.join(" → ")} />
          )}
          {job.bondDetails && <Row label="Bond" value={job.bondDetails} />}

          <div className="border-t pt-3 mt-3">
            <div className="font-medium mb-1">Description</div>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.additionalNotes && (
            <div className="border-t pt-3 mt-3">
              <div className="font-medium mb-1">Additional Notes</div>
              <p className="whitespace-pre-wrap">{job.additionalNotes}</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          {job.myApplication ? (
            <div
              className={`text-sm px-4 py-2 rounded ${statusColor(
                job.myApplication.status
              )}`}
            >
              Your status: <strong>{job.myApplication.status}</strong>
            </div>
          ) : (
            <Button onClick={onApply} disabled={applying} className="w-full">
              {applying ? "Applying…" : "Apply now"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
