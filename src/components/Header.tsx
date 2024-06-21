import React from "react";

import Logo from "@/assets/Logo";
import NavLinks from "@/components/NavLinks";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className=" w-full p-2 px-6 border-b-[1px] h-14">
        <div className="flex flex-row items-center align-middle max-w-[1380px] mx-auto">
          <div className="mr-4">
            {/* <img className="h-10" src="./logo.png" alt="" /> */}
            <Link to={"/"} onClick={() => setOpen(false)}>
              <Logo />
            </Link>
          </div>
          <div className="flex-row hidden gap-2 md:flex">
            <NavLinks />
          </div>
          <div className="flex flex-row items-center justify-end gap-2 ml-auto">
            {/* <Link to={"/login"}>
            <Button className="hidden text-sm md:block">Login</Button>
          </Link> */}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="transition-all duration-300 ease-in-out"
            >
              {open ? (
                <XMarkIcon className="w-6 h-6 text-gray-800" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div
        className={cn(
          "md:hidden fixed w-full h-full bg-zinc-100 transition-all max-h-full duration-500 ease-in-out overflow-hidden z-50",
          {
            "max-h-0": !open,
          }
        )}
      >
        <ul className="flex flex-col items-center justify-center gap-2 py-4">
          <NavLinks onClick={() => setOpen(false)} />
          <Link to={"/login"}>
            <Button
              className="text-sm md:hidden"
              onClick={() => setOpen(false)}
            >
              Login
            </Button>
          </Link>
        </ul>
      </div>
    </>
  );
}
