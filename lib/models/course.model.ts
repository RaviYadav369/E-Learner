import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    require: true,
  },
  description: String,
  imageUrl: String,
  price: Float32Array,
  isPublished: Boolean,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
