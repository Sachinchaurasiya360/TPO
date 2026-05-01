import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { extractErrorMessage } from "@/lib/api";
import { departmentLabel, type Department } from "@/lib/studentApi";
import {
  listAlumniFeed,
  listAlumniDirectory,
  POST_TYPE_LABELS,
  type AlumniPost,
  type AlumniPostType,
  type DirectoryItem,
  type DirectoryFilters,
  type FeedFilters,
} from "@/lib/alumniApi";
import {
  Briefcase,
  Building2,
  Mail,
  Link as LinkIcon,
} from "lucide-react";

const POST_TYPES: AlumniPostType[] = [
  "MENTORSHIP",
  "REFERRAL",
  "CAREER_ADVICE",
  "GENERAL",
];

const DEPARTMENTS: Department[] = [
  "CSE",
  "COMPUTER",
  "ELECTRICAL",
  "MECHANICAL",
  "EXTC",
  "CIVIL",
];

// Read-only post card (used in feed — no delete for non-owners).
export function AlumniPostCard({ post }: { post: AlumniPost }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {post.alumni.profilePic ? (
              <img
                src={post.alumni.profilePic}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700">
                {post.alumni.fullName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-sm font-semibold text-neutral-900">
                {post.alumni.fullName}
              </div>
              <div className="text-xs text-neutral-500">
                {post.alumni.alumniProfile?.currentRole ?? ""}
                {post.alumni.alumniProfile?.currentOrg
                  ? ` · ${post.alumni.alumniProfile.currentOrg}`
                  : ""}
                {post.alumni.department
                  ? ` · ${departmentLabel(post.alumni.department)}`
                  : ""}
              </div>
            </div>
          </div>
          <span
            className={`rounded px-2 py-0.5 text-[11px] font-medium ${
              post.postType === "REFERRAL"
                ? "bg-emerald-100 text-emerald-800"
                : post.postType === "MENTORSHIP"
                  ? "bg-blue-100 text-blue-800"
                  : post.postType === "CAREER_ADVICE"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-neutral-100 text-neutral-700"
            }`}
          >
            {POST_TYPE_LABELS[post.postType]}
          </span>
        </div>

        <h3 className="mt-3 text-base font-semibold text-neutral-900">
          {post.title}
        </h3>
        <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-700">
          {post.body}
        </p>

        {(post.companyName || post.role || post.contactInfo) && (
          <div className="mt-3 flex flex-wrap gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-2 text-xs text-neutral-700">
            {post.companyName && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" /> {post.companyName}
              </span>
            )}
            {post.role && (
              <span className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" /> {post.role}
              </span>
            )}
            {post.contactInfo && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" /> {post.contactInfo}
              </span>
            )}
          </div>
        )}

        <p className="mt-3 text-[11px] text-neutral-400">
          Posted {new Date(post.createdAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}

export function AlumniFeedView() {
  const [posts, setPosts] = useState<AlumniPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FeedFilters>({ page: 1, limit: 20 });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listAlumniFeed(filters);
      setPosts(res.items);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <select
          className="h-9 rounded-md border bg-white px-3 text-sm"
          value={filters.postType ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              postType: (e.target.value || undefined) as
                | AlumniPostType
                | undefined,
            })
          }
        >
          <option value="">All types</option>
          {POST_TYPES.map((t) => (
            <option key={t} value={t}>
              {POST_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <Input
          className="h-9 w-64"
          placeholder="Search title, body, company…"
          value={filters.search ?? ""}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      {loading ? (
        <div className="text-sm text-neutral-500">Loading…</div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-neutral-500">
            No posts match your filters yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {posts.map((p) => (
            <AlumniPostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export function AlumniDirectoryView() {
  const [items, setItems] = useState<DirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DirectoryFilters>({
    page: 1,
    limit: 24,
  });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listAlumniDirectory(filters);
      setItems(res.items);
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <select
          className="h-9 rounded-md border bg-white px-3 text-sm"
          value={filters.department ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              department: (e.target.value || undefined) as
                | Department
                | undefined,
            })
          }
        >
          <option value="">All departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {departmentLabel(d)}
            </option>
          ))}
        </select>
        <Input
          className="h-9 w-32"
          type="number"
          placeholder="Grad year"
          value={filters.graduationYear ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              graduationYear: e.target.value
                ? Number(e.target.value)
                : undefined,
            })
          }
        />
        <Input
          className="h-9 w-48"
          placeholder="Company"
          value={filters.currentOrg ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, currentOrg: e.target.value || undefined })
          }
        />
        <select
          className="h-9 rounded-md border bg-white px-3 text-sm"
          value={filters.track ?? ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              track: (e.target.value || undefined) as
                | "WORKING"
                | "HIGHER_STUDIES"
                | undefined,
            })
          }
        >
          <option value="">All</option>
          <option value="WORKING">Working</option>
          <option value="HIGHER_STUDIES">Higher Studies</option>
        </select>
        <Input
          className="h-9 w-64"
          placeholder="Search name or email"
          value={filters.search ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value || undefined })
          }
        />
      </div>

      {loading ? (
        <div className="text-sm text-neutral-500">Loading…</div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-neutral-500">
            No alumni match your filters.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {a.profilePic ? (
                    <img
                      src={a.profilePic}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-700">
                      {a.fullName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-neutral-900">
                      {a.fullName}
                    </div>
                    <div className="truncate text-xs text-neutral-500">
                      {a.alumniProfile?.currentRole ??
                        (a.alumniProfile?.higherStudies
                          ? "Higher studies"
                          : "Alumni")}
                    </div>
                    <div className="truncate text-xs text-neutral-500">
                      {a.alumniProfile?.currentOrg ??
                        a.alumniProfile?.higherStudies?.collegeName ??
                        ""}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  {a.department && (
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-neutral-700">
                      {departmentLabel(a.department)}
                    </span>
                  )}
                  {a.alumniProfile?.graduationYear && (
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-neutral-700">
                      Class of {a.alumniProfile.graduationYear}
                    </span>
                  )}
                  {a.alumniProfile?.package && (
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-800">
                      {a.alumniProfile.package}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                  <a
                    href={`mailto:${a.emailId}`}
                    className="flex items-center gap-1 hover:text-neutral-900"
                  >
                    <Mail className="h-3 w-3" /> Email
                  </a>
                  {a.socialProfile && (
                    <a
                      href={a.socialProfile}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-neutral-900"
                    >
                      <LinkIcon className="h-3 w-3" /> Social
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
