import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/lib/useLogout";
import { extractErrorMessage } from "@/lib/api";
import {
  getProfile,
  updateProfile,
  uploadProfilePic,
  uploadResume,
  cancelVerification,
  VERIFICATION_FIELDS,
  type StudentProfile,
  type PendingVerification,
  type Department,
  type AcademicYear,
  type UpdateProfilePayload,
} from "@/lib/studentApi";
import { validateFileSize } from "@/lib/fileUpload";

const DEPARTMENTS: Department[] = ["CSE", "COMPUTER", "ELECTRICAL", "MECHANICAL", "EXTC", "CIVIL"];
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

const buildPayload = (form: FormState, current: StudentProfile): UpdateProfilePayload => {
  const skillsArr = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const payload: UpdateProfilePayload = {
    fullName: form.fullName,
    legalName: form.legalName,
    contactNo: form.contactNo,
    parentsContactNo: form.parentsContactNo,
    studentId: form.studentId,
    skills: skillsArr,
    socialProfile: form.socialProfile || "",
  };

  if (form.department) payload.department = form.department as Department;
  if (form.academicYear) payload.academicYear = form.academicYear as AcademicYear;

  void current;
  return payload;
};

export function StudentDashboard() {
  const handleLogOut = useLogout();
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
      const payload = buildPayload(form, profile);
      const res = await updateProfile(payload);
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
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          {loading || !form || !profile ? (
            <div className="p-6 text-muted-foreground">Loading profile…</div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome, {profile.fullName}</CardTitle>
                    <CardDescription>
                      {profile.studentId} · {profile.department} · {profile.academicYear?.replace("_", " ")}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Drives</CardTitle>
                    <CardDescription>Job listings and events appear here in Phase F.</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {pending && Object.keys(pending.changes).length > 0 && (
                <Card className="mb-4 border-yellow-400 bg-yellow-50">
                  <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                      <CardTitle className="text-yellow-900">
                        Pending faculty approval
                      </CardTitle>
                      <CardDescription className="text-yellow-800">
                        These changes are awaiting verification:
                      </CardDescription>
                    </div>
                    <Button variant="outline" onClick={handleCancelPending}>
                      Cancel all
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-yellow-900 space-y-1">
                      {Object.entries(pending.changes).map(([field, diff]) => (
                        <li key={field}>
                          <strong>{FIELD_LABELS[field] ?? field}:</strong>{" "}
                          <span className="line-through opacity-60">
                            {String(diff.oldValue ?? "—")}
                          </span>{" "}
                          → <span>{String(diff.newValue ?? "—")}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Profile picture</CardTitle>
                  <CardDescription>JPEG, PNG, or WebP. Max 2MB.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profile.profilePic ? (
                      <img
                        src={profile.profilePic}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-semibold text-gray-500">
                        {profile.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <input
                    ref={picInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={onPicChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingPic}
                    onClick={() => picInputRef.current?.click()}
                  >
                    {uploadingPic ? "Uploading…" : "Change picture"}
                  </Button>
                </CardContent>
              </Card>

              <form onSubmit={handleSubmit}>
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Basic info</CardTitle>
                    <CardDescription>
                      Fields marked with a badge require faculty verification before becoming
                      visible to admin and recruiters.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="fullName">
                          Full Name <VerifyBadge />
                        </FieldLabel>
                        <Input
                          id="fullName"
                          value={form.fullName}
                          onChange={(e) => set("fullName", e.target.value)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="legalName">
                          Legal Name <VerifyBadge />
                        </FieldLabel>
                        <Input
                          id="legalName"
                          value={form.legalName}
                          onChange={(e) => set("legalName", e.target.value)}
                          placeholder="As on official records"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="emailId">Email</FieldLabel>
                        <Input id="emailId" value={profile.emailId} disabled />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="contactNo">Contact No</FieldLabel>
                        <Input
                          id="contactNo"
                          value={form.contactNo}
                          onChange={(e) => set("contactNo", e.target.value)}
                          placeholder="+91 7070416209"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="parentsContactNo">Parents Contact No</FieldLabel>
                        <Input
                          id="parentsContactNo"
                          value={form.parentsContactNo}
                          onChange={(e) => set("parentsContactNo", e.target.value)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="studentId">
                          Student ID <VerifyBadge />
                        </FieldLabel>
                        <Input
                          id="studentId"
                          value={form.studentId}
                          onChange={(e) => set("studentId", e.target.value)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="department">
                          Department <VerifyBadge />
                        </FieldLabel>
                        <select
                          id="department"
                          className="h-9 w-full rounded-md border px-3 text-sm bg-transparent"
                          value={form.department}
                          onChange={(e) => set("department", e.target.value)}
                        >
                          <option value="">Select department</option>
                          {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="academicYear">
                          Academic Year <VerifyBadge />
                        </FieldLabel>
                        <select
                          id="academicYear"
                          className="h-9 w-full rounded-md border px-3 text-sm bg-transparent"
                          value={form.academicYear}
                          onChange={(e) => set("academicYear", e.target.value)}
                        >
                          <option value="">Select year</option>
                          {YEARS.map((y) => (
                            <option key={y.value} value={y.value}>
                              {y.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field className="lg:col-span-2">
                        <FieldLabel htmlFor="skills">Skills (comma-separated)</FieldLabel>
                        <Input
                          id="skills"
                          value={form.skills}
                          onChange={(e) => set("skills", e.target.value)}
                          placeholder="React, Node.js, PostgreSQL"
                        />
                      </Field>
                      <Field className="lg:col-span-2">
                        <FieldLabel htmlFor="socialProfile">Social / Portfolio URL</FieldLabel>
                        <Input
                          id="socialProfile"
                          value={form.socialProfile}
                          onChange={(e) => set("socialProfile", e.target.value)}
                          placeholder="https://linkedin.com/in/…"
                        />
                      </Field>
                    </FieldGroup>
                  </CardContent>
                </Card>

                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Resume</CardTitle>
                    <CardDescription>PDF only, max 2MB.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-3">
                    {profile.resumeUrl ? (
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 underline"
                      >
                        View current resume
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">No resume uploaded.</span>
                    )}
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={onResumeChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploadingResume}
                      onClick={() => resumeInputRef.current?.click()}
                    >
                      {uploadingResume
                        ? "Uploading…"
                        : profile.resumeUrl
                          ? "Replace"
                          : "Upload"}
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save changes"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function VerifyBadge() {
  return (
    <span
      title="Changes to this field require faculty approval"
      className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-yellow-800 bg-yellow-100 border border-yellow-300 px-1.5 py-0.5 rounded"
    >
      Verify
    </span>
  );
}

void VERIFICATION_FIELDS;
