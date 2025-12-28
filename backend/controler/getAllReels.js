import { Reels } from "../models/reelsSchema.js";

export const getAllReels = async ( _ , res) => {
       try { 
              const reels = await Reels.find()
                     .populate("author", "-password") // reel ke owner ka data
                     .populate("like" , "profilePic name userName")
                     .populate("comment.author", "profilePic userName name")   // hume unko bhi get krna hii jisne comment kiya hii
                     .sort({ createdAt: -1 }); // latest first

              if (!reels || reels.length === 0) {
                     return res.status(404).json({
                            success: false,
                            message: "No reels found",
                     });
              }

              return res.status(200).json({
                     success: true,
                     data: reels,
              });
       }
       catch (error) {
              console.error("Get Reels error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
                     error: error.message,
              });
       }
};