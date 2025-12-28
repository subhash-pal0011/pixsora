// >> 🔥  YE CONVERSATION IS LIYE LEFT SIDE MEA JISSE-2 CHAT KIYE HII UNHE DIKHNA HII AUR LAST MSJ BHI IS LIYE    <<<<<<<< .

import { Conversation } from "../models/conversationSchema.js";
export const getConversation = async (req, res) => {
       try {
              const userId = req.userId;

              if (!userId) {
                     return res.status(401).json({
                            success: false,
                            message: "user not exists",
                     });
              }

              //  agr tum soch rhe ho ki find ki jgh pe findById kyu nhi likha gya mea bata du agr koi ek spesfic log ka chhaiye data to use krenge yani hum jisko select kre unhi ka data chhiye to findbyId but is case mea hume sare user ke chiye kyuki left side mea jisse chat kiye rhoge to sare user dikhenge na is liye.
              const conversations = await Conversation.find({
                     participants: userId,
              })
                     .populate({
                            path: "participants",
                            select: "userName name profilePic",
                     })
                     .populate({
                            path: "lastMessage",
                            populate: {
                                   path: "sender receiver",
                                   select: "userName name profilePic",
                            },
                     })
                     .sort({ updatedAt: -1 });

              // 🔥 FRONTEND ke liye user find kr rhe hii
              const users = conversations.map((conv) => {
                     const otherUser = conv.participants.find(
                            (user) => user._id.toString() !== userId.toString()
                     );

                     if (!otherUser) return null;
                     return {
                            ...otherUser._doc,      // ✅ yha pe _doc mtlb data userName, profilePic bhej rhe hii otherUSer mea otherUser bhj rha hii users mea user responce bhej rhe hii. sarayese kr rhe hii.
                            lastMessage: conv.lastMessage || null,
                            conversationId: conv._id,
                     };
              })
                     .filter(Boolean);

              return res.status(200).json({
                     success: true,
                     data: users,
              });
       } catch (error) {
              console.error("getConversation error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
