import { Notification } from "../models/notificationSchema.js";
import { Post } from "../models/postSchema.js";
import { io, onlineUsers } from "../socket_implement/socketIo.js";

export const likePost = async (req, res) => {
       try {
              const postId = req.params.id;

              let findPost = await Post.findById(postId);
              if (!findPost) {
                     return res.status(404).json({
                            success: false,
                            message: "Post not found!",
                     });
              }

              // Check if already liked
              const alreadyLike = findPost.like.some(
                     (id) => id.toString() === req.userId
              );

              if (alreadyLike) { //AGR PAHLE SE LIKE HII TO,
                     // UNLIKE KR DO.
                     findPost.like = findPost.like.filter(
                            (id) => id.toString() !== req.userId
                     );
              } else {
                     // VERNA LIKE HI RHEN DO.
                     findPost.like.push(req.userId);

                     // LIKE NOTIFICATION.
                     if (findPost.author.toString() !== req.userId) {
                            const notificationCreate = await Notification.create({
                                   sender: req.userId,
                                   receiver: findPost.author,
                                   post: findPost._id,
                                   type: "like",
                                   message: "liked your post",
                            });
                            const populateNotification = await Notification.findById(notificationCreate._id)
                                   .populate("sender", "userName profilePic")
                                   .populate("receiver", "userName profilePic")
                                   .populate("post", "media caption");


                            //✅ 1 HUM REAL TIME KR RHE HII TO SOCKET KI HELF SE BHEJ RHE HII.
                            //✅ 2 HUM RECEVER KO PHLE ONLINE USER SE PAKD LENGE KESE PKEDENGE JINKI POST HII , ONLINE USERS MEA LEKR receverSocketId IS VERIEVL SE. 
                            const receverSocketId = onlineUsers[findPost.author.toString()]
                            if (receverSocketId) {
                                   io.to(receverSocketId).emit("newNotification", populateNotification)
                            }
                     }
              }

              // Update timestamp
              findPost.updatedAt = Date.now(); //ISKE HELP SE FIRST LIKE USER LAST MEA IS TARIKE SE CHALEGA .

              await findPost.save();

              //CHAHE TO IS POPULATE KO JB POST FIND KRR RHE THE TBHI KR SKTE THE DONO CASE SHI HII.
              const populatedPost = await Post.findById(postId)
                     .populate("author", "name userName profilePic")// iise jiski post uska data dikhega.
                     .populate("like", "name userName profilePic")  // jisne like kiya

              // socket emit backend ke andar kiye hii chaye to jese msg vala sara socket mea kiye hii vese kr skte hii
              if (io) {
                     const authorSocketId = onlineUsers[populatedPost.author._id];
                     if (authorSocketId) {
                            io.to(authorSocketId).emit("postLiked", { postId, userId: req.userId });
                     }
              }

              return res.status(200).json({
                     success: true,
                     message: alreadyLike
                            ? "Post unliked successfully"
                            : "Post liked successfully",

                     data: populatedPost,
              });

       } catch (error) {
              console.log("Like post error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};


