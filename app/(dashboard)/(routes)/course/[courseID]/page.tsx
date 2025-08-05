import axios from "axios";
import React from "react";
import CourseHeader from "../_components/header";
import CourseContent from "../_components/content";

const CourseDetails = async ({ params }: { params: { courseID: string } }) => {
  const result = await axios.get(
    `http://localhost:3000/api/courses/${params.courseID}`
  );
  const courseData = result.data;
  console.log(courseData);
  return (
    <>
      <div className="">
        <CourseHeader
          title={courseData.title}
          description={courseData.description}
          imgUrl={courseData.imageUrl}
          createdAt={courseData.createdAt}
          chapters={courseData.chapters.length}
        />
        <CourseContent
        chapters={courseData.chapters}
        
        />
      </div>
    </>
  );
};

export default CourseDetails;
