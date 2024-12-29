import Course from "@/lib/models/course.model";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }
    const { list } = await req.json();
    console.log("this is  list ", list);
    const ownCourse = await Course.findById({
      id: params.courseId,
      userId: userId,
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    for (let item of list) {
      await Course.findByIdAndUpdate(
        item._id,
        {
          position: item.position,
        },
        { new: true }
      );
    }

    return new NextResponse("Sucess", { status: 200 });
  } catch (error) {
    console.log("[REOEDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
