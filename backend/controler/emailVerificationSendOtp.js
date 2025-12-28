import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"

export const emailVerificationSendOtp = async (req, res) => {
       try {
              const { email, otp } = req.body;

              if (!email || !otp) {
                     return res.status(400).json({
                            success: false,
                            message: "Email & OTP are required"
                     });
              }

              const existingUser = await User.findOne({ email }).select("-password");
              if (!existingUser) {
                     return res.status(404).json({
                            success: false,
                            message: "User not found"
                     });
              }

              if (existingUser.otp !== otp) {
                     return res.status(400).json({
                            success: false,
                            message: "Invalid OTP, try again"
                     });
              }

              if (Date.now() > existingUser.otpExp) {
                     return res.status(400).json({
                            success: false,
                            message: "OTP expired, request new one"
                     });
              }

              existingUser.isVerified = true
              existingUser.otp = null;
              existingUser.otpExp = null;

              await existingUser.save();

              const token = jwt.sign(
                     // id ye id isAuth mea likhi gyi hii isi ke help se userId banti hii.
                     { _id: existingUser._id.toString() },
                     process.env.SECRET_KEY,
                     { expiresIn: "7d" }
              );

              res.cookie("token", token, {
                     httpOnly: true,
                     secure: false,        // localhost ke liye false
                     sameSite: "lax",      // ya strict/localhost ke liye safe
                     maxAge: 7 * 24 * 60 * 60 * 1000
              });

              return res.status(200).json({
                     success: true,
                     message: "Email verified successfully",
                     token,
                     data: existingUser
              });

       }
       catch (err) {
              console.error(err);
              return res.status(500).json({
                     success: false,
                     message: "Server error"
              });
       }
};


