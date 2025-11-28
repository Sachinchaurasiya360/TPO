import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";

export function Internship() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
      <div>Update Your Internship</div>
      <div>
        <form action="">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="Role">Company Name</FieldLabel>
              <Input
                id="Role"
                type="text"
                placeholder="yourname@vishwaniketan.edu.in"
                
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Role">Role</FieldLabel>
              <Input
                id="Role"
                type="text"
                placeholder="yourname@vishwaniketan.edu.in"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Role Description">
                Role Description
              </FieldLabel>
              <Input
                id="Role"
                type="text"
                placeholder="yourname@vishwaniketan.edu.in"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Role">Duration</FieldLabel>
              <Input
                id="Role"
                type="text"
                placeholder="yourname@vishwaniketan.edu.in"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Role">Start Date</FieldLabel>
              <Input
                id="Role"
                type="text"
                placeholder="yourname@vishwaniketan.edu.in"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Role">End Date</FieldLabel>
              <Input
                id="Role"
                type="text"
                placeholder="yourname@vishwaniketan.edu.in"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Role">Certificate URL</FieldLabel>
              <Input
                id="Role"
                type="text"
                placeholder="yourname@vishwaniketan.edu.in"
              />
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
