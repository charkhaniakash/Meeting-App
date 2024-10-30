import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileView from "./MobileView";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed z-50 bg-dark-1 w-full px-6 py-4 flex flex-between">
      <Link href="/" className="flex gap-1">
        <Image src="/icons/logo.svg" alt="yoom logo" height={32} width={32} />
        <p className="font-extrabold text-[26px] max-sm:hidden text-white ">
          Yoom
        </p>
      </Link>
      <div className="flex-between gap-6">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileView />
      </div>
    </nav>
  );
};

export default Navbar;
