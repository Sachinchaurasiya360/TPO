import { Button } from "./ui/button";
import { useNavigate } from "react-router";
interface NavbarProps {
  buttonName: string;
  onClick: () => void;
}
export function Navbar({ buttonName, onClick }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <div className=" pl-2 flex justify-between bg-white shadow-sm rounded-sm ">
      <div>
        <img
          src="/logo.png"
          alt="Vimeet logo"
          className="h-16 w-20"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="flex   items-center list-none mr-3">
        <Button onClick={onClick}>{buttonName}</Button>
      </div>
    </div>
  );
}
