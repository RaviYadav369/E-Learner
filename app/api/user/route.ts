import { connectToDb } from "@/lib/db";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";

interface props {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
  }

export async function PATCH({
    userId,
    username,
    name,
    bio,
    image,
  }: props): Promise<void> {
    connectToDb();
    try {
      await User.findOneAndUpdate(
        { id: userId },
        {
          username: username.toLowerCase(),
          name,
          bio,
          image,
        },
        {
          upsert: true,
        }
      );
      
    } catch (error) {
      throw new Error("Failed to create/update user:");
    }
  }

export async function GET(userId: string) {
    try {
      connectToDb();
      return await User.findOne({ id: userId })
      // .populate({path:'communities',model:Communit})
    } catch (error: any) {
      throw new Error(`Failed to Fetch user Data: ${error.message}`);
    }
  }
