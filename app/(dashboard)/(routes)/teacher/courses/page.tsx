import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const page = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const courseData = await fetch(
    `http://localhost:3000/api/user/${userId}/courses`,
    { method: "GET" }
  );
  const courses = await courseData.json();

  return (
       <DataTable columns={columns} data={courses} />
  );
};

export default page;
