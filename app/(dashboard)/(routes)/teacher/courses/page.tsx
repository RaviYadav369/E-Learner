import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href="/teacher/create">
        <Button>New Courses</Button>
      </Link>
    </div>
  );
};

export default page;
