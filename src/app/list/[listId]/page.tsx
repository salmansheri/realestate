import { Slider } from "@/components/slider";
import prisma from "@/lib/db";

import { formatAmount } from "@/lib/utils";
import { Map } from "lucide-react";
import Image from "next/image";

export default async function ListDetailsPage({
  params,
}: {
  params: { listId: string };
}) {
  const { listId } = params;

  const post = await prisma.post.findUnique({
    where: {
      id: listId,
    },
    include: {
      user: true,
      postDetails: true,
    },
  });

  return (
    <div className="mt-[100px] py-5 flex">
      {/* left  */}
      <div className="flex-3 ">
        <div className=" space-y-6">
          {/* @ts-ignore  */}
          <Slider data={[post?.images]} />
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="space-y-6">
                <h1 className="text-xl md:text-3xl font-bold">{post?.title}</h1>
                <span className="flex items-center gap-x-2">
                  <Map />
                  <p>{post?.address}</p>
                </span>
                <span>
                  <p>City: {post?.city}</p>
                </span>
                <div>
                  <p className="text-2xl font-bold">
                    {formatAmount(Number(post?.price))}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="h-20 w-20 relative rounded-full overflow-hidden border ">
                  <Image
                    src={post?.user?.avatar!}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold">{post?.user?.username}</span>
              </div>
            </div>
            <div>
              <article className="text-justify">
                {post?.postDetails[0]?.description}
              </article>
            </div>
            <div>
              <h2 className="text-xl font-bold">Contact</h2>
              <p>{post?.user?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
