import mongoose from "mongoose";

const muxDataSchema = new mongoose.Schema({
  assetId:{type:String,require:true},
  playbackId:{type:String},
  chapterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Chapter'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MuxData = mongoose.models.MuxData || mongoose.model("MuxData", muxDataSchema);
export default MuxData;
