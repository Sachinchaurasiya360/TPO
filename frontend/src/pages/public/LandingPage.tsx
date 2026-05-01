import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Building2,
  GraduationCap,
  Target,
  Calendar,
  FileText,
  BookOpen,
  Rocket,
  Quote,
  MapPin,
  Mail,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { publicListUpcomingEvents, type EventItem } from "@/lib/eventsApi";

export default function LandingPage() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (!selectedEvent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedEvent]);

  useEffect(() => {
    publicListUpcomingEvents()
      .then(setUpcomingEvents)
      .catch(() => setUpcomingEvents([]));
  }, []);

  const stats = [
    { label: "Companies Visited", value: "150+", icon: Building2 },
    { label: "Students Placed", value: "1200+", icon: Users },
    { label: "Average Package", value: "6.5 LPA", icon: TrendingUp },
    { label: "Highest Package", value: "24 LPA", icon: Award },
  ];

  const features = [
    {
      title: "Career Guidance",
      description:
        "One-on-one counseling and mentorship from industry veterans and seasoned placement coordinators.",
      icon: GraduationCap,
    },
    {
      title: "Placement Drives",
      description:
        "Regular on-campus drives from product companies, service giants, and fast-growing startups.",
      icon: Briefcase,
    },
    {
      title: "Skill Development",
      description:
        "Hands-on workshops covering DSA, system design, aptitude, group discussions, and communication.",
      icon: Award,
    },
    {
      title: "Alumni Network",
      description:
        "Tap into a growing network of Vishwaniketan alumni across India's top tech and finance firms.",
      icon: Users,
    },
  ];

  const recruiters: { name: string; slug?: string }[] = [
    { name: "TCS", slug: "tcs" },
    { name: "Infosys", slug: "infosys" },
    { name: "Wipro", slug: "wipro" },
    { name: "Accenture", slug: "accenture" },
    { name: "Cognizant", slug: "cognizant" },
    { name: "IBM", slug: "ibm" },
    { name: "Tech Mahindra", slug: "techmahindra" },
    { name: "Capgemini", slug: "capgemini" },
    { name: "HCL", slug: "hcltech" },
    { name: "L&T Infotech" },
    { name: "Persistent" },
    { name: "Zensar" },
  ];

  const process = [
    {
      step: "01",
      title: "Register",
      description:
        "Create your placement account and complete your student profile in minutes.",
      icon: FileText,
    },
    {
      step: "02",
      title: "Prepare",
      description:
        "Access curated resources, practice aptitude tests, and attend training sessions.",
      icon: BookOpen,
    },
    {
      step: "03",
      title: "Apply",
      description:
        "Browse eligible openings and apply with a single click using your verified resume.",
      icon: Target,
    },
    {
      step: "04",
      title: "Succeed",
      description:
        "Ace the interview rounds and land your dream job with end-to-end TPO support.",
      icon: Rocket,
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      company: "TCS",
      branch: "Computer Engg.",
      year: "2025",
      package: "7.2 LPA",
      text: "The mock interviews and resume reviews gave me the edge I needed. I walked into my first-ever on-campus interview feeling fully prepared — and walked out with an offer on day one of placements. The TPO team genuinely invests in every student.",
      initials: "RS",
      featured: true,
    },
    {
      name: "Priya Desai",
      role: "Data Analyst",
      company: "Infosys",
      branch: "IT",
      year: "2025",
      package: "6.5 LPA",
      text: "From aptitude prep to final offer — the portal made every step effortless.",
      initials: "PD",
    },
    {
      name: "Amit Patel",
      role: "Business Analyst",
      company: "Accenture",
      branch: "Mechanical",
      year: "2024",
      package: "8.0 LPA",
      text: "Alumni sessions opened up paths I hadn't even considered.",
      initials: "AP",
    },
    {
      name: "Sneha Kulkarni",
      role: "SDE Intern → FTE",
      company: "Capgemini",
      branch: "Computer Engg.",
      year: "2025",
      package: "9.5 LPA",
      text: "Converted my summer internship to a full-time role. The placement cell helped me prep thoroughly for both rounds.",
      initials: "SK",
    },
    {
      name: "Arjun Mehta",
      role: "Associate Engineer",
      company: "Wipro",
      branch: "E&TC",
      year: "2024",
      package: "5.5 LPA",
      text: "Real-time notifications meant I never missed a deadline.",
      initials: "AM",
    },
    {
      name: "Neha Joshi",
      role: "Product Analyst",
      company: "Cognizant",
      branch: "IT",
      year: "2025",
      package: "7.0 LPA",
      text: "Department-scoped listings saved me hours of filtering through irrelevant openings.",
      initials: "NJ",
    },
    {
      name: "Vikram Rao",
      role: "Software Engineer",
      company: "HCL",
      branch: "Computer Engg.",
      year: "2024",
      package: "6.8 LPA",
      text: "The verification flow built real credibility with recruiters — interviewers could see my profile was legit.",
      initials: "VR",
    },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* ==================== NAVIGATION ==================== */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Brand */}
            <button
              onClick={() => scrollTo("top")}
              className="flex items-center gap-2.5"
            >
              <img
                src="/logo.png"
                alt="Vishwaniketan logo"
                className="h-10 w-auto"
              />
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="text-sm font-bold tracking-tight text-neutral-900">
                  Vishwaniketan
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                  TPO Portal
                </span>
              </div>
            </button>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-1 lg:flex">
              {[
                { id: "features", label: "Features" },
                { id: "process", label: "Process" },
                { id: "recruiters", label: "Recruiters" },
                { id: "events", label: "Events" },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                className="hidden h-9 text-sm text-neutral-700 hover:bg-neutral-100 sm:inline-flex"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="h-9 bg-neutral-900 px-4 text-sm text-white hover:bg-neutral-800"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <button
                className="ml-0.5 rounded-md p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="border-t border-neutral-200 py-2 lg:hidden">
              <div className="flex flex-col">
                {[
                  { id: "features", label: "Features" },
                  { id: "process", label: "Process" },
                  { id: "recruiters", label: "Recruiters" },
                  { id: "events", label: "Events" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/login");
                  }}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100 sm:hidden"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section id="top" className="relative overflow-hidden border-b border-neutral-200 bg-white">
        {/* Subtle dot grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(0 0 0 / 0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />

        <div className="relative container mx-auto px-4 pt-20 pb-20 md:pt-28 md:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Headline */}
            <h1 className="mb-6 text-5xl font-bold leading-[1.02] tracking-tight text-neutral-900 md:text-7xl lg:text-[88px]">
              Your career,
              <br />
              <span className="relative inline-block">
                launched.
                <svg
                  className="absolute -bottom-2 left-0 w-full md:-bottom-3"
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 11 Q 75 2, 150 7 T 298 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-neutral-900"
                  />
                </svg>
              </span>
            </h1>

            {/* Subhead */}
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
              The official Training & Placement portal for{" "}
              <span className="font-semibold text-neutral-900">
                Vishwaniketan iMEET
              </span>
              . Verified profiles, curated openings, one-click applications — all in one place.
            </p>

            {/* CTAs */}
            <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group h-12 bg-neutral-900 px-6 text-base text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
                onClick={() => navigate("/signup")}
              >
                Start your journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-neutral-300 bg-white px-6 text-base text-neutral-900 hover:bg-neutral-50"
                onClick={() => navigate("/login")}
              >
                Student Portal
              </Button>
            </div>

          </div>

          {/* Stats row — bordered, monochrome */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="grid grid-cols-2 divide-neutral-200 rounded-2xl border border-neutral-200 bg-white md:grid-cols-4 md:divide-x">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-center gap-4 p-6 ${
                    i < 2 ? "border-b border-neutral-200 md:border-b-0" : ""
                  } ${i % 2 === 0 ? "border-r border-neutral-200 md:border-r-0" : ""}`}
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900">
                    <stat.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-neutral-500 md:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== RECRUITER MARQUEE ==================== */}
      <section id="recruiters" className="border-y border-neutral-200 bg-neutral-50/60 py-12">
        <div className="container mx-auto px-4">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Trusted by leading recruiters
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-marquee">
              {[...recruiters, ...recruiters].map((c, i) => (
                <div
                  key={`${c.name}-${i}`}
                  className="flex min-w-[180px] items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-5 shadow-sm"
                >
                  {c.slug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${c.slug}/111827`}
                      alt={c.name}
                      loading="lazy"
                      className="h-8 max-w-[120px] object-contain"
                      onError={(e) => {
                        const img = e.currentTarget;
                        const parent = img.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="whitespace-nowrap text-base font-semibold text-neutral-700">${c.name}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="whitespace-nowrap text-base font-semibold text-neutral-700">
                      {c.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <section id="process" className="relative bg-white py-24 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <div className="mb-4 inline-block rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700">
              How it works
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              From signup to offer letter
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              A streamlined path, designed to take you from your first campus drive to your dream job.
            </p>
          </div>

          <div className="relative mx-auto max-w-6xl">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-neutral-200 lg:block" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {process.map((item) => (
                <div key={item.step} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-900 ring-8 ring-white">
                      <item.icon className="h-9 w-9 text-white" />
                    </div>
                    <div className="mb-2 text-xs font-bold tracking-widest text-neutral-500">
                      STEP {item.step}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES BENTO ==================== */}
      <section
        id="features"
        className="border-y border-neutral-200 bg-neutral-50 py-24 md:py-28"
      >
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700">
              What you get
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Built for every step of your journey
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Everything you need under a single, verified portal — from career
              counseling to the final offer letter.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-neutral-900 hover:shadow-lg"
              >
                <div className="relative mb-5 inline-flex rounded-xl border border-neutral-200 bg-neutral-50 p-3 transition-colors group-hover:bg-neutral-900">
                  <feature.icon className="h-6 w-6 text-neutral-900 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="relative overflow-hidden bg-neutral-950 py-24 text-white md:py-28">
        {/* Soft glow accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative container mx-auto px-4">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Success stories
              </div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Placed. Growing.
                <br />
                <span className="text-neutral-400">Inspiring others.</span>
              </h2>
              <p className="text-lg text-neutral-400">
                Real words from Vishwaniketan students who built their careers
                through this portal.
              </p>
            </div>
            <div className="flex items-center gap-8 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4">
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-xs uppercase tracking-wider text-neutral-400">
                  Satisfaction
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-3xl font-bold">1200+</div>
                <div className="text-xs uppercase tracking-wider text-neutral-400">
                  Alumni placed
                </div>
              </div>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid auto-rows-[minmax(0,_1fr)] grid-cols-1 gap-5 md:grid-cols-6">
            {testimonials.map((t, i) => {
              const isFeatured = t.featured;
              const spans = isFeatured
                ? "md:col-span-4 md:row-span-2"
                : i % 5 === 1 || i % 5 === 4
                ? "md:col-span-2"
                : "md:col-span-2";
              return (
                <article
                  key={t.name}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/30 hover:bg-white/[0.06] md:p-7 ${spans} ${
                    isFeatured ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02]" : ""
                  }`}
                >
                  {/* Package chip */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      <TrendingUp className="h-3 w-3" />
                      {t.package}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Batch {t.year}
                    </span>
                  </div>

                  {isFeatured && (
                    <Quote className="mb-4 h-10 w-10 text-white/20" />
                  )}

                  <p
                    className={`mb-6 leading-relaxed text-neutral-200 ${
                      isFeatured ? "text-xl md:text-2xl" : "text-base"
                    }`}
                  >
                    {isFeatured ? `"${t.text}"` : t.text}
                  </p>

                  {/* Footer */}
                  <div
                    className={`mt-auto flex items-center gap-3 border-t border-white/10 pt-5 ${
                      isFeatured ? "md:pt-6" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-white to-neutral-300 font-bold text-neutral-900 ring-2 ring-white/10 ${
                        isFeatured ? "h-14 w-14 text-base" : "h-11 w-11 text-sm"
                      }`}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate font-semibold text-white ${
                          isFeatured ? "text-lg" : ""
                        }`}
                      >
                        {t.name}
                      </p>
                      <p className="truncate text-sm text-neutral-400">
                        {t.role} ·{" "}
                        <span className="text-neutral-200">{t.company}</span>
                      </p>
                      <p className="truncate text-xs text-neutral-500">
                        {t.branch}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== UPCOMING EVENTS ==================== */}
      <section id="events" className="bg-white py-24 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700">
              What's next
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Upcoming events
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Workshops, placement drives, and career sessions — all the dates
              you need in one place.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {!upcomingEvents || !Array.isArray(upcomingEvents) || upcomingEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
                <Calendar className="mx-auto mb-3 h-10 w-10 text-neutral-400" />
                <p className="text-base font-medium text-neutral-700">
                  No upcoming events right now
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Check back soon — we're lining up new workshops every week.
                </p>
              </div>
            ) : (
              upcomingEvents.map((event) => {
                const d = new Date(event.eventDate);
                const day = d.getDate();
                const month = d.toLocaleDateString(undefined, { month: "short" });
                return (
                  <button
                    type="button"
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="group flex w-full items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 md:p-6"
                  >
                    {/* Date block */}
                    <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-neutral-900 text-white md:h-20 md:w-20">
                      <span className="text-2xl font-bold md:text-3xl">{day}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider md:text-xs">
                        {month}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="mb-1 inline-block rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-700">
                        {event.type.replace(/_/g, " ")}
                      </div>
                      <h3 className="truncate text-base font-semibold text-neutral-900 md:text-lg">
                        {event.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 md:text-sm">
                        {event.eventTime && (
                          <span>⏰ {event.eventTime}</span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-neutral-900 sm:block" />
                  </button>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ==================== EVENT DETAILS MODAL ==================== */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex items-start gap-5 border-b border-neutral-200 bg-neutral-50 p-6 md:p-7">
              <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-neutral-900 text-white md:h-20 md:w-20">
                <span className="text-2xl font-bold md:text-3xl">
                  {new Date(selectedEvent.eventDate).getDate()}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider md:text-xs">
                  {new Date(selectedEvent.eventDate).toLocaleDateString(
                    undefined,
                    { month: "short" }
                  )}
                </span>
              </div>
              <div className="min-w-0 flex-1 pr-10">
                <div className="mb-2 inline-block rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-700">
                  {selectedEvent.type.replace(/_/g, " ")}
                </div>
                <h3
                  id="event-modal-title"
                  className="text-xl font-bold text-neutral-900 md:text-2xl"
                >
                  {selectedEvent.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedEvent.eventDate).toLocaleDateString(
                      undefined,
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                  {selectedEvent.eventTime && (
                    <span>⏰ {selectedEvent.eventTime}</span>
                  )}
                  {selectedEvent.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {selectedEvent.location}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm ring-1 ring-neutral-200 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto p-6 md:p-7">
              {selectedEvent.description ? (
                <p className="whitespace-pre-wrap text-base leading-relaxed text-neutral-700">
                  {selectedEvent.description}
                </p>
              ) : (
                <p className="text-base italic text-neutral-500">
                  No additional details provided for this event.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-neutral-50 p-5 sm:flex-row sm:justify-end md:px-7">
              <Button
                variant="outline"
                className="border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
              <Button
                className="bg-neutral-900 text-white hover:bg-neutral-800"
                onClick={() => {
                  setSelectedEvent(null);
                  navigate("/login");
                }}
              >
                Sign in to register
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative overflow-hidden py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-10 md:p-16">
            <div className="relative mx-auto max-w-3xl text-center text-white">
              <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Ready to get placed?
              </h2>
              <p className="mb-8 text-lg text-neutral-300 md:text-xl">
                Join hundreds of Vishwaniketan students who've already launched
                their careers through the TPO portal.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group h-12 bg-white px-6 text-base text-neutral-900 hover:bg-neutral-100"
                  onClick={() => navigate("/signup")}
                >
                  Create your account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  I already have an account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-neutral-200 bg-neutral-50 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-neutral-900">
                  Vishwaniketan TPO
                </span>
              </div>
              <p className="mb-5 max-w-md text-sm leading-relaxed text-neutral-600">
                The official Training & Placement portal for Vishwaniketan
                iMEET — empowering students to launch careers with top recruiters
                across India.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-900">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600">
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="transition-colors hover:text-neutral-900"
                  >
                    Student Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/signup")}
                    className="transition-colors hover:text-neutral-900"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("events")}
                    className="transition-colors hover:text-neutral-900"
                  >
                    Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("recruiters")}
                    className="transition-colors hover:text-neutral-900"
                  >
                    Recruiters
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-900">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-900" />
                  <span>Vishwaniketan iMEET, Khalapur</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-neutral-900" />
                  <a
                    href="mailto:tpo@vishwaniketan.edu.in"
                    className="transition-colors hover:text-neutral-900"
                  >
                    tpo@vishwaniketan.edu.in
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-neutral-900" />
                  <a
                    href="tel:+917070416209"
                    className="transition-colors hover:text-neutral-900"
                  >
                    +91 70704 16209
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-500 md:flex-row">
            <p>
              &copy; 2026 Vishwaniketan Training & Placement Cell. All rights
              reserved.
            </p>
            <div className="flex gap-5">
              <a href="#" className="transition-colors hover:text-neutral-900">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-neutral-900">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
