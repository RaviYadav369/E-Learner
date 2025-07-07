import mongoose from "mongoose";

export interface ICourse extends Document {
  _id?:string
  creator: mongoose.Types.ObjectId; // Reference to User
  userId: string;
  title: string; // Required
  description?: string; // Optional
  imageUrl?: string; // Optional
  price?: number; // Optional
  isPublished: boolean; // Optional
  categoryId?: mongoose.Types.ObjectId; // Reference to Category
  attachments?: any[]; // Optional, can specify a more specific type if needed
  chapters?: any[]; // Optional, can specify a more specific type if needed
  createdAt: Date; // Default to Date.now
}

const courseSchema = new mongoose.Schema<ICourse>({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userId:{type:String},
  title: {
    type: String,
    require: true,
  },
  description: String,
  imageUrl: String,
  price: Number,
  isPublished: {
    type:Boolean,
    default:false
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  attachments: Array,
  chapters:Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);
export default Course;
