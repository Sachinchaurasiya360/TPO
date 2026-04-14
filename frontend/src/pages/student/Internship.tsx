import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/lib/useLogout";
import { extractErrorMessage } from "@/lib/api";
import { validateFileSize } from "@/lib/fileUpload";
import {
  listInternships,
  createInternship,
  updateInternship,
  deleteInternship,
  uploadCertificate,
  type Internship,
  type InternshipPayload,
} from "@/lib/studentApi";

interface FormState {
  companyName: string;
  role: string;
  roleDescription: string;
  duration: string;
  startDate: string;
  endDate: string;
  hrName: string;
  hrEmail: string;
  hrPhone: string;
  certificateUrl: string;
}

const emptyForm: FormState = {
  companyName: "",
  role: "",
  roleDescription: "",
  duration: "",
  startDate: "",
  endDate: "",
  hrName: "",
  hrEmail: "",
  hrPhone: "",
  certificateUrl: "",
};

const toForm = (i: Internship): FormState => ({
  companyName: i.companyName,
  role: i.role,
  roleDescription: i.roleDescription ?? "",
  duration: i.duration ?? "",
  startDate: i.startDate ? i.startDate.slice(0, 10) : "",
  endDate: i.endDate ? i.endDate.slice(0, 10) : "",
  hrName: i.hrName ?? "",
  hrEmail: i.hrEmail ?? "",
  hrPhone: i.hrPhone ?? "",
  certificateUrl: i.certificateUrl ?? "",
});

const formatDate = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function Internship() {
  const handleLogOut = useLogout();
  const [items, setItems] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await listInternships();
      setItems(data.items);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsAdding(true);
  };

  const startEdit = (i: Internship) => {
    setEditingId(i.id);
    setForm(toForm(i));
    setIsAdding(true);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onCertChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateFileSize(file)) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setUploadingCert(true);
    try {
      const { url } = await uploadCertificate(file);
      set("certificateUrl", url);
      toast.success("Certificate uploaded.");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setUploadingCert(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.role.trim() || !form.startDate) {
      toast.error("Company, role, and start date are required.");
      return;
    }

    setSaving(true);
    const payload: InternshipPayload = {
      companyName: form.companyName.trim(),
      role: form.role.trim(),
      roleDescription: form.roleDescription || undefined,
      duration: form.duration || undefined,
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      hrName: form.hrName || undefined,
      hrEmail: form.hrEmail || undefined,
      hrPhone: form.hrPhone || undefined,
      certificateUrl: form.certificateUrl || undefined,
    };

    try {
      if (editingId) {
        await updateInternship(editingId, payload);
        toast.success("Internship updated. Pending re-verification.");
      } else {
        await createInternship(payload);
        toast.success("Internship added. Pending faculty verification.");
      }
      cancelForm();
      await load();
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this internship? This cannot be undone.")) return;
    try {
      await deleteInternship(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Internship deleted.");
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">Internships</h1>
              <p className="text-sm text-muted-foreground">
                Add your internship history. Faculty will verify each entry. Certificates
                must be PDF, max 2MB.
              </p>
            </div>
            {!isAdding && <Button onClick={startAdd}>+ Add internship</Button>}
          </div>

          {isAdding && (
            <Card className="mb-4 border-blue-300">
              <CardHeader>
                <CardTitle>
                  {editingId ? "Edit internship" : "Add internship"}
                </CardTitle>
                <CardDescription>
                  Editing a verified internship resets it to pending.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="companyName">Company *</FieldLabel>
                      <Input
                        id="companyName"
                        value={form.companyName}
                        onChange={(e) => set("companyName", e.target.value)}
                        placeholder="Google"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="role">Role *</FieldLabel>
                      <Input
                        id="role"
                        value={form.role}
                        onChange={(e) => set("role", e.target.value)}
                        placeholder="SDE Intern"
                        required
                      />
                    </Field>
                    <Field className="lg:col-span-2">
                      <FieldLabel htmlFor="roleDescription">Work description</FieldLabel>
                      <Input
                        id="roleDescription"
                        value={form.roleDescription}
                        onChange={(e) => set("roleDescription", e.target.value)}
                        placeholder="Built internal tools using React and Node.js"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="duration">Duration</FieldLabel>
                      <Input
                        id="duration"
                        value={form.duration}
                        onChange={(e) => set("duration", e.target.value)}
                        placeholder="3 months"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="startDate">Start date *</FieldLabel>
                      <Input
                        id="startDate"
                        type="date"
                        value={form.startDate}
                        onChange={(e) => set("startDate", e.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="endDate">End date</FieldLabel>
                      <Input
                        id="endDate"
                        type="date"
                        value={form.endDate}
                        onChange={(e) => set("endDate", e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="hrName">HR / manager name</FieldLabel>
                      <Input
                        id="hrName"
                        value={form.hrName}
                        onChange={(e) => set("hrName", e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="hrEmail">HR email</FieldLabel>
                      <Input
                        id="hrEmail"
                        type="email"
                        value={form.hrEmail}
                        onChange={(e) => set("hrEmail", e.target.value)}
                        placeholder="hr@company.com"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="hrPhone">HR phone</FieldLabel>
                      <Input
                        id="hrPhone"
                        value={form.hrPhone}
                        onChange={(e) => set("hrPhone", e.target.value)}
                      />
                    </Field>
                    <Field className="lg:col-span-2">
                      <FieldLabel>Offer / experience certificate (PDF, max 2MB)</FieldLabel>
                      <div className="flex items-center gap-3">
                        {form.certificateUrl ? (
                          <a
                            href={form.certificateUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 underline"
                          >
                            View uploaded file
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            No file uploaded
                          </span>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={onCertChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={uploadingCert}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {uploadingCert
                            ? "Uploading…"
                            : form.certificateUrl
                              ? "Replace"
                              : "Upload"}
                        </Button>
                      </div>
                    </Field>
                  </FieldGroup>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={cancelForm}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {saving ? "Saving…" : editingId ? "Save changes" : "Add"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="p-6 text-muted-foreground">Loading internships…</div>
          ) : items.length === 0 && !isAdding ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No internships yet. Click "+ Add internship" to create your first one.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {items.map((i) => (
                <Card key={i.id}>
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{i.role}</h3>
                        <span className="text-sm text-muted-foreground">
                          @ {i.companyName}
                        </span>
                        <VerificationBadge isVerified={i.isVerified} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(i.startDate)} → {formatDate(i.endDate)}
                        {i.duration ? ` · ${i.duration}` : ""}
                      </p>
                      {i.roleDescription && (
                        <p className="text-sm mt-2">{i.roleDescription}</p>
                      )}
                      {(i.hrName || i.hrEmail || i.hrPhone) && (
                        <p className="text-xs text-muted-foreground mt-2">
                          HR: {[i.hrName, i.hrEmail, i.hrPhone].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {i.certificateUrl && (
                        <a
                          href={i.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 underline mt-2 inline-block"
                        >
                          View certificate
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => startEdit(i)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(i.id)}
                      >
                        Delete
                      </Button>
                    </div>
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

function VerificationBadge({ isVerified }: { isVerified: boolean }) {
  return isVerified ? (
    <span className="text-[10px] font-semibold uppercase tracking-wide text-green-800 bg-green-100 border border-green-300 px-1.5 py-0.5 rounded">
      Verified
    </span>
  ) : (
    <span className="text-[10px] font-semibold uppercase tracking-wide text-yellow-800 bg-yellow-100 border border-yellow-300 px-1.5 py-0.5 rounded">
      Pending
    </span>
  );
}
