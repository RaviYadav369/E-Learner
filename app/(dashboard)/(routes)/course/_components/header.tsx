import { Button } from "@/components/ui/button";
import { dateFormater } from "@/lib/format";
import React from "react";

interface CourseDetailsProps {
  title: string;
  description: string;
  imgUrl: string;
  createdAt: Date;
  chapters:number;
}
const CourseHeader = ({
  title,
  description,
  imgUrl,
  createdAt,
  chapters
}: CourseDetailsProps) => {
  return (
    <div className="relative">
      <img src={imgUrl} className="w-full h-[300px] opacity-75" alt={title} />
      <div className="w-11/12 mx-auto ">
        <div className="flex w-11/12 justify-between p-4 mx-auto my-4 absolute top-10 bg-white/80">
          <div className="p-2 w-4/5">
            <div className="p-2">
              <h2 className="text-4xl ">{title}</h2>
            </div>
            <div className="p-2">
              <h3 className="text-base">{description}</h3>
            </div>
            <div className="px-2 mb-2">
              <h3 className="text-base">Author</h3>
            </div>
            <div className="px-2 text-xs flex gap-1">
              <div className="flex">
                <span>Created at -</span>
                <h3 className="px-1">{dateFormater(createdAt)}</h3>
              </div>
              <div className="flex ">
                <h3 className="px-1">{chapters}</h3>
                <span>Chapters</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button type="button" className=" bg-sky-400 p-4 rounded-lg">
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
