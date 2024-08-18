"use server";

import { Post, User } from "@prisma/client";
import prisma from "../db";
import { getCurrentUser } from "./users.action";

export async function createPost(postData: Post, userId: string) {
  try {
    const currentUser: any = await getCurrentUser();

    if (!currentUser) {
      return;
    }
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: currentUser?.id,
      },
    });

    return newPost;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updatePost() {}

export async function deletePost(postId: string) {
  const currentUser: any = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
        userId: currentUser?.id,
      },
    });

    return deletePost;
  } catch (error) {
    console.log(error);
    return error;
  }
}
