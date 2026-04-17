import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Camera,
  FileText,
  Upload,
  ExternalLink,
  Loader2,
  ShieldCheck,
  AlertCircle,
  X,
} from "lucide-react";
import { StudentLayout } from "@/components/shared/StudentLayout";
import { extractErrorMessage } from "@/lib/api";
import {
  getProfile,
  updateProfile,
  uploadProfilePic,
  uploadResume,
  cancelVerification,
  type StudentProfile,
  type PendingVerification,
  DEPARTMENT_LABELS,
  type Department,
  type AcademicYear,
  type UpdateProfilePayload,
} from "@/lib/studentApi";
import { validateFileSize } from "@/lib/fileUpload";

const DEPARTMENTS: Department[] = [
  "CSE",
  "COMPUTER",
  "ELECTRICAL",
  "MECHANICAL",
  "EXTC",
  "CIVIL",
];
const YEARS: { value: AcademicYear; label: string }[] = [
  { value: "FIRST_YEAR", label: "1st Year" },
  { value: "SECOND_YEAR", label: "2nd Year" },
  { value: "THIRD_YEAR", label: "3rd Year" },
  { value: "FOURTH_YEAR", label: "4th Year" },
];

const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  legalName: "Legal Name",
  studentId: "Student ID",
  department: "Department",
  academicYear: "Academic Year",
};

interface FormState {
  fullName: string;
  legalName: string;
  contactNo: string;
  parentsContactNo: string;
  studentId: string;
  department: Department | "";
  academicYear: AcademicYear | "";
  skills: string;
  socialProfile: string;
}

const toFormState = (u: StudentProfile): FormState => ({
  fullName: u.fullName ?? "",
  legalName: u.legalName ?? "",
  contactNo: u.contactNo ?? "",
  parentsContactNo: u.parentsContactNo ?? "",
  studentId: u.studentId ?? "",
  department: (u.department ?? "") as FormState["department"],
  academicYear: (u.academicYear ?? "") as FormState["academicYear"],
  skills: (u.skills ?? []).join(", "),
  socialProfile: u.socialProfile ?? "",
});

const buildPayload = (form: FormState): UpdateProfilePayload => {
  const payload: UpdateProfilePayload = {
    fullName: form.fullName,
    legalName: form.legalName,
    contactNo: form.contactNo,
    parentsContactNo: form.parentsContactNo,
    studentId: form.studentId,
    skills: form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    socialProfile: form.socialProfile || "",
  };
  if (form.department) payload.department = form.department as Department;
  if (form.academicYear)
    payload.academicYear = form.academicYear as AcademicYear;
  return payload;
};

export function StudentDashboard() {
  const picInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [pending, setPending] = useState<PendingVerification | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data.user);
      setPending(data.pendingVerification);
      setForm(toFormState(data.user));
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !profile) return;
    setSaving(true);
    try {
      const res = await updateProfile(buildPayload(form));
      setProfile(res.user);
      setPending(res.pendingVerification);
      setForm(toFormState(res.user));
      if (res.pendingFieldCount > 0) {
        toast.success(
          `Changes saved. ${res.pendingFieldCount} field(s) await faculty approval.`
        );
      } else {
        toast.success("Profile updated.");
      }
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const onPicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateFileSize(file)) {
      if (picInputRef.current) picInputRef.current.value = "";
      return;
    }
    setUploadingPic(true);
    try {
      const { url } = await uploadProfilePic(file);
      setProfile((p) => (p ? { ...p, profilePic: url } : p));
      toast.success("Profile picture updated.");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setUploadingPic(false);
      if (picInputRef.current) picInputRef.current.value = "";
    }
  };

  const onResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateFileSize(file)) {
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      return;
    }
    setUploadingResume(true);
    try {
      const { url } = await uploadResume(file);
      setProfile((p) => (p ? { ...p, resumeUrl: url } : p));
      toast.success("Resume uploaded.");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setUploadingResume(false);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    }
  };

  const handleCancelPending = async () => {
    if (!pending) return;
    if (!confirm("Discard all pending changes?")) return;
    try {
      await cancelVerification(pending.id);
      await load();
      toast.success("Pending changes cancelled.");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  return (
    <StudentLayout
      title="Dashboard"
      subtitle="Manage your profile, resume and placement details."
    >
      {loading || !form || !profile ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      ) : (
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Welcome banner */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="flex flex-wrap items-center gap-5">
              <div className="relative">
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt=""
                    className="h-20 w-20 rounded-full object-cover ring-1 ring-neutral-200"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-2xl font-bold text-white">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => picInputRef.current?.click()}
                  disabled={uploadingPic}
                  className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-60"
                  title="Change profile picture"
                >
                  {uploadingPic ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Camera className="h-3.5 w-3.5" />
                  )}
                </button>
                <input
                  ref={picInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={onPicChange}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                  Welcome, {profile.fullName}
                </h2>
                <p className="mt-0.5 text-sm text-neutral-500">
                  {[
                    profile.studentId,
                    profile.department
                      ? DEPARTMENT_LABELS[profile.department]
                      : null,
                    profile.academicYear?.replace("_", " ").toLowerCase(),
                  ]
                    .filter(Boolean)
                    .join(" · ") || "Complete your profile to get started"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.isVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-200">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-yellow-200">
                      Verification pending
                    </span>
                  )}
                  {profile.resumeUrl ? (
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
                      Resume uploaded
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-200">
                      Resume missing
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Pending approval banner */}
          {pending && Object.keys(pending.changes).length > 0 && (
            <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-700" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-yellow-900">
                        Pending faculty approval
                      </h3>
                      <p className="mt-0.5 text-xs text-yellow-800">
                        These changes are awaiting verification.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCancelPending}
                      className="inline-flex items-center gap-1 rounded-md border border-yellow-300 bg-white px-2.5 py-1 text-xs font-medium text-yellow-900 hover:bg-yellow-100"
                    >
                      <X className="h-3 w-3" />
                      Cancel all
                    </button>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-yellow-900">
                    {Object.entries(pending.changes).map(([field, diff]) => (
                      <li key={field}>
                        <span className="font-semibold">
                          {FIELD_LABELS[field] ?? field}:
                        </span>{" "}
                        <span className="line-through opacity-60">
                          {String(diff.oldValue ?? "—")}
                        </span>{" "}
                        → <span>{String(diff.newValue ?? "—")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic info */}
            <Section
              title="Basic information"
              subtitle="Fields marked with a badge require faculty verification before becoming visible to admin and recruiters."
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  id="fullName"
                  label="Full Name"
                  verify
                  value={form.fullName}
                  onChange={(v) => set("fullName", v)}
                />
                <FormField
                  id="legalName"
                  label="Legal Name"
                  verify
                  value={form.legalName}
                  onChange={(v) => set("legalName", v)}
                  placeholder="As on official records"
                />
                <FormField
                  id="emailId"
                  label="Email"
                  value={profile.emailId}
                  onChange={() => {}}
                  disabled
                />
                <FormField
                  id="contactNo"
                  label="Contact No"
                  value={form.contactNo}
                  onChange={(v) => set("contactNo", v)}
                  placeholder="+91 7070416209"
                />
                <FormField
                  id="parentsContactNo"
                  label="Parent's Contact No"
                  value={form.parentsContactNo}
                  onChange={(v) => set("parentsContactNo", v)}
                />
                <FormField
                  id="studentId"
                  label="Student ID"
                  verify
                  value={form.studentId}
                  onChange={(v) => set("studentId", v)}
                />
                <FormSelect
                  id="department"
                  label="Department"
                  verify
                  value={form.department}
                  onChange={(v) => set("department", v)}
                  options={[
                    { value: "", label: "Select department" },
                    ...DEPARTMENTS.map((d) => ({
                      value: d,
                      label: DEPARTMENT_LABELS[d],
                    })),
                  ]}
                />
                <FormSelect
                  id="academicYear"
                  label="Academic Year"
                  verify
                  value={form.academicYear}
                  onChange={(v) => set("academicYear", v)}
                  options={[
                    { value: "", label: "Select year" },
                    ...YEARS.map((y) => ({ value: y.value, label: y.label })),
                  ]}
                />
                <FormField
                  id="skills"
                  label="Skills (comma-separated)"
                  className="md:col-span-2"
                  value={form.skills}
                  onChange={(v) => set("skills", v)}
                  placeholder="React, Node.js, PostgreSQL"
                />
                <FormField
                  id="socialProfile"
                  label="Social / Portfolio URL"
                  className="md:col-span-2"
                  value={form.socialProfile}
                  onChange={(v) => set("socialProfile", v)}
                  placeholder="https://linkedin.com/in/…"
                />
              </div>
            </Section>

            {/* Resume */}
            <Section title="Resume" subtitle="PDF only, max 2MB.">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
                  <FileText className="h-5 w-5 text-neutral-500" />
                </div>
                <div className="min-w-0 flex-1">
                  {profile.resumeUrl ? (
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:underline"
                    >
                      View current resume
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <p className="text-sm text-neutral-500">
                      No resume uploaded yet.
                    </p>
                  )}
                </div>
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={onResumeChange}
                />
                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  disabled={uploadingResume}
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-60"
                >
                  {uploadingResume ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {uploadingResume
                    ? "Uploading…"
                    : profile.resumeUrl
                      ? "Replace"
                      : "Upload"}
                </button>
              </div>
            </Section>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </StudentLayout>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <header className="mb-5">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
        )}
      </header>
      {children}
    </section>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  verify,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  verify?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-700"
      >
        {label}
        {verify && <VerifyBadge />}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 disabled:bg-neutral-50 disabled:text-neutral-500"
      />
    </div>
  );
}

function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  verify,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  verify?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-700"
      >
        {label}
        {verify && <VerifyBadge />}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 transition focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function VerifyBadge() {
  return (
    <span
      title="Changes to this field require faculty approval"
      className="rounded border border-yellow-300 bg-yellow-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-yellow-800"
    >
      Verify
    </span>
  );
}
