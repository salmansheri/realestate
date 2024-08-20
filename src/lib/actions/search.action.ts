"use server";
import prisma from "../db";
import { getCurrentUser } from "./users.action";

export async function search(searchQuery: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            city: searchQuery.location,
          },
          {
            type: searchQuery.location,
          },
          {
            price: {
              gte: searchQuery?.minPrice,
              lte: searchQuery?.maxPrice,
            },
          },
        ],
      },
    });

    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
}
