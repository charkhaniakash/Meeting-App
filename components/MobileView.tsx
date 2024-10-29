"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileView = () => {
  const pathName = usePathname();

  return (
    <section className="w-full max-w-[200px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            className="sm:hidden cursor-pointer"
            src="/icons/hamburger.svg"
            alt="hamburger"
            height={24}
            width={24}
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-1">
          <SheetHeader>
            <Link href="/" className="flex gap-1">
              <Image
                src="/icons/logo.svg"
                alt="yoom logo"
                height={52}
                width={52}
              />
              <p className="font-extrabold text-[26px] max-sm:hidden text-white ">
                Yoom
              </p>
            </Link>

            <div className="">
              <SheetClose asChild>
                <section className="flex flex-col pt-10 gap-4">
                  {sideBarLinks.map((link) => {
                    const isActive =
                      pathName === link.route ||
                      pathName.startsWith(`${link.route}/`);

                    return (
                      <SheetClose asChild>
                        <Link
                          href={link.route}
                          key={link.label}
                          className={cn(
                            "text-white flex rounded-lg  gap-4 w-full max-w-60 items-center p-4",
                            {
                              "bg-blue-1": isActive,
                            }
                          )}
                        >
                          <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={18}
                            height={18}
                          />
                          <p className="font-semibold">{link.label}</p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </section>
              </SheetClose>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileView;
