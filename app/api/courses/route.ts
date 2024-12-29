import { connectToDb } from "@/lib/db";
import Category from "@/lib/models/category.model";
import Course from "@/lib/models/course.model";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    connectToDb();
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await Course.create({
      userId:userId,
      title:title,
    });

    return NextResponse.json({course},{status:200});
  } catch (error: any) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req:Request){
  try {
    connectToDb()
  
    const coursesList = await Category.find({$sort:"desc"})
    return  NextResponse.json({coursesList},{status:200})
    
  } catch (error:any) {
    console.log("[COURSES]:",error);
    return new NextResponse("Internal Error",{status:500})    
  }
}

