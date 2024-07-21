'use client'
import { LogIn } from '@/components/core/Forms/LogIn'
import Loading from '@/components/loading/Loading'
import { loadingState } from '@/recoil/atoms/loadingState'
import { userDetails } from '@/recoil/atoms/userState'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

const page = () => {

  const user = useRecoilValue(userDetails);
  const session = useSession();
  const loading  = useRecoilValue(loadingState);
  const router = useRouter();

  useEffect(() => {
    if(session) {
      toast.error('Please logout first to login again');
      router.push('/');
    }
  },[user])

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      <LogIn />
    </div>
  )
}

export default page