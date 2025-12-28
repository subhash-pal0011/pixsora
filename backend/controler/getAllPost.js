import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";

export const getAllPost = async (req, res) => {
       try {
              const user = await User.findById(req.userId).select("following" )
              
              const authorIds = [...user.following, req.userId];

              const allPost = await Post.find({
                     author: { $in: authorIds }
              })
                     .populate("author", "-password")              // Post author
                     .populate("like", "profilePic userName name") // Users who liked
                     .populate("comment.author", "profilePic userName name")//Comment autho
                     .sort({ createdAt: -1 });
              return res.status(200).json({
                     success: true,
                     data: allPost,
              });
       } catch (error) {
              console.error("Get All Post error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
                     error: error.message,
              });
       }
};
