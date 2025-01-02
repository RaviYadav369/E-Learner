"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";

type props = {
  key: string;
  courseId: string;
  title: string;
};

const CourseCard = async ({ key, courseId, title }: props) => {
  const router = useRouter();
  const handleCourseClick = (id: string) => {
    router.push(`/teacher/courses/${id}`);
  };
  return (
    <div>
      <div>{courseId}</div>
      <button onClick={() => handleCourseClick(courseId)}>{title}</button>
    </div>
  );
};

export default CourseCard;
