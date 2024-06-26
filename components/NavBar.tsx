import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { getProfileImage } from "@/lib/getProfileImage";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Book", href: "/" },
  { name: "Guests", href: "/" },
  { name: "Events", href: "/" },
  { name: "Services", href: "/" },
  { name: "Support", href: "/" },
];

const NavBar = async () => {
  const profileUrl = await getProfileImage();
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-300 md:px-12 px-5">
      <Link href={"/"}>
        <div className="text-xl">Acme Co</div>
      </Link>
      <div className="flex space-x-4 items-center max-md:hidden">
        {navlinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <p className="text-gray-700 hover:bg-zinc-200 hover:rounded-md p-1">
              {link.name}
            </p>
          </Link>
        ))}
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
          <img
            src={profileUrl || "/person.svg"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <h1 className="font-bold">Menu</h1>
            </SheetHeader>
            <div className="flex flex-col space-y-4 items-start pt-10">
              {navlinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <p className="hover:bg-zinc-200 hover:rounded-md p-1">
                    {link.name}
                  </p>
                </Link>
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src={profileUrl || "/person.svg"}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;