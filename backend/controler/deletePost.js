import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";

export const deletePost = async (req, res) => {
       try {
              const postId = req.params.id;

              // 1️⃣ Find post
              const post = await Post.findById(postId);
              if (!post) {
                     return res.status(404).json({
                            success: false,
                            message: "Post not found",
                     });
              }

              // 2️⃣ Author check
              if (post.author.toString() !== req.userId) {
                     return res.status(403).json({
                            success: false,
                            message: "You are not allowed to delete this post",
                     });
              }

              // 3️⃣ Delete Post
              await Post.findByIdAndDelete(postId);

              // 4️⃣ Remove post from user's posts array
              await User.findByIdAndUpdate(req.userId, {
                     $pull: { posts: postId }
              });

              return res.status(200).json({
                     success: true,
                     message: "Post deleted successfully",
              });

       } catch (error) {
              console.error("Delete Post Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
