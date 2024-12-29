import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId:{type:String,require:true},
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);
export default Purchase;
