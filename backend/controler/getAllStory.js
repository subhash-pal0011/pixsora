// ISKA KAAM HII >>> 1. “Kaun-kaun story uplod kiya hai?” , 2.“Kitne views hai?”

import { Story } from "../models/storySchema.js";
import { User } from "../models/userSchema.js";

export const getAllStory = async (req, res) => {
       try {
              const user = await User.findById(req.userId).select("following")

              const authorIds = [...user.following, req.userId];// req.userId khud ki bhi to story chahiye.
              const stories = await Story.find({
                     //AUTHOR JINKE HUMARE FOLLOWING MEA USERID EXIST KRTI HII unhi ke.
                     author: { $in: authorIds }  //HUME UNHI USER Ki STORY CHHAIYE JISE HUMNE FOLLOW KIYA HII.
              })
                     .populate("author", "userName name profilePic")
                     .sort({ createdAt: -1 });

              return res.status(200).json({
                     success: true,
                     count: stories.length,
                     data: stories,
              });
       }
       catch (error) {
              console.error("Get Story error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
