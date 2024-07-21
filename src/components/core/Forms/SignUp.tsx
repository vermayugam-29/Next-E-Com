"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignUp } from "@/types/stateTypes";
import { SignUpformState } from "@/recoil/atoms/formState";
import { useRecoilState } from "recoil";

export function SignupFormDemo() {


  const [formData, setFormData] = useRecoilState<SignUp>(SignUpformState);
  const [customer, setCustomer] = useState(true);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/signUp/otp');
  };


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to RPR Steel Works
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        All fields are necessary to signup for RPR account
      </p>

      <form
        className="my-8" onSubmit={handleSubmit}>

        <div className="flex items-center justify-center">
          <div className='flex bg-black-100 my-6 rounded-full p-1 gap-4 max-w-max'>
            <button
            type="button"
              name="accountType"
              value='Customer'
              onClick={() => {
                setCustomer(true);
                setFormData((prev : SignUp) => {
                  return {
                    ...prev ,
                    accountType : 'Customer'
                  }
                })
              }}
              className={
                `${customer ? "bg-richblack-700 p-3 text-richblack-5 rounded-full" : "bg-transparent text-richblack-200 p-2 rounded-full transition-all duration-200"}`
              }
            >
              Customer
            </button>

            <button
            type="button"
              name={formData.accountType}
              value='Admin'
              onClick={() => {
                setCustomer(false);
                setFormData((prev : SignUp) => {
                  return {
                    ...prev ,
                    accountType : 'Admin'
                  }
                })
              }}
              className={
                `${!customer ? "bg-richblack-700 p-3 text-richblack-5 rounded-full" : "bg-transparent text-richblack-200 p-2 rounded-full transition-all duration-200"}`
              }
            >
              Admin
            </button>
          </div>
        </div>


        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">


          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input required id="firstname"
              onChange={changeHandler}
              value={formData.firstName}
              placeholder="Yugam" name="firstName" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" onChange={changeHandler}
              value={formData.lastName}
              placeholder="Verma" name="lastName" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input required id="email" name='email' onChange={changeHandler}
            value={formData.email}
            placeholder="yugam@gmail.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Create Password</Label>
          <Input id="password" name="password" placeholder="••••••••"
            onChange={changeHandler}
            value={formData.password}
            type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword">Confirm password</Label>
          <Input
            onChange={changeHandler}
            name="confirmPassword"
            value={formData.confirmPassword}
            id="confirmpassword"
            placeholder="••••••••"
            type="confirmpassword"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <Link href={'/login'}>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Log In &rarr;
            <BottomGradient />
          </button>
        </Link>

      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
