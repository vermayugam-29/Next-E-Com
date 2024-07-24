"use client";
import React from "react";
import { SparklesCore } from "../../ui/sparkles";
import { useRecoilValue } from "recoil";
import { userDetails } from "@/recoil/atoms/userState";

const ViewDashboard = () => {

  const user = useRecoilValue(userDetails);

  return (
    <div className="h-full relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Hello ! {user?.name}
      </h1>
      <p className="mt-10 font-semibold">
        Welcome to RPR Steel Works Official Website
      </p>
    </div>
  )
}

export default ViewDashboard
