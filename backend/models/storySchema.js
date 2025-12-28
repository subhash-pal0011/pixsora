import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
       author: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true
       },

       mediaType: {
              type: String,
              enum: ["image", "video"],
              required: true
       },

       media: {
              type: String,
              required: true
       },

       view: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User"
              }
       ],

       createdAt: {
              type: Date,
              default: Date.now,     // <-- fixed
              expires: 86400        // 24 hours ke bad delete
       },

       like: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User"
              }
       ]

}, { timestamps: true });

export const Story = mongoose.model("Story", storySchema);
