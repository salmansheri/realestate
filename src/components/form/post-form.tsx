"use client";

import { createPost, updatePost } from "@/lib/actions/post.actions";
import {
  petPoliciesData,
  properties,
  types,
  utilitiesData,
} from "@/lib/constants";
import { postFormSchema, PostFormType } from "@/lib/validation/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CustomFormField, FormFieldType } from "../custom-form-field";
import { SubmitButton } from "../submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";

export const PostForm = ({
  type,
  initialData,
}: {
  type: "create" | "update";
  initialData?: any;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  // Create Post
  const { mutate: onCreatePostMutate, isPending: isLoading } = useMutation({
    mutationFn: async (mutationData: any) => {
      const post = await createPost(mutationData);
      return post;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully Created the post",
      });
      router.push("/profile");
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

  console.log(initialData);

  // Form
  const form = useForm<PostFormType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: initialData ? initialData.title : "",
      price: initialData ? String(initialData.price as string) : "",
      city: initialData ? initialData.city : "",
      address: initialData ? initialData.city : "",
      bathroom: initialData ? String(initialData.bathroom as string) : "",
      bedroom: initialData ? String(initialData.bedroom as string) : "",
      type: initialData ? initialData.type : "buy",
      property: initialData ? initialData.property : "apartment",
      latitude: initialData ? initialData.latitude : "",
      longitude: initialData ? initialData.longitude : "",
      images: "",
      postDetails: {
        description: initialData ? initialData.postDetails[0].description : "",
        utilities: initialData ? initialData.postDetails[0].utilities : "",
        pet: initialData ? initialData.postDetails[0].pet : "",
        income: initialData ? initialData.postDetails[0].income : "",
        size: initialData ? initialData.postDetails[0].size : "",
        school: initialData
          ? String(initialData.postDetails[0].school as string)
          : "",
        bus: initialData
          ? String(initialData.postDetails[0].bus as string)
          : "",
        restaurent: initialData
          ? String(initialData.postDetails[0].restaurent as string)
          : "",
      },
    },
  });

  // Update Post
  const { mutate: onUpdatePostMutate } = useMutation({
    mutationFn: async (postData: any) => {
      const payload = {
        postId: String(initialData?.id),
        postData,
        postDetailId: String(initialData?.postDetails[0]?.id),
      };
      return await updatePost(payload);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully Updated the post",
      });
      router.push("/profile");
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

  const onSubmit = (values: PostFormType) => {
    const postData = {
      title: values.title,

      price: parseInt(values.price),
      images: values.images,
      address: values.address,
      city: values.city,
      bedroom: parseInt(values.bedroom),
      bathroom: parseInt(values.bathroom),
      latitude: values.latitude,
      longitude: values.longitude,
      type: values.type,
      property: values.property,
      postDetails: {
        description: values.postDetails.description,
        utilities: values.postDetails.utilities,
        pet: values.postDetails.pet,
        income: values.postDetails.income,
        size: values.postDetails.size,
        school: parseInt(values.postDetails.school),
        bus: parseInt(values.postDetails.bus),
        restaurent: parseInt(values.postDetails.restaurent),
      },
    };

    if (type === "create") {
      onCreatePostMutate(postData);
    }

    if (type === "update") {
      onUpdatePostMutate(postData);
    }
  };
  return (
    <Card className="w-full md:xw-[40vw]">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        <CardDescription>
          Enter the details of the Real Estate Property
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-wrap items-center w-full justify-between">
              <CustomFormField
                control={form.control}
                name="title"
                formFieldType={FormFieldType.INPUT}
                placeholder="Enter The Title"
                label="Title"
              />

              <CustomFormField
                control={form.control}
                name="price"
                formFieldType={FormFieldType.INPUT}
                placeholder="Enter The Price"
                label="Price"
              />
            </div>
            <div className="flex flex-wrap items-center w-full justify-between">
              <CustomFormField
                control={form.control}
                name="address"
                formFieldType={FormFieldType.INPUT}
                placeholder="Enter The Address"
                label="Address"
              />

              <CustomFormField
                control={form.control}
                name="postDetails.description"
                formFieldType={FormFieldType.INPUT}
                placeholder="Enter The Description"
                label="Description"
              />
            </div>

            <CustomFormField
              control={form.control}
              name="city"
              formFieldType={FormFieldType.INPUT}
              placeholder="Enter The City"
              label="City"
            />

            <CustomFormField
              control={form.control}
              name="bathroom"
              formFieldType={FormFieldType.INPUT}
              placeholder="Enter The Bathroom count"
              label="Bathroom"
            />

            <CustomFormField
              control={form.control}
              name="bedroom"
              formFieldType={FormFieldType.INPUT}
              placeholder="Enter The Bedroom"
              label="Bedroom"
            />

            <div className="flex flex-wrap items-center w-full justify-between">
              <CustomFormField
                control={form.control}
                name="latitude"
                formFieldType={FormFieldType.INPUT}
                placeholder="Enter The latitude"
                label="Latitude"
              />

              <CustomFormField
                control={form.control}
                name="longitude"
                formFieldType={FormFieldType.INPUT}
                placeholder="Enter the Longitude"
                label="Longitude"
              />
            </div>
            <div className="flex flex-wrap items-center w-full gap-5">
              <CustomFormField
                control={form.control}
                name="type"
                formFieldType={FormFieldType.SELECT}
                placeholder="Select the Type of the List"
                label="Type"
                data={types}
              />

              <CustomFormField
                control={form.control}
                name="property"
                formFieldType={FormFieldType.SELECT}
                placeholder="Select the type of property"
                label="Property"
                data={properties}
              />
            </div>
            <div>
              <CardHeader className="p-0">
                <CardTitle>Property Details</CardTitle>
                <CardDescription>Enter the Property Details</CardDescription>
              </CardHeader>
            </div>
            <div className="flex items-center  gap-5">
              <CustomFormField
                control={form.control}
                name="postDetails.utilities"
                formFieldType={FormFieldType.SELECT}
                placeholder="Enter The Utilities"
                label="Utilities"
                data={utilitiesData}
              />
              <CustomFormField
                control={form.control}
                name="postDetails.pet"
                formFieldType={FormFieldType.SELECT}
                placeholder="Enter The Policies"
                label="Pet"
                data={petPoliciesData}
              />
            </div>

            <CustomFormField
              control={form.control}
              name="postDetails.income"
              formFieldType={FormFieldType.INPUT}
              placeholder="Enter The Income Policies"
              label="Income Policy"
            />
            <CustomFormField
              control={form.control}
              name="postDetails.size"
              formFieldType={FormFieldType.NUMBER}
              placeholder="Enter The Total Size"
              label="Total Size(sqft)"
            />
            <CustomFormField
              control={form.control}
              name="postDetails.school"
              formFieldType={FormFieldType.NUMBER}
              placeholder=""
              label="School"
            />
            <CustomFormField
              control={form.control}
              name="postDetails.bus"
              formFieldType={FormFieldType.INPUT}
              placeholder=""
              label="Bus"
            />
            <CustomFormField
              control={form.control}
              name="postDetails.restaurent"
              formFieldType={FormFieldType.INPUT}
              placeholder=""
              label="Restaurent"
            />
            <CustomFormField
              control={form.control}
              name="images"
              formFieldType={FormFieldType.IMAGE}
              label="Images"
              placeholder=""
            />
            <SubmitButton isLoading={isLoading} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
