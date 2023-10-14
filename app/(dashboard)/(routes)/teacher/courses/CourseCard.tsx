import { redirect } from 'next/navigation';
import React from 'react'

type props = {
    key:string,
    courseId:string;
    title:string;
}

const CourseCard = async({key,courseId,title}:props) => {
    const handleCourseClick = (id:string)=>{
        redirect(`/teacher/courses/${id}`)
        }
  return (
    <div>
        <div>{courseId}</div>
        <button onClick={()=>handleCourseClick(courseId)}>{title}</button>
    </div>
  )
}

export default CourseCard