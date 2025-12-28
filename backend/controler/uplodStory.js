import { Story } from "../models/storySchema.js";
import { User } from "../models/userSchema.js";
import { uploadCloudinary } from "../storageSetup/uplodCloudenry.js";

export const uploadStory = async (req, res) => {
       try {
              const {mediaType} = req.body
              const user = await User.findById(req.userId);

              if (!user) {
                     return res.status(404).json({
                            success: false,
                            message: "User not found"
                     });
              }

              if (!req.files || req.files.length === 0) {
                     return res.status(400).json({
                            success: false,
                            message: "Please upload at least one story file"
                     });
              }

              let uploadedStories = [];

              for (let file of req.files) {

                     const mediaUrl = await uploadCloudinary(file.path);

                     // Tumne 5 story upload ki → Cloudinary ne 3 ko accept kiya, 2 reject ho gayi → , Agar continue hota hai:----- ✔ 3 story successfully upload , ✔ 2 automatically skip ✔ API normal response dega
                     if (!mediaUrl) continue;

                     // Detect media type
                     // const mediaType = file.mimetype.startsWith("video") ? "video" : "image";

                     const story = await Story.create({
                            author: req.userId,
                            media: mediaUrl,
                            mediaType
                     });

                     uploadedStories.push(story._id);
              }
 
              // (user.story || []) ISKA MTLB HII hum 1 se jada story uplod kr rhe hii IS KA MTLB HII AGR USER KI STORY HII YA USER KE UNDER STROY HII RHEN DO . uploadedStories ISKE THRUGH NEW STORY BHI RKHO.
              user.story = [...(user.story || []), ...uploadedStories];  //user.story user ke under story dal rhe hii.
              await user.save();

              // story uplod krne ka bad hume story ko dekhna bhi to hii isliye fetch kr liye aur populate krke isi mea view aur like vale ko dekh lunga.
              const storyUser = await Story.find({ _id: { $in: uploadedStories } })
                     .populate("author", "name userName profilePic")
                     .populate("like", "name userName profilePic")
                     .populate("view", "name userName profilePic");

              return res.status(200).json({
                     success: true,
                     message: "Story uploaded successfully",
                     data: storyUser
              });

       } catch (error) {
              console.log("Story upload error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Server error"
              });
       }
};
