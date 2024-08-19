import { ListCard } from "@/components/card";
import { Chat } from "@/components/chat";
import { Button, buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/users.action";
import { listData, userData } from "@/lib/constants";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const currentUser: any = await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });
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
          <div className="w-full">
            {listData.map((list) => (
              <ListCard key={list.id} data={list} />
            ))}
          </div>
          {/* Saved List  */}
          <div className="flex justify-between">
            <h1 className=" text-xl md:text-3xl font-bold">Saved List</h1>
          </div>
          <div>
            {listData.map((list) => (
              <ListCard key={list.id} data={list} />
            ))}
          </div>
        </div>
      </div>

      {/* chat  */}
      <div className="flex-2">
        <div className="p-2">
          <Chat />
        </div>
      </div>
    </div>
  );
}
