import { SignupForm } from "@/components/signup-form";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
export function Signup() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar
        buttonName="Login"
        onClick={() => {
          navigate("/login");
        }}
      />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className=" max-w-sm w-full">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
