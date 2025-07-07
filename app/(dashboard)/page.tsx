'use server'
import React from "react";
import WeeklyStreak from "../(dashboard)/_components/WeeklyStreak";
import Link from "next/link";
import LeftLearningCard from "@/components/LeftLearningCard";
import CourseSlider from "@/components/CourseSlider";


const page = async() => {
  const result = await fetch(`http://localhost:3000/api/courses`,{
    method:"GET"
  })
 const courses = await result.json()

  return (
    <div>
      <div className="bg-gray-400 py-3">
        <div className="flex items-center w-4/5 mx-auto p-2 gap-3">
          <div className="bg-black text-xl text-white flex justify-center items-center rounded-full p-4">
            RY
          </div>
          <div className="">
            <h2 className="text-black text-xl font-semibold p-1">
              Welcome back, Ravi
            </h2>
            <p className="text-xs text-blue-600 underline p-1">
              Add occupation and interest
            </p>
          </div>
        </div>
      </div>
      <WeeklyStreak />
      <div className="w-4/5 mx-auto">
        <div className="flex justify-between items-center py-5 my-1">
          <h3 className="font-semibold text-2xl">Pick up where you left off</h3>
          <Link className="text-sky-600 underline text-sm" href='#'>My learning</Link>
        </div>
        <div className="overflow-auto flex gap-3">
        <LeftLearningCard />
        <LeftLearningCard />
        <LeftLearningCard />
        <LeftLearningCard />
        </div>
      </div>
      <div className="w-4/5 mx-auto">
      <h2 className="text-2xl font-semibold py-4">Recommended Courses for you</h2>
      <CourseSlider courses={courses.courseList} />
      </div>
    </div>
  );
};

export default page;
