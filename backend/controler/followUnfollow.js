import { Notification } from "../models/notificationSchema.js";
import { User } from "../models/userSchema.js";
import { io, onlineUsers } from "../socket_implement/socketIo.js";

export const followUnfollow = async (req, res) => {
       try {
              const userId = req.userId;
              const targetUserId = req.params.id; // jis user ko follow/unfollow karenge

              if (userId === targetUserId) {
                     return res.status(400).json({
                            success: false,
                            message: "You cannot follow yourself",
                     });
              }

              const existUser = await User.findById(userId);
              const targetUser = await User.findById(targetUserId);

              if (!existUser || !targetUser) {
                     return res.status(404).json({
                            success: false,
                            message: "User not found",
                     });
              }

              const isFollowing = existUser.following.includes(targetUserId);

              if (isFollowing) {
                     //🔴UNFOLLOW
                     existUser.following = existUser.following.filter(
                            (id) => id.toString() !== targetUserId.toString()
                     );

                     targetUser.follower = targetUser.follower.filter( //HUMNE JIS USER KO FOLLOW KIYA USKE DATA KO BHI TO HATANA HII NA IS LIYE ISE BHI FILTER KRNA PADA
                            (id) => id.toString() !== userId.toString()
                     );

                     await existUser.save();
                     await targetUser.save();

                     return res.status(200).json({
                            success: true,
                            isFollowing: false,
                            message: "Unfollowed successfully",
                            targetUser: null, //👈unfollow pe hata diya
                     });
              } else {
                     // 🟢 FOLLOW
                     existUser.following.push(targetUserId);
                     targetUser.follower.push(userId);
                     await existUser.save();
                     await targetUser.save();


                     if (userId.toString() !== targetUserId.toString()) {
                            const notification = await Notification.create({
                                   sender: userId,
                                   receiver: targetUserId,
                                   type: "follow",
                                   message: "started following you",
                            });

                            const populatedNotification = await Notification.findById(
                                   notification._id
                            ).populate("sender receiver");

                            const receiverSocketId = onlineUsers[targetUserId.toString()];
                            if (receiverSocketId) {
                                   io.to(receiverSocketId).emit(
                                          "newNotification",
                                          populatedNotification
                                   );
                            }
                     }

                     
                     // fresh updated user
                     const updatedTargetUser = await User.findById(targetUserId)
                            .select("-password");

                     return res.status(200).json({
                            success: true,
                            isFollowing: true,
                            message: "Followed successfully",
                            targetUser: updatedTargetUser, // 👈 follow pe bhej diya
                     });
              }
       } catch (error) {
              console.log("Follow/Unfollow Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};






