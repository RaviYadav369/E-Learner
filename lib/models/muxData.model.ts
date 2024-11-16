import mongoose from "mongoose";

const muxDataSchema = new mongoose.Schema({
  assetId:{type:String,require:true},
  playbackId:{type:String},
  chapterId:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MuxData = mongoose.models.MuxData || mongoose.model("MuxData", muxDataSchema);
export default MuxData;
