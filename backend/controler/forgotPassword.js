import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const forgotPassword = async (req, res) => {
       try {
              const { email, password, confirmPassword } = req.body;

              if (!email || !password || !confirmPassword) {
                     return res.status(400).json({
                            success: false,
                            message: "All fields are required!"
                     });
              }

              if (password !== confirmPassword) {
                     return res.status(400).json({
                            success: false,
                            message: "Passwords do not match!"
                     });
              }

              const existUser = await User.findOne({ email });
              if (!existUser) {
                     return res.status(404).json({
                            success: false,
                            message: "User doesn't exist"
                     });
              }

              // YE CHECK KRNE KE LIYE KI OLD PASSWORD NOT SAME IS COMPARE NEW PASSWORD OK..
              const isSamePassword = await bcrypt.compare(password, existUser.password);
              if (isSamePassword) {
                     return res.status(400).json({
                            success: false,
                            message: "New password cannot be the same as old password!"
                     });
              }

              const hashedPassword = await bcrypt.hash(password, 10);
              existUser.password = hashedPassword;

              existUser.isVerified = true;

              await existUser.save();

              return res.status(200).json({
                     success: true,
                     message: "Password reset successfully!"
              });

       } catch (error) {
              console.error("Forgot Password Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Server error!"
              });
       }
};
