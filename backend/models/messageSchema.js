import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
       {
              sender: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
                     required: true,
              },

              receiver: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
                     required: true,
              },

              message: {
                     type: String,
                     trim: true,
                     default: null,
              },
              

              media: {
                     type: String,
                     default: null,
              },
              mediaType: {
                     type: String,
                     enum: ["image", "video"],
              },
              // video: {
              //        type: String,
              //        default: null,
              // },
              share: {
                     type: {
                            type: String,
                            enum: ["post", "reel"],
                            default: null,
                     },
                     refId: {
                            type: mongoose.Schema.Types.ObjectId,
                            default: null,
                     },
              },
              seen: {
                     type: Boolean,
                     default: false,
              },
       },
       { timestamps: true }
);
export const Message = mongoose.model("Message", messageSchema);



