import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Marks } from "./pages/Marks";
import LandingPage from "./pages/LandingPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { BrowserRouter, Routes, Route } from "react-router";
import { Internship } from "./pages/Internship";
import { Achievement } from "./pages/Achievement";
import { Alumni } from "./pages/Alumni";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/dashboard/marks" element={<Marks />} />
          <Route path="dashboard/internship" element={<Internship />} />
          <Route path="/dashboard/achievement" element={<Achievement />} />
          <Route path="/dashboard/alumni" element={<Alumni/>}/>

          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
