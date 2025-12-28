import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";

export const savedPost = async (req, res) => {
       try {
              const postId = req.params.id;

              const user = await User.findById(req.userId).select("-password");
              if (!user) {
                     return res.status(404).json({
                            success: false,
                            message: "User not found",
                     });
              }

              // Find post
              const post = await Post.findById(postId)
                     .populate("author", "name userName profilePic");

              if (!post) {
                     return res.status(404).json({
                            success: false,
                            message: "Post not found",
                     });
              }

              // Check if already saved
              const alreadySaved = user.saved.some(id => id.toString() === postId);

              if (alreadySaved) {
                     // Remove from saved
                     user.saved = user.saved.filter(id => id.toString() !== postId);
              } else {
                     // Add to saved
                     user.saved.push(postId);
              }

              // Save user document
              let data = await user.save();
              console.log(data)

              // Populate post likes and comments for response
              const populatedPost = await Post.findById(postId)
                     .populate("author", "userName name profilePic")
                     .populate("like", "userName name profilePic")
                     .populate("comment.author", "userName name profilePic");


              return res.status(200).json({
                     success: true,
                     message: alreadySaved ? "Post unsaved" : "Post saved",
                     data: populatedPost,
              });

       } catch (error) {
              console.log("Saved Post Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
