import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/lib/useLogout";
import { extractErrorMessage } from "@/lib/api";
import { validateFileSize } from "@/lib/fileUpload";
import {
  getMarks,
  updateMarks,
  uploadMarksheet,
  type Marks,
  type PendingVerification,
  type UpdateMarksPayload,
} from "@/lib/studentApi";

type ScoreKey =
  | "sscPercentage"
  | "hscPercentage"
  | "sem1"
  | "sem2"
  | "sem3"
  | "sem4"
  | "sem5"
  | "sem6"
  | "sem7"
  | "sem8";

type UrlKey =
  | "sscMarksheetUrl"
  | "hscMarksheetUrl"
  | "sem1MarksheetUrl"
  | "sem2MarksheetUrl"
  | "sem3MarksheetUrl"
  | "sem4MarksheetUrl"
  | "sem5MarksheetUrl"
  | "sem6MarksheetUrl"
  | "sem7MarksheetUrl"
  | "sem8MarksheetUrl";

interface Row {
  label: string;
  scoreKey: ScoreKey;
  urlKey: UrlKey;
  unit: string;
  max: number;
}

const ROWS: Row[] = [
  { label: "SSC", scoreKey: "sscPercentage", urlKey: "sscMarksheetUrl", unit: "%", max: 100 },
  { label: "HSC", scoreKey: "hscPercentage", urlKey: "hscMarksheetUrl", unit: "%", max: 100 },
  { label: "Sem 1", scoreKey: "sem1", urlKey: "sem1MarksheetUrl", unit: "CGPA", max: 10 },
  { label: "Sem 2", scoreKey: "sem2", urlKey: "sem2MarksheetUrl", unit: "CGPA", max: 10 },
  { label: "Sem 3", scoreKey: "sem3", urlKey: "sem3MarksheetUrl", unit: "CGPA", max: 10 },
  { label: "Sem 4", scoreKey: "sem4", urlKey: "sem4MarksheetUrl", unit: "CGPA", max: 10 },
  { label: "Sem 5", scoreKey: "sem5", urlKey: "sem5MarksheetUrl", unit: "CGPA", max: 10 },
  { label: "Sem 6", scoreKey: "sem6", urlKey: "sem6MarksheetUrl", unit: "CGPA", max: 10 },
  { label: "Sem 7", scoreKey: "sem7", urlKey: "sem7MarksheetUrl", unit: "CGPA", max: 10 },
  { label: "Sem 8", scoreKey: "sem8", urlKey: "sem8MarksheetUrl", unit: "CGPA", max: 10 },
];

export function Marks() {
  const handleLogOut = useLogout();
  const [marks, setMarks] = useState<Marks | null>(null);
  const [pending, setPending] = useState<PendingVerification | null>(null);
  const [scores, setScores] = useState<Record<ScoreKey, string>>({} as Record<ScoreKey, string>);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<UrlKey | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMarks();
      setMarks(data.marks);
      setPending(data.pendingVerification);
      const next: Record<string, string> = {};
      for (const r of ROWS) {
        const v = data.marks[r.scoreKey];
        next[r.scoreKey] = v === null || v === undefined ? "" : String(v);
      }
      setScores(next as Record<ScoreKey, string>);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setScore = (key: ScoreKey, value: string) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marks) return;
    setSaving(true);

    const payload: UpdateMarksPayload = {};
    for (const r of ROWS) {
      const raw = scores[r.scoreKey]?.trim();
      if (raw === "" || raw === undefined) {
        if (marks[r.scoreKey] !== null) {
          payload[r.scoreKey] = null;
        }
        continue;
      }
      const num = Number(raw);
      if (Number.isNaN(num)) {
        toast.error(`${r.label}: must be a number`);
        setSaving(false);
        return;
      }
      if (num < 0 || num > r.max) {
        toast.error(`${r.label}: must be between 0 and ${r.max}`);
        setSaving(false);
        return;
      }
      payload[r.scoreKey] = num;
    }

    try {
      const res = await updateMarks(payload);
      setMarks(res.marks);
      setPending(res.pendingVerification);
      if (res.pendingFieldCount > 0) {
        toast.success(`${res.pendingFieldCount} score(s) submitted for faculty approval.`);
      } else {
        toast.success("No score changes detected.");
      }
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleMarksheetUpload = async (urlKey: UrlKey, file: File) => {
    if (!validateFileSize(file)) return;
    setUploadingKey(urlKey);
    try {
      const { url } = await uploadMarksheet(file);
      const res = await updateMarks({ [urlKey]: url } as UpdateMarksPayload);
      setMarks(res.marks);
      toast.success("Marksheet uploaded.");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setUploadingKey(null);
    }
  };

  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          {loading || !marks ? (
            <div className="p-6 text-muted-foreground">Loading marks…</div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-semibold">Academic marks</h1>
                  <p className="text-sm text-muted-foreground">
                    Score changes require faculty approval. Marksheet uploads are saved
                    directly (PDF, max 2MB).
                  </p>
                </div>
              </div>

              {pending && Object.keys(pending.changes).length > 0 && (
                <Card className="mb-4 border-yellow-400 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="text-yellow-900">
                      Pending faculty approval
                    </CardTitle>
                    <CardDescription className="text-yellow-800">
                      {Object.keys(pending.changes).length} score change(s) awaiting review.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-yellow-900 space-y-1">
                      {Object.entries(pending.changes).map(([field, diff]) => (
                        <li key={field}>
                          <strong>{field}:</strong>{" "}
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

              <form onSubmit={handleSubmit}>
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-left">
                        <tr>
                          <th className="p-3 w-28">Exam / Sem</th>
                          <th className="p-3 w-40">Score</th>
                          <th className="p-3">Marksheet (PDF)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ROWS.map((r) => (
                          <MarkRow
                            key={r.scoreKey}
                            row={r}
                            value={scores[r.scoreKey] ?? ""}
                            onChange={(v) => setScore(r.scoreKey, v)}
                            currentUrl={marks[r.urlKey]}
                            uploading={uploadingKey === r.urlKey}
                            onUpload={(file) => handleMarksheetUpload(r.urlKey, file)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>

                <div className="flex justify-end mt-4">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save scores"}
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

interface MarkRowProps {
  row: Row;
  value: string;
  onChange: (v: string) => void;
  currentUrl: string | null;
  uploading: boolean;
  onUpload: (file: File) => void;
}

function MarkRow({ row, value, onChange, currentUrl, uploading, onUpload }: MarkRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <tr className="border-t">
      <td className="p-3 font-medium">{row.label}</td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            min={0}
            max={row.max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-24 rounded-md border px-3 text-sm"
            placeholder={row.unit === "%" ? "0 - 100" : "0 - 10"}
          />
          <span className="text-xs text-muted-foreground">{row.unit}</span>
        </div>
      </td>
      <td className="p-3">
        <div className="flex items-center gap-3">
          {currentUrl ? (
            <a
              href={currentUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-xs"
            >
              View current
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">Not uploaded</span>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onFileChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? "Uploading…" : currentUrl ? "Replace" : "Upload"}
          </Button>
        </div>
      </td>
    </tr>
  );
}
