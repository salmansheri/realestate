import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

export const Filter = () => {
  return (
    <div className="space-y-6 mb-6">
      <h1 className="text-2xl">Search Results for London</h1>
      <div className="space-y-3">
        <Label>Location</Label>
        <Input className="ring-rose-600 ring-1" placeholder="City Location" />
      </div>
      <div className="flex gap-x-2 flex-col md:flex-row">
        <div className="space-y-3">
          <Label>Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue className="ring-2 ring-rose-600" placeholder="any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3 ">
          <Label>Property</Label>
          <Select>
            <SelectTrigger>
              <SelectValue
                className="ring-2 ring-rose-600"
                placeholder="any"
                defaultValue="any"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="apartment">Apartments</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="conda">Conda</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label>Min Price</Label>
          <Input placeholder="Minimum Price" type="number" />
        </div>
        <div className="space-y-3">
          <Label>Max Price</Label>
          <Input type="number" placeholder="Maximum Price" />
        </div>
        <div className="space-y-3">
          <Label>Bed room</Label>
          <Input placeholder="Bedroom" type="number" />
        </div>
        <Button variant="ghost" size="icon" className="mt-9">
          <SearchIcon className="h-4 w-4 rounded-full" />
        </Button>
      </div>
    </div>
  );
};
