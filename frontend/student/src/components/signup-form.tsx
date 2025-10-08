import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const onClickhandler=()=>{

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Vishwaniketan, Where we shape student Future
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onClick={onClickhandler}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Chaurasiya"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="Department">Department's</FieldLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger className=" border border-2px rounded-md px-3 py-1  flex justify-between">
                    Click here to choose your Department
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="none"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="m19 9-7 7-7-7"
                      />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>CSE (AI&ML)</DropdownMenuItem>
                    <DropdownMenuItem>Computer</DropdownMenuItem>
                    <DropdownMenuItem>First Year</DropdownMenuItem>
                    <DropdownMenuItem>EXTC</DropdownMenuItem>
                    <DropdownMenuItem>Electrical</DropdownMenuItem>
                    <DropdownMenuItem>Mechnical</DropdownMenuItem>
                    <DropdownMenuItem>Civil</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Field>
                  <FieldLabel htmlFor="studentId">Student Id</FieldLabel>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="GCSE102033583"
                    required
                  />
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
