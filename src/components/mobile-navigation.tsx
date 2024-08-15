import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Menu } from "./menu";
import { User } from "@prisma/client";

export const MobileNavigation = ({ user }: { user: User }) => {
  return (
    <header className="flex justify-between md:hidden h-[100px] items-center">
      <div>
        <Link className="text-xl" href="/">
          Real Estate
        </Link>
      </div>
      <nav className="flex items-center gap-2">
        <ModeToggle />
        <Menu user={user} />
      </nav>
    </header>
  );
};
