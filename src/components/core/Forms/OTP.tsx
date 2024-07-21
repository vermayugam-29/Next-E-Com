'use client';
import { SignUpformState } from '@/recoil/atoms/formState';
import { loadingState } from '@/recoil/atoms/loadingState';
import { signUp } from '@/recoil/services/auth';
import { SignUp } from '@/types/stateTypes';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

const OTP = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [data, setData] = useRecoilState(SignUpformState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();



  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const element = e.target as HTMLInputElement;

    if (e.key === 'Backspace') {
      if (element.value === '') {
        if (element.previousSibling) {
          (element.previousSibling as HTMLInputElement).focus();
        }
      } else {
        setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(data, otp, setLoading, router);
  };



  return (
    <form onSubmit={handleSubmit} className="w-[100%] h-[80vh] flex flex-col items-center justify-center">
      <div className='w-fit-content mb-[70px] text-2xl font-bold'>
        <h1>Enter the OTP sent on your email</h1>
      </div>
      <div className="flex space-x-2 mb-4">
        {otp.map((data, index) => (
          <input
            className="w-12 h-12 border rounded-lg text-center text-xl"
            type="tel"
            name="otp"
            maxLength={1}
            key={index}
            value={data}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
            onFocus={(e) => e.target.select()}

          />
        ))}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default OTP;
