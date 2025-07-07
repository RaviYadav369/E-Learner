import Image from 'next/image'
import React from 'react'
import { Flame } from 'lucide-react'

const WeeklyStreak = () => {
    return (
        <div className='w-4/5 border mx-auto outter-container flex m-5 p-4 py-6 rounded-xl shadow-md '>
            <div className='w-2/5 gap-1 border-blue-600 flex flex-col justify-center left-container pb-5 bg-slate-700 flex-shrink-0'>
                <h2 className='text-xl font-semibold '>Weekly streak</h2>
                <p className='text-xs '>Well done! You're on your way to reaching your goals.</p>
            </div>
            <div className='flex justify-between items-center right-container w-3/5 bg-green-300 flex-shrink-0'>
                <div className='flex items-center justify-center gap-1 w-2/5'>
                    <Flame className='w-10 h-10 text-sky-700' />
                    <div>
                        <h3 className='text-lg font-semibold text-black'>4 weeks</h3>
                        <p className=' text-xs'>Current streak</p>
                    </div>
                </div>
                <div className='flex items-center justify-center p-3  w-2/5'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-3'>
                            {/* <Image /> */}
                            <div className=''>
                                <p className='text-xs pt-1'>234/34 coures min</p>
                                <p className='text-xs pt-1'>4/1 visit</p>
                                <p className='text-xs pt-1'>Mar 20 - Apr 4</p>
                            </div>
                        </div>
                        <p className='text-right my-1 underline text-xs'>See all acticvity</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyStreak