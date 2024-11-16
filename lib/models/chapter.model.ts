import mongoose, { model } from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: String,
  videoUrl: { type: String, require: true },
  position: { type: String, require: true },
  isPublished: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  muxData: Array,
  courseId: { type: String, require: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  userProgress: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chapter = mongoose.models.Chapter || mongoose.model("Chapter",chapterSchema)
export default Chapter;
