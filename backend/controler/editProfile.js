import { User } from "../models/userSchema.js";
import { uploadCloudinary } from "../storageSetup/uplodCloudenry.js";

export const editProfile = async (req, res) => {
       try {
              const { userName, bio, profession, gender } = req.body;

              const existUser = await User.findById(req.userId).select("-password");

              if (!existUser) {
                     return res.status(400).json({ success: false, message: "User does not exist" });
              }

              if (!existUser) {
                     return res.status(400).json({
                            success: false,
                            message: "User does not exist",
                     });
              }

              // Check same username is not used by another user
              const sameUsername = await User.findOne({
                     userName,
                     _id: { $ne: req.userId }
              }).select("-password");

              if (sameUsername && sameUsername._id.toString !== req.userId) { // req.userId jo user hii current user isi se na niklega.
                     return res.status(400).json({
                            success: false,
                            message: "Username already taken",
                     });
              }

              // Upload profile pic if user selected new one
              let profilePicUrl = existUser.profilePic;
              if (req.file) {
                     profilePicUrl = await uploadCloudinary(req.file.path);
              }

              // Update user fields.
              // in sb mea || or oprete is liye use kiya agr user ne old vli value ko change nhi kiya to old vla hi rhen do
              existUser.userName = userName || existUser.userName;
              existUser.bio = bio || existUser.bio;
              existUser.profilePic = profilePicUrl;
              existUser.profession = profession || existUser.profession;
              existUser.gender = gender || existUser.gender;

              await existUser.save();

              return res.status(200).json({
                     success: true,
                     message: "Profile updated successfully", // DHYAN RHE KI HUM USER NHI BHEJ RHE HII .
              });

       } catch (error) {
              return res.status(500).json({
                     success: false,
                     message: "Something went wrong",
                     error: error.message,
              });
       }
};




