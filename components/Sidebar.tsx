"use client";

import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <section
      className="sticky top-0 left-0 h-screen bg-dark-1 w-fit text-white
     p-6 pt-24 justify-between max-sm:hidden lg:w-[250px]
     "
    >
      <div className="flex flex-1 flex-col gap-6">
        {sideBarLinks.map((link) => {
          const isActive =
            pathName === link.route || pathName.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex rounded-lg  gap-4 justify-start items-center p-4",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
