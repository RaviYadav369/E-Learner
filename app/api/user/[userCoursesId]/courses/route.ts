import { connectToDb } from "@/lib/db";
import Course from "@/lib/models/course.model";

type props={
    params:{
      userCoursesId:string
    }
  }
export async function GET(req:Request, { params }:props){
    try {
      connectToDb()
      const courses= await Course.findById({userId:params.userCoursesId});
      console.log("from backend",courses)
      return new Response(JSON.stringify(courses ), { status: 200 });
    } catch (error:any) {
      console.log("[COURSES]",error);
     throw new Error("Internal Error") 
    }
  }
