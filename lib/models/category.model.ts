import mongoose from "mongoose";

export interface ICategory extends Document {
    _id:string;
    name: string; // Unique category name
    courses: mongoose.Types.ObjectId[]; // Array of references to Course
}


const categorySchema =new  mongoose.Schema<ICategory>({
    _id:String,
    name:{
        type:String,
        unique:true,
    },
    courses :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})

const Category = mongoose.models.Category || mongoose.model<ICategory>("Category",categorySchema)

export default Category