import { connectToDb } from "@/lib/db";
import Attachment from "@/lib/models/attachments.model";
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
    const values = await req.json();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log(values);
    const attachments = await Attachment.create({
      ...values,
      courseId,
    });
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { attachments: attachments._id },
      },
      { new: true }
    );

    return NextResponse.json({ attachments }, { status: 200 });
  } catch (error: any) {
    console.log("[ATTACHMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function GET(req:Request){
//   try {
//     connectToDb()

//     const coursesList = await Category.find({$sort:"desc"})
//     return  NextResponse.json({coursesList},{status:200})

//   } catch (error:any) {
//     console.log("[COURSES]:error");
//     return new NextResponse("Internal Error",{status:500})
//   }
// }
