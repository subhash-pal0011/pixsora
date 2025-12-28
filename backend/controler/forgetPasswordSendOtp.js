import { User } from "../models/userSchema.js";
import { forgetPasswordOtpSendEmail } from "../verificationSendOtp_mail/forgetPasswordOtpSendEmail.js";

export const forgetPasswordSendOtp = async (req, res) => {
       try {
              const { email } = req.body;

              if (!email) {
                     return res.status(400).json({
                            success: false,
                            message: "Email is required",
                     });
              }

              const existUser = await User.findOne({ email });

              if (!existUser) {
                     return res.status(400).json({
                            success: false,
                            message: "User doesn't exist!",
                     });
              }

              const otp = Math.floor(100000 + Math.random() * 900000);
              const otpExp = new Date(Date.now() + 5 * 60 * 1000); // 5 min expire

              existUser.otp = otp;
              existUser.otpExp = otpExp;

              await existUser.save();
              await forgetPasswordOtpSendEmail(email , otp)
              
              return res.status(200).json({
                     success: true,
                     message: "OTP sent to your email",
              });

       } catch (error) {
              console.log("Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Server error",
              });
       }
};
