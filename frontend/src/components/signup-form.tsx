import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    password: "",
    studentId: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string[];
  }>({});

  const handleDepartmentChange = (dept: string) => {
    setFormData({ ...formData, department: dept });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (fieldErrors[id]) {
      setFieldErrors({ ...fieldErrors, [id]: [] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const sendingDataToBackend = await axios.post(
        `${API_URL}/api/v1/auth/signup`,
        formData,
        {
          timeout: 8000,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (sendingDataToBackend.status === 200) {
        toast.success(
          "Account Created, Please wait for verification from TPO "
        );
        setFormData({ ...formData, password: "", emailId: "", fullName: "" });
        setLoading(false);
      } else {
        setError(
          sendingDataToBackend?.data?.message ||
            "Unexpected response from server"
        );
        setLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverResponse = error?.response?.data;
        toast.error(serverResponse?.message);
        if (serverResponse?.error?.fieldErrors) {
          setFieldErrors(serverResponse?.error?.fieldErrors);
        } else {
          setError(serverResponse?.message);
          toast.error(serverResponse?.message);
        }
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card {...props}>
      <Toaster position="top-right" richColors duration={9000} />

      <CardHeader>
        <CardTitle className="flex items-center text-2xl justify-center">
          Create an account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              {error}
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input
                id="fullName"
                type="text"
                placeholder="John Chaurasiya"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </Field>
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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {fieldErrors.password && (
                <p className="text-sm text-red-500">{fieldErrors.password.join(', ')}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="studentId">Student Id</FieldLabel>
              <Input
                id="studentId"
                type="text"
                required
                onChange={handleChange}
                value={formData.studentId}
                placeholder="GCSE1234567"
              />
              {fieldErrors.studentId && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.studentId}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="department">Department</FieldLabel>
              <DropdownMenu>
                <DropdownMenuTrigger className=" border-2 p-1 rounded-md flex justify-between">
                  {formData.department || "Choose your department"}
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-sm">
                  {[
                    "CSE",
                    "COMPUTER",
                    "ELECTRICAL",
                    "EXTC",
                    "MECHANICAL",
                    "CIVIL",
                  ].map((dept) => (
                    <DropdownMenuItem
                      key={dept}
                      onClick={() => handleDepartmentChange(dept)}
                    >
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
