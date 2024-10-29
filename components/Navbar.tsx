import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileView from "./MobileView";

const Navbar = () => {
  return (
    <nav className="fixed z-50 bg-dark-1 w-full px-6 py-4 flex justify-between">
      <Link href="/" className="flex gap-1">
        <Image src="/icons/logo.svg" alt="yoom logo" height={32} width={32} />
        <p className="font-extrabold text-[26px] max-sm:hidden text-white ">
          Yoom
        </p>
      </Link>
      <div>
        <MobileView />
      </div>
    </nav>
  );
};

export default Navbar;
