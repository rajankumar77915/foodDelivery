//only admin can add the tag/category
import mongoose from "mongoose";

const CategorySchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   description:{
    type:String
   }

})

const Category=  mongoose.model("Category",CategorySchema);
export default  Category