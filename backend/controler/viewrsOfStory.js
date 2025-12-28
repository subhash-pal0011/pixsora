import { Story } from "../models/storySchema.js";

export const viewrsOfStory = async (req, res) => {
       try {
              const storyId = req.params.id;
              const userId = req.userId; 

              if (!userId) {
                     return res.status(401).json({
                            success: false,
                            message: "Not authenticated",
                     });
              }
              
              const story = await Story.findByIdAndUpdate(
                     storyId,
                     { $addToSet: { view: userId } }, // ek user sirf 1 bar add hoga
                     { new: true }
              ).populate("view", "userName profilePic"); // populate viewers with username + profilePic

              if (!story) {
                     return res.status(404).json({
                            success: false,
                            message: "Story not found",
                     });
              }

              // Destructure viewers array
              const viewers = story.view.map((user) => ({
                     _id: user._id,
                     userName: user.userName,
                     profilePic: user.profilePic,
              }));
              return res.status(200).json({
                     success: true,
                     data:viewers,
                     message: "Story marked as seen",
              });
       } catch (error) {
              console.error("Story seen error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
