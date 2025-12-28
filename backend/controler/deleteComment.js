import { Post } from "../models/postSchema.js";

export const deleteComment = async (req, res) => {
       try {
              const { postId, commentId } = req.params;

              const post = await Post.findById(postId);
              if (!post){
                     return res.status(404).json({
                            success: false,
                            message: "Post not found!",
                     });
              }

              // 2️⃣ Find comment from post.comments array, .id se kyu find kr le rhe hii kyuki comment alg se banaya nhi hii post ke under hii comment hii is liye.
              const findComment = post.comment.id(commentId);

              if (!findComment) {
                     return res.status(404).json({
                            success: false,
                            message: "Comment not found!",
                     });
              }

              // 3️⃣ Check user authorization
              if (findComment.author.toString() !== req.userId) {
                     return res.status(403).json({
                            success: false,
                            message: "You are not allowed to delete this comment!",
                     });
              }

              // 4️⃣ alg se comment hii hi nhi post ke under hii is liye simple delete.
              findComment.deleteOne();

              await post.save();

              return res.status(200).json({
                     success: true,
                     message: "Comment deleted successfully!",
              });
       } 
       catch (error) {
              console.log(error);
              return res.status(500).json({
                     success: false,
                     message: "Server error",
              });
       }
};


