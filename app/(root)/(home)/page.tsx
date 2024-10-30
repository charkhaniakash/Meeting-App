import React from "react";

const Home = () => {
  return (
    <section className="flex flex-col size-full text-white gap-10">
      <div className="bg-hero h-[300px] w-full bg-cover rounded-[20px]">
        <div className="flex flex-col justify-between max-md:p-5 max-md:py-8 lg:p-10 h-full">
          <h2 className="glassmorphism text-white-1 bg-[#FFFFFF0D] text-base rounded-sm py-2 text-center max-w-[270px]">
            Upcoming Meeting at: 12:30pm
          </h2>
          <div className="flex flex-col gap-3 items-start">
            <h1 className="font-extrabold text-4xl lg:text-7xl">12:04 PM</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">Friday, 29 March 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
