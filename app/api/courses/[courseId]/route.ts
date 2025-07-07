import { connectToDb } from "@/lib/db";
import Attachment from "@/lib/models/attachments.model";
import Chapter from "@/lib/models/chapter.model";
import Course from "@/lib/models/course.model";
import MuxData from "@/lib/models/muxData.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

type props = {
  params: {
    courseId: string;
  };
};

const Video = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"],
  tokenSecret: process.env["MUX_TOKEN_SECRET"],
});


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
    const { userId } =await auth();
    const { courseId } = params;
    const {isPublished,...values} = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log('this is ispublish',isPublished)

    if(typeof isPublished !=='undefined'){
     await Course.findOneAndUpdate(
        { _id: courseId },
        {
         isPublished:isPublished
        },
      );
    }
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        ...values,
      },
      { new: true }
    );

    return NextResponse.json({ course }, { status: 200 });
  } catch (error: any) {
    console.log("[COURSES_ID]", error);
    throw new Error("Internal Error");
  }
}

export async function DELETE(req:Request,{params}:props){
  try {
    connectToDb();
    const { courseId } = params;
    const {userId} = await auth()
    const ownCourse = await Course.findOne({_id:courseId,userId:userId})
    if(!ownCourse){
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if(ownCourse.attachments.length>0){
      for(let item in ownCourse.attachments){
        await Attachment.findByIdAndDelete(ownCourse.attachments[item])
      }
      //delete document also from uploadthing
    }
    if(ownCourse.chapters.length > 0){
      
      for(let item in ownCourse.chapters){
        const exitChapter = await Chapter.findById(ownCourse.chapters[item])
        if (exitChapter.videoUrl) {
          const existingMuxData = await MuxData.findOne({
            chapterId: exitChapter._id,
          });
          if (existingMuxData) {
            await Video.video.assets.delete(existingMuxData.assetId);
            await MuxData.findByIdAndDelete(existingMuxData._id);
          }
          await Chapter.findByIdAndDelete(exitChapter._id)
        }
        else{
          await Chapter.findByIdAndDelete(exitChapter._id)

        }
      }
    }

    const course = await Course.findByIdAndDelete({_id:courseId})
    
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error: any) {
    console.log("[COURSES]", error);
    throw new Error("Internal Error");
  }
}