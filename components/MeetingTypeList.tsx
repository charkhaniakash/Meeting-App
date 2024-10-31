"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting =()=>{
    console.log("meeting created")
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
      <HomeCard
        handleClick={() => router.push("/recordings")}
        className="bg-orange-1"
        src="/icons/add-meeting.svg"
        title="New Meeting"
        content="Setup a new recording"
      />
      <HomeCard
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-blue-1"
        src="/icons/join-meeting.svg"
        title="Join Meeting"
        content="via invitation link"
      />
      <HomeCard
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-purple-1"
        src="/icons/schedule.svg"
        title="Schedule Meeting"
        content="Plan your meeting"
      />
      <HomeCard
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
        src="/icons/recordings.svg"
        title="View Recordings"
        content="Meeting recordings"
      />

      <MeetingModel
      isOpen={meetingState==="isInstantMeeting"}
      buttonText="Start Meeting"
      onClose={()=>setMeetingState(undefined)}
      handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
