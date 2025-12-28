import { Notification } from "../models/notificationSchema.js";
import { Post } from "../models/postSchema.js";
import { io, onlineUsers } from "../socket_implement/socketIo.js";

export const comment = async (req, res) => {
       try {
              const { message } = req.body;
              const postId = req.params.id;

              if (!message || message.trim().length === 0) {
                     return res.status(400).json({
                            success: false,
                            message: "Comment cannot be empty"
                     });
              }

              const findPost = await Post.findById(postId);

              if (!findPost) {
                     return res.status(404).json({
                            success: false,
                            message: "Post not found!"
                     });
              }

              // Push new comment
              findPost.comment.push({
                     author: req.userId,
                     message,
                     // createdAt: new Date() optional
              });

              if(findPost.author.toString() !== req.userId){
                     const notificationCreate = await Notification.create({
                            sender:req.userId,
                            receiver:findPost.author,
                            post:findPost._id,
                            type:"comment",
                            message:"comment your post"
                     })
                     const populateNotification = await Notification.findById(notificationCreate._id).populate("sender receiver post")

                     const receiverSocketId  = onlineUsers[findPost.author.toString()]
                     if(receiverSocketId){
                            io.to(receiverSocketId).emit("newNotification" , populateNotification)
                     }
              }

              await findPost.save();

              // Return updated post with populated user
              const populatedPost = await Post.findById(postId)
              .populate("comment.author", "-password")

              const latestComment =populatedPost.comment[populatedPost.comment.length - 1]; // legth-1 is liye kyuki hume latest msg ui mea dikhan hii hum chate hii jese comment kre ui mea dikhne lage.
                     
              return res.status(200).json({
                     success: true,
                     message: "Comment added successfully",
                     data: latestComment
              });
       } catch (error) {
              console.log("Comment error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error"
              });
       }
};

