import { links } from "@/lib/constants";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  return (
    <header className=" justify-between h-[100px] items-center hidden md:flex bg-rose-600/10 bg-clip-padding backdrop-filter backdrop-blue-sm fixed left-0 top-0 w-[100%] px-20">
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
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
          )}
        >
          Sign in
        </Link>
        <Link className={cn(buttonVariants())} href="/sign-up">
          Sign up
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};
