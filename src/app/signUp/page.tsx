'use client'
import React, { useEffect } from 'react'
import {SignupFormDemo} from '@/components/core/Forms/SignUp'
import { useRecoilValue } from 'recoil'
import { userDetails } from '@/recoil/atoms/userState'
import { useRouter } from 'next/navigation'
const page = () => {

    const user = useRecoilValue(userDetails);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    } , [user]);

  return (
    <div>
      <SignupFormDemo /> 
    </div>
  )
}

export default page