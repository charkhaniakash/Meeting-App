"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface HomecardProps {
  className: string;
  src: string;
  title: string;
  description: string;
  handleClick:()=>void
}

const HomeCard = ({
  className,
  src,
  title,
  description,
  handleClick,
}: HomecardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between px-5 py-6 bg-orange-1 w-full min-h-[250px] rounded-[20px] cursor-pointer xl:mx-w[270px]",
        className
      )}
      onClick={handleClick}
    >
      <div className="size-12 rounded-[14px] flex items-center justify-center backdrop-blur-sm bg-white/30">
        <Image src={src} alt="add" width={24} height={20} />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
