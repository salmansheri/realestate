import { Slider } from "@/components/slider";
import { singlePostData, userData } from "@/lib/constants";
import { formatAmount } from "@/lib/utils";
import { Map } from "lucide-react";
import Image from "next/image";

export default function ListDetailsPage() {
  return (
    <div className="mt-[100px] py-5 flex">
      {/* left  */}
      <div className="flex-3 ">
        <div className=" space-y-6">
          {/* @ts-ignore  */}
          <Slider data={singlePostData.images} />
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="space-y-6">
                <h1 className="text-xl md:text-3xl font-bold">
                  {singlePostData.title}
                </h1>
                <span className="flex items-center gap-x-2">
                  <Map />
                  <p>{singlePostData.address}</p>
                </span>
                <div>
                  <p className="text-2xl font-bold">
                    {formatAmount(singlePostData.price)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="h-20 w-20 relative rounded-full overflow-hidden border ">
                  <Image
                    src={userData.img}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold">{userData.name}</span>
              </div>
            </div>
            <div>
              <article className="text-justify">
                {singlePostData.description}
              </article>
            </div>
          </div>
        </div>
      </div>
      {/* right  */}
      <div className="flex-2">
        <div className="pr-[20px]"></div>
      </div>
    </div>
  );
}
