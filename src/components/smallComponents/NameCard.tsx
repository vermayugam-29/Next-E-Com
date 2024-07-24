import { userDetails } from '@/recoil/atoms/userState'
import React from 'react'
import { useRecoilValue } from 'recoil'
import EditButton from './EditButton'
import {
    dashboardClick, profileClick, settingsClick, logoutClick, itemsClick,
    ordersClick, chatClick,
    selectedLinkState
} from '@/recoil/atoms/dashboardStates'
import { useSetRecoilState } from 'recoil'

const NameCard = () => {

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

    return (
        <div className='w-full h-28 bg-white bg-opacity-20
         rounded-xl p-4 flex items-center justify-between mt-12'>

            <div className='flex w-[70%] md:w-[40%] h-full items-center'>
                <div className='h-[90%] w-[20%] mt-8 mr-2 md:mr-0 md:mt-0'>
                    <img className='w-full md:w-[70px] md:h-full rounded-full' src={user?.profilePhoto} />
                </div>

                <div className='w-[90%] md:w-1/2 flex flex-col'>
                    <h1 className='text-s text-black font-semibold sm:text-xs md:text-2xl'>{user?.name}</h1>
                    <h1 className='text-xs md:text-lg text-black'>{user?.email}</h1>
                </div>
            </div>

            <div>
                <EditButton onClickFunction={clickHandler} name={'Settings'} />
            </div>

        </div>
    )
}

export default NameCard