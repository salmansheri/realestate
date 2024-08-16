"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AuthFormType } from "@/lib/validation/auth-schema";
import { AuthFormSchema } from "@/lib/validation/auth-schema";
import { Form } from "../ui/form";
import { CustomFormField, FormFieldType } from "../custom-form-field";
import { SubmitButton } from "../submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { signUp, updateUser } from "@/lib/actions/users.action";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const AuthForm = ({
  type,
  userId,
}: {
  type: "signIn" | "signUp" | "update";
  userId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
      avatar: "",
      username: "",
      phoneNumber: "",
    },
  });

  const { mutate: createUser, isPending: isLoading } = useMutation({
    mutationFn: async (userData: AuthFormType) => {
      const user = await signUp(userData);
      return user;
    },
    onSuccess: () => {
      toast({
        title: "Success 👍",
        description: "Successfully Signed Up...",
      });

      console.log("success");
      router.push("/sign-in");
    },

    onError: (error) => {
      toast({
        title: "Error 👎",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: onUserUpdate } = useMutation({
    mutationFn: async (userData: AuthFormType) => {
      const userUpdate = await updateUser(userId as string, userData);
      return userUpdate;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User Profile is Successfully updated ",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: AuthFormType) => {
    if (type === "signIn") {
      try {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "signUp") {
      createUser(values);
    }

    if (type === "update") {
      onUserUpdate(values);
    }
  };

  return (
    <Card className="w-full md:w-[40vw] ">
      <CardHeader>
        <CardTitle>
          {type === "signIn" && "Sign In"}
          {type === "signUp" && "Sign Up"}
          {type === "update" && "Update Profile"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormField
              control={form.control}
              formFieldType={FormFieldType.INPUT}
              name="email"
              placeholder="Ex: example@organization.com"
              label="Email"
            />
            <CustomFormField
              control={form.control}
              formFieldType={FormFieldType.PASSWORD}
              name="password"
              placeholder="Enter your Password"
              label="Password"
            />

            {type === "signUp" ||
              (type === "update" && (
                <>
                  <div className="flex items-center gap-3">
                    <CustomFormField
                      control={form.control}
                      formFieldType={FormFieldType.INPUT}
                      name="username"
                      placeholder="Your Username"
                      label="Username"
                    />
                    <CustomFormField
                      control={form.control}
                      formFieldType={FormFieldType.INPUT}
                      name="phoneNumber"
                      placeholder="Ex: 333333333"
                      label="Phone No"
                    />
                  </div>
                  <CustomFormField
                    control={form.control}
                    formFieldType={FormFieldType.IMAGE}
                    name="avatar"
                    placeholder=""
                    label="Avatar"
                  />
                </>
              ))}
            <SubmitButton isLoading={isLoading} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
