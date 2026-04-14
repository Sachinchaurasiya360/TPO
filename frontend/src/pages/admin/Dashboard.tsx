import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/navbar";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/lib/useLogout";
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
  adminSetJobStatus,
  adminUploadCompanyLogo,
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

type Tab = "overview" | "approvals" | "students" | "faculty" | "jobs" | "events";

const DEPARTMENTS = ["CSE", "COMPUTER", "ELECTRICAL", "MECHANICAL", "EXTC", "CIVIL"] as const;
const YEARS = ["FIRST_YEAR", "SECOND_YEAR", "THIRD_YEAR", "FOURTH_YEAR"] as const;

export function AdminDashboard() {
  const { user } = useAuth();
  const handleLogout = useLogout();
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: Array<{ key: Tab; label: string }> = [
    { key: "overview", label: "Overview" },
    { key: "approvals", label: "Approvals" },
    { key: "students", label: "Students" },
    { key: "faculty", label: "Faculty" },
    { key: "jobs", label: "Jobs" },
    { key: "events", label: "Events" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar buttonName="Logout" onClick={handleLogout} />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {user?.fullName}. Manage registrations, students, and faculty here.
          </p>
        </div>

        <div className="flex gap-2 border-b mb-6">
          {tabs.map((t) => (
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
        {tab === "approvals" && <ApprovalsTab />}
        {tab === "students" && <StudentsTab />}
        {tab === "faculty" && <FacultyTab />}
        {tab === "jobs" && <JobsTab />}
        {tab === "events" && <EventsTab />}
      </div>
    </div>
  );
}

// ==================== OVERVIEW ====================

function OverviewTab() {
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

  if (loading) return <p className="text-sm text-muted-foreground">Loading stats...</p>;
  if (!stats) return <p className="text-sm text-muted-foreground">No stats available.</p>;

  const totalCards = [
    { label: "Students", value: stats.totals.students },
    { label: "Alumni", value: stats.totals.alumni },
    { label: "Faculty", value: stats.totals.faculty },
  ];

  const pendingCards = [
    { label: "Registrations", value: stats.pending.registrations },
    { label: "Profile / Marks Verifications", value: stats.pending.profileOrMarksVerifications },
    { label: "Internship Verifications", value: stats.pending.internshipVerifications },
    { label: "Achievement Verifications", value: stats.pending.achievementVerifications },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-3">Active Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {totalCards.map((c) => (
            <Card key={c.label}>
              <CardHeader>
                <CardDescription>{c.label}</CardDescription>
                <CardTitle className="text-3xl">{c.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Pending Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pendingCards.map((c) => (
            <Card key={c.label}>
              <CardHeader>
                <CardDescription>{c.label}</CardDescription>
                <CardTitle className="text-3xl">{c.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Students by Department</h2>
        <Card>
          <CardContent className="py-4">
            {stats.studentsByDepartment.length === 0 ? (
              <p className="text-sm text-muted-foreground">No department data.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stats.studentsByDepartment.map((row) => (
                  <div
                    key={row.department ?? "unknown"}
                    className="flex items-center justify-between border rounded-md px-3 py-2"
                  >
                    <span className="text-sm font-medium">{row.department ?? "Unknown"}</span>
                    <span className="text-sm text-muted-foreground">{row.count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
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

  if (loading) return <p className="text-sm text-muted-foreground">Loading registrations...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Student Registrations</CardTitle>
        <CardDescription>
          Approve to activate the account, reject to deactivate. Students are notified by email.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No pending registrations.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground border-b">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Student ID</th>
                  <th className="py-2 pr-4">Department</th>
                  <th className="py-2 pr-4">Year</th>
                  <th className="py-2 pr-4">Submitted</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4 font-medium">{r.fullName}</td>
                    <td className="py-3 pr-4">{r.emailId}</td>
                    <td className="py-3 pr-4">{r.studentId ?? "—"}</td>
                    <td className="py-3 pr-4">{r.department ?? "—"}</td>
                    <td className="py-3 pr-4">{r.academicYear ?? "—"}</td>
                    <td className="py-3 pr-4">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(r.id)}
                        disabled={busyId === r.id}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(r.id)}
                        disabled={busyId === r.id}
                      >
                        Reject
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

// ==================== STUDENTS ====================

function StudentsTab() {
  const [data, setData] = useState<StudentListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<StudentListFilters>({ page: 1, limit: 20 });
  const [busyId, setBusyId] = useState<number | null>(null);

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
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">ID</th>
                      <th className="py-2 pr-4">Dept</th>
                      <th className="py-2 pr-4">Year</th>
                      <th className="py-2 pr-4">CGPA</th>
                      <th className="py-2 pr-4">Role</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((s) => (
                      <tr key={s.id} className="border-b last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{s.fullName}</td>
                        <td className="py-3 pr-4">{s.emailId}</td>
                        <td className="py-3 pr-4">{s.studentId ?? "—"}</td>
                        <td className="py-3 pr-4">{s.department ?? "—"}</td>
                        <td className="py-3 pr-4">{s.academicYear ?? "—"}</td>
                        <td className="py-3 pr-4">{s.avgCgpa?.toFixed(2) ?? "—"}</td>
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
                          {d}
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
                      <td className="py-3 pr-4 font-medium">{f.fullName}</td>
                      <td className="py-3 pr-4">{f.emailId}</td>
                      <td className="py-3 pr-4">{f.contactNo ?? "—"}</td>
                      <td className="py-3 pr-4">{f.department ?? "—"}</td>
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
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
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
            {o}
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
                  {j.companyLogo ? (
                    <img
                      src={j.companyLogo}
                      alt={j.companyName}
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

function JobFormDialog({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(emptyJobForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
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
      let companyLogo: string | undefined;
      if (logoFile) {
        const { url } = await adminUploadCompanyLogo(logoFile);
        companyLogo = url;
      }
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
        ...(companyLogo ? { companyLogo } : {}),
      };
      const { eligibleCount } = await adminCreateJob(payload);
      toast.success(`Job posted. ${eligibleCount} eligible students notified.`);
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
          <h3 className="text-lg font-semibold">Post a New Job</h3>
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
                    {d}
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
          <Field>
            <FieldLabel>Company Logo (optional, 2MB max)</FieldLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            />
          </Field>
        </FieldGroup>
        <div className="flex gap-2 mt-6 justify-end">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Posting…" : "Post Job"}
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
                      {a.student.department} · CGPA:{" "}
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

