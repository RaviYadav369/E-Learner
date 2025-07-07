'use client'
import { ICourse } from '@/lib/models/course.model'
import Image from 'next/image'
import React from 'react'

interface CourseCardProps{
 course:ICourse
}

const CoureseCard = ({course}:CourseCardProps) => {
  console.log(course.imageUrl)
  return (
    <div className='w-11/12 mx-auto'>
      <Image src={course.imageUrl || ''} alt={course.title} width={200} height={200} />
      <h2 className='truncate text-lg font-semibold py-2'>{course.title}</h2>
      <p className='text-base '>{/*{course.creator}*/}</p>

    </div>
  )
}

export default CoureseCard