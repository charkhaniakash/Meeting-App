'use client'
import CallList from "@/components/CallList";
import React from "react";

const Previous = () => {
  return (
    <section className="flex flex-col size-full text-white">
      <h1 className="font-bold text-3xl ">Previous</h1>
      <CallList type="ended"/>
    </section>
  );
};

export default Previous;
