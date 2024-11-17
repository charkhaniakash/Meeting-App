"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const [values, setValues] = useState(initialValues);
  const [callDetails, setCallDetails] = useState<Call>();

  const { toast } = useToast();

  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const callType = "default";
      const call = client.call(callType, id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      console.log(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: "Meeting Created" });
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to create Meeting" });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
      <HomeCard
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
        src="/icons/add-meeting.svg"
        title="New Meeting"
        description="Setup a new recording"
      />
      <HomeCard
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-blue-1"
        src="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
      />
      <HomeCard
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-purple-1"
        src="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
      />
      <HomeCard
        handleClick={() => router.push('/recordings')}
        className="bg-yellow-1"
        src="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting recordings"
      />

      {!callDetails ? (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          handleClick={createMeeting}
          title="Create Meeting"
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({title:"Link copied"})
          }}
          title="Meeting Created"
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        buttonText="Start Meeting"
        onClose={() => setMeetingState(undefined)}
        handleClick={createMeeting}
        className="text-center"
        title="Start an Instant Meeting"
        image=""
      />
      <MeetingModel
        isOpen={meetingState === "isJoiningMeeting"}
        buttonText="Join Meeting"
        onClose={() => setMeetingState(undefined)}
        handleClick={()=>router.push(values.link)}
        className="text-center"
        title="Start an Instant Meeting"
        image=""
      >
        <Input placeholder="Meeting link" className="border-none bg-dark-3" onChange={(e)=>setValues({...values , link:e.target.value})}/>
      </MeetingModel>
    </section>
  );
};

export default MeetingTypeList;
