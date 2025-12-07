import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Sidebar } from "@/components/sidebar";
export function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = () => {
    console.log("handle submit clicked");
  };
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />

      <div className="flex h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="  flex-1">
          <div className=" grid grid-cols-2 gap-2.5 m-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Drive</CardTitle>
                </CardHeader>
                <CardDescription>
                  <h1>Total {4} Opportunity </h1>
                  Check eligiblity and apply before deadline
                </CardDescription>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                </CardHeader>
                <CardDescription>
                  <h1>Total 4 Opportunity </h1>
                  Check eligiblity and apply before deadline
                </CardDescription>
              </Card>
            </div>
          </div>
          <div>
            <h1>Hello {"Sachin"}</h1>
            <h2>Update your personal details</h2>
          </div>
          <div className="m-4">
            <Card>
              <div className="">
                <form action="">
                  <FieldGroup className="p-4 grid grid-cols-1 sm:grid-cols-1 gap-4 lg:grid-cols-2 ">
                    <Field>
                      <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                      <Input id="fullname" type="text" disabled />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contactNo">Contact No</FieldLabel>
                      <Input
                        id="contactNo"
                        type="text"
                        placeholder="+91 7070416209"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">Email Id</FieldLabel>
                      <Input
                        id="emailId"
                        type="email"
                        placeholder="yourname@vishwaniketan.edu.in"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contactno">
                        Parents Contact No
                      </FieldLabel>
                      <Input
                        id="contactno"
                        type="text"
                        placeholder="+91 7070416209"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="StudentId">Student Id</FieldLabel>
                      <Input
                        id="StudentId"
                        type="text"
                        placeholder="GCSE 1020252022"
                        disabled
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="Department">Department</FieldLabel>
                      <Input id="Department" type="text" disabled />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="Academic Year">
                        Academic Year
                      </FieldLabel>
                      <Input id="Academic Year" type="text" disabled />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="Skills">Skills</FieldLabel>
                      <Input id="Skills" type="text" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="Resume URL">Resume URL</FieldLabel>
                      <Input
                        id="Resume URL"
                        type="text"
                        placeholder="https://drive.com/yourresumeurl"
                      />
                    </Field>
                    <Button className="mt-8 max-w-20" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </FieldGroup>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
