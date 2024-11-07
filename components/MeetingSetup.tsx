import { useCall, VideoPreview } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';

const MeetingSetup = () => {

  
  const [isMicCamToggledOn , setIsMicCamToggledOn] = useState(false)
  const call = useCall()


  useEffect(()=>{
    if(isMicCamToggledOn){
      call?.camera.disable()
      call?.microphone.disable()
    }else{
      call?.camera.enable()
      call?.microphone.enable()
    }

  },[isMicCamToggledOn ,call?.camera , call?.microphone ])

  return (
    <div className='flex flex-col gap-3 w-full justify-center items-center text-white'>

      <h3 className='text-2xl font-bold'>Setup</h3>
      <VideoPreview/>
    </div>
  );
}

export default MeetingSetup;
