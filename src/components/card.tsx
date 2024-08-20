"use client";

import {
  savePost,
  deletePost,
  deleteSavedPost,
} from "@/lib/actions/post.actions";
import { formatAmount } from "@/lib/utils";
import { Post, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Edit2, Save, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const ListCard = ({
  data,
  user,
  type,
  postId,
}: {
  data: Post;
  user?: User;
  type?: "myList" | "savedList";
  postId?: string;
}) => {
  console.log(postId);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { mutate: savedPostsMutate, isPending: isSavedPostsLoading } =
    useMutation({
      mutationFn: async (postId: string) => {
        const savedPostsData = await savePost(postId);
        return savedPostsData;
      },
      onSuccess: () => {
        toast({
          title: "Success 👍",
          description: "Post saved successfully",
        });
        router.refresh();
      },
      onError: (error) => {
        toast({
          title: "Error 😢",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: onDeleteMutate } = useMutation({
    mutationFn: async (id: any) => {
      let deletedPost;
      if (type === "myList") {
        deletedPost = await deletePost(id);

        return deletePost;
      }

      if (type === "savedList") {
        deletedPost = await deleteSavedPost(id);

        return deletedPost;
      }
    },
    onSuccess: () => {
      toast({
        title: "Success 👍",
        description: "Post Deleted successfully",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error 😢",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return (
    <div className="my-5 h-auto border rounded-lg shadow-xl overflow-hidden flex">
      <Link
        className="relative h-[15rem] w-[40%] overflow-hidden"
        href={`/list/${data.id}`}
      >
        <Image
          alt={data.title}
          src={data?.images!}
          className="hover:scale-110 transition duration-500 object-cover"
          fill
        />
      </Link>
      <div
        className="w-[60%] p-2  
      space-y-3
      md:space-y-6 overflow-hidden z-50"
      >
        <h2 className="text-lg">{data.title}</h2>
        <p className="text-sm">{data.address}</p>
        <h1 className="text-lg md:text-2xl font-bold">
          {formatAmount(data.price)}
        </h1>
        <span className="space-x-1 flex items-center justify-center">
          <Badge className="text-[10px] ">{`${data.bathroom} Bathrooms`}</Badge>
          <Badge className="text-[10px] ">{`${data.bedroom} Bedrooms`}</Badge>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => savedPostsMutate(data.id)}
          >
            <Save />
          </Button>
          {user?.id === data.userId && (
            <Button
              className="hover:text-red-600 text-red-600"
              size="icon"
              variant="ghost"
              onClick={() => onDeleteMutate(postId)}
            >
              <Trash />
            </Button>
          )}

          {pathname === "/profile" && (
            <Link
              className={buttonVariants({
                variant: "ghost",
              })}
              href={`/list/${postId}/update`}
            >
              <Edit2 />
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
