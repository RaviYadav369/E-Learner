import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
