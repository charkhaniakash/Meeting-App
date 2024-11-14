'use client'
import CallList from "@/components/CallList";
import React from "react";

const Recordings = () => {
  return (
    <section className="flex flex-col size-full text-white">
      <h1 className="font-bold text-3xl ">Recordings</h1>
      <CallList type='recordings'/>
    </section>
  );
};

export default Recordings;
