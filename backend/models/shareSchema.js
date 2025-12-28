import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
       user:{
              type:mongoose.Schema.Types.ObjectId,
              ref: "User",
              required:true
       },
       post:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"Post",
              required:true
       },
       caption:{
              type:String,
              default:""
       }
},{timestamps:true})

export const Share = mongoose.model("Share" , shareSchema)