import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
export function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
    </div>
  );
}
