import React from "react";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  return (
    <>
      <div>course Id:{params.courseId}</div>
      <p>hello</p>
    </>
  );
};

export default CourseIdPage;
