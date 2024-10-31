import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );
  return (
    <section className="flex flex-col size-full text-white gap-10">
      <div className="bg-hero h-[300px] w-full bg-cover rounded-[20px]">
        <div className="flex flex-col justify-between max-md:p-5 max-md:py-8 lg:p-10 h-full">
          <h2 className="glassmorphism text-white-1 bg-[#FFFFFF0D] text-base rounded-sm py-2 text-center max-w-[270px]">
            Upcoming Meeting at: {time}
          </h2>
          <div className="flex flex-col gap-3 items-start">
            <h1 className="font-extrabold text-4xl lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
