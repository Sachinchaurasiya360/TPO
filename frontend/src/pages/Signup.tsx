import { SignupForm } from "@/components/signup-form";
export function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className=" max-w-sm w-full">
        <SignupForm />
      </div>
    </div>
  );
}
