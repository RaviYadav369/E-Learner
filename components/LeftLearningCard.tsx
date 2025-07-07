import Image from 'next/image'
import React from 'react'
import VideoImage from '../public/video.png'

const LeftLearningCard = () => {
  return (
    <div className='flex w-96 h-44 border rounded-xl shadow-md'>
        <div className='w-1/3 flex justify-center items-center bg-slate-300'>
            <Image src={VideoImage} alt='video' className='w-fit' width={100} />
        </div>
        <div className='w-2/3 flex flex-col justify-between'>
        {/* Coures Name */}
        <div className='gap-1 flex flex-col my-4 w-11/12 mx-auto'>
        <p className='text-sm truncate w-full'>React : The Complete Guide 2025 (included )</p>
        {/* Chapter name  */}
        <h2 className='font-semibold'>312. Working with Multiple State</h2>
        </div>
        {/* % of Course completion */}
        <div className='p-1 bg-sky-600' />
        </div>
    </div>
  )
}

export default LeftLearningCard