import { Navbar } from "@/components/shared/navbar";
import { FieldGroup } from "@/components/ui/field";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogout } from "@/lib/useLogout";
export function Alumni() {
  const handleLogOut = useLogout();

  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
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
