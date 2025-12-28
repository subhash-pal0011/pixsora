import { Reels } from "../models/reelsSchema.js";

export const reelsComment = async (req, res) => {
       try {
              const { message } = req.body;
              const reelsId = req.params.id;

              // Find reel
              const reels = await Reels.findById(reelsId).populate("author", "-password");
              if (!reels) {
                     return res.status(404).json({
                            success: false,
                            message: "Reels not found!",
                     });
              }

              reels.comment.push({
                     message,
                     author: req.userId,
              });

              await reels.save();

              const populatedReels = await Reels.findById(reelsId)
              .populate("author", "userName name profilePic") // jiski reels uska data dige
              .populate("comment.author", "userName name profilePic");  // reels pe jisne coment kiya uska data dikhega

              const letestComment = populatedReels.comment[populatedReels.comment.length - 1];

              return res.status(200).json({
                     success: true,
                     message: "comment created",
                     data: letestComment
              });

       } catch (error) {
              console.log("Reels comment error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
                     error: error.message,
              });
       }
};

