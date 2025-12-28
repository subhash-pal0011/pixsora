import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
       sender: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
       },

       receiver: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
              index: true, // 🔥 fast fetch
       },

       // kis type ka notification hai
       type: {
              type: String,
              enum: ["like", "comment", "follow", "message"],
              required: true,
       },

       message: { // MTLB LIKE KA MESSAGE YA COMMENT KA ETC.
              type: String,
              required: true,
              trim: true,
       },
       createdAt: {
              type: Date,
              default: Date.now,
              expires: 60 * 60 * 24 * 5 // 5 din
       },

       // optional (sirf like/comment ke liye)
       post: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Post",
              default: null,
       },

       // read / unread
       isRead: {
              type: Boolean,
              default: false,
       },

       readAt: {      
              type: Date,
              default: null,
       }
}, { timestamps: true });
export const Notification = mongoose.model("Notification", notificationSchema);
