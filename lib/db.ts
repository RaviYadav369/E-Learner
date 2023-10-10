import mongoose from "mongoose";

let isConnected:boolean = false;

export const connectToDb = async()=>{
  mongoose.set('strictQuery',true)

  if(!process.env.DATABASE_URL) return console.log("Missing DATABASE_URL env variable");

  if(isConnected) return console.log("Already connected to DB");

  try {
    await mongoose.connect(process.env.DATABASE_URL)
    isConnected = true;
    console.log('Connected to DB');
    
  } catch (error:any) {
    console.log("[DATABSE]", error);
    throw new Error(error)
  }
  
}