import { auth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/TitleForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const data = await fetch(
    `http://localhost:3000/api/courses/${params.courseId}`,
    { method: "GET" }
  );
  const course = await data.json();
  if (!course) redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totlaFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totlaFields})`;

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-gray-500">
              Complete All Fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">
              Customised Your Course
              </h2>
            </div>
            <TitleForm initialData={course} courseId={course._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
