import { Conversation } from "../models/conversationSchema.js";
import { Post } from "../models/postSchema.js";
import { Reels } from "../models/reelsSchema.js";
import { Story } from "../models/storySchema.js";
import { User } from "../models/userSchema.js";

export const deleteAccount = async (req, res) => {
       try {
              const userId = req.userId;

              // 1️⃣ Check user exists
              const user = await User.findById(userId).select("-password -otp -otpExp");
              if (!user) {
                     return res.status(404).json({
                            success: false,
                            message: "User not exists",
                     });
              }

              await Post.deleteMany({ author: userId });

              await Post.updateMany(
                     { "comment.author": userId },
                     { $pull: { comment: { author: userId } } }
              );
              await Post.updateMany(
                     { like : userId},
                     {$pull : { like : userId } }
              )

              await Story.deleteMany({ author: userId });

              await Reels.deleteMany({ author: userId });

              await Reels.updateMany(
                     {"comment.author" : userId},
                     { $pull : { comment : {author : userId}}}
              )
              await Reels.updateMany(
                     { like : userId},
                     {$pull : { like : userId}}
              )

              await User.updateMany(
                     { following: userId },
                     { $pull: { following: userId } }
              );

              await User.updateMany(
                     { followers: userId },
                     { $pull: { followers: userId } }
              );

              await Conversation.deleteMany({
                     members: { $in: [userId] },
              });

              // 7️⃣ Finally delete user
              await User.findByIdAndDelete(userId);



              res.clearCookie("token", {
                     httpOnly: true,
                     secure: false,
                     sameSite: "lax",
              });

              return res.status(200).json({
                     success: true,
                     message: "Account deleted successfully",
              });


       } catch (error) {
              console.log("deleteAccount error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal Server Error",
              });
       }
};
