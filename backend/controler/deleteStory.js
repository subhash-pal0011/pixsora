import { Story } from "../models/storySchema.js";
import { User } from "../models/userSchema.js";

export const deleteStory = async (req, res) => {
       try {
              const storyId = req.params.id;

              // Step 1: find story
              const story = await Story.findById(storyId);
              if (!story) {
                     return res.status(404).json({
                            success: false,
                            message: "Story not found"
                     });
              }

              // Step 2: check story belongs to currently logged in user
              if (story.author.toString() !== req.userId) {
                     return res.status(403).json({
                            success: false,
                            message: "You are not authorized to delete this story"
                     });
              }

              // Step 3: delete the story
              await Story.findByIdAndDelete(storyId);

              // Step 4: remove story ID from user's story list
              await User.findByIdAndUpdate(
                     req.userId,
                     { $pull: { story : storyId } }
              );

              return res.status(200).json({
                     success: true,
                     message: "Story deleted successfully"
              });

       } catch (error) {
              console.log("Delete story error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Server error"
              });
       }
};
