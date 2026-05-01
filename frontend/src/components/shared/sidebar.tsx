import { useNavigate, useLocation } from "react-router";

interface SidebarItem {
  name: string;
  path: string;
}

const items: SidebarItem[] = [
  { name: "Dashboard", path: "/student" },
  { name: "Jobs", path: "/student/jobs" },
  { name: "Applications", path: "/student/applications" },
  { name: "Marks", path: "/student/marks" },
  { name: "Internship", path: "/student/internship" },
  { name: "Achievement", path: "/student/achievement" },
  { name: "Aptitude", path: "/student/aptitude" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="h-screen w-40 bg-gray-100 border-r">
      <div className="pl-2 pt-2">
        {items.map((item) => {
          const active = pathname === item.path;
          return (
            <div
              className={`p-3 text-base font-medium rounded-l cursor-pointer ${
                active ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => navigate(item.path)}
              key={item.path}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
