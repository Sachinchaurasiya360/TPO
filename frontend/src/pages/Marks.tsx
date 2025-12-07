import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
import { Sidebar } from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Marks() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = () => {};
  return (
    <div>
      <Navbar buttonName="Logout" onClick={handleLogOut} />
      <div className=" flex">
        <div className=" h-screen">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div>
            <h1 className=" m-6">Update your Marks</h1>
          </div>
          <form action="">
            <Card className="m-4">
              <FieldGroup className="m-4 grid grid-cols-1 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="email">SSC Percentage</FieldLabel>
                  <Input id="ssc" type="text" placeholder="95%" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="HSC">HSC Percentage</FieldLabel>
                  <Input id="HSC" type="text" placeholder="85%" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem1">SEM 1</FieldLabel>
                  <Input id="sem1" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem2">SEM 2</FieldLabel>
                  <Input id="sem2" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem3">SEM 3</FieldLabel>
                  <Input id="sem3" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem4">SEM 4</FieldLabel>
                  <Input id="sem4" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem5">SEM 5</FieldLabel>
                  <Input id="sem5" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem6">SEM 6</FieldLabel>
                  <Input id="sem6" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem7">SEM 7</FieldLabel>
                  <Input id="sem7" type="text" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sem8">SEM 8</FieldLabel>
                  <Input id="sem8" type="text" />
                </Field>
              </FieldGroup>

              <Button onClick={handleSubmit}
              className="max-w-20 ml-6"
              > Submit</Button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
