import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Users,
  Award,
  TrendingUp,
  ChevronRight,
  Building2,
  GraduationCap,
  Target,
  Calendar,
  FileText,
  BookOpen,
  Rocket,
  Quote
} from "lucide-react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();

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
        "Expert counseling and mentorship programs to guide your career path",
      icon: GraduationCap,
    },
    {
      title: "Placement Drives",
      description:
        "Regular campus drives from top companies across various sectors",
      icon: Briefcase,
    },
    {
      title: "Skill Development",
      description:
        "Workshops and training programs to enhance technical and soft skills",
      icon: Award,
    },
    {
      title: "Industry Network",
      description:
        "Connect with alumni and industry professionals for opportunities",
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
      description: "Create your account and complete your profile",
      icon: FileText,
    },
    {
      step: "02",
      title: "Prepare",
      description: "Access resources and attend training sessions",
      icon: BookOpen,
    },
    {
      step: "03",
      title: "Apply",
      description: "Apply to companies through our placement portal",
      icon: Target,
    },
    {
      step: "04",
      title: "Succeed",
      description: "Crack interviews and land your dream job",
      icon: Rocket,
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer @ TCS",
      text: "The placement cell provided excellent guidance throughout my preparation. The mock interviews were particularly helpful.",
    },
    {
      name: "Priya Desai",
      role: "Data Analyst @ Infosys",
      text: "Thanks to the TPO team, I secured my dream job. The skill development workshops made all the difference.",
    },
    {
      name: "Amit Patel",
      role: "Business Analyst @ Accenture",
      text: "The industry connections and networking opportunities opened doors I never thought possible.",
    },
  ];

  const upcomingEvents = [
    {
      title: "Resume Building Workshop",
      date: "Nov 20, 2025",
      type: "Workshop",
    },
    {
      title: "TCS Campus Drive",
      date: "Nov 25, 2025",
      type: "Placement Drive",
    },
    {
      title: "Mock Interview Session",
      date: "Nov 28, 2025",
      type: "Practice",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-neutral-900">
                <img src="/logo.png" alt="Vimeet log" 
                className="h-18"
                />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                className="bg-neutral-900 text-white hover:bg-neutral-800"
                onClick={() => navigate("/signup")}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        <div className="container relative mx-auto px-4 py-32 md:py-40">
          <div className="mx-auto max-w-4xl text-center">
            
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-neutral-900 md:text-8xl">
              Training & Placement Cell
            </h1>
            <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
              Vishwaniketan's Institute of Management Entrepreneurship and Engineering Technology
            </p>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-500">
              Your gateway to career success. We bridge the gap between academic
              excellence and professional achievement through personalized
              guidance, industry partnerships, and comprehensive skill
              development.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group bg-neutral-900 text-white hover:bg-neutral-800"
                onClick={() => navigate("/signup")}
              >
                Start Your Journey
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-neutral-300 hover:bg-neutral-50"
                onClick={() => navigate("/login")}
              >
                Student Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Our Impact
            </h2>
            <p className="text-3xl font-bold text-neutral-900">
              Numbers That Speak
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="group border-neutral-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-2xl bg-neutral-900 p-4 transition-transform group-hover:scale-110">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-neutral-900">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-neutral-500">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <div className="mb-4 inline-block rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              How It Works
            </div>
            <h2 className="mb-6 text-4xl font-bold text-neutral-900 md:text-5xl">
              Your Journey to Success
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Four simple steps to transform your career prospects
            </p>
          </div>
          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-0 right-0 top-20 hidden h-0.5 bg-gradient-to-r from-neutral-200 via-neutral-900 to-neutral-200 lg:block"></div>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {process.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-900 shadow-xl">
                      <item.icon className="h-9 w-9 text-white" />
                    </div>
                    <div className="mb-3 text-sm font-bold text-neutral-400">
                      STEP {item.step}
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">
              Comprehensive Support
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Everything you need to succeed in your career journey
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-neutral-200 bg-white transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-4">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-neutral-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">
              Our Recruiting Partners
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Top companies trust us to deliver exceptional talent
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              {recruiters.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-6 text-center transition-all hover:border-neutral-900 hover:shadow-md"
                >
                  <span className="text-lg font-semibold text-neutral-700">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-y border-neutral-200 bg-neutral-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Success Stories</h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-300">
              Hear from students who achieved their career goals with our
              support
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-neutral-700 bg-neutral-800">
                <CardContent className="p-8">
                  <Quote className="mb-4 h-8 w-8 text-neutral-400" />
                  <p className="mb-6 leading-relaxed text-neutral-300">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-neutral-700 pt-4">
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">
              Upcoming Events
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Stay updated with our latest workshops and placement drives
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="border-neutral-200 transition-all hover:shadow-lg"
              >
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-900 text-white">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {event.title}
                      </h3>
                      <p className="text-sm text-neutral-500">{event.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-neutral-900">{event.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap className="h-8 w-8" />
                <span className="text-2xl font-bold text-neutral-900">
                  TPO Cell
                </span>
              </div>
              <p className="mb-4 max-w-md text-neutral-600">
                Empowering students to achieve their career aspirations through
                comprehensive training, guidance, and industry connections.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                Quick Links
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <a
                    href="/login"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    Student Portal
                  </a>
                </li>
                <li>
                  <a
                    href="/signup"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                Contact
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li>Vishwaniketan iMEET</li>
                <li>tpo@vishwaniketan.edu.in</li>
                <li>+91 7070416209</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-neutral-200" />
          <div className="flex flex-col items-center justify-between gap-4 text-center text-neutral-600 md:flex-row">
            <p>
              &copy; 2025 Vishwaniketan Training & Placement Cell. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-neutral-900 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
