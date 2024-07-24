'use client'
import AboutCard from '@/components/smallComponents/AboutCard'
import NameCard from '@/components/smallComponents/NameCard'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Profile = () => {

  return (
    <div className='p-6 flex flex-col'>
      <h1 className='text-center text-4xl font-semibold'>My Profile</h1>

      <NameCard />
      <AboutCard />

    </div>
  )
}

export default Profile
