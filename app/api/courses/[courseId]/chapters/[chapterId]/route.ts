import { connectToDb } from "@/lib/db";
import Chapter from "@/lib/models/chapter.model";
import Course from "@/lib/models/course.model";
import { auth } from "@clerk/nextjs";
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
    const { courseId, chapterId } = params;

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
    const { userId } = auth();
    const { chapterId, courseId } = params;
    const { isPublished, ...values } = await req.json();
    const ownCourse = await Course.findOne({ _id: courseId, userId });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { ...values },
      { new: true }
    );

    if (values.videoUrl) {
      const existingMuxData = await MuxData.findOne({
        chapterId: params.chapterId,
      });
      if (existingMuxData) {
        await Video.video.assets.delete(existingMuxData.assetId);
        await MuxData.deleteOne({ _id: existingMuxData._id });
      }
    }

    const asset = await Video.video.assets.create({
      input: values.videoUrl,
      playback_policy: ["public"],
      test: false,
    });
    const muxdata = await MuxData.create({
      chapterId: params.chapterId,
      assetId: asset.id,
      playbackId: asset.playback_ids?.[0]?.id,
    });
    await Chapter.findByIdAndUpdate(
      chapterId,
      {
        $push: { muxData: muxdata._id },
      },
      { new: true }
    );

    return NextResponse.json({ chapter }, { status: 200 });
  } catch (error: any) {
    console.log("[CHAPTER]", error);
    throw new Error("Internal Error");
  }
}
