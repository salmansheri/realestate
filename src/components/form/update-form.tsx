"use client";

import { updateUser } from "@/lib/actions/users.action";
import type { UpdateFormType } from "@/lib/validation/update-schema";
import { UpdateFormSchema } from "@/lib/validation/update-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CustomFormField, FormFieldType } from "../custom-form-field";
import { SubmitButton } from "../submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Edit, X } from "lucide-react";

export const UpdateForm = ({
  userId,
  initialData,
}: {
  userId: string;
  initialData: User;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<UpdateFormType>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      // @ts-ignore
      avatar: "",
      username: initialData.username!,
      phoneNumber: initialData.phoneNumber!,
    },
  });

  const { mutate: onUserUpdate, isPending: isLoading } = useMutation({
    mutationFn: async (userData: UpdateFormType) => {
      const userUpdate = await updateUser(userId as string, userData);
      return userUpdate;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "User Profile is Successfully updated ",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: UpdateFormType) => {
    onUserUpdate(values);
  };

  return (
    <Card className="w-full md:w-[40vw] ">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-3">
              <CustomFormField
                // @ts-ignore
                control={form.control}
                formFieldType={FormFieldType.INPUT}
                name="username"
                placeholder="Your Username"
                label="Username"
              />
              <CustomFormField
                // @ts-ignore
                control={form.control}
                formFieldType={FormFieldType.INPUT}
                name="phoneNumber"
                placeholder="Ex: 333333333"
                label="Phone No"
              />
            </div>

            <CustomFormField
              // @ts-ignore
              control={form.control}
              formFieldType={FormFieldType.IMAGE}
              name="avatar"
              placeholder=""
              label="Avatar"
            />

            <SubmitButton isLoading={isLoading} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
