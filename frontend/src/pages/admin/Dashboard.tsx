import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { AdminSidebar, type AdminTab } from "@/components/shared/AdminSidebar";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { extractErrorMessage } from "@/lib/api";
import {
  getStats,
  listPendingRegistrations,
  approveRegistration,
  rejectRegistration,
  listFaculty,
  createFaculty,
  updateFaculty,
  listStudents,
  graduateStudent,
  setUserStatus,
  type AdminStats,
  type PendingRegistration,
  type FacultyListItem,
  type StudentListItem,
  type StudentListFilters,
  type StudentListResponse,
  type CreateFacultyPayload,
} from "@/lib/adminApi";
import {
  adminListJobs,
  adminCreateJob,
  adminUpdateJob,
  adminSetJobStatus,
  adminListApplications,
  adminUpdateApplicationStatus,
  type Job,
  type JobStatus,
  type JobType,
  type LocationType,
  type ApplicationStatus,
  type JobApplication,
  type CreateJobPayload,
} from "@/lib/jobsApi";
import {
  adminListEvents,
  adminCreateEvent,
  adminCancelEvent,
  adminDeleteEvent,
  type EventItem,
  type EventType,
  type CreateEventPayload,
} from "@/lib/eventsApi";
import { DEPARTMENT_LABELS, departmentLabel, type Department } from "@/lib/studentApi";
import {
  exportStudentsToExcel,
  exportStudentsToPdf,
  summarizeFilters,
} from "@/lib/studentsExport";
import {
  FileSpreadsheet,
  FileText as FileTextIcon,
  Users as UsersIcon,
  GraduationCap,
  UserCog,
  UserPlus,
  ClipboardCheck,
  Briefcase,
  Award,
  ArrowRight,
  CheckCircle2,
  Inbox,
  Columns3,
} from "lucide-react";

const DEPARTMENTS = ["CSE", "COMPUTER", "ELECTRICAL", "MECHANICAL", "EXTC", "CIVIL"] as const;
const YEARS = ["FIRST_YEAR", "SECOND_YEAR", "THIRD_YEAR", "FOURTH_YEAR"] as const;

const TAB_TITLES: Record<AdminTab, { title: string; subtitle: string }> = {
  overview: {
    title: "Overview",
    subtitle: "Key metrics across the placement portal.",
  },
  approvals: {
    title: "Pending Approvals",
    subtitle: "Review and approve new student registrations.",
  },
  students: {
    title: "Students",
    subtitle: "Browse, filter, and manage student accounts.",
  },
  faculty: {
    title: "Faculty",
    subtitle: "Create and manage faculty accounts.",
  },
  jobs: {
    title: "Jobs",
    subtitle: "Post and monitor placement opportunities.",
  },
  events: {
    title: "Events",
    subtitle: "Schedule drives, workshops, and seminars.",
  },
};

const ADMIN_TABS: AdminTab[] = ["overview", "approvals", "students", "faculty", "jobs", "events"];

export function AdminDashboard() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: AdminTab = (ADMIN_TABS as string[]).includes(tabParam ?? "")
    ? (tabParam as AdminTab)
    : "overview";

  const setTab = (t: AdminTab) => {
    const next = new URLSearchParams(searchParams);
    if (t === "overview") next.delete("tab");
    else next.set("tab", t);
    setSearchParams(next, { replace: true });
  };

  const { title, subtitle } = TAB_TITLES[tab];

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar active={tab} onSelect={setTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6">
          <div>
            <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
            <p className="text-xs text-neutral-500">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {user && <NotificationBell />}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-neutral-900">
                {user?.fullName}
              </p>
              <p className="text-[11px] text-neutral-500">{user?.emailId}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {tab === "overview" && <OverviewTab onNavigate={setTab} />}
            {tab === "approvals" && <ApprovalsTab />}
            {tab === "students" && <StudentsTab />}
            {tab === "faculty" && <FacultyTab />}
            {tab === "jobs" && <JobsTab />}
            {tab === "events" && <EventsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ==================== OVERVIEW ====================

function OverviewTab({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setStats(await getStats());
      } catch (e) {
        toast.error(extractErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-lg border border-neutral-200 bg-white animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-80 rounded-lg border border-neutral-200 bg-white animate-pulse lg:col-span-2" />
          <div className="h-80 rounded-lg border border-neutral-200 bg-white animate-pulse" />
        </div>
      </div>
    );
  }
  if (!stats) return <p className="text-sm text-muted-foreground">No stats available.</p>;

  type Metric = {
    label: string;
    value: number;
    icon: typeof UsersIcon;
    hint?: string;
  };

  type PendingCard = {
    label: string;
    value: number;
    icon: typeof UserPlus;
    target: AdminTab;
  };
  const pendingCards: PendingCard[] = [
    {
      label: "Registrations",
      value: stats.pending.registrations,
      icon: UserPlus,
      target: "approvals",
    },
    {
      label: "Profile / Marks",
      value: stats.pending.profileOrMarksVerifications,
      icon: ClipboardCheck,
      target: "students",
    },
    {
      label: "Internships",
      value: stats.pending.internshipVerifications,
      icon: Briefcase,
      target: "students",
    },
    {
      label: "Achievements",
      value: stats.pending.achievementVerifications,
      icon: Award,
      target: "students",
    },
  ];

  const totalPending = pendingCards.reduce((sum, c) => sum + c.value, 0);

  const metrics: Metric[] = [
    { label: "Students", value: stats.totals.students, icon: UsersIcon, hint: "Active" },
    { label: "Alumni", value: stats.totals.alumni, icon: GraduationCap, hint: "Graduated" },
    { label: "Faculty", value: stats.totals.faculty, icon: UserCog, hint: "On staff" },
    {
      label: "Pending review",
      value: totalPending,
      icon: Inbox,
      hint: totalPending === 0 ? "All clear" : "Needs action",
    },
  ];

  const maxDept =
    stats.studentsByDepartment.reduce((m, r) => Math.max(m, r.count), 0) || 1;
  const totalDeptStudents = stats.studentsByDepartment.reduce(
    (s, r) => s + r.count,
    0
  );

  return (
    <div className="space-y-4">
      {/* ===== Metric tiles ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isPending = m.label === "Pending review";
          const showDot = isPending && m.value > 0;
          const clickable = isPending && m.value > 0;
          const content = (
            <>
              <div className="flex items-center justify-between text-neutral-600">
                <p className="text-sm font-medium">{m.label}</p>
                <Icon className="h-4 w-4 text-neutral-400" strokeWidth={2} />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums text-neutral-900">
                {m.value.toLocaleString()}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
                {showDot && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                )}
                <span>{m.hint}</span>
              </div>
            </>
          );
          return clickable ? (
            <button
              key={m.label}
              type="button"
              onClick={() => onNavigate("approvals")}
              className="rounded-lg border border-neutral-200 bg-white p-5 text-left transition-colors hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {content}
            </button>
          ) : (
            <div
              key={m.label}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* ===== Two-column: Pending queue + Department bars ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending queue */}
        <div className="rounded-lg border border-neutral-200 bg-white lg:col-span-2">
          <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">
                Pending review
              </h2>
              <p className="mt-0.5 text-sm text-neutral-500">
                {totalPending === 0
                  ? "Nothing waiting — you're all caught up."
                  : `${totalPending} item${totalPending === 1 ? "" : "s"} need your attention.`}
              </p>
            </div>
            {totalPending > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Needs action
              </span>
            )}
          </div>

          {totalPending === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
              </div>
              <p className="mt-3 text-sm font-medium text-neutral-900">
                All clear
              </p>
              <p className="mt-1 max-w-xs text-sm text-neutral-500">
                No registrations or verifications are waiting. New submissions
                will show up here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {pendingCards
                .slice()
                .sort((a, b) => b.value - a.value)
                .map((c) => {
                  const Icon = c.icon;
                  const isUrgent = c.value > 0;
                  return (
                    <li key={c.label}>
                      <button
                        type="button"
                        onClick={() => onNavigate(c.target)}
                        disabled={!isUrgent}
                        className={`group flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                          isUrgent
                            ? "hover:bg-neutral-50"
                            : "cursor-default"
                        }`}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-neutral-900">
                            {c.label}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            {isUrgent ? "Waiting for review" : "Up to date"}
                          </p>
                        </div>
                        <span
                          className={`tabular-nums text-sm font-semibold ${
                            isUrgent ? "text-neutral-900" : "text-neutral-400"
                          }`}
                        >
                          {c.value}
                        </span>
                        <ArrowRight
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isUrgent
                              ? "text-neutral-300 group-hover:text-neutral-700"
                              : "text-transparent"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>

        {/* Department distribution */}
        <div className="rounded-lg border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-base font-semibold text-neutral-900">
              Students by department
            </h2>
            <p className="mt-0.5 text-sm text-neutral-500">
              {totalDeptStudents.toLocaleString()} students ·{" "}
              {stats.studentsByDepartment.length} department
              {stats.studentsByDepartment.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="px-5 py-4">
            {stats.studentsByDepartment.length === 0 ? (
              <p className="py-6 text-center text-sm text-neutral-500">
                No department data.
              </p>
            ) : (
              <ul className="space-y-3.5">
                {stats.studentsByDepartment
                  .slice()
                  .sort((a, b) => b.count - a.count)
                  .map((row) => {
                    const label = row.department
                      ? departmentLabel(row.department)
                      : "Unknown";
                    const pct = totalDeptStudents
                      ? Math.round((row.count / totalDeptStudents) * 100)
                      : 0;
                    const widthPct = Math.max(
                      3,
                      Math.round((row.count / maxDept) * 100)
                    );
                    return (
                      <li key={row.department ?? "unknown"}>
                        <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                          <span className="truncate font-medium text-neutral-800">
                            {label}
                          </span>
                          <span className="shrink-0 tabular-nums text-xs text-neutral-500">
                            <span className="font-semibold text-neutral-900">
                              {row.count}
                            </span>
                            <span className="ml-1.5">· {pct}%</span>
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className="h-full rounded-full bg-neutral-900"
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== APPROVALS ====================

function ApprovalsTab() {
  const [items, setItems] = useState<PendingRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listPendingRegistrations());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleApprove = async (id: number) => {
    setBusyId(id);
    try {
      await approveRegistration(id);
      toast.success("Account approved");
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id: number) => {
    const reason = window.prompt("Reason for rejection (optional):") ?? undefined;
    setBusyId(id);
    try {
      await rejectRegistration(id, reason || undefined);
      toast.success("Account rejected");
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 px-5 py-4">
          <div className="h-5 w-48 animate-pulse rounded bg-neutral-100" />
          <div className="mt-2 h-3 w-80 animate-pulse rounded bg-neutral-100" />
        </div>
        <div className="space-y-3 p-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-md bg-neutral-50" />
          ))}
        </div>
      </div>
    );
  }

  const count = items.length;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-neutral-900">
              Registration queue
            </h2>
            {count > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {count} pending
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-neutral-500">
            Approve to activate the account, reject to deactivate. Students are
            notified by email.
          </p>
        </div>
      </div>

      {/* Body */}
      {count === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
          </div>
          <p className="mt-3 text-sm font-medium text-neutral-900">
            No pending registrations
          </p>
          <p className="mt-1 max-w-sm text-sm text-neutral-500">
            New student signups appear here for your review.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {items.map((r) => {
            const initials =
              r.fullName
                ?.split(" ")
                .map((p) => p[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase() || "ST";
            const submitted = new Date(r.createdAt);
            const submittedRel = submitted.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <li
                key={r.id}
                className="flex flex-wrap items-start gap-4 px-5 py-4 transition-colors hover:bg-neutral-50"
              >
                {/* Avatar */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                  {initials}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {r.fullName}
                    </p>
                    <span className="text-xs text-neutral-400">·</span>
                    <a
                      href={`mailto:${r.emailId}`}
                      className="truncate text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
                    >
                      {r.emailId}
                    </a>
                  </div>
                  <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutral-500">
                    <MetaCell label="ID" value={r.studentId ?? "—"} />
                    <MetaCell
                      label="Dept"
                      value={departmentLabel(r.department) || "—"}
                    />
                    <MetaCell label="Year" value={r.academicYear ?? "—"} />
                    <MetaCell label="Submitted" value={submittedRel} />
                  </dl>
                </div>

                {/* Actions */}
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(r.id)}
                    disabled={busyId === r.id}
                    className="border-neutral-300 text-neutral-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(r.id)}
                    disabled={busyId === r.id}
                    className="bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    Approve
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </span>
      <span className="text-neutral-700">{value}</span>
    </span>
  );
}

// ==================== STUDENTS ====================

type StudentColKey =
  | "email"
  | "studentId"
  | "department"
  | "year"
  | "cgpa"
  | "role"
  | "status";

const STUDENT_COLS: { key: StudentColKey; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "studentId", label: "ID" },
  { key: "department", label: "Department" },
  { key: "year", label: "Year" },
  { key: "cgpa", label: "CGPA" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const DEFAULT_STUDENT_COLS: Record<StudentColKey, boolean> = {
  email: true,
  studentId: true,
  department: true,
  year: true,
  cgpa: true,
  role: true,
  status: true,
};

const STUDENT_COLS_STORAGE_KEY = "admin.students.visibleCols.v1";

function StudentsTab() {
  const navigate = useNavigate();
  const [data, setData] = useState<StudentListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<StudentListFilters>({ page: 1, limit: 20 });
  const [busyId, setBusyId] = useState<number | null>(null);
  const [exporting, setExporting] = useState<"xlsx" | "pdf" | null>(null);

  const [visibleCols, setVisibleCols] = useState<Record<StudentColKey, boolean>>(
    () => {
      try {
        const raw = localStorage.getItem(STUDENT_COLS_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<Record<StudentColKey, boolean>>;
          return { ...DEFAULT_STUDENT_COLS, ...parsed };
        }
      } catch {
        /* ignore */
      }
      return DEFAULT_STUDENT_COLS;
    }
  );
  const [colsOpen, setColsOpen] = useState(false);
  const colsBtnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STUDENT_COLS_STORAGE_KEY, JSON.stringify(visibleCols));
    } catch {
      /* ignore */
    }
  }, [visibleCols]);

  useEffect(() => {
    if (!colsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        colsBtnRef.current &&
        !colsBtnRef.current.contains(e.target as Node)
      ) {
        setColsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [colsOpen]);

  const visibleColCount = useMemo(
    () => Object.values(visibleCols).filter(Boolean).length,
    [visibleCols]
  );

  const toggleCol = (key: StudentColKey) =>
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  const showAll = () =>
    setVisibleCols(
      STUDENT_COLS.reduce(
        (acc, c) => ({ ...acc, [c.key]: true }),
        {} as Record<StudentColKey, boolean>
      )
    );
  const resetCols = () => setVisibleCols(DEFAULT_STUDENT_COLS);

  const fetchAllMatching = async (): Promise<StudentListItem[]> => {
    const all: StudentListItem[] = [];
    const pageLimit = 100;
    let page = 1;
    while (true) {
      const res = await listStudents({ ...filters, page, limit: pageLimit });
      all.push(...res.items);
      if (all.length >= res.total || res.items.length === 0) break;
      page += 1;
      if (page > 1000) break;
    }
    return all;
  };

  const handleExport = async (kind: "xlsx" | "pdf") => {
    if (exporting) return;
    setExporting(kind);
    try {
      const rows = await fetchAllMatching();
      if (rows.length === 0) {
        toast.error("No students match these filters.");
        return;
      }
      const summary = summarizeFilters(filters as unknown as Record<string, unknown>);
      if (kind === "xlsx") {
        exportStudentsToExcel(rows, summary);
      } else {
        exportStudentsToPdf(rows, summary);
      }
      toast.success(`Exported ${rows.length} student(s) to ${kind.toUpperCase()}.`);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setExporting(null);
    }
  };

  const load = useCallback(async (f: StudentListFilters) => {
    setLoading(true);
    try {
      setData(await listStudents(f));
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(filters);
  }, [load, filters]);

  const updateFilter = <K extends keyof StudentListFilters>(
    key: K,
    value: StudentListFilters[K] | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleGraduate = async (id: number) => {
    if (!window.confirm("Move this student to ALUMNI? They will receive an invite email.")) return;
    setBusyId(id);
    try {
      await graduateStudent(id);
      toast.success("Student graduated to alumni");
      await load(filters);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleStatus = async (item: StudentListItem) => {
    const next = !item.isActive;
    if (
      !window.confirm(
        next ? "Activate this account?" : "Deactivate this account? User will lose access."
      )
    ) {
      return;
    }
    setBusyId(item.id);
    try {
      await setUserStatus(item.id, next);
      toast.success(`Account ${next ? "activated" : "deactivated"}`);
      await load(filters);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <FilterSelect
              label="Department"
              value={filters.department ?? ""}
              options={DEPARTMENTS}
              getLabel={(o) => DEPARTMENT_LABELS[o as Department] ?? o}
              onChange={(v) =>
                updateFilter("department", v ? (v as StudentListFilters["department"]) : undefined)
              }
            />
            <FilterSelect
              label="Academic Year"
              value={filters.academicYear ?? ""}
              options={YEARS}
              onChange={(v) =>
                updateFilter(
                  "academicYear",
                  v ? (v as StudentListFilters["academicYear"]) : undefined
                )
              }
            />
            <FilterSelect
              label="Role"
              value={filters.role ?? ""}
              options={["STUDENT", "ALUMNI"]}
              onChange={(v) =>
                updateFilter("role", v ? (v as StudentListFilters["role"]) : undefined)
              }
            />
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
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-xs text-muted-foreground">Search (name / email / ID)</label>
              <Input
                value={filters.search ?? ""}
                onChange={(e) => updateFilter("search", e.target.value || undefined)}
                placeholder="Type to search..."
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setFilters({ page: 1, limit: 20 })}
                className="w-full"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-3">
            <p className="text-xs text-muted-foreground">
              {data?.total != null
                ? `${data.total} student${data.total === 1 ? "" : "s"} match these filters.`
                : "Apply filters above, then export the full matching set."}
            </p>
            <div className="flex gap-2">
              <div className="relative" ref={colsBtnRef}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setColsOpen((v) => !v)}
                  aria-expanded={colsOpen}
                >
                  <Columns3 className="h-4 w-4 mr-1.5" />
                  Columns
                  <span className="ml-1.5 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-600">
                    {visibleColCount}/{STUDENT_COLS.length}
                  </span>
                </Button>
                {colsOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-60 rounded-lg border border-neutral-200 bg-white shadow-lg">
                    <div className="flex items-center justify-between border-b border-neutral-100 px-3 py-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Columns
                      </p>
                      <div className="flex gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={showAll}
                          className="text-neutral-600 hover:text-neutral-900 hover:underline"
                        >
                          All
                        </button>
                        <span className="text-neutral-300">·</span>
                        <button
                          type="button"
                          onClick={resetCols}
                          className="text-neutral-600 hover:text-neutral-900 hover:underline"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <ul className="max-h-72 overflow-y-auto p-1">
                      {STUDENT_COLS.map((c) => (
                        <li key={c.key}>
                          <label className="flex cursor-pointer items-center gap-2.5 rounded px-2.5 py-2 text-sm hover:bg-neutral-50">
                            <input
                              type="checkbox"
                              checked={visibleCols[c.key]}
                              onChange={() => toggleCol(c.key)}
                              className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                            />
                            <span className="text-neutral-800">{c.label}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                    <p className="border-t border-neutral-100 px-3 py-2 text-[11px] text-neutral-500">
                      Name and Actions are always shown.
                    </p>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("xlsx")}
                disabled={!!exporting}
              >
                <FileSpreadsheet className="h-4 w-4 mr-1.5" />
                {exporting === "xlsx" ? "Exporting…" : "Export Excel"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
                disabled={!!exporting}
              >
                <FileTextIcon className="h-4 w-4 mr-1.5" />
                {exporting === "pdf" ? "Exporting…" : "Export PDF"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-2">
          {loading ? (
            <p className="text-sm text-muted-foreground py-4">Loading...</p>
          ) : !data || data.items.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No students match these filters.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted-foreground border-b">
                    <tr>
                      <th className="py-2 pr-4">Name</th>
                      {visibleCols.email && <th className="py-2 pr-4">Email</th>}
                      {visibleCols.studentId && <th className="py-2 pr-4">ID</th>}
                      {visibleCols.department && <th className="py-2 pr-4">Dept</th>}
                      {visibleCols.year && <th className="py-2 pr-4">Year</th>}
                      {visibleCols.cgpa && <th className="py-2 pr-4">CGPA</th>}
                      {visibleCols.role && <th className="py-2 pr-4">Role</th>}
                      {visibleCols.status && <th className="py-2 pr-4">Status</th>}
                      <th className="py-2 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((s) => (
                      <tr key={s.id} className="border-b last:border-b-0">
                        <td className="py-3 pr-4 font-medium">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/students/${s.id}`)}
                            className="text-left text-neutral-900 hover:text-neutral-600 hover:underline underline-offset-4"
                          >
                            {s.fullName}
                          </button>
                        </td>
                        {visibleCols.email && <td className="py-3 pr-4">{s.emailId}</td>}
                        {visibleCols.studentId && (
                          <td className="py-3 pr-4">{s.studentId ?? "—"}</td>
                        )}
                        {visibleCols.department && (
                          <td className="py-3 pr-4">
                            {departmentLabel(s.department) || "—"}
                          </td>
                        )}
                        {visibleCols.year && (
                          <td className="py-3 pr-4">{s.academicYear ?? "—"}</td>
                        )}
                        {visibleCols.cgpa && (
                          <td className="py-3 pr-4">{s.avgCgpa?.toFixed(2) ?? "—"}</td>
                        )}
                        {visibleCols.role && (
                          <td className="py-3 pr-4">
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                s.role === "ALUMNI"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {s.role}
                            </span>
                          </td>
                        )}
                        {visibleCols.status && (
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
                        )}
                        <td className="py-3 pr-4 text-right space-x-2">
                          {s.role === "STUDENT" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleGraduate(s.id)}
                              disabled={busyId === s.id}
                            >
                              Graduate
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(s)}
                            disabled={busyId === s.id}
                          >
                            {s.isActive ? "Deactivate" : "Activate"}
                          </Button>
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

// ==================== FACULTY ====================

const emptyFacultyForm: CreateFacultyPayload = {
  fullName: "",
  emailId: "",
  contactNo: "",
  department: "COMPUTER",
  isHOD: false,
};

function FacultyTab() {
  const navigate = useNavigate();
  const [items, setItems] = useState<FacultyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateFacultyPayload>(emptyFacultyForm);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listFaculty());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.emailId || !form.contactNo) {
      toast.error("Fill all required fields");
      return;
    }
    setSaving(true);
    try {
      await createFaculty(form);
      toast.success("Faculty created. Credentials emailed.");
      setShowForm(false);
      setForm(emptyFacultyForm);
      await refresh();
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleHOD = async (item: FacultyListItem) => {
    setBusyId(item.id);
    try {
      await updateFaculty(item.id, { isHOD: !item.isHOD });
      toast.success(item.isHOD ? "Removed as HOD" : "Marked as HOD");
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleStatus = async (item: FacultyListItem) => {
    const next = !item.isActive;
    if (!window.confirm(next ? "Activate this account?" : "Deactivate this account?")) return;
    setBusyId(item.id);
    try {
      await setUserStatus(item.id, next);
      toast.success(`Account ${next ? "activated" : "deactivated"}`);
      await refresh();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "Add Faculty"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Faculty Account</CardTitle>
            <CardDescription>
              A temporary password is auto-generated and emailed to the faculty member.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <form onSubmit={handleCreate}>
              <FieldGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      value={form.emailId}
                      onChange={(e) => setForm({ ...form, emailId: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Contact No</FieldLabel>
                    <Input
                      value={form.contactNo}
                      onChange={(e) => setForm({ ...form, contactNo: e.target.value })}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Department</FieldLabel>
                    <select
                      className="h-9 rounded-md border bg-background px-3 text-sm"
                      value={form.department}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          department: e.target.value as CreateFacultyPayload["department"],
                        })
                      }
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {DEPARTMENT_LABELS[d as Department] ?? d}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.isHOD ?? false}
                        onChange={(e) => setForm({ ...form, isHOD: e.target.checked })}
                      />
                      Mark as HOD
                    </FieldLabel>
                  </Field>
                </div>
                <Button type="submit" disabled={saving}>
                  {saving ? "Creating..." : "Create Faculty"}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          {loading ? (
            <p className="text-sm text-muted-foreground py-4">Loading faculty...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No faculty yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground border-b">
                  <tr>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Contact</th>
                    <th className="py-2 pr-4">Department</th>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((f) => (
                    <tr key={f.id} className="border-b last:border-b-0">
                      <td className="py-3 pr-4 font-medium">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/faculty/${f.id}`)}
                          className="text-left text-neutral-900 hover:text-neutral-600 hover:underline underline-offset-4"
                        >
                          {f.fullName}
                        </button>
                      </td>
                      <td className="py-3 pr-4">{f.emailId}</td>
                      <td className="py-3 pr-4">{f.contactNo ?? "—"}</td>
                      <td className="py-3 pr-4">{departmentLabel(f.department) || "—"}</td>
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
    </div>
  );
}

// ==================== HELPERS ====================

interface FilterSelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  getLabel?: (o: string) => string;
}

function FilterSelect({ label, value, options, onChange, getLabel }: FilterSelectProps) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <select
        className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {getLabel ? getLabel(o) : o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ==================== JOBS ====================

const JOB_TYPES: JobType[] = ["FULL_TIME", "INTERNSHIP", "PPO"];
const LOCATION_TYPES: LocationType[] = ["ON_SITE", "REMOTE", "HYBRID"];
const APP_STATUSES: ApplicationStatus[] = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "SELECTED",
  "REJECTED",
];

const emptyJobForm = {
  companyName: "",
  jobTitle: "",
  description: "",
  package: "",
  location: "",
  locationType: "ON_SITE" as LocationType,
  jobType: "FULL_TIME" as JobType,
  eligibleDepartments: [] as string[],
  eligibleYears: [] as string[],
  minCgpa: "",
  deadline: "",
  rounds: "",
  openings: "",
  bondDetails: "",
  additionalNotes: "",
};

function JobsTab() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selected, setSelected] = useState<Job | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const { items } = await adminListJobs({ limit: 100 });
      setJobs(items);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggleStatus = async (job: Job) => {
    try {
      const next: JobStatus = job.status === "OPEN" ? "CLOSED" : "OPEN";
      await adminSetJobStatus(job.id, next);
      toast.success(`Job ${next.toLowerCase()}`);
      load();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    }
  };

  if (selected) {
    return (
      <JobApplicantsView
        job={selected}
        onBack={() => {
          setSelected(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Jobs</h2>
        <Button onClick={() => setShowCreate(true)}>Post a Job</Button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : jobs.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            No jobs yet. Post the first one.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {jobs.map((j) => (
            <Card key={j.id}>
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center text-white text-sm font-semibold">
                    {j.companyName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{j.jobTitle}</div>
                    <div className="text-sm text-muted-foreground">
                      {j.companyName} · {j.location} · {j.package}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Deadline: {new Date(j.deadline).toLocaleDateString()} ·{" "}
                      {j._count?.applications ?? 0} applicants
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Badge>{j.jobType}</Badge>
                      <Badge>{j.locationType}</Badge>
                      <Badge variant={j.status === "OPEN" ? "green" : "gray"}>
                        {j.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelected(j)}>
                    Applicants
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingJob(j)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleToggleStatus(j)}>
                    {j.status === "OPEN" ? "Close" : "Reopen"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showCreate && (
        <JobFormDialog
          onClose={() => setShowCreate(false)}
          onSaved={() => {
            setShowCreate(false);
            load();
          }}
        />
      )}

      {editingJob && (
        <JobFormDialog
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSaved={() => {
            setEditingJob(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "gray" | "yellow";
}) {
  const cls: Record<string, string> = {
    default: "bg-gray-100 text-gray-700",
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-600",
    yellow: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded ${cls[variant]}`}>
      {children}
    </span>
  );
}

function jobToForm(job: Job): typeof emptyJobForm {
  const deadlineLocal = (() => {
    const d = new Date(job.deadline);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  })();
  return {
    companyName: job.companyName,
    jobTitle: job.jobTitle,
    description: job.description,
    package: job.package,
    location: job.location,
    locationType: job.locationType,
    jobType: job.jobType,
    eligibleDepartments: [...job.eligibleDepartments] as string[],
    eligibleYears: [...job.eligibleYears] as string[],
    minCgpa: job.minCgpa != null ? String(job.minCgpa) : "",
    deadline: deadlineLocal,
    rounds: job.rounds.join(", "),
    openings: job.openings != null ? String(job.openings) : "",
    bondDetails: job.bondDetails ?? "",
    additionalNotes: job.additionalNotes ?? "",
  };
}

function JobFormDialog({
  job,
  onClose,
  onSaved,
}: {
  job?: Job;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!job;
  const [form, setForm] = useState(() => (job ? jobToForm(job) : emptyJobForm));
  const [saving, setSaving] = useState(false);

  const toggleArr = (key: "eligibleDepartments" | "eligibleYears", val: string) => {
    setForm((s) => {
      const arr = s[key];
      return {
        ...s,
        [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

  const handleSubmit = async () => {
    if (
      !form.companyName ||
      !form.jobTitle ||
      !form.description ||
      !form.package ||
      !form.location ||
      !form.deadline ||
      form.eligibleDepartments.length === 0 ||
      form.eligibleYears.length === 0
    ) {
      toast.error("Fill required fields and select eligibility");
      return;
    }
    setSaving(true);
    try {
      const payload: CreateJobPayload = {
        companyName: form.companyName,
        jobTitle: form.jobTitle,
        description: form.description,
        package: form.package,
        location: form.location,
        locationType: form.locationType,
        jobType: form.jobType,
        eligibleDepartments: form.eligibleDepartments as CreateJobPayload["eligibleDepartments"],
        eligibleYears: form.eligibleYears as CreateJobPayload["eligibleYears"],
        deadline: new Date(form.deadline).toISOString(),
        ...(form.minCgpa ? { minCgpa: Number(form.minCgpa) } : {}),
        ...(form.openings ? { openings: Number(form.openings) } : {}),
        ...(form.rounds
          ? {
              rounds: form.rounds
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            }
          : {}),
        ...(form.bondDetails ? { bondDetails: form.bondDetails } : {}),
        ...(form.additionalNotes ? { additionalNotes: form.additionalNotes } : {}),
      };
      if (isEdit && job) {
        await adminUpdateJob(job.id, payload);
        toast.success("Job updated");
      } else {
        const { eligibleCount } = await adminCreateJob(payload);
        toast.success(`Job posted. ${eligibleCount} eligible students notified.`);
      }
      onSaved();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Edit Job" : "Post a New Job"}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <FieldGroup className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Company Name *</FieldLabel>
              <Input
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Job Title *</FieldLabel>
              <Input
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>Description *</FieldLabel>
            <textarea
              className="w-full min-h-[90px] rounded-md border bg-background px-3 py-2 text-sm"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field>
              <FieldLabel>Package *</FieldLabel>
              <Input
                placeholder="e.g. 8 LPA"
                value={form.package}
                onChange={(e) => setForm({ ...form, package: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Location *</FieldLabel>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Openings</FieldLabel>
              <Input
                type="number"
                value={form.openings}
                onChange={(e) => setForm({ ...form, openings: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field>
              <FieldLabel>Job Type</FieldLabel>
              <select
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                value={form.jobType}
                onChange={(e) =>
                  setForm({ ...form, jobType: e.target.value as JobType })
                }
              >
                {JOB_TYPES.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel>Mode</FieldLabel>
              <select
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                value={form.locationType}
                onChange={(e) =>
                  setForm({ ...form, locationType: e.target.value as LocationType })
                }
              >
                {LOCATION_TYPES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel>Min CGPA</FieldLabel>
              <Input
                type="number"
                step="0.01"
                value={form.minCgpa}
                onChange={(e) => setForm({ ...form, minCgpa: e.target.value })}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>Eligible Departments *</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((d) => {
                const active = form.eligibleDepartments.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleArr("eligibleDepartments", d)}
                    className={`text-xs px-3 py-1 rounded-full border ${
                      active
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {DEPARTMENT_LABELS[d as Department] ?? d}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field>
            <FieldLabel>Eligible Years *</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {YEARS.map((y) => {
                const active = form.eligibleYears.includes(y);
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => toggleArr("eligibleYears", y)}
                    className={`text-xs px-3 py-1 rounded-full border ${
                      active
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {y.replace("_", " ")}
                  </button>
                );
              })}
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Deadline *</FieldLabel>
              <Input
                type="datetime-local"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Rounds (comma-separated)</FieldLabel>
              <Input
                placeholder="Aptitude, Technical, HR"
                value={form.rounds}
                onChange={(e) => setForm({ ...form, rounds: e.target.value })}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>Bond Details</FieldLabel>
            <Input
              value={form.bondDetails}
              onChange={(e) => setForm({ ...form, bondDetails: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel>Additional Notes</FieldLabel>
            <textarea
              className="w-full min-h-[60px] rounded-md border bg-background px-3 py-2 text-sm"
              value={form.additionalNotes}
              onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
            />
          </Field>
        </FieldGroup>
        <div className="flex gap-2 mt-6 justify-end">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving
              ? isEdit
                ? "Saving…"
                : "Posting…"
              : isEdit
              ? "Save changes"
              : "Post Job"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function JobApplicantsView({
  job,
  onBack,
}: {
  job: Job;
  onBack: () => void;
}) {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ApplicationStatus | "">("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setApps(await adminListApplications(job.id, filter || undefined));
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [job.id, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    try {
      await adminUpdateApplicationStatus(id, status);
      toast.success(`Updated to ${status}`);
      load();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <Button size="sm" variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <h2 className="text-lg font-semibold mt-2">
            {job.companyName} · {job.jobTitle}
          </h2>
        </div>
        <select
          className="h-9 rounded-md border bg-background px-3 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value as ApplicationStatus | "")}
        >
          <option value="">All statuses</option>
          {APP_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : apps.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            No applications {filter ? `with status ${filter}` : "yet"}.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {apps.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {a.student.profilePic ? (
                    <img
                      src={a.student.profilePic}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      {a.student.fullName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{a.student.fullName}</div>
                    <div className="text-xs text-muted-foreground">
                      {a.student.emailId} · {a.student.studentId} ·{" "}
                      {departmentLabel(a.student.department)} · CGPA:{" "}
                      {a.student.avgCgpa?.toFixed(2) ?? "N/A"}
                    </div>
                    <div className="flex gap-2 mt-1">
                      {a.student.resumeUrl && (
                        <a
                          className="text-xs text-blue-600 underline"
                          href={a.student.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Resume
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      a.status === "SELECTED"
                        ? "green"
                        : a.status === "REJECTED"
                        ? "red"
                        : "yellow"
                    }
                  >
                    {a.status}
                  </Badge>
                  <select
                    className="h-8 rounded border text-xs px-2"
                    value={a.status}
                    onChange={(e) =>
                      updateStatus(a.id, e.target.value as ApplicationStatus)
                    }
                  >
                    {APP_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== EVENTS ====================

const EVENT_TYPES: EventType[] = [
  "PLACEMENT_DRIVE",
  "WORKSHOP",
  "SEMINAR",
  "MOCK_INTERVIEW",
  "WEBINAR",
  "OTHER",
];

function EventsTab() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setEvents(await adminListEvents());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this event?")) return;
    try {
      await adminCancelEvent(id);
      toast.success("Event cancelled");
      load();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event permanently?")) return;
    try {
      await adminDeleteEvent(id);
      toast.success("Event deleted");
      load();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Events</h2>
        <Button onClick={() => setShowCreate(true)}>Create Event</Button>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            No events yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {events.map((ev) => (
            <Card key={ev.id}>
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(ev.eventDate).toLocaleDateString()}{" "}
                    {ev.eventTime && `· ${ev.eventTime}`}
                    {ev.location && ` · ${ev.location}`}
                  </div>
                  {ev.description && (
                    <div className="text-sm mt-2">{ev.description}</div>
                  )}
                  <div className="flex gap-1 mt-2">
                    <Badge>{ev.type.replace("_", " ")}</Badge>
                    <Badge
                      variant={
                        ev.status === "CANCELLED"
                          ? "red"
                          : ev.status === "UPCOMING"
                          ? "green"
                          : "gray"
                      }
                    >
                      {ev.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {ev.status !== "CANCELLED" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel(ev.id)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(ev.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showCreate && (
        <EventFormDialog
          onClose={() => setShowCreate(false)}
          onSaved={() => {
            setShowCreate(false);
            load();
          }}
        />
      )}
    </div>
  );
}

function EventFormDialog({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<CreateEventPayload>({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: "",
    type: "PLACEMENT_DRIVE",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!form.title || !form.eventDate) {
      toast.error("Title and date are required");
      return;
    }
    setSaving(true);
    try {
      await adminCreateEvent({
        ...form,
        eventDate: new Date(form.eventDate).toISOString(),
      });
      toast.success("Event created");
      onSaved();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create Event</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <FieldGroup className="space-y-3">
          <Field>
            <FieldLabel>Title *</FieldLabel>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <textarea
              className="w-full min-h-[80px] rounded-md border bg-background px-3 py-2 text-sm"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Date *</FieldLabel>
              <Input
                type="date"
                value={form.eventDate}
                onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Time</FieldLabel>
              <Input
                type="time"
                value={form.eventTime || ""}
                onChange={(e) => setForm({ ...form, eventTime: e.target.value })}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>Location</FieldLabel>
            <Input
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel>Type</FieldLabel>
            <select
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as EventType })
              }
            >
              {EVENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </FieldGroup>
        <div className="flex gap-2 mt-6 justify-end">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Creating…" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}

