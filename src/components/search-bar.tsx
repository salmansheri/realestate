"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type QueryType = {
  type: "buy" | "rent";
  location: string;
  minPrice: number;
  maxPrice: 0;
};

export const SearchBar = () => {
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
        <form className="flex gap-6 md:gap-2 flex-col md:flex-row w-full ">
          <Input
            className="ring-1 ring-rose-600"
            placeholder="City Location"
            name="location"
          />
          <Input
            className="ring-1 ring-rose-600"
            placeholder="Min Price"
            name="minPrice"
            type="number"
          />
          <Input
            className="ring-1 ring-rose-600"
            placeholder="Max Price"
            name="maxPrice"
            type="number"
          />
        </form>
      </div>
    </div>
  );
};
