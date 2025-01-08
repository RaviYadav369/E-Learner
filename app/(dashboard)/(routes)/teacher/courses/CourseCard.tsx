"use client";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type props = {
  key: string;
  courseId: string;
  title: string;
  courses:any
};

const CourseCard = ({ key, courseId, title,courses }: props) => {
  const router = useRouter();
  const handleCourseClick = (id: string) => {
    router.push(`/teacher/courses/${id}`);
  };
  return (
    <>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Coures Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Chaptes</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course:any) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium cursor-pointer hover:underline" onClick={()=>handleCourseClick(course._id)}>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{course.isPublished ? 'True': 'False' }</TableCell>
              <TableCell>{course.chapters.length}</TableCell>
              <TableCell className="text-right">
                {course.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CourseCard;
