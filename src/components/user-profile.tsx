"use client";

import { User } from "@prisma/client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const UserProfile = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <div className="flex w-full items-center gap-x-2">
      <div
        className="cursor-pointer flex items-center gap-3 "
        onClick={() => router.push("/profile")}
      >
        <div className="h-10 w-10 rounded-full relative overflow-hidden flex items-center">
          {user.avatar ? (
            <Image
              src={user.avatar!}
              alt="User avatar"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className=" bg-rose-600  text-white h-10 w-10 flex items-center justify-center font-bold text-3xl">
              <p>{user?.username?.[0]}</p>
            </div>
          )}
        </div>
        <div className="">
          <p className="text-base font-bold">{user.username}</p>
        </div>
      </div>
      <div>
        <LogOutIcon className="h-6 w-6" onClick={() => signOut()} />
      </div>
    </div>
  );
};
