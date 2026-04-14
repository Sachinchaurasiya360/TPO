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
  CheckCircle2,
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

  const recruiters = [
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
    "IBM",
    "Tech Mahindra",
    "Capgemini",
    "HCL",
    "L&T Infotech",
    "Persistent",
    "Zensar",
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
      text: "The placement cell's mock interviews and resume reviews gave me the edge I needed. Cracked my first interview on day one of placements.",
      initials: "RS",
    },
    {
      name: "Priya Desai",
      role: "Data Analyst",
      company: "Infosys",
      text: "From aptitude prep to final offer, the TPO team had my back. The portal made it effortless to track applications and stay on top of deadlines.",
      initials: "PD",
    },
    {
      name: "Amit Patel",
      role: "Business Analyst",
      company: "Accenture",
      text: "The alumni connects and industry sessions opened up paths I hadn't even considered. Can't recommend the TPO cell enough.",
      initials: "AP",
    },
  ];

  const highlights = [
    "Verified student profiles",
    "One-click applications",
    "Real-time notifications",
    "Department-scoped eligibility",
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
            {/* Announcement pill */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500">
                <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500 opacity-75" />
              </span>
              <span>Placement Season 2026 is now live</span>
              <span className="text-neutral-300">·</span>
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-0.5 font-semibold text-neutral-900 hover:underline"
              >
                Register
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

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

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
              {highlights.map((h) => (
                <div key={h} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-neutral-900" strokeWidth={2.5} />
                  <span>{h}</span>
                </div>
              ))}
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
                  key={`${c}-${i}`}
                  className="flex min-w-[180px] items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-5 shadow-sm"
                >
                  <span className="whitespace-nowrap text-base font-semibold text-neutral-700">
                    {c}
                  </span>
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
        <div className="relative container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Success stories
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Placed. Growing. Inspiring others.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-400">
              Real words from Vishwaniketan students who built their careers
              through this portal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:border-white/25 hover:bg-white/[0.06]"
              >
                <Quote className="mb-5 h-8 w-8 text-neutral-400" />
                <p className="mb-8 text-base leading-relaxed text-neutral-200">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-neutral-900">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-neutral-400">
                      {t.role} · <span className="text-neutral-200">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
            {upcomingEvents.length === 0 ? (
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
                  <div
                    key={event.id}
                    className="group flex items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg md:p-6"
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
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

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
                    className="transition-colors hover:text-indigo-600"
                  >
                    Student Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/signup")}
                    className="transition-colors hover:text-indigo-600"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("events")}
                    className="transition-colors hover:text-indigo-600"
                  >
                    Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("recruiters")}
                    className="transition-colors hover:text-indigo-600"
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
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" />
                  <span>Vishwaniketan iMEET, Khalapur</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-indigo-600" />
                  <a
                    href="mailto:tpo@vishwaniketan.edu.in"
                    className="transition-colors hover:text-indigo-600"
                  >
                    tpo@vishwaniketan.edu.in
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-indigo-600" />
                  <a
                    href="tel:+917070416209"
                    className="transition-colors hover:text-indigo-600"
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
              <a href="#" className="transition-colors hover:text-indigo-600">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-indigo-600">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
