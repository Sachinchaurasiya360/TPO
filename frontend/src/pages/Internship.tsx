import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
export function Internship() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />

      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div className="flex-1">
          <div className=" m-4 font-semibold text-xl flex justify-between">
            <h1>Update your internship Details</h1>
            <Button>Add More</Button>
          </div>
          <Card className="m-4">
            <div>
              <form action="">
                <FieldGroup className="p-4 grid grid-cols-1 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="CompnayName">Company Name</FieldLabel>
                    <Input id="CompnayName" type="text" placeholder="Google" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Role">Role</FieldLabel>
                    <Input
                      id="Role"
                      type="text"
                      placeholder="Full Stack Engineer"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Work Description">
                      Work Description
                    </FieldLabel>
                    <Input
                      id="Work Description"
                      type="text"
                      placeholder=" I migrate the ts code to the golang to minimize the latency"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Duration">Duration</FieldLabel>
                    <Input id="Duration" type="text" placeholder="3 Month" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Start Date">Start Date</FieldLabel>
                    <Input
                      id="Start Date"
                      type="text"
                      placeholder="DD/MM/YYYY"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="End Date">End Date</FieldLabel>
                    <Input id="End Date" type="text" placeholder="DD/MM/YYYY" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="Certificate URL">
                      Certificate URL
                    </FieldLabel>
                    <Input
                      id="Certificate URL"
                      type="text"
                      placeholder="https://drive.google.com/yourcertificate"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor=" Contact Details">
                      Contact Details (HR/Manager)
                    </FieldLabel>
                    <Input
                      id=" Contact Details"
                      type="text"
                      placeholder="+91 7070416209"
                    />
                  </Field>
                  <Button 
                  className="max-w-20"
                  >Submit</Button>
                </FieldGroup>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
