import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import ChapterTitleForm from "../_components/ChapterTitleForm";
import ChapterDescriptionForm from "../_components/ChapterDescriptionForm";
import ChapterAccessForm from "../_components/ChapterAccessForm";
import ChapterVideoForm from "../_components/ChapterVideoForm";
import { Banner } from "@/components/banner";
import ChapterAction from "../_components/ChapterAction";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const data = await fetch(
    `http://localhost:3000/api/courses/${params.courseId}/chapters/${params.chapterId}`,
    { method: "GET" }
  );
  
  const chapter = await data.json();
  if (!chapter) redirect("/");
  const requiredFields = [
    chapter.chapter.title,
    chapter.chapter.description,
    chapter.chapter.videoUrl,
  ];

  const totlaFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totlaFields})`;

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
    {!chapter.chapter.isPublished===true && (
      <Banner 
      variant='warning'
      label='This chapter is unpublished. It will not be visible in the course'
      />
    )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/`}
              className="flex items-center text-sm hover:opacity-75 transition mb-0"
            >
              <ArrowLeft className=" w-4 h-4 mr-2" />
              Back to Course Setup
            </Link>
            <div className="flex items-center mt-5 justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all field {completionText}
                </span>
              </div>
              <ChapterAction
              disabled={!isComplete}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-lg">Customised Your Chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter.chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>

            <div className="space-y-6">
              <ChapterDescriptionForm
                initialData={chapter.chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Setting</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter.chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm
             initialData={chapter.chapter}
             courseId={params.courseId}
             chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
