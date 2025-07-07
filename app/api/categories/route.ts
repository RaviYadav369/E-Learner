import { connectToDb } from "@/lib/db";
import Category from "@/lib/models/category.model";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {
      connectToDb()
    
      const categoryList = await Category.find().sort({"name":-1})
      return  NextResponse.json({categoryList},{status:200})
      
    } catch (error:any) {
      console.log("[COURSES]:",error);
      return new NextResponse("Internal Error",{status:500})    
    }
  }