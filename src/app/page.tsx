'use client';
import Section1 from "@/components/core/Home/Section1";
import { GlobeDemo } from "@/components/core/Home/GlobeSection";
import Section2 from "@/components/core/Home/Section2";

export default function Home() {

  return (
    <div className="flex flex-col gap-3">
      <GlobeDemo />
      <Section2 />
    </div>
  );
}
