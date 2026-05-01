import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return async () => {
    await logout();
    navigate("/login", { replace: true });
  };
};
