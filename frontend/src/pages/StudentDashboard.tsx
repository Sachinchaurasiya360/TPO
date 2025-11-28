import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
export function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />

      <div>
        <h1>Hello user.name</h1>
      </div>
      <div className=" grid grid-cols-4 gap-5 m-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl ">Upcoming Drive</CardTitle>
          </CardHeader>
          <CardDescription>
            <h1>Total {4} Opportunity </h1>
            Check eligiblity and apply before deadline
          </CardDescription>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Drive</CardTitle>
          </CardHeader>
          <CardDescription>
            <h1>Total {4} Opportunity </h1>
            Check eligiblity and apply before deadline
          </CardDescription>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Drive</CardTitle>
          </CardHeader>
          <CardDescription>
            <h1>Total {4} Opportunity </h1>
            Check eligiblity and apply before deadline
          </CardDescription>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Drive</CardTitle>
          </CardHeader>
          <CardDescription>
            <h1>Total {4} Opportunity </h1>
            Check eligiblity and apply before deadline
          </CardDescription>
        </Card>

        <div>Update your basic Information</div>
        <div>
          <form action="">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="fullName">fullName</FieldLabel>
                <Input id="fullname" type="text" disabled />
              </Field>
              <Field>
                <FieldLabel htmlFor="contactNo">ContactNo</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">emailId</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Parents Contact No</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">StudentId</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">SSC Percentage</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">HSC Percentage</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Department</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Academic Year</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Skills</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Resume URL</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="yourname@vishwaniketan.edu.in"
                  disabled
                />
              </Field>
            </FieldGroup>
          </form>

          
        </div>

        <div>Update Your Internship details</div>
      </div>
    </div>
  );
}
