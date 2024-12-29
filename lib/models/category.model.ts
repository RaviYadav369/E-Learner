import mongoose from "mongoose";

const categorySchema =new  mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    courses :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})

const Category = mongoose.models.Category || mongoose.model("Category",categorySchema)

export default Category