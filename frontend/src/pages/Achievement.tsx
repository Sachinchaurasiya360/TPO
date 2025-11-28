import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
import { FieldGroup } from "@/components/ui/field";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
export function Achievement() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar
        buttonName="Logout"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      />
      <div>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="Role">Title</FieldLabel>
            <Input
              id="Role"
              type="text"
              placeholder="yourname@vishwaniketan.edu.in"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="Role">Description</FieldLabel>
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
          <Field>
            <FieldLabel htmlFor="Role">Achievement Date</FieldLabel>
            <Input
              id="Role"
              type="text"
              placeholder="yourname@vishwaniketan.edu.in"
            />
          </Field>
        </FieldGroup>
      </div>
    </div>
  );
}
