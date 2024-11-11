import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingMoodalProps {
  isOpen: boolean;
  buttonText: string;
  onClose: () => void;
  handleClick: () => void;
  title: string;
  className?: string;
  image?:string;
  children?: ReactNode
}

const MeetingModel = ({
  isOpen,
  buttonText,
  onClose,
  handleClick,
  title,
  image,
  className,
  children
}: MeetingMoodalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full bg-dark-1 border-none flex-col text-white">
      <DialogTitle></DialogTitle>
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} width={20} alt="img" height={20} />
            </div>
          )}
          <h1 className={cn('text-center font-bold text-2xl' ,className)}>{title}</h1>
          {children}
          <Button onClick={handleClick} className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0">
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModel;
