import { Reels } from "../models/reelsSchema.js";
import { User } from "../models/userSchema.js";

export const deleteReels = async (req, res) => {
       try {
              const reelsId = req.params.id;

              const reels = await Reels.findById(reelsId);
              if (!reels) {
                     return res.status(404).json({
                            success: false,
                            message: "Reels not found",
                     });
              }

              if (reels.author.toString() !== req.userId) {
                     return res.status(403).json({
                            success: false,
                            message: "You are not allowed to delete this reel",
                     });
              }

              await Reels.findByIdAndDelete(reelsId);

              // 👤 User ke reels array se remove
              await User.findByIdAndUpdate(req.userId, {
                     $pull: { reels: reelsId },
              });

              return res.status(200).json({
                     success: true,
                     message: "Reel deleted successfully",
              });

       } catch (error) {
              console.error("Delete Reels Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
