"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Room = () => {
  const { user } = useUser();

  const meetingId = user?.id;

  const client = useStreamVideoClient();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const { call } = useGetCallById(meetingId!);

  const router = useRouter();

  const startRoom = async () => {
    if (!client || !user) return null;

    const newCall = client.call("default", meetingId!);
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const Table = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col g-2 xl:flex-row my-3">
        <h1 className="text-sky-1 font-medium text-base lg:text-xl xl:min-w-32">
          {title}:
        </h1>
        <h1 className="truncate text-sm font-bold max-sm:max-w-[32px]">
          {description}
        </h1>
      </div>
    );
  };

  return (
    <section className="flex flex-col size-full text-white">
      <h1 className="font-bold text-3xl ">Personal Meeting Room</h1>
      <div className="flex size-full flex-col text-white my-3">
        <Table title="topic" description={`${user?.username}'s Meeting room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="topic" description={meetingLink} />
      </div>

      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
          &nbsp; Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default Room;
