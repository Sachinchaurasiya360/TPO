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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    emailId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendingDataToBackend = await axios.post(
        `${API_URL}/api/v1/auth/signin`,
        formData
      );
      if (sendingDataToBackend.status === 200) {
        toast.success("Login successful");
        setLoading(false);
        //We are using Cookies so no need to save the JWT it will work autometic
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Server error";
        toast.error(message);
        setLoading(false);
        setformData({...formData,password:''})
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setformData({ ...formData, [id]: value });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position="top-right" richColors duration={9000} />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center ">
            Login to your account
          </CardTitle>
          <CardDescription className=" flex justify-center ">
            Welcome to Vishwaniketan CMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Signin...." : "Signin"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
