import { links } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export const Navigation = () => {
  return (
    <header className=" justify-between h-[100px] items-center hidden md:flex bg-rose-600/10 bg-clip-padding backdrop-filter backdrop-blue-sm  fixed top-0 z-50 max-w-[1000px] w-full ">
      <nav className="flex gap-6 items-center">
        <Link className="text-xl md:text-3xl" href="/">
          Real Estate
        </Link>
        {links.map((link) => (
          <Link key={link.id} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex gap-3">
        <Button variant="outline">Sign in</Button>
        <Button>Sign up</Button>
        <ModeToggle />
      </div>
    </header>
  );
};
