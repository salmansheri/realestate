"use client";

import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRightCircle,
  ArrowRight,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Slider = ({ data }: { data: Array<string> }) => {
  const [imageIndex, setImageIndex] = useState<any>(null);

  const onChangeSlides = (direction: string) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(data.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === data.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="flex">
      {/* Modal  */}
      {imageIndex !== null && (
        <div className="absolute w-[100vw] h-[100vh] top-0 left-0 bg-black flex z-50 overflow-y-hidden">
          <div
            className="flex-1 flex flex-col item-center justify-center cursor-pointer px-2"
            onClick={() => onChangeSlides("left")}
          >
            <ArrowLeft />
          </div>
          <div className="relative flex-10">
            <Image
              src={data[imageIndex]}
              alt={data[0]}
              fill
              className="object-cover"
            />
          </div>
          <div
            className="flex-1 flex flex-col justify-center items-center cursor-pointer px-2"
            onClick={() => onChangeSlides("right")}
          >
            <ArrowRight />
          </div>
          <div
            className="absolute top-0 right-0 p-6 cursor-pointer"
            onClick={() => setImageIndex(null)}
          >
            <X />
          </div>
        </div>
      )}

      {/* big image  */}
      <div
        className="h-[50vh] w-[75%] relative overflow-hidden rounded-lg"
        onClick={() => setImageIndex(0)}
      >
        <Image src={data[0]} alt="images" fill className="object-cover" />
      </div>

      {/* small image  */}
      <div className="h-[50vh] w-[25%]">
        <div className="px-2 flex flex-col gap-2 h-full w-full justify-between">
          {data.slice(1).map((image, index) => (
            <div
              key={image}
              className="h-[30%] w-[100%] relative rounded-lg overflow-hidden"
              onClick={() => setImageIndex(index + 1)}
            >
              <Image src={image} alt="image1" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
