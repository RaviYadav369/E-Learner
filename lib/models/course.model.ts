import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
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
  isPublished: Boolean,
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

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
