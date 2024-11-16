import { connectToDb } from "@/lib/db";
import Attachment from "@/lib/models/attachments.model";
import { NextResponse } from "next/server";

type props = {
  params: {
    courseId: string;
    attachmentId: string;
  };
};

export async function DELETE(req: Request, { params }: props) {
  try {
    connectToDb();

    await Attachment.findByIdAndDelete(params.attachmentId);
    return NextResponse.json(
      { message: "Attachment deleted Successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("[COURSES]:error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
