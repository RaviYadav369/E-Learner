import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  name: String,
  url: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Attachment = mongoose.models.Attachment || mongoose.model("Attachment", attachmentSchema);
export default Attachment;
