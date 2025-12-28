import { Reels } from "../models/reelsSchema.js";

export const reelsShare = async (req, res) => {
       try {
              const reelsId = req.params.id;

              // Find the original reel
              const reel = await Reels.findById(reelsId);
              if (!reel) {
                     return res.status(404).json({
                            success: false,
                            message: "Reel not found!",
                     });
              }

              // Optional: maintain sharedBy array
              if (!reel.sharedBy) {
                     reel.sharedBy = [];
              }

              // Check if user already shared
              if (reel.sharedBy.includes(req.userId)) {
                     return res.status(400).json({
                            success: false,
                            message: "You have already shared this reel!",
                     });
              }

              // Add user to sharedBy array
              reel.sharedBy.push(req.userId);
              reel.shareCount = reel.sharedBy.length;

              await reel.save();

              // Populate author and sharedBy users
              const populatedReel = await Reels.findById(reelsId)
                     .populate("author", "userName name profilePic")
                     .populate("author.share", "userName name profilePic");

              return res.status(200).json({
                     success: true,
                     message: "Reel shared successfully!",
                     data: populatedReel,
              });

       } catch (error) {
              console.log("Share reel error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
                     error: error.message,
              });
       }
};
