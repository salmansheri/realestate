import { ListCard } from "@/components/card";
import { Chat } from "@/components/chat";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/users.action";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const currentUser: any = await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: {
      posts: true,
      savedPosts: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      userId: currentUser?.id,
    },
    include: {
      savedPosts: true,
    },
  });

  const savedPostsFromDB = await prisma.savedPost.findMany({
    where: {
      userId: currentUser?.id,
    },
    include: {
      post: true,
    },
  });

  // const filterSavedPosts: any = posts.reduce((acc: Post[], savedPost: Post) => {
  //   const savedPosts = savedPostsFromDB.find(
  //     (post) => post.postId === savedPost.id
  //   );
  //   if (savedPosts) {
  //     acc.push(savedPost);
  //   }
  //   return acc;
  // }, []);

  // console.log(filterSavedPosts);

  return (
    <div className="mt-[100px] py-5 flex flex-col md:flex-row ">
      {/* details  */}
      <div className="flex-3 overflow-y-scroll h-screen">
        <div className="space-y-6 py-2">
          {/* title */}
          <div className="flex justify-between">
            <h1 className="text-xl md:text-3xl font-bold">User Information</h1>
            <Link className={cn(buttonVariants())} href="/profile/update">
              {" "}
              Update Profile
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {/* Image  */}
            <div className="relative w-20 h-20 overflow-hidden rounded-full">
              <Image
                src={user?.avatar!}
                alt={user?.username!}
                fill
                className="object-cover"
              />
            </div>
            <span>
              <p>{user?.username}</p>
              <p>{user?.email}</p>
            </span>
          </div>
          {/* List  */}
          <div className="flex justify-between">
            <h1 className="text-xl md:text-3xl font-bold">My Lists</h1>
            <Link className={buttonVariants()} href="/list/new-post">
              {" "}
              Add New List
            </Link>
          </div>

          {!posts || posts.length === 0 ? (
            <div className="flex items-center justify-center text-rose-600 font-bold">
              <p>Add Your first post by clicking Add new List button above</p>
            </div>
          ) : (
            <div className="w-full">
              {posts.map((post) => (
                <ListCard
                  type="myList"
                  user={currentUser}
                  key={post.id}
                  data={post}
                  postId={post?.id}
                />
              ))}
            </div>
          )}

          {/* Saved List  */}
          <div className="flex justify-between">
            <h1 className=" text-xl md:text-3xl font-bold">Saved List</h1>
          </div>

          {!savedPostsFromDB || savedPostsFromDB.length === 0 ? (
            <div className="flex items-center justify-center text-xl">
              <p className="text-rose-600 font-bold">No Saved Posts </p>
            </div>
          ) : (
            <div>
              {savedPostsFromDB?.map((savedPost: any) => (
                <ListCard
                  type="savedList"
                  user={currentUser}
                  key={savedPost?.id}
                  data={savedPost.post}
                  postId={savedPost?.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* chat  */}
      {/* <div className="flex-2">
        <div className="p-2">
          <Chat />
        </div>
      </div> */}
    </div>
  );
}
