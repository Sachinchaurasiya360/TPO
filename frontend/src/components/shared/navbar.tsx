import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { NotificationBell } from "./NotificationBell";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  buttonName: string;
  onClick: () => void;
}

export function Navbar({ buttonName, onClick }: NavbarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="pl-2 flex justify-between bg-white shadow-sm rounded-sm">
      <div>
        <img
          src="/logo.png"
          alt="Vishwaniketan logo"
          className="h-16 w-20 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex items-center gap-3 list-none mr-3">
        {user && <NotificationBell />}
        <Button onClick={onClick}>{buttonName}</Button>
      </div>
    </div>
  );
}
