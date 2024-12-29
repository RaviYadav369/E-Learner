import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId:{type:String,require:true},
  chapterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Chapter",
    required:true
  },
  isCompleted:{type:Boolean, default:false},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserProgress = mongoose.models.UserProgress || mongoose.model("UserProgress", progressSchema);
export default UserProgress;
