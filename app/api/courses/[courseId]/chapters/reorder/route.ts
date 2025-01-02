import Chapter from "@/lib/models/chapter.model";
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
    const ownCourse = await Course.find({
      _id:params.courseId,
      userId: userId,
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    for (let item of list) {
      await Chapter.findByIdAndUpdate(
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
