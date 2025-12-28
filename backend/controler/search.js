import { User } from "../models/userSchema.js";

export const search = async (req, res) => {
       try {
              const { search } = req.query;
              const currentUser = req.userId;

              if (!search || search.trim() === "") {
                     return res.status(400).json({
                            success: false,
                            message: "Search query is required"
                     });
              }

              const users = await User.find({
                     $and: [
                            {
                                   $or: [
                                          { userName: { $regex: search, $options: "i" } },
                                          { name: { $regex: search, $options: "i" } }
                                   ]
                            },
                            {
                                   _id: { $ne: currentUser } // ✅ hume khud ko nhi chhiye
                            }
                     ]
              }).select("-password -otp -otpExp")
              .limit(10); // 🔥 optional but recommended

              if (users.length === 0) {
                     return res.status(404).json({
                            success: true,
                            message: "No users found",
                            data: []
                     });
              }

              return res.status(200).json({
                     success: true,
                     data: users
              });
       } 
       catch (error) {
              console.log("error for search controller:", error);
              res.status(500).json({
                     success: false,
                     message: "Server error while searching"
              });
       }
}