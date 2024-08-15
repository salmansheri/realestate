"use client";

import { AuthFormType } from "@/lib/validation/auth-schema";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Control, ControllerRenderProps, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UploadButton } from "@/lib/uploadthing";
import FileUpload from "./file-upload";

interface CustomFormFieldProps {
  control: Control<AuthFormType>;
  formFieldType: FormFieldType;
  placeholder: string;
  disabled?: boolean;
  name: FieldPath<AuthFormType>;
  label?: string;
}

export enum FormFieldType {
  INPUT = "input",

  TEXTAREA = "TEXTAREA",
  PASSWORD = "password",
  IMAGE = "image",
}

const RenderInput = ({
  field,
  props,
}: {
  field: ControllerRenderProps<any, string>;
  props: CustomFormFieldProps;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState("");
  switch (props.formFieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} />
        </FormControl>
      );
      break;

    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <div className="relative">
            <Input
              placeholder={props.placeholder}
              {...field}
              type={showPassword ? "text" : "password"}
            />
            {showPassword ? (
              <EyeOffIcon
                className="cursor-pointer absolute top-2 right-2"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeIcon
                className="cursor-pointer absolute top-2 right-2"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </FormControl>
      );

    case FormFieldType.IMAGE:
      return (
        <FormControl>
          <FileUpload
            apiEndPoint="imageUploader"
            onChange={field.onChange}
            value={field.value}
          />
        </FormControl>
      );
    default:
      break;
  }
};

export const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, formFieldType, name, placeholder, disabled, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
