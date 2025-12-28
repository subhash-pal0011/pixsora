import { Reels } from "../models/reelsSchema.js";
import { User } from "../models/userSchema.js";
import { uploadCloudinary } from "../storageSetup/uplodCloudenry.js";

export const reels = async (req, res) => {
       try {
              // HUMNE ISME MEDIA TYPE IS LIYE NHI LIYA KYUKI HUME KEVL VIDEO CHIYE THA.
              const { caption } = req.body;

              if (!req.file) {
                     return res.status(404).json({
                            success: false,
                            message: "Video is requierd !",
                     });
              }

              const media = await uploadCloudinary(req.file.path);

              const reelsCreate = await Reels.create({
                     caption,
                     media,
                     author: req.userId,
              });

              const findUser = await User.findById(req.userId);

              findUser.reels.push(reelsCreate._id); //ID IS LIYE BHJ RHE HII KYUKI USERSCHEMA MEA REEL ID LE RHA HII.

              await findUser.save(); // JO USER SCHEMA HII REEL KO SAVE KR DENGE 

              // Populate KRKE  HUM PTA LGA LENGE USER KA DATA JO HUME CHAHIYE REEL KE STH JISKI JARURT HOGI.
              const populateReels = await Reels.findById(reelsCreate._id).populate("author", "userName name profilePic");

              return res.status(200).json({
                     success: true,
                     data: populateReels,
              });

       } catch (error) {
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
                     error: error.message,
              });
       }
};
