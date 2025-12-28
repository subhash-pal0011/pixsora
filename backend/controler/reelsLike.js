import { Reels } from "../models/reelsSchema.js";

export const reelsLike = async (req, res) => {
       try {
              const reelsId = req.params.id;

              const reel = await Reels.findById(reelsId).populate("author", "-password"); // POPULATE KRNE KA RESSN HII KI AGR POPULATE NHI KRENGE TO SIRF REELS KI ID DEKHEGI KYUKI USERSCHEMA MEA KEVL REELS KE SATH ID HII TO HUME REELS KE STH USER KA SARA DATA CHAHIYE IS LIYE.
                     
              if (!reel) {
                     return res.status(404).json({
                            success: false,
                            message: "Reel not found!",
                     });
              }

              // Check if user already liked the reel
              const alreadyLiked = reel.like.some(
                     (id) => id.toString() === req.userId
              );

              if (alreadyLiked) {
                     // Unlike
                     reel.like = reel.like.filter(
                            (id) => id.toString() !== req.userId
                     );
              } else {
                     // Like
                     reel.like.push(req.userId);
              }

              reel.updatedAt = Date.now();

              await reel.save();

              // fir reel ko find krke frontend ke response ke liye bhej denge.
              const populatedReel = await Reels.findById(reelsId)
                     .populate("author", "userName name profilePic") // iise jiski post uska data dikhega.
                     .populate("like", "userName name profilePic"); // jisne like kiya

              return res.status(200).json({
                     success: true,
                     message: alreadyLiked ? "Unliked successfully" : "Liked successfully",
                     data: populatedReel,
              });

       } catch (error) {
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
                     error: error.message,
              });
       }
};
