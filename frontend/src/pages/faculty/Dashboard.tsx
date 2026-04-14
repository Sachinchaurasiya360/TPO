import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/navbar";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/lib/useLogout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractErrorMessage } from "@/lib/api";
import {
  getFacultyStats,
  listPendingVerifications,
  reviewVerificationRequest,
  reviewInternship,
  reviewAchievement,
  listDeptStudents,
  listDeptFaculty,
  updateDeptFaculty,
  setDeptFacultyStatus,
  type FacultyStats,
  type QueueItem,
  type DeptStudentListItem,
  type DeptStudentListResponse,
  type DeptStudentFilters,
  type DeptFacultyItem,
} from "@/lib/facultyApi";

type Tab = "overview" | "queue" | "students" | "faculty";
const YEARS = ["FIRST_YEAR", "SECOND_YEAR", "THIRD_YEAR", "FOURTH_YEAR"] as const;

export function FacultyDashboard() {
  const { user } = useAuth();
  const handleLogout = useLogout();
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: Array<{ key: Tab; label: string; show?: boolean }> = [
    { key: "overview", label: "Overview" },
    { key: "queue", label: "Verification Queue" },
    { key: "students", label: "Students" },
    { key: "faculty", label: "Department Faculty", show: !!user?.isHOD },
  ];

  const visibleTabs = tabs.filter((t) => t.show !== false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar buttonName="Logout" onClick={handleLogout} />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {user?.fullName}
            {user?.isHOD ? " (HOD)" : ""} — Department: {user?.department ?? "—"}
          </p>
        </div>

        <div className="flex gap-2 border-b mb-6">
          {visibleTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
                tab === t.key
                  ? "border-black text-black"
                  : "border-transparent text-muted-foreground hover:text-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && <OverviewTab />}
        {tab === "queue" && <QueueTab />}
        {tab === "students" && <StudentsTab />}
        {tab === "faculty" && user?.isHOD && <FacultyTab />}
      </div>
    </div>
  );
}

// ==================== OVERVIEW ====================

function OverviewTab() {
  const [stats, setStats] = useState<FacultyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setStats(await getFacultyStats());
      } catch (e) {
        toast.error(extractErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-sm text-muted-foreground">Loading stats...</p>;
  if (!stats) return <p className="text-sm text-muted-foreground">No stats available.</p>;

  const cards = [
    { label: "Pending (Profile / Marks)", value: stats.pending.profileAndMarks },
    { label: "Pending Internships", value: stats.pending.internships },
    { label: "Pending Achievements", value: stats.pending.achievements },
    { label: "Total Queue", value: stats.pending.total },
    { label: "Dept Students", value: stats.totalStudents },
    { label: "Upcoming Events", value: stats.upcomingEvents },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardHeader>
            <CardDescription>{c.label}</CardDescription>
            <CardTitle className="text-3xl">{c.value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

// ==================== VERIFICATION QUEUE ====================

function QueueTab() {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listPendingVerifications());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const keyOf = (item: QueueItem) => `${item.kind}:${item.id}`;

  const handleApprove = async (item: QueueItem) => {
    const k = keyOf(item);
    setBusyKey(k);
    try {
      if (item.kind === "VERIFICATION_REQUEST") {
        await reviewVerificationRequest(item.id, { status: "APPROVED" });
      } else if (item.kind === "INTERNSHIP") {
        await reviewInternship(item.id, { isVerified: true });
      } else {
        await reviewAchievement(item.id, { isVerified: true });
      }
      toast.success("Approved");
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyKey(null);
    }
  };

  const handleReject = async (item: QueueItem) => {
    const remarks = window.prompt("Reason for rejection (optional):") ?? undefined;
    const k = keyOf(item);
    setBusyKey(k);
    try {
      if (item.kind === "VERIFICATION_REQUEST") {
        await reviewVerificationRequest(item.id, {
          status: "REJECTED",
          remarks: remarks || undefined,
        });
      } else if (item.kind === "INTERNSHIP") {
        await reviewInternship(item.id, {
          isVerified: false,
          remarks: remarks || undefined,
        });
      } else {
        await reviewAchievement(item.id, {
          isVerified: false,
          remarks: remarks || undefined,
        });
      }
      toast.success("Rejected");
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyKey(null);
    }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading queue...</p>;
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-sm text-muted-foreground text-center">
            No pending items in your department. All caught up.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <QueueCard
          key={keyOf(item)}
          item={item}
          busy={busyKey === keyOf(item)}
          onApprove={() => handleApprove(item)}
          onReject={() => handleReject(item)}
        />
      ))}
    </div>
  );
}

function QueueCard({
  item,
  busy,
  onApprove,
  onReject,
}: {
  item: QueueItem;
  busy: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">
              {item.student.fullName}
              <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {item.entityType}
              </span>
            </CardTitle>
            <CardDescription>
              {item.student.emailId} · {item.student.studentId ?? "—"} ·{" "}
              {item.student.academicYear ?? "—"}
            </CardDescription>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <QueueItemBody item={item} />
        <div className="flex justify-end gap-2 mt-3">
          <Button size="sm" onClick={onApprove} disabled={busy}>
            Approve
          </Button>
          <Button size="sm" variant="outline" onClick={onReject} disabled={busy}>
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function QueueItemBody({ item }: { item: QueueItem }) {
  if (item.kind === "VERIFICATION_REQUEST") {
    const entries = Object.entries(item.changes);
    return (
      <div className="space-y-1 text-sm">
        {entries.map(([field, diff]) => (
          <div key={field} className="flex items-start gap-2">
            <span className="font-medium min-w-32">{field}:</span>
            <span className="line-through text-red-600">{fmt(diff.oldValue)}</span>
            <span>→</span>
            <span className="text-green-700 font-medium">{fmt(diff.newValue)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (item.kind === "INTERNSHIP") {
    const d = item.data;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <Row label="Company" value={d.companyName} />
        <Row label="Role" value={d.role} />
        <Row label="Duration" value={d.duration ?? "—"} />
        <Row
          label="Period"
          value={`${new Date(d.startDate).toLocaleDateString()} — ${
            d.endDate ? new Date(d.endDate).toLocaleDateString() : "Present"
          }`}
        />
        {d.roleDescription && (
          <div className="sm:col-span-2">
            <Row label="Description" value={d.roleDescription} />
          </div>
        )}
        <Row label="HR Name" value={d.hrName ?? "—"} />
        <Row label="HR Email" value={d.hrEmail ?? "—"} />
        {d.certificateUrl && (
          <div className="sm:col-span-2">
            <a
              href={d.certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View certificate
            </a>
          </div>
        )}
      </div>
    );
  }

  const d = item.data;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
      <Row label="Title" value={d.title} />
      <Row label="Category" value={d.category ?? "—"} />
      <Row
        label="Date"
        value={d.achievementDate ? new Date(d.achievementDate).toLocaleDateString() : "—"}
      />
      {d.description && (
        <div className="sm:col-span-2">
          <Row label="Description" value={d.description} />
        </div>
      )}
      {d.certificateUrl && (
        <div className="sm:col-span-2">
          <a
            href={d.certificateUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline text-sm"
          >
            View certificate
          </a>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-medium min-w-24">{label}:</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

function fmt(v: unknown): string {
  if (v === null || v === undefined || v === "") return "—";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

// ==================== STUDENTS ====================

function StudentsTab() {
  const [data, setData] = useState<DeptStudentListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<DeptStudentFilters>({ page: 1, limit: 20 });

  const load = useCallback(async (f: DeptStudentFilters) => {
    setLoading(true);
    try {
      setData(await listDeptStudents(f));
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(filters);
  }, [load, filters]);

  const updateFilter = <K extends keyof DeptStudentFilters>(
    key: K,
    value: DeptStudentFilters[K] | undefined
  ) => setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Academic Year</label>
              <select
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                value={filters.academicYear ?? ""}
                onChange={(e) =>
                  updateFilter(
                    "academicYear",
                    (e.target.value as DeptStudentFilters["academicYear"]) || undefined
                  )
                }
              >
                <option value="">All</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Min CGPA</label>
              <Input
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={filters.minCgpa ?? ""}
                onChange={(e) =>
                  updateFilter(
                    "minCgpa",
                    e.target.value === "" ? undefined : Number(e.target.value)
                  )
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground">Search (name / email / ID)</label>
              <Input
                value={filters.search ?? ""}
                onChange={(e) => updateFilter("search", e.target.value || undefined)}
                placeholder="Type to search..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-2">
          {loading ? (
            <p className="text-sm text-muted-foreground py-4">Loading...</p>
          ) : !data || data.items.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No students.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted-foreground border-b">
                    <tr>
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">ID</th>
                      <th className="py-2 pr-4">Year</th>
                      <th className="py-2 pr-4">CGPA</th>
                      <th className="py-2 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((s: DeptStudentListItem) => (
                      <tr key={s.id} className="border-b last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{s.fullName}</td>
                        <td className="py-3 pr-4">{s.emailId}</td>
                        <td className="py-3 pr-4">{s.studentId ?? "—"}</td>
                        <td className="py-3 pr-4">{s.academicYear ?? "—"}</td>
                        <td className="py-3 pr-4">{s.avgCgpa?.toFixed(2) ?? "—"}</td>
                        <td className="py-3 pr-4">
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              s.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {s.isActive ? "Active" : "Inactive"}
                          </span>
                          {!s.isVerified && (
                            <span className="ml-1 text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">
                              Unverified
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-xs text-muted-foreground">
                  Page {data.page} of {data.totalPages} · {data.total} total
                </span>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={data.page <= 1}
                    onClick={() =>
                      setFilters((f) => ({ ...f, page: Math.max(1, (f.page ?? 1) - 1) }))
                    }
                  >
                    Prev
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={data.page >= data.totalPages}
                    onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== FACULTY (HOD only) ====================

function FacultyTab() {
  const [items, setItems] = useState<DeptFacultyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listDeptFaculty());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleToggleHOD = async (f: DeptFacultyItem) => {
    setBusyId(f.id);
    try {
      await updateDeptFaculty(f.id, { isHOD: !f.isHOD });
      toast.success(f.isHOD ? "Removed as HOD" : "Marked as HOD");
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleStatus = async (f: DeptFacultyItem) => {
    const next = !f.isActive;
    if (!window.confirm(next ? "Activate this faculty?" : "Deactivate this faculty?")) return;
    setBusyId(f.id);
    try {
      await setDeptFacultyStatus(f.id, next);
      toast.success(`Account ${next ? "activated" : "deactivated"}`);
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty in Your Department</CardTitle>
        <CardDescription>
          As HOD, you can promote/demote other faculty and toggle their status. New accounts are
          created by admin.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        {loading ? (
          <p className="text-sm text-muted-foreground py-4">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No faculty in your department.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground border-b">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Contact</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((f) => (
                  <tr key={f.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4 font-medium">{f.fullName}</td>
                    <td className="py-3 pr-4">{f.emailId}</td>
                    <td className="py-3 pr-4">{f.contactNo ?? "—"}</td>
                    <td className="py-3 pr-4">
                      {f.isHOD ? (
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          HOD
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Faculty</span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          f.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {f.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleHOD(f)}
                        disabled={busyId === f.id}
                      >
                        {f.isHOD ? "Unset HOD" : "Set HOD"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(f)}
                        disabled={busyId === f.id}
                      >
                        {f.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
