import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "sonner";

import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/shared/ProtectedRoute";

// Public pages
import LandingPage from "@/pages/public/LandingPage";
import { Login } from "@/pages/public/Login";
import { Signup } from "@/pages/public/Signup";
import { ForgotPassword } from "@/pages/public/ForgotPassword";
import { ResetPassword } from "@/pages/public/ResetPassword";

// Student pages
import { StudentDashboard } from "@/pages/student/Dashboard";
import { Marks } from "@/pages/student/Marks";
import { Internship } from "@/pages/student/Internship";
import { Achievement } from "@/pages/student/Achievement";
import { Aptitude } from "@/pages/student/Aptitude";
import { StudentJobs } from "@/pages/student/Jobs";
import { StudentApplications } from "@/pages/student/Applications";

// Role dashboards
import { FacultyDashboard } from "@/pages/faculty/Dashboard";
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AlumniDashboard } from "@/pages/alumni/Dashboard";
import { Alumni as AlumniProfileEdit } from "@/pages/alumni/ProfileEdit";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <PublicOnlyRoute>
                <ResetPassword />
              </PublicOnlyRoute>
            }
          />

          {/* Student */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/marks"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <Marks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/internship"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <Internship />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/achievement"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <Achievement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/aptitude"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <Aptitude />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/jobs"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/applications"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentApplications />
              </ProtectedRoute>
            }
          />

          {/* Faculty */}
          <Route
            path="/faculty"
            element={
              <ProtectedRoute allowedRoles={["FACULTY"]}>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Alumni */}
          <Route
            path="/alumni"
            element={
              <ProtectedRoute allowedRoles={["ALUMNI"]}>
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/profile"
            element={
              <ProtectedRoute allowedRoles={["ALUMNI"]}>
                <AlumniProfileEdit />
              </ProtectedRoute>
            }
          />

          {/* Legacy dashboard redirects so old bookmarks still work */}
          <Route path="/dashboard" element={<Navigate to="/student" replace />} />
          <Route path="/admindashboard" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
