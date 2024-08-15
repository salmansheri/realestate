import { ListCard } from "@/components/card";
import { Filter } from "@/components/filter";

import { listData } from "@/lib/constants";

export default function ListPage() {
  return (
    <div className="md:mt-[100px] py-5 flex flex-col md:flex-row h-screen">
      <section className="w-full">
        <div className="md:pr-[50px]">
          <Filter />
          {listData.map((list) => (
            <ListCard key={list.id} data={list} />
          ))}
        </div>
      </section>
    </div>
  );
}
