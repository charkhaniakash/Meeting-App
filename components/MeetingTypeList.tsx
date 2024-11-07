"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";


const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
}

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const [values , setValues] = useState(initialValues)
  const [callDetails , setCallDetails] = useState<Call>()

  const {toast} = useToast()

  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {

      if(!values.dateTime){
        toast({ title: 'Please select a date and time' });
        return 
      }
      const id = crypto.randomUUID();
      const callType = "default";
      const call = client.call(callType, id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =  values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting"

      await call.getOrCreate({
        data:{
          starts_at: startsAt,
          custom: {
            description,
          },
        }
      })

      setCallDetails(call)

      console.log(call)
      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }

      toast({title:"Meeting Created"})

    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
      <HomeCard
        handleClick={() => setMeetingState("isInstantMeeting")}
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
        isOpen={meetingState === "isInstantMeeting"}
        buttonText="Start Meeting"
        onClose={() => setMeetingState(undefined)}
        handleClick={createMeeting}
        className="text-center"
        title="Start an Instant Meeting"
        image=""
      />
    </section>
  );
};

export default MeetingTypeList;
