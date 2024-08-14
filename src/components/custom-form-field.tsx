import { Control } from "react-hook-form";
import { FormField } from "./ui/form";

export enum FormFieldType {
  INPUT = "input",
  IMAGEUPLOAD = "imageupload",
  TEXTAREA = "TEXTAREA",
  PASSWORD = "password",
}

export const CustomFormField = ({
  control,
  formFieldType,
  placeholder,
  disabled,
  name,
}: {
  control: Control;
  form;
}) => {
  return <FormField />;
};
