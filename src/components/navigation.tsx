import { links } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export const Navigation = () => {
  return (
    <header className="flex justify-between h-[100px] items-center">
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
