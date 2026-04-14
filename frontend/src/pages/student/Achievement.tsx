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
  listAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  uploadCertificate,
  type Achievement,
  type AchievementPayload,
} from "@/lib/studentApi";

const CATEGORIES = ["academic", "sports", "cultural", "technical", "other"];

interface FormState {
  title: string;
  description: string;
  category: string;
  achievementDate: string;
  certificateUrl: string;
}

const emptyForm: FormState = {
  title: "",
  description: "",
  category: "",
  achievementDate: "",
  certificateUrl: "",
};

const toForm = (a: Achievement): FormState => ({
  title: a.title,
  description: a.description ?? "",
  category: a.category ?? "",
  achievementDate: a.achievementDate ? a.achievementDate.slice(0, 10) : "",
  certificateUrl: a.certificateUrl ?? "",
});

const formatDate = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function Achievement() {
  const handleLogOut = useLogout();
  const [items, setItems] = useState<Achievement[]>([]);
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
      const data = await listAchievements();
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

  const startEdit = (a: Achievement) => {
    setEditingId(a.id);
    setForm(toForm(a));
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
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    setSaving(true);
    const payload: AchievementPayload = {
      title: form.title.trim(),
      description: form.description || undefined,
      category: form.category || undefined,
      achievementDate: form.achievementDate || undefined,
      certificateUrl: form.certificateUrl || undefined,
    };

    try {
      if (editingId) {
        await updateAchievement(editingId, payload);
        toast.success("Achievement updated. Pending re-verification.");
      } else {
        await createAchievement(payload);
        toast.success("Achievement added. Pending faculty verification.");
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
    if (!confirm("Delete this achievement? This cannot be undone.")) return;
    try {
      await deleteAchievement(id);
      setItems((prev) => prev.filter((a) => a.id !== id));
      toast.success("Achievement deleted.");
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
              <h1 className="text-2xl font-semibold">Achievements</h1>
              <p className="text-sm text-muted-foreground">
                Awards, hackathons, certifications, and other accomplishments. Faculty
                verifies each entry. Certificates must be PDF, max 2MB.
              </p>
            </div>
            {!isAdding && <Button onClick={startAdd}>+ Add achievement</Button>}
          </div>

          {isAdding && (
            <Card className="mb-4 border-blue-300">
              <CardHeader>
                <CardTitle>
                  {editingId ? "Edit achievement" : "Add achievement"}
                </CardTitle>
                <CardDescription>
                  Editing a verified achievement resets it to pending.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Field className="lg:col-span-2">
                      <FieldLabel htmlFor="title">Title *</FieldLabel>
                      <Input
                        id="title"
                        value={form.title}
                        onChange={(e) => set("title", e.target.value)}
                        placeholder="Winner - Smart India Hackathon 2025"
                        required
                      />
                    </Field>
                    <Field className="lg:col-span-2">
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Input
                        id="description"
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        placeholder="Led a team of 4 to build an AI-powered traffic solution…"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="category">Category</FieldLabel>
                      <select
                        id="category"
                        className="h-9 w-full rounded-md border px-3 text-sm bg-transparent"
                        value={form.category}
                        onChange={(e) => set("category", e.target.value)}
                      >
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c.charAt(0).toUpperCase() + c.slice(1)}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="achievementDate">Date</FieldLabel>
                      <Input
                        id="achievementDate"
                        type="date"
                        value={form.achievementDate}
                        onChange={(e) => set("achievementDate", e.target.value)}
                      />
                    </Field>
                    <Field className="lg:col-span-2">
                      <FieldLabel>Certificate (PDF, max 2MB)</FieldLabel>
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
            <div className="p-6 text-muted-foreground">Loading achievements…</div>
          ) : items.length === 0 && !isAdding ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No achievements yet. Click "+ Add achievement" to create your first one.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {items.map((a) => (
                <Card key={a.id}>
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{a.title}</h3>
                        {a.category && (
                          <span className="text-xs text-muted-foreground capitalize">
                            · {a.category}
                          </span>
                        )}
                        <VerificationBadge isVerified={a.isVerified} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(a.achievementDate)}
                      </p>
                      {a.description && (
                        <p className="text-sm mt-2">{a.description}</p>
                      )}
                      {a.certificateUrl && (
                        <a
                          href={a.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 underline mt-2 inline-block"
                        >
                          View certificate
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => startEdit(a)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(a.id)}
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
