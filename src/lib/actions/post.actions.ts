"use server";

import prisma from "../db";
import { getCurrentUser } from "./users.action";

export async function createPost(postData: any) {
  const currentUser: any = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: currentUser?.id,
        postDetails: {
          create: {
            ...postData.postDetails,
          },
        },
      },
    });

    return newPost;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updatePost({
  postId,
  postData,
  postDetailId,
}: {
  postId: string;
  postData: any;
  postDetailId: string;
}) {
  const currentUser: any = await getCurrentUser();

  if (!currentUser) {
    return;
  }
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        userId: currentUser?.id,
      },
      data: {
        ...postData,
        postDetails: {
          update: {
            where: {
              id: postDetailId,
            },
            data: {
              ...postData.postDetails,
            },
          },
        },
      },
    });

    return updatedPost;
  } catch (error) {
    console.log(error);
    return error;
  }
}

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

export async function savePost(postId: string) {
  const currentUser: any = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const existingPost = await prisma.savedPost.findFirst({
    where: {
      postId: postId,
    },
  });

  if (existingPost) {
    throw new Error("Post already saved");
  }
  try {
    const savePost = await prisma.savedPost.create({
      data: {
        userId: currentUser?.id,
        postId,
      },
    });

    return savePost;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteSavedPost(savedPostId: string) {
  const currentUser: any = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const deleteSavedPost = await prisma.savedPost.delete({
      where: {
        id: savedPostId,
        userId: currentUser?.id,
      },
    });

    return deleteSavedPost;
  } catch (error) {
    console.log(error);
    return error;
  }
}
