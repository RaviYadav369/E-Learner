"use client";
import { ICourse } from "@/lib/models/course.model";
import Image from "next/image";
import React from "react";
import VideoImage from "@/public/video.png";
import { Link } from "lucide-react";

interface CourseCardProps {
  course: ICourse;
}

const CoureseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="border-2 p-3 rounded-lg shadow-lg border-black mx-auto flex flex-col justify-between h-[420px]">
      <div className="w-full">
        <a href={`/course/${course._id}`} className="block">
          <div className="flex gap-3 flex-col">
            <div className="w-[280px] h-[140px]">
              <Image
                src={course.imageUrl ? course.imageUrl : VideoImage}
                alt={course.title}
                className="max-w-fit fill rounded-md"
                width="280"
                height="240"
              />
            </div>
            <div>
              <div className="my-1">
                <div >
                  <div  className="text-lg/6 font-bold line-clamp-2" >
                  
                      {course.title}
                  
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm line-clamp-1">
                  Dr. Angela Yu, Developer and Lead Instructor
                </div>
              </div>

              <div className="py-1">
                <span>
                  <span className="text-sm">Rating: 4.7 out of 5</span>
                </span>
              </div>

              <div className="py-2 ">
                <div className="flex gap-1">
                  <div>
                    <span>
                      <span>₹539</span>
                    </span>
                  </div>
                  <div className="text-sm flex justify-end items-end">
                    <div>
                      <span>
                        <s>
                          <span>₹3,219</span>
                        </s>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3">
                <div>
                  <div className="">
                    <span className="text-base border border-sky-500 p-1 px-2 rounded-lg shadow-md bg-sky-300">
                      Bestseller
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <button type="button" className=" w-full">
          <div className="border border-sky-600 py-[6px] text-center w-full rounded-lg bg-sky-400">
            Show course details
          </div>
        </button>
      </div>
    </div>
  );
};

export default CoureseCard;
