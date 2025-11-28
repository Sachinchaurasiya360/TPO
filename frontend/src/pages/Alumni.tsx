import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
import { FieldGroup } from "@/components/ui/field";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
export function Alumni() {
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
            <FieldLabel htmlFor="Role">Placed By</FieldLabel>
            <Input
              id="Role"
              type="text"
              placeholder="yourname@vishwaniketan.edu.in"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="Role">Past ORG</FieldLabel>
            <Input
              id="Role"
              type="text"
              placeholder="yourname@vishwaniketan.edu.in"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="Role">Current ORG</FieldLabel>
            <Input
              id="Role"
              type="text"
              placeholder="yourname@vishwaniketan.edu.in"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="Role">Current ORG</FieldLabel>
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
