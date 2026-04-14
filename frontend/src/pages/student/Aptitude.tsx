import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { useLogout } from "@/lib/useLogout";

export function Aptitude() {
  const handleLogOut = useLogout();
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
      <div className="flex">
        <Sidebar />
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold">Aptitude Tests</h1>
          <p className="text-muted-foreground mt-2">
            Aptitude tests and homework assignments will appear here in Phase J.
          </p>
        </div>
      </div>
    </div>
  );
}
