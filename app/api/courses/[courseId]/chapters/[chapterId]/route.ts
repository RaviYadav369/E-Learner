import { connectToDb } from "@/lib/db";
import Chapter from "@/lib/models/chapter.model";
import Course from "@/lib/models/course.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import MuxData from "@/lib/models/muxData.model";

type props = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

const Video = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"],
  tokenSecret: process.env["MUX_TOKEN_SECRET"],
});

export async function GET(req: Request, { params }: props) {
  try {
    connectToDb();
    const { courseId, chapterId } = await params;

    const chapter = await Chapter.findOne({
      _id: chapterId,
      courseId: courseId,
    }).populate({
      path: "muxData",
      model: MuxData,
    });

    return NextResponse.json({ chapter }, { status: 200 });
  } catch (error: any) {
    console.log("[CHAPTER]", error);
    throw new Error("Internal Error");
  }
}

export async function PATCH(req: Request, { params }: props) {
  try {
    connectToDb();
    const { userId } =await auth();
    const { chapterId, courseId } = params;
    const { isPublished, ...values } = await req.json();
    const ownCourse = await Course.findOne({ _id: courseId, userId });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (typeof isPublished !=='undefined') {
      const chapter = await Chapter.findByIdAndUpdate(
        chapterId,
        { isPublished: isPublished },
        { new: true }
      );
    }


    const publishedChapterInCourse = await Chapter.find({
      courseId: courseId,
      isPublished: true,
    });

    if (!publishedChapterInCourse.length) {
      await Course.findByIdAndUpdate(
        params.courseId,
        {
          isPublished: false,
        },
        { new: true }
      );
    }


    const chapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { ...values },
      { new: true }
    );

    return NextResponse.json({ chapter }, { status: 200 });
  } catch (error: any) {
    console.log("[CHAPTER]", error);
    throw new Error("Internal Error");
  }
}

export async function DELETE(req: Request, { params }: props) {
  try {
    const {userId} =await auth();
    const { courseId, chapterId } = params;

    const ownCourse = await Course.findOne({ _id: courseId, userId });
    if (!ownCourse) {
      return new NextResponse("Unauthorised", { status: 401 });
    }
    const chapter = await Chapter.findOne({
      _id: chapterId,
      courseId: courseId,
    });

    if (!chapter) {
      return new NextResponse("Not find Chapter", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await MuxData.findOne({
        chapterId: chapterId,
      });
      if (existingMuxData) {
        await Video.video.assets.delete(existingMuxData.assetId);
        await MuxData.findByIdAndDelete(chapter.muxData);
      }
    }

  
    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

    const publishedChapterInCourse = await Chapter.find({
      courseId: courseId,
      isPublished: true,
    });

    if (!publishedChapterInCourse.length) {
      await Course.findByIdAndUpdate(
        params.courseId,
        {
          isPublished: false,
        },
        { new: true }
      );
    }

   const course=  await Course.findByIdAndUpdate(
      courseId,
      {$pull: {chapters: chapterId},},
      { new: true }
    );
    console.log('thisis from chapter deleted',course)
    return NextResponse.json({ deletedChapter }, { status: 200 });
  } catch (error: any) {
    console.log("[CHAPTER]", error);
    throw new Error("Internal Error");
  }
}
