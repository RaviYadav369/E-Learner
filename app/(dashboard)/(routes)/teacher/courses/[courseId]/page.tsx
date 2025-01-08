import { auth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import AttachmentForm from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";
import CourseAction from "./_components/CourseAction";
import { Banner } from "@/components/banner";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();


  if (!userId) redirect("/");

  const data = await fetch(
    `http://localhost:3000/api/courses/${params.courseId}`,
    { method: "GET" }
  );

  const text = await data.text(); 
  const course = JSON.parse(text); 
  if (!course) redirect("/");

  const response = await fetch(`http://localhost:3000/api/courses`, {
    method: "GET",
  });

  const categoryData = await response.json();
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter: { isPublished: any; }) => chapter.isPublished)
  ];

  const totlaFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totlaFields})`;

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!course.isPublished===true && (
          <Banner 
          variant='warning'
          label='This Course is unpublished. It will not be visible in the Your Published List'
          />
        )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-gray-500">
              Complete All Fields {completionText}
            </span>
          </div>
          <CourseAction
          disabled={!isComplete}
          courseId={params.courseId}
          isPublished={course.isPublished}

          />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />

              <h2 className="text-lg">Customised Your Course</h2>
            </div>
            <TitleForm initialData={course} courseId={course._id} />
            <DescriptionForm initialData={course} courseId={course._id} />
            <ImageForm initialData={course} courseId={course._id} />
            <CategoryForm
              initialData={course}
              courseId={course._id}
              options={categoryData.coursesList.map((category: any) => ({
                label: category.name,
                value: category._id,
              }))}
            />
          </div>
          <div>
            <div className="space-y-6">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapter </h2>
              </div>

              <ChaptersForm initialData={course} courseId={course._id} />

              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={CircleDollarSign} />
                  <h2 className="text-lg">Sell Your Course</h2>
                </div>
                <PriceForm initialData={course} courseId={course._id} />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={File} />
                  <h2 className="text-lg">Resources & Attachment</h2>
                </div>
                <AttachmentForm initialData={course} courseId={course._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
