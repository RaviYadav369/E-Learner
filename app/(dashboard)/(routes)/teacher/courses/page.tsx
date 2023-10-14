
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseCard from "./CourseCard";

const page = async() => {
  const { userId } = auth();
  console.log(userId);
  

  if (!userId) redirect("/");
  
//   const courseData = await fetch(`http://localhost:3000/api/user/${userId}/courses`,{method:"GET"});
// const courses = await courseData.json();
// console.log(courses);



  return (
    <div>
      <Link href="/teacher/create">
        <Button>New Courses</Button>
      </Link>
      <div>
        {/* {courses.map((course:any) => {
          return <CourseCard key={course._id} courseId={course._id} title={course.title} />;
        })} */}
       
      </div>
    </div>
  );
};

export default page;
