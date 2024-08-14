import { ListCard } from "@/components/card";
import { Chat } from "@/components/chat";
import { Button } from "@/components/ui/button";
import { listData, userData } from "@/lib/constants";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="mt-[100px] py-5 flex flex-col md:flex-row ">
      {/* details  */}
      <div className="flex-3 overflow-y-scroll h-screen">
        <div className="space-y-6 py-2">
          {/* title */}
          <div className="flex justify-between">
            <h1 className="text-xl md:text-3xl font-bold">User Information</h1>
            <Button> Update Profile</Button>
          </div>
          <div className="flex flex-col gap-6">
            {/* Image  */}
            <div className="relative w-20 h-20 overflow-hidden rounded-full">
              <Image
                src={userData.img}
                alt={userData.name}
                fill
                className="object-cover"
              />
            </div>
            <span>
              <p>{userData.name}</p>
              <p>sheriffsalman00@gmail.com</p>
            </span>
          </div>
          {/* List  */}
          <div className="flex justify-between">
            <h1 className="text-xl md:text-3xl font-bold">My Lists</h1>
            <Button> Add New List</Button>
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
