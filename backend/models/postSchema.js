import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
       author: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
       },

       mediaType: {
              type: String,
              enum: ["image", "video"],
              required: true,
       },

       media: {
              type: String,
              required: true,
       },

       caption: {
              type: String,
              default: ""
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

       // 👉 Share Option: Many users can share a post
       share: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
              }
       ],

}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);
