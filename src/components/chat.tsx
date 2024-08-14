import { userData } from "@/lib/constants";
import Image from "next/image";

export const Chat = () => {
  return (
    <div className="">
      <div className=" space-y-5">
        <h1 className="text-xl md:text-2xl font-bold">Messages</h1>
        {/* single messages  */}
        <div className="flex justify-between border p-2 rounded-lg">
          <div className="h-10 w-10 relative overflow-hidden rounded-full">
            <Image
              src={userData.img}
              alt={userData.name}
              fill
              className="object-cover "
            />
          </div>
          <span>
            <p>{userData.name}</p>
            <p className="w-full text-right">Recent Messages</p>
          </span>
        </div>
      </div>
      <div className="mt-10 ">
        <div>
          <h1 className="text-xl md:text-2xl">Chat</h1>
        </div>
        <div className="border h-auto p-3 flex flex-col gap-6 even:text-end mt-3">
          <div>
            <p className="text-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
              veritatis
            </p>
            <p className="text-[10px]">1 Hour ago</p>
          </div>
          <div className="">
            <p className="text-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
              veritatis
            </p>
            <p className="text-[10px]">1 Hour ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};
