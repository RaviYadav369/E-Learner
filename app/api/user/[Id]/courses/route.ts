import { connectToDb } from "@/lib/db";
import Course from "@/lib/models/course.model";

type props={
    params:{
      Id:string
    }
  }
export async function GET(req:Request, { params }:props){
    try {
      connectToDb()
      console.log("courses------------",params.Id)
      const courses= await Course.find({userId:params.Id});
      console.log("from backend",courses)
      return new Response(JSON.stringify(courses ), { status: 200 });
    } catch (error:any) {
      console.log("[COURSES]",error);
     throw new Error("Internal Error") 
    }
  }
