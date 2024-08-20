import { ListCard } from "@/components/card";
import { SearchBar } from "@/components/search-bar";
import prisma from "@/lib/db";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    type: "buy" | "rent";
    location: string;
    minPrice: number;
    maxPrice: number;
  };
}) {
  const { type, location, minPrice, maxPrice } = searchParams;

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          city: location,
        },
        {
          type: type,
        },
        {
          price: {
            gte: Number(minPrice),
            lte: Number(maxPrice),
          },
        },
      ],
    },
    include: {
      postDetails: true,
    },
  });

  return (
    <div className="mt-[100px] py-10">
      <SearchBar />
      {!posts || posts.length === 0 ? (
        <div className=" min-h-[50vh] flex items-center justify-center text-rose-600 font-bold text-lg md:text-3xl">
          <p>No Posts Found</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <ListCard key={post.id} data={post} />
          ))}
        </div>
      )}
    </div>
  );
}
