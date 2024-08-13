import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Notebook, Save } from "lucide-react";

export const ListCard = ({ data }: { data: ListCardProps }) => {
  return (
    <div className="my-5 h-auto border rounded-lg shadow-xl overflow-hidden flex">
      <Link
        className="relative h-[15rem] w-[40%] overflow-hidden"
        href={`/list/${data.id}`}
      >
        <Image
          alt={data.title}
          src={data.img}
          className="hover:scale-110 transition duration-500 object-cover"
          fill
        />
      </Link>
      <div
        className="w-[60%] p-2  
      space-y-3
      md:space-y-6 overflow-hidden z-50"
      >
        <h2 className="text-lg">{data.title}</h2>
        <p className="text-sm">{data.address}</p>
        <h1 className="text-2xl font-bold">{formatAmount(data.price)}</h1>
        <span className="space-x-1 flex items-center justify-center">
          <Badge>{`${data.bathroom} Bathrooms`}</Badge>
          <Badge>{`${data.bedroom} Bedrooms`}</Badge>
          <Button size="icon" variant="ghost">
            <Save />
          </Button>
          <Button size="icon" variant="ghost">
            <Notebook />
          </Button>
        </span>
      </div>
    </div>
  );
};
