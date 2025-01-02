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
      const courses= await Course.find({userId:params.Id});
      return new Response(JSON.stringify(courses ), { status: 200 });
    } catch (error:any) {
      console.log("[COURSES]",error);
     throw new Error("Internal Error") 
    }
  }
