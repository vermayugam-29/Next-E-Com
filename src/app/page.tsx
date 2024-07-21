'use client';
import { GlobeDemo } from "@/components/core/Home/GlobeSection";
import Section2 from "@/components/core/Home/Section2";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";
import Loading from "@/components/loading/Loading";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { userDetails } from "@/recoil/atoms/userState";
import { UserToken } from "@/types/stateTypes";

export default function Home() {

  const loading = useRecoilValue(loadingState);
  const [user , setUser] = useRecoilState(userDetails);
  const session = useSession();

  useEffect(() => {
    console.log(session);
    if(session?.status.toString() === 'authenticated') {
      if(session.data?.user) {
        setUser(session.data.user as UserToken);
      }
    }
  } ,[session])


  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-3">
      <GlobeDemo />
      <Section2 />
    </div>
  );
}
