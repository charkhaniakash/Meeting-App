"use client";

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();

  // if (!call) return;

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex flex-col gap-3 w-full justify-center items-center text-white">
      <h3 className="text-2xl font-bold">Setup</h3>
      <VideoPreview />

      <div className="flex h-16">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={isMicCamToggledOn} onChange={(e)=>setIsMicCamToggledOn(e.target.checked)}  />
          Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>

      <Button className="bg-green-500 px-4 rounded-md" onClick={()=>{call?.join() ; setIsSetupComplete(true)}}>
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
