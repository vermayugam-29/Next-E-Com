'use client';
import { GlobeDemo } from "@/components/core/Home/GlobeSection";
import Section2 from "@/components/core/Home/Section2";
import { useRecoilValue } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";
import Loading from "@/components/loading/Loading";

export default function Home() {

  const loading = useRecoilValue(loadingState);


  if(loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-3">
      <GlobeDemo />
      <Section2 />
    </div>
  );
}
