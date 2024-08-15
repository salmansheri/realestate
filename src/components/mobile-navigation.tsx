import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Menu } from "./menu";

export const MobileNavigation = () => {
  return (
    <header className="flex justify-between md:hidden h-[100px] items-center">
      <div>
        <Link className="text-xl" href="/">
          Real Estate
        </Link>
      </div>
      <nav className="flex items-center gap-2">
        <ModeToggle />
        <Menu />
      </nav>
    </header>
  );
};
