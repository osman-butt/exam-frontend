import { cn } from "@/lib/utils";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Deltagere",
    href: "/deltagere",
  },
  {
    name: "Resultater",
    href: "/resultater",
  },
  {
    name: "Discipliner",
    href: "/Discipliner",
  },
];

type NavLinksProps = {
  onClick?: () => void;
};

export default function NavLinks({ onClick }: NavLinksProps) {
  return (
    <>
      {links.map(link => {
        return (
          <NavLink
            key={link.name}
            to={link.href}
            onClick={onClick}
            className={({ isActive }) =>
              cn(
                "flex flex-row items-center justify-center gap-2 rounded-md p-3 text-lg md:text-sm font-medium hover:opacity-100 opacity-70 md:p-2 md:px-3",
                {
                  "opacity-100": isActive,
                }
              )
            }
          >
            <p className="">{link.name}</p>
          </NavLink>
        );
      })}
    </>
  );
}
