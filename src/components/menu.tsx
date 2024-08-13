import { LogInIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { links } from "@/lib/constants";
import Link from "next/link";

export const Menu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>Menu</SheetHeader>
        <div className="flex flex-col gap-6 mt-10">
          {links.map((link) => (
            <Link key={link.id} href={link.href}>
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between">
            <Link href="/sign-in">
              <LogInIcon />
            </Link>
            <Link href="/sign-up">
              <UserIcon />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
