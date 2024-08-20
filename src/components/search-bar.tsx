"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

type QueryType = {
  type: "buy" | "rent";
  location: string;
  minPrice: number;
  maxPrice: number;
};

export const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState<QueryType>({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (type: typeof query.type) => {
    setQuery((prev) => ({
      ...prev,
      type,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/search?type=${query.type}&location=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`,
    );
  };
  return (
    <div className="flex gap-3 flex-col md:flex-row ">
      <Button
        className="transition duration-500 ease-in-out"
        onClick={() => switchType("buy")}
        variant={query.type === "buy" ? "default" : "outline"}
      >
        Buy
      </Button>
      <Button
        className="transition duration-500 ease-in-out"
        onClick={() => switchType("rent")}
        variant={query.type === "rent" ? "default" : "outline"}
      >
        Rent
      </Button>

      <div className="flex w-full gap-2">
        <form
          onSubmit={onSubmit}
          className="flex gap-6 md:gap-2 flex-col md:flex-row w-full "
        >
          <Input
            className="ring-1 ring-rose-600"
            placeholder="City Location"
            name="location"
            onChange={(e) => setQuery({ ...query, location: e.target.value })}
          />
          <Input
            className="ring-1 ring-rose-600"
            placeholder="Min Price"
            name="minPrice"
            type="minPrice"
            onChange={(e) =>
              setQuery({ ...query, minPrice: Number(e.target.value) })
            }
          />
          <Input
            className="ring-1 ring-rose-600"
            placeholder="Max Price"
            name="maxPrice"
            type="maxPrice"
            onChange={(e) =>
              setQuery({ ...query, maxPrice: Number(e.target.value) })
            }
          />
          <Button>Search</Button>
        </form>
      </div>
    </div>
  );
};
