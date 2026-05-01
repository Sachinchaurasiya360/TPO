import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router";
import { useAuth } from "@/context/AuthContext";
import {
  AlumniSidebar,
  type AlumniTab,
} from "@/components/shared/AlumniSidebar";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { extractErrorMessage } from "@/lib/api";
import { departmentLabel } from "@/lib/studentApi";
import {
  getMyAlumniProfile,
  updateAlumniProfile,
  addPastOrg,
  deletePastOrg,
  upsertHigherStudies,
  deleteHigherStudies,
  createAlumniPost,
  listMyAlumniPosts,
  deleteMyAlumniPost,
  POST_TYPE_LABELS,
  type AlumniUser,
  type AlumniPost,
  type AlumniPostType,
} from "@/lib/alumniApi";
import {
  AlumniFeedView,
  AlumniDirectoryView,
} from "@/components/alumni/AlumniViews";
import {
  Briefcase,
  GraduationCap,
  MessageSquare,
  Plus,
  Trash2,
  Mail,
  Building2,
  X,
} from "lucide-react";

const ALUMNI_TABS: AlumniTab[] = [
  "overview",
  "profile",
  "posts",
  "feed",
  "directory",
];

const TAB_TITLES: Record<AlumniTab, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Your alumni summary." },
  profile: {
    title: "Career Profile",
    subtitle: "Maintain current role, past organisations, and higher studies.",
  },
  posts: {
    title: "My Posts",
    subtitle: "Share mentorship offers, referrals, or general advice.",
  },
  feed: {
    title: "Alumni Feed",
    subtitle: "Everything alumni are sharing across batches.",
  },
  directory: {
    title: "Alumni Directory",
    subtitle: "Discover fellow alumni by department, year, and company.",
  },
};

const POST_TYPES: AlumniPostType[] = [
  "MENTORSHIP",
  "REFERRAL",
  "CAREER_ADVICE",
  "GENERAL",
];

export function AlumniDashboard() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: AlumniTab = (ALUMNI_TABS as string[]).includes(tabParam ?? "")
    ? (tabParam as AlumniTab)
    : "overview";

  const setTab = (t: AlumniTab) => {
    const next = new URLSearchParams(searchParams);
    if (t === "overview") next.delete("tab");
    else next.set("tab", t);
    setSearchParams(next, { replace: true });
  };

  const { title, subtitle } = TAB_TITLES[tab];

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AlumniSidebar active={tab} onSelect={setTab} />
      <div className="flex min-w-0 flex-1 flex-col">
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
          <div className="max-w-6xl mx-auto">
            {tab === "overview" && <OverviewTab onNavigate={setTab} />}
            {tab === "profile" && <ProfileTab />}
            {tab === "posts" && <PostsTab />}
            {tab === "feed" && <AlumniFeedView />}
            {tab === "directory" && <AlumniDirectoryView />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ==================== OVERVIEW ====================

function OverviewTab({ onNavigate }: { onNavigate: (t: AlumniTab) => void }) {
  const [me, setMe] = useState<AlumniUser | null>(null);
  const [myPostsCount, setMyPostsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [u, posts] = await Promise.all([
          getMyAlumniProfile(),
          listMyAlumniPosts(),
        ]);
        setMe(u);
        setMyPostsCount(posts.length);
      } catch (e) {
        toast.error(extractErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-lg border border-neutral-200 bg-white"
          />
        ))}
      </div>
    );
  }

  const profile = me?.alumniProfile;
  const hasProfile = !!(
    profile?.currentOrg ||
    profile?.currentRole ||
    profile?.graduationYear ||
    profile?.higherStudies
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <StatCard
          label="Current Role"
          value={profile?.currentRole ?? "Not set"}
          hint={profile?.currentOrg ?? ""}
          icon={Briefcase}
        />
        <StatCard
          label="Graduation Year"
          value={profile?.graduationYear ? String(profile.graduationYear) : "—"}
          hint={me?.department ? departmentLabel(me.department) : ""}
          icon={GraduationCap}
        />
        <StatCard
          label="My Posts"
          value={String(myPostsCount)}
          hint="Shared with the community"
          icon={MessageSquare}
        />
      </div>

      {!hasProfile && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Finish setting up your alumni profile
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Add your current role, company, and graduation year so
                  students know where you are.
                </p>
              </div>
              <Button size="sm" onClick={() => onNavigate("profile")}>
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Share something with the community
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Post a referral, mentorship offer, or career insight.
              </p>
            </div>
            <Button size="sm" onClick={() => onNavigate("posts")}>
              New Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              {label}
            </p>
            <p className="mt-1 truncate text-xl font-semibold text-neutral-900">
              {value}
            </p>
            {hint && (
              <p className="mt-0.5 truncate text-xs text-neutral-500">{hint}</p>
            )}
          </div>
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== PROFILE ====================

function ProfileTab() {
  const [me, setMe] = useState<AlumniUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    currentOrg: "",
    currentRole: "",
    package: "",
    graduationYear: "",
    placedBy: "",
  });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const u = await getMyAlumniProfile();
      setMe(u);
      const p = u.alumniProfile;
      setForm({
        currentOrg: p?.currentOrg ?? "",
        currentRole: p?.currentRole ?? "",
        package: p?.package ?? "",
        graduationYear: p?.graduationYear ? String(p.graduationYear) : "",
        placedBy: p?.placedBy ?? "",
      });
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAlumniProfile({
        currentOrg: form.currentOrg || undefined,
        currentRole: form.currentRole || undefined,
        package: form.package || undefined,
        graduationYear: form.graduationYear
          ? Number(form.graduationYear)
          : undefined,
        placedBy: form.placedBy || undefined,
      });
      toast.success("Profile updated");
      load();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 animate-pulse rounded-lg border border-neutral-200 bg-white" />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-neutral-900">
            Current Position
          </h3>
          <FieldGroup className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field>
                <FieldLabel>Current Organisation</FieldLabel>
                <Input
                  value={form.currentOrg}
                  onChange={(e) =>
                    setForm({ ...form, currentOrg: e.target.value })
                  }
                  placeholder="e.g. Google"
                />
              </Field>
              <Field>
                <FieldLabel>Current Role</FieldLabel>
                <Input
                  value={form.currentRole}
                  onChange={(e) =>
                    setForm({ ...form, currentRole: e.target.value })
                  }
                  placeholder="e.g. Software Engineer"
                />
              </Field>
              <Field>
                <FieldLabel>Package (CTC)</FieldLabel>
                <Input
                  value={form.package}
                  onChange={(e) =>
                    setForm({ ...form, package: e.target.value })
                  }
                  placeholder="e.g. 24 LPA"
                />
              </Field>
              <Field>
                <FieldLabel>Graduation Year</FieldLabel>
                <Input
                  type="number"
                  value={form.graduationYear}
                  onChange={(e) =>
                    setForm({ ...form, graduationYear: e.target.value })
                  }
                  placeholder="e.g. 2024"
                />
              </Field>
              <Field>
                <FieldLabel>Placed By (Source)</FieldLabel>
                <Input
                  value={form.placedBy}
                  onChange={(e) =>
                    setForm({ ...form, placedBy: e.target.value })
                  }
                  placeholder="College drive, Referral, Off-campus…"
                />
              </Field>
            </div>
          </FieldGroup>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <PastOrgsSection me={me} onChanged={load} />
      <HigherStudiesSection me={me} onChanged={load} />
    </div>
  );
}

function PastOrgsSection({
  me,
  onChanged,
}: {
  me: AlumniUser | null;
  onChanged: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    joiningDate: "",
    leavingDate: "",
  });
  const [saving, setSaving] = useState(false);

  const pastOrgs = me?.alumniProfile?.pastOrgs ?? [];

  const handleAdd = async () => {
    if (!form.companyName || !form.role || !form.joiningDate) {
      toast.error("Fill all required fields");
      return;
    }
    setSaving(true);
    try {
      await addPastOrg({
        companyName: form.companyName,
        role: form.role,
        joiningDate: form.joiningDate,
        leavingDate: form.leavingDate || undefined,
      });
      toast.success("Past organisation added");
      setForm({ companyName: "", role: "", joiningDate: "", leavingDate: "" });
      setShowForm(false);
      onChanged();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePastOrg(id);
      toast.success("Removed");
      onChanged();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">
            Past Organisations
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowForm((s) => !s)}
          >
            {showForm ? (
              <X className="mr-1 h-3 w-3" />
            ) : (
              <Plus className="mr-1 h-3 w-3" />
            )}
            {showForm ? "Cancel" : "Add"}
          </Button>
        </div>

        {showForm && (
          <div className="mb-4 rounded-md border border-neutral-200 bg-neutral-50 p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field>
                <FieldLabel>Company *</FieldLabel>
                <Input
                  value={form.companyName}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Role *</FieldLabel>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel>Joining Date *</FieldLabel>
                <Input
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) =>
                    setForm({ ...form, joiningDate: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Leaving Date</FieldLabel>
                <Input
                  type="date"
                  value={form.leavingDate}
                  onChange={(e) =>
                    setForm({ ...form, leavingDate: e.target.value })
                  }
                />
              </Field>
            </div>
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={handleAdd} disabled={saving}>
                {saving ? "Adding…" : "Add"}
              </Button>
            </div>
          </div>
        )}

        {pastOrgs.length === 0 ? (
          <p className="text-xs text-neutral-500">No past organisations yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {pastOrgs.map((o) => (
              <li
                key={o.id}
                className="flex items-start justify-between gap-3 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-neutral-900">
                    {o.role} · {o.companyName}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {new Date(o.joiningDate).toLocaleDateString()} —{" "}
                    {o.leavingDate
                      ? new Date(o.leavingDate).toLocaleDateString()
                      : "Present"}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(o.id)}
                  className="text-neutral-400 hover:text-red-600"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function HigherStudiesSection({
  me,
  onChanged,
}: {
  me: AlumniUser | null;
  onChanged: () => void;
}) {
  const existing = me?.alumniProfile?.higherStudies ?? null;
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    collegeName: "",
    branch: "",
    location: "",
    joiningDate: "",
    leavingDate: "",
  });

  useEffect(() => {
    if (existing) {
      setForm({
        collegeName: existing.collegeName,
        branch: existing.branch,
        location: existing.location,
        joiningDate: existing.joiningDate.slice(0, 10),
        leavingDate: existing.leavingDate
          ? existing.leavingDate.slice(0, 10)
          : "",
      });
    }
  }, [existing]);

  const handleSave = async () => {
    if (
      !form.collegeName ||
      !form.branch ||
      !form.location ||
      !form.joiningDate
    ) {
      toast.error("Fill all required fields");
      return;
    }
    setSaving(true);
    try {
      await upsertHigherStudies({
        collegeName: form.collegeName,
        branch: form.branch,
        location: form.location,
        joiningDate: form.joiningDate,
        leavingDate: form.leavingDate || undefined,
      });
      toast.success("Saved");
      setEditing(false);
      onChanged();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteHigherStudies();
      toast.success("Removed");
      onChanged();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">
            Higher Studies
          </h3>
          {!editing && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(true)}
            >
              {existing ? "Edit" : "Add"}
            </Button>
          )}
        </div>

        {editing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field>
                <FieldLabel>College *</FieldLabel>
                <Input
                  value={form.collegeName}
                  onChange={(e) =>
                    setForm({ ...form, collegeName: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Branch *</FieldLabel>
                <Input
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel>Location *</FieldLabel>
                <Input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Joining Date *</FieldLabel>
                <Input
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) =>
                    setForm({ ...form, joiningDate: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Leaving Date</FieldLabel>
                <Input
                  type="date"
                  value={form.leavingDate}
                  onChange={(e) =>
                    setForm({ ...form, leavingDate: e.target.value })
                  }
                />
              </Field>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              {existing && (
                <Button size="sm" variant="outline" onClick={handleDelete}>
                  Remove
                </Button>
              )}
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        ) : existing ? (
          <div className="rounded-md border border-neutral-200 p-3">
            <div className="text-sm font-medium text-neutral-900">
              {existing.branch} · {existing.collegeName}
            </div>
            <div className="text-xs text-neutral-500">
              {existing.location} ·{" "}
              {new Date(existing.joiningDate).toLocaleDateString()} —{" "}
              {existing.leavingDate
                ? new Date(existing.leavingDate).toLocaleDateString()
                : "Present"}
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500">
            No higher studies record. Add one if you pursued a masters or PhD.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== POSTS (MY) ====================

function PostsTab() {
  const [posts, setPosts] = useState<AlumniPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setPosts(await listMyAlumniPosts());
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    try {
      await deleteMyAlumniPost(id);
      toast.success("Post deleted");
      load();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-neutral-900">My Posts</h2>
        <Button onClick={() => setCreating(true)}>
          <Plus className="mr-1 h-3.5 w-3.5" /> New Post
        </Button>
      </div>

      {creating && (
        <PostFormDialog
          onClose={() => setCreating(false)}
          onSaved={() => {
            setCreating(false);
            load();
          }}
        />
      )}

      {loading ? (
        <div className="text-sm text-neutral-500">Loading…</div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-neutral-500">
            You haven't posted anything yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} onDelete={() => handleDelete(p.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({
  post,
  onDelete,
}: {
  post: AlumniPost;
  onDelete?: () => void;
}) {
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
          <div className="flex items-center gap-2">
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
            {onDelete && (
              <button
                onClick={onDelete}
                className="text-neutral-400 hover:text-red-600"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
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

function PostFormDialog({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    postType: "GENERAL" as AlumniPostType,
    title: "",
    body: "",
    companyName: "",
    role: "",
    contactInfo: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!form.title || !form.body) {
      toast.error("Title and body are required");
      return;
    }
    setSaving(true);
    try {
      await createAlumniPost({
        postType: form.postType,
        title: form.title,
        body: form.body,
        companyName: form.companyName || undefined,
        role: form.role || undefined,
        contactInfo: form.contactInfo || undefined,
      });
      toast.success("Post created");
      onSaved();
    } catch (e) {
      toast.error(extractErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">New Post</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <FieldGroup className="space-y-3">
          <Field>
            <FieldLabel>Type</FieldLabel>
            <select
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              value={form.postType}
              onChange={(e) =>
                setForm({ ...form, postType: e.target.value as AlumniPostType })
              }
            >
              {POST_TYPES.map((t) => (
                <option key={t} value={t}>
                  {POST_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </Field>
          <Field>
            <FieldLabel>Title *</FieldLabel>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel>Body *</FieldLabel>
            <textarea
              className="min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </Field>
          {(form.postType === "REFERRAL" ||
            form.postType === "MENTORSHIP") && (
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Company</FieldLabel>
                <Input
                  value={form.companyName}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Role</FieldLabel>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </Field>
            </div>
          )}
          <Field>
            <FieldLabel>How to reach you</FieldLabel>
            <Input
              value={form.contactInfo}
              onChange={(e) =>
                setForm({ ...form, contactInfo: e.target.value })
              }
              placeholder="Email, LinkedIn, form link…"
            />
          </Field>
        </FieldGroup>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Posting…" : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}

