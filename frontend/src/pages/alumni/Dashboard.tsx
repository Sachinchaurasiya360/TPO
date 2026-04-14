import { Navbar } from "@/components/shared/navbar";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/lib/useLogout";

export function AlumniDashboard() {
  const { user } = useAuth();
  const handleLogout = useLogout();

  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogout} />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Alumni Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome, {user?.fullName}. Career tracking, posts, and directory coming in Phase H.
        </p>
      </div>
    </div>
  );
}
