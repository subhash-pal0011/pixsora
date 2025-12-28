import { User } from "../models/userSchema.js";

export const verifyEmailForgotPass = async (req, res) => {
       try {
              const { email, otp } = req.body;

              if (!email || !otp) {
                     return res.status(400).json({
                            success: false,
                            message: "Email and OTP are required",
                     });
              }

              const findUser = await User.findOne({ email });
              if (!findUser) {
                     return res.status(404).json({
                            success: false,
                            message: "User does not exist",
                     });
              }

              if (String(findUser.otp) !== String(otp)) {
                     return res.status(400).json({
                            success: false,
                            message: "Invalid OTP!",
                     });
              }

              if (findUser.otpExp < Date.now()) {
                     return res.status(400).json({
                            success: false,
                            message: "OTP expired, please request a new one!",
                     });
              }

              findUser.isVerified = true;
              findUser.otp = null;
              findUser.otpExp = null;

              await findUser.save();

              return res.status(200).json({
                     success: true,
                     message: "OTP verified successfully. You can now reset your password.",
              });

       } catch (error) {
              console.log("OTP Verify Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
