import { LoginForm } from "@/components/login-form";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
export function Login() {
  const navigate = useNavigate();
  const handleSignupRoute = () => {
    navigate("/signup");
  };
  return (
    <div>
      <Navbar buttonName="Signup" onClick={handleSignupRoute} />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full  max-w-sm ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
