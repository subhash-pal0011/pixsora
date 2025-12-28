import { User } from "../models/userSchema.js";

export const suggestedUser = async (req, res) => {
       try {
              const userId = req.userId; 

              const me = await User.findById(userId).select("-password");

              if (!me) {
                     return res.status(404).json({ success: false, message: "User not found" });
              }

              // excludedUsers mtlb allredy mtlb jise humne foolow kr liya use suggested user nhi dikhna .
              const excludedUsers = [
                     // ...me.follower,  yha se follower ko is liye huta kyuki jb tum follow kr rhe ho to tum jise follow kiye tum to usko post oger dekh le rhe hoo jiko kiye otumhri post nhi dekh pa rha hii to follow back na bana kr ye kiya
                     ...me.following,
                     me._id
              ];

              const suggestions = await User.find({
                     _id: { $nin: excludedUsers } // $nin = mtlb Not IN mujhe nhi chiye.
              })
                     .select("-password")
                     .limit(4); // optional, kitne suggestions chahiye

              return res.status(200).json({
                     success: true,
                     data:suggestions
              });

       } catch (error) {
              console.log(error);
              return res.status(500).json({ success: false, message: "Server Error" });
       }
};
