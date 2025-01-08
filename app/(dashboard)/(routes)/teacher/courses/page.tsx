import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseCard from "./CourseCard";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const courseData = await fetch(
    `http://localhost:3000/api/user/${userId}/courses`,
    { method: "GET" }
  );
  const courses = await courseData.json();

  // let courses: any = [];

  return (
       <DataTable columns={columns} data={courses} />
  );
};

export default page;
