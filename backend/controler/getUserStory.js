// iska kya kam hii >>  1. “humari story jo humne uplod kiya”  , 2. “Kaun dekha? koon like  kiya”

import { Story } from "../models/storySchema.js";
import { User } from "../models/userSchema.js";

export const getUserStory = async (req, res) => {
       try {
              const { userName } = req.params;

              const user = await User.findOne({ userName });
              if (!user) {
                     return res.status(404).json({
                            success: false,
                            message: "User not found",
                     });
              }
              const stories = await Story.find({author: user._id})
                     .populate("author", "userName profilePic")
                     .populate("view" , "userName profilePic")
                     .populate("like" , "userName profilePic")
                     .sort({createdAt: -1});

              return res.status(200).json({
                     success: true,
                     data: stories,
              });
       }
       catch (error) {
              console.log("getUserStory error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};

// import { Story } from "../models/storySchema.js";
// import { User } from "../models/userSchema.js";

// export const getUserStory = async (req, res) => {
//   try {
//     const { userName } = req.params;
//     const loggedInUserId = req.user._id;

//     const user = await User.findOne({ userName });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // 🔥 Check: logged-in user ne follow kiya hai ya apni story
//     if (!user.followers.includes(loggedInUserId) && user._id.toString() !== loggedInUserId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You cannot view this user's stories",
//       });
//     }

//     const stories = await Story.find({ author: user._id })
//       .populate("author", "userName profilePic")
//       .populate("view", "userName profilePic")
//       .populate("like", "userName profilePic")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       data: stories,
//     });
//   } catch (error) {
//     console.log("getUserStory error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
