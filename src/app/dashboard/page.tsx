'use client'
import Loading from '@/components/loading/Loading';
import SidebarDemo, { Dashboard } from '@/components/profile/Dashboard'
import { loadingState } from '@/recoil/atoms/loadingState';
import { userDetails } from '@/recoil/atoms/userState';
import { UserToken } from '@/types/stateTypes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

const page = () => {

  const session = useSession();
  const [user , setUser] = useRecoilState(userDetails);
  const loading = useRecoilValue(loadingState);
  const router = useRouter();

  useEffect(() => {
    if(session?.status.toString() === 'authenticated') {
      if(session.data?.user) {
        setUser(session.data.user as UserToken);
      }
    } else if(!session || session.status === 'unauthenticated') {
      router.push('/');
    }
  } ,[session , user])

  if(loading || session?.status === 'loading') {
    return <Loading />
  }

  return (
    <div className='w-[100%] h-[100%]'>
        <SidebarDemo />
    </div>
  )
}

export default page