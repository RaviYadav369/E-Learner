import { connectToDb } from "@/lib/db";
import Attachment from "@/lib/models/attachments.model";
import Chapter from "@/lib/models/chapter.model";
import Course from "@/lib/models/course.model";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type props = {
  params: {
    courseId: string;
  };
};

export async function GET(req: Request, { params }: props) {
  try {
    connectToDb();
    const { courseId } = params;

    const courses = await Course.findById({ _id: courseId })
      .populate({
        path: "attachments",
        model: Attachment,
      })
      .populate({
        path: "chapters",
        model: Chapter,
        options: {
          sort: { position: 1 },
        },
      });
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error: any) {
    console.log("[COURSES]", error);
    throw new Error("Internal Error");
  }
}

export async function PATCH(req: Request, { params }: props) {
  try {
    connectToDb();
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        ...values,
      },
      { new: true }
    );

    await course.save();

    return NextResponse.json({ course }, { status: 200 });
  } catch (error: any) {
    console.log("[COURSES_ID]", error);
    throw new Error("Internal Error");
  }
}
