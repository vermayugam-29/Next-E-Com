'use client'
import { userDetails } from '@/recoil/atoms/userState'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import EditButton from './EditButton'
import {
  dashboardClick, profileClick, settingsClick, logoutClick, itemsClick,
  ordersClick, chatClick,
  selectedLinkState
} from '@/recoil/atoms/dashboardStates'
import { useSetRecoilState } from 'recoil'

const AboutCard = () => {

  const setDashboard = useSetRecoilState(dashboardClick);
  const setProfile = useSetRecoilState(profileClick);
  const setSetting = useSetRecoilState(settingsClick);
  const setItems = useSetRecoilState(itemsClick);
  const setLogout = useSetRecoilState(logoutClick);
  const setOrders = useSetRecoilState(ordersClick);
  const setChats = useSetRecoilState(chatClick);

  const setSelectedLink = useSetRecoilState(selectedLinkState);

  const stateSetters: {
    [key: string]: React.Dispatch<React.SetStateAction<boolean>>;
  } = {
    Dashboard: setDashboard,
    Profile: setProfile,
    Settings: setSetting,
    Items: setItems,
    Logout: setLogout,
    Orders: setOrders,
    Chats: setChats
  };

  const clickHandler = (name: string) => {
    setSelectedLink(name);
    Object.keys(stateSetters).forEach((key) => {
      stateSetters[key](key === name);
    });
  }

  const user = useRecoilValue(userDetails);

  const name = user?.name.trim().split(' ');



  return (
    <div className='min-w-full h-auto bg-white bg-opacity-20 max-w-fit
    rounded-xl p-4 flex items-center justify-between mt-12 flex-col gap-8'>

      <div className='flex justify-between w-full items-center'>
        <h1 className='text-2xl font-bold text-black'>{user?.accountType} Details</h1>
        <EditButton onClickFunction={clickHandler} name={'Settings'} />
      </div>


      <div className='flex w-full justify-between md:justify-start md:gap-96'>

        <div className='flex flex-col items-start'>
          <h1 className='text-sm md:text-lg font-semibold text-white text-opacity-50'>First Name</h1>
          <h1 className='text-md text-black font-medium'>{name && name[0]}</h1>
        </div>

        <div className='flex flex-col items-start'>
          <h1 className='text-sm md:text-lg font-semibold text-white text-opacity-50'>Last Name</h1>
          <h1 className='text-md text-black font-medium'>{name && name.length > 1 ? name[1] : `-`}</h1>
        </div>

      </div>

      <div className='flex w-full justify-between md:justify-start md:gap-[215px]'>

        <div className='flex flex-col items-start'>
          <h1 className='text-sm md:text-lg font-semibold text-white text-opacity-50'>Email</h1>
          <h1 className='text-md text-black font-medium'>{user?.email}</h1>
        </div>

        <div className='flex flex-col items-start'>
          <h1 className='text-sm md:text-lg font-semibold text-white text-opacity-50'>Phone Number</h1>
          <h1 className='text-md text-black font-medium'>
            {
              user?.additionalInfo?.phoneNumber ? user?.additionalInfo?.phoneNumber : `Not Found`
            }
          </h1>
        </div>

      </div>

      <div className='flex w-full justify-between md:justify-start md:gap-[384px]'>

        <div className='flex flex-col items-start'>
          <h1 className='text-sm md:text-lg font-semibold text-white text-opacity-50'>Gender</h1>
          <h1 className='text-md text-black font-medium'>
            {
            user?.additionalInfo?.gender ? 
            user.additionalInfo.gender :
            `Add gender`
            }
            </h1>
        </div>

        <div className='flex flex-col items-start'>
          <h1 className='text-sm md:text-lg font-semibold text-white text-opacity-50'>Date of Birth</h1>
          <h1 className='text-md text-black font-medium'>
            {
              user?.additionalInfo?.dob ? `${user.additionalInfo.dob}` : `Add DOB`
            }
          </h1>
        </div>

      </div>

    </div>
  )
}

export default AboutCard
