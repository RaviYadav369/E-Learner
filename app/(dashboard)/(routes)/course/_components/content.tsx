import { IChapter } from "@/lib/models/chapter.model";
import React from "react";

import { MdOutlineOndemandVideo } from "react-icons/md";

interface ChapterContentProps {
  chapters: Array<IChapter>;
}

const CourseContent = ({ chapters }: ChapterContentProps) => {
  console.log("chapter content", chapters);
  return (
    <div className="w-11/12 mx-auto">
      <div className="text-xl font-bold mt-5">
        All Chapters
      </div>
      <div className="my-5">
        {chapters.map((chapter) => (
          <>
            <div key={chapter.title} className="grid grid-rows-1 grid-cols-12 px-2 py-4 border-2 border-black rounded-md">
              <div className="sm:col-span-1 col-span-2 flex justify-center items-center">
                <MdOutlineOndemandVideo className=" h-8 w-8" />
              </div>
              <div className="sm:col-span-10 col-span-8 flex flex-col justify-center">
                <p>{chapter.title}</p>
                <p className="text-xs">asdf{chapter.description}</p>
              </div>
              <div className="sm:col-span-1 col-span-2 flex justify-center items-center">
                {chapter.isFree && (

                  <span className="px-2 py-1 text-sm bg-sky-300 rounded-xl">
                  Preview
                </span>
                )}
              </div>
              {/* {chapter.isFree && <span className="px-2 py-1 text-sm bg-sky-300">Preview</span>} */}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
