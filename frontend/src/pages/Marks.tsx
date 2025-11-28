import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";

export function Marks() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
      <div>Update Your Marks</div>
      <div>
        <form action="">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">SSC Percentage</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">HSC Percentage</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM1</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM2</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM3</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM4</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM5</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM6</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM7</FieldLabel>
              <Input
                id="emailId"
                type="email"
                placeholder="yourname@vishwaniketan.edu.in"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">SEM8</FieldLabel>
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
    </div>
  );
}
