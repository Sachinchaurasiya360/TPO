import { useNavigate } from "react-router";
interface sidebartypes {
    name: string;
    path: string;
    onclick?: () => void;
  }

export function Sidebar() {
  const navigate = useNavigate();

  

  const sidebar: sidebartypes[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Marks", path: "/dashboard/marks" },
    { name: "Internship", path: "/dashboard/internship" },
    { name: "Achievement", path: "/dashboard/achievement" },
    { name: "Aptitude", path: "/dashboard/aptitude" },
  ];

  return (
    <div className="h-full  w-36 bg-gray-100">
      <div className="pl-2 ">
        {sidebar.map((itemInSidebar) => (
          <div
            className="p-4 text-l font-medium hover:cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(itemInSidebar.path)}
            key={itemInSidebar.path}
          >
            {itemInSidebar.name}
          </div>
        ))}
      </div>
    </div>
  );
}
