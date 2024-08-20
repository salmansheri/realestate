import { ListCard } from "@/components/card";

import prisma from "@/lib/db";

export default async function ListPage() {
  const posts = await prisma.post.findMany();
  return (
    <div className="md:mt-[100px] py-5 flex flex-col md:flex-row h-screen">
      <section className="w-full">
        <div className="md:pr-[50px]">
          <h1 className="text-xl md:text-2xl font-bold">Explore Posts</h1>
          {posts?.map((post) => <ListCard key={post.id} data={post} />)}
        </div>
      </section>
    </div>
  );
}
