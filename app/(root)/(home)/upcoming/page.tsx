'use client'
import CallList from "@/components/CallList";
import React from "react";

const Upcoming = () => {
  return (
    <section className="flex flex-col size-full text-white">
      <h1 className="font-bold text-3xl ">Upcoming</h1>
      <CallList type="upcoming"/>
    </section>
  );
};

export default Upcoming;
