'use client'
import { top100Films } from '@/data/data'
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDetails, userProfile } from '@/recoil/atoms/userState'
import Link from 'next/link';
import { userCart } from '@/recoil/atoms/cartState';
import { allItems } from '@/recoil/atoms/itemState';
import { useSession } from 'next-auth/react';
import { UserToken } from '@/types/stateTypes';

const Navbar = () => {

    //use session instead of these  user , profile values

    const [user, setUser] = useRecoilState(userDetails);
    const [cart, setCart] = useRecoilState(userCart);
    const items = useRecoilValue(allItems);
    const session = useSession()

    useEffect(() => {
        const localCart = localStorage.getItem('cart');
        if (!user && localCart) {
            setCart(JSON.parse(localCart));
        }
        if (session?.status.toString() === 'authenticated') {
            if (session.data?.user) {
                setUser(session.data.user as UserToken);
            }
        }
        if (!session || session.status === 'unauthenticated') {
            setUser(null);
        }
    }, [cart, user, session, setUser])

    return (
        <form className="navbar bg-base-100">
            <div className="flex-1">
                <a href={'/'} className="btn btn-ghost text-xl">RPR</a>
            </div>


            <div className='w-[50%] flex justify-center items-center'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={items}
                    sx={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Items"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: '5px', // Change border size here
                                    },
                                    '&:hover fieldset': {
                                        borderWidth: '5px', // Change border size on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: '2px', // Change border size when focused
                                    },
                                },
                            }}
                        />
                    )}
                />

            </div>



            <div className="flex-none gap-7">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="badge badge-sm indicator-item">
                                {
                                    cart ?
                                        cart.items.length :
                                        0
                                }
                            </span>
                        </div>
                    </div>
                    {
                        cart &&
                        (
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">
                                        {cart.items.length} Items
                                    </span>
                                    <span className="text-info">
                                        Subtotal: ₹{cart.totalAmount}
                                    </span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    !user ?
                        <button className="w-10">
                            <Link href={'/login'}>
                                Login
                            </Link>
                        </button>
                        :
                        (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user!.profilePhoto} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a href={'/dashboard'} className="justify-between">
                                        Dashboard
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                {/* <li><a>Settings</a></li> */}
                                <li><a>Logout</a></li>
                            </ul>
                        </div>)
                }
            </div>
        </form>
    )
}

export default Navbar
