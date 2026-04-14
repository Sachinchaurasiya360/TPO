import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { useLogout } from "@/lib/useLogout";
import { extractErrorMessage } from "@/lib/api";
import {
  studentListMyApplications,
  type JobApplication,
  type Job,
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

type AppWithJob = JobApplication & { job: Job };

export function StudentApplications() {
  const handleLogout = useLogout();
  const [items, setItems] = useState<AppWithJob[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setItems(await studentListMyApplications());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar buttonName="Logout" onClick={handleLogout} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 max-w-5xl">
          <h1 className="text-2xl font-bold mb-4">My Applications</h1>

          {loading ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : items.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                You haven't applied to any jobs yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {items.map((a) => (
                <Card key={a.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    {a.job.companyLogo ? (
                      <img
                        src={a.job.companyLogo}
                        alt=""
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                        {a.job.companyName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-semibold">{a.job.jobTitle}</div>
                      <div className="text-sm text-muted-foreground">
                        {a.job.companyName} · {a.job.location} · {a.job.package}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Applied on {new Date(a.appliedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${statusColor(
                        a.status
                      )}`}
                    >
                      {a.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
