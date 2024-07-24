'use client'
import React from 'react'
import { IconEdit } from '@tabler/icons-react'

interface EditButtonProps {
  onClickFunction: (name: string) => void;
  name : string
}

const EditButton: React.FC<EditButtonProps> = ({onClickFunction , name}) => {
  return (
    <div>
      <button onClick={() => onClickFunction(name)} className="inline-flex h-10
       md:h-12 animate-shimmer w-[100%] md:w-[100%] text-xs md:text-lg
      items-center justify-center rounded-md md:border md:border-slate-800
       bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
       bg-[length:200%_100%] px-2 md:px-6 font-medium text-slate-400 transition-colors
        focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
         focus:ring-offset-slate-50 gap-2">
          Edit
          <IconEdit className='w-1/2 h-3 md:h-5 md:w-full' />
        </button>
    </div>
  )
}

export default EditButton
      
