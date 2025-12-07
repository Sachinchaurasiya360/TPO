import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router";
import { FieldGroup } from "@/components/ui/field";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Toaster } from "sonner";


export function Achievement() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    Description: "",
    Certificate_URL: "",
    Achievement_Date: "",
  });
  const [loading,setLoading]=useState(false)
  // const [error,setError]=useState("")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit=()=>{
    setLoading(true)
    // setError("")

  }

  return (
    <div>
            <Toaster position="top-right" richColors duration={9000} />

      <Navbar
        buttonName="Logout"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="flex justify-between m-4">
            <h1 className=" font-semibold text-xl">
              {" "}
              Update your Achievement{" "}
            </h1>
            <Button>Add More</Button>
          </div>
          <Card className=" m-4 ">
            <FieldGroup className="p-4 grid grid-cols-1 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="Title">Title</FieldLabel>
                <Input
                  id="Title"
                  type="text"
                  placeholder="TPO Head"
                  onChange={handleChange}
                  value={formData.title}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="Description">Description</FieldLabel>
                <Input
                  id="Description"
                  type="text"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder=" I am working as the TPO head where my work is to make sure the working of ........"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="Certificate_URL">
                  Certificate URL
                </FieldLabel>
                <Input
                  id="Certificate_URL"
                  type="text"
                  onChange={handleChange}
                  value={formData.Certificate_URL}
                  placeholder="https://drive.com/yourcertficate"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="Achievement Date">
                  Achievement Date
                </FieldLabel>
                <Input
                  id="Achievement_Date"
                  type="text"
                  onChange={handleChange}
                  value={formData.Achievement_Date}
                  placeholder="DD/MM/YYYY"
                />
              </Field>
              <Button className="max-w-20"
              onClick={handleSubmit}
              >{loading ? "Submit": "Submitting"}</Button>
            </FieldGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}
