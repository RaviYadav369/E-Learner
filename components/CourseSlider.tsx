"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import CoureseCard from './course-card';
import { ICourse } from '@/lib/models/course.model';

interface CourseCarousal {
  courses :Array<ICourse>
}

const CourseSlider = ({courses}:CourseCarousal) => {
  const slideConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
    modules: [Navigation],
    className: "courseSwiper",
    navigation: true,
  };

  return (
    <div className='py-4'>
       <Swiper {...slideConfig}>
        {courses.map((course:any)=>(
         <SwiperSlide>
          <CoureseCard course={course} />
         </SwiperSlide>
        ))}
       </Swiper>
    </div>
  )
}

export default CourseSlider