import { Post } from "../models/postSchema.js";

export const getSelfAllPost = async (req, res) => {
       try {
              const posts = await Post.find({ author: req.userId })
              .populate("author", "name userName profilePic")
                     // .populate("commnet.author" , "-password")
              .sort({ createdAt: -1 }); // latest first

              if (!posts || posts.length === 0) {
                     return res.status(404).json({
                            success: false,
                            message: "No posts found",
                     });
              }

              return res.status(200).json({
                     success: true,
                     data: posts,
              });

       } catch (error) {
              console.error("Get posts error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
