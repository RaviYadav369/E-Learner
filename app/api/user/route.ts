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

export async function PATCH(req: Request,{
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

type Props  ={
  params: {
    userId: string;
  };
}

export async function GET(req: Request, { params }: Props) {
    try {
      connectToDb();
      const { userId } = params;
      return await User.findOne({ id: userId })
      // .populate({path:'communities',model:Communit})
    } catch (error: any) {
      throw new Error(`Failed to Fetch user Data: ${error.message}`);
    }
  }
