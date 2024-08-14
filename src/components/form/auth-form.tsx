"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AuthFormType } from "@/lib/validation/auth-schema";
import { AuthFormSchema } from "@/lib/validation/auth-schema";
import { Form } from "../ui/form";

export const AuthForm = ({ type }: { type: "signIn" | "signUp" }) => {
  const form = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
      avatar: "",
      username: "",
    },
  });

  const onSubmit = (values: AuthFormType) => {
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CustomFormField />
        </form>
      </Form>
    </div>
  );
};
