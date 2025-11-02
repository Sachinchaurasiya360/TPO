import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { StudentDashboard } from "./pages/StudentDashboard";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<StudentDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//Add default route for 404