 import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
 {
              <div className="">
                <div className=" gap-5 m-4 ">
                  <div>Update your basic Information</div>
                  <div>
                    <form action="">
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="fullName">fullName</FieldLabel>
                          <Input id="fullname" type="text" disabled />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="contactNo">ContactNo</FieldLabel>
                          <Input
                            id="contactNo"
                            type="text"
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
                          <FieldLabel htmlFor="contactno">
                            Parents Contact No
                          </FieldLabel>
                          <Input
                            id="contactno"
                            type="text"
                            placeholder="yourname@vishwaniketan.edu.in"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="StudentId">StudentId</FieldLabel>
                          <Input
                            id="StudentId"
                            type="text"
                            placeholder="yourname@vishwaniketan.edu.in"
                            disabled
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="SSC Percentage">
                            SSC Percentage
                          </FieldLabel>
                          <Input
                            id="SSC Percentage"
                            type="text"
                            placeholder="yourname@vishwaniketan.edu.in"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="HSC Percentage">
                            HSC Percentage
                          </FieldLabel>
                          <Input
                            id="HSC Percentage"
                            type="text"
                            placeholder="yourname@vishwaniketan.edu.in"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="Department">
                            Department
                          </FieldLabel>
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
                          <FieldLabel htmlFor="Resume URL">
                            Resume URL
                          </FieldLabel>
                          <Input
                            id="Resume URL"
                            type="text"
                            placeholder="yourname@vishwaniketan.edu.in"
                            disabled
                          />
                        </Field>
                      </FieldGroup>
                    </form>
                  </div>
                </div>
              </div>
            }