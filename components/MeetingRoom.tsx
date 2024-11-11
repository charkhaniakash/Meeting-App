import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList } from "lucide-react";

type CallLayoutType = "grid" | "Speaker-left" | "Speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("Speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return (
          <div>
            <PaginatedGridLayout />
          </div>
        );
      case "Speaker-right":
        return (
          <div>
            <SpeakerLayout participantsBarPosition="left" />
          </div>
        );
      default:
        return (
          <div>
            <SpeakerLayout participantsBarPosition="right" />
          </div>
        );
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

        <div className="fixed bottom-0 flex items-center justify-center gap-5">
          <CallControls />

          <DropdownMenu>
            <div className="">
              <DropdownMenuTrigger  className="rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {['Grid' , 'Speaker-Left' , 'Speaker-Right'].map((item , index)=>(
                <div className="cursor-pointer" onClick={()=>setLayout(item.toLowerCase() as CallLayoutType)}>
                  {item}
                  <DropdownMenuSeparator className="border-dark-1"/>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton/>
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
