import mongoose from "mongoose"

const reelsSchema = new mongoose.Schema({
       author: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true
       },
       media: {
              type: String,
              required: true
       },
       caption:{
              type:String
       },
       like: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
              }
       ],
       comment: [
              {
                     author: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User",
                            required: true
                     },
                     message: {
                            type: String,
                            required: true
                     },
                     createdAt: {
                            type: Date,
                            default: Date.now
                     }
              }
       ],

       // 👉 Share Option: bahot sare user share kr skte hii reels ko.
       share: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
              }
       ],

}, { timestamps: true })

export const Reels = mongoose.model("Reels", reelsSchema)