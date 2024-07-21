'use client'
import OTP from '@/components/core/Forms/OTP'
import Loading from '@/components/loading/Loading'
import { SignUpformState } from '@/recoil/atoms/formState'
import { loadingState } from '@/recoil/atoms/loadingState'
import { userDetails } from '@/recoil/atoms/userState'
import { generateOtp } from '@/recoil/services/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import toast from 'react-hot-toast'

const page = () => {
  const user = useRecoilValue(userDetails);
  const router = useRouter();
  const [data , setData] = useRecoilState(SignUpformState);
  const [loading, setLoading] = useRecoilState(loadingState);


  useEffect(() => {
    if (user) {
      router.push('/');
      return;
    }
    if (!data || data.email === '') {
      router.push('/signUp');
      toast.error(`Please sign up again something went wrong`)
      return;
    }
    const email = data.accountType === 'Admin' ? process.env.NEXT_PUBLIC_EMAIL! : data.email;
    generateOtp(email, setLoading , router , setData);

  }, [user, router])


  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <OTP />
    </div>
  )
}

export default page