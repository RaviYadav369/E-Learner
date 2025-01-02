import { connectToDb } from "@/lib/db";
import Chapter from "@/lib/models/chapter.model";
import Course from "@/lib/models/course.model";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type props = {
  params: {
    courseId: string;
  };
};

export async function POST(req: Request, { params }: props) {
  try {
    connectToDb();
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const lastChapter = await Chapter.find({
      courseId: params.courseId,
    }).sort({ position: "desc" });
    const newPosition = lastChapter.length > 0 ? parseInt(lastChapter[0].position, 10) + 1 : 1;

    const chapter = await Chapter.create({
      ...values,
      courseId,
      position: newPosition,
    });

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { chapters: chapter._id },
      },
      { new: true }
    );

    return NextResponse.json({ chapter }, { status: 200 });
  } catch (error: any) {
    console.log("[COURSES_ID]", error);
    throw new Error("Internal Error");
  }
}
