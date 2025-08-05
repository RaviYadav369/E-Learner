import mongoose, { model } from "mongoose";

export interface IChapter extends Document {
  title: string;
  description?: string; // Optional field
  videoUrl: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData?: mongoose.Types.ObjectId; 
  courseId: mongoose.Types.ObjectId;
  userProgress?: mongoose.Types.ObjectId[]; 
  createdAt: Date;
}

const chapterSchema = new mongoose.Schema<IChapter>({
  title: { type: String, require: true },
  description: String,
  videoUrl: { type: String, require: true },
  position: { type: Number, require: true },
  isPublished: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  muxData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MuxData",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    require:true,
  },
  userProgress: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProgress",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chapter = mongoose.models.Chapter || mongoose.model<IChapter>("Chapter",chapterSchema)
export default Chapter;
