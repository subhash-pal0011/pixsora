import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { verificationMail } from "../verificationSendOtp_mail/verificationMailSendOtp.js";

export const signup = async (req, res) => {
       try {
              const { email, userName, name, password } = req.body;

              if (!email || !userName || !name || !password) {
                     return res.status(400).json({
                            success: false,
                            message: "All fields are required",
                     });
              }

              const existingUser = await User.findOne({ email });  //.populate("posts")
              if (existingUser) {
                     return res.status(400).json({
                            success: false,
                            message: "User already exists",
                     });
              }

              const otp = Math.floor(100000 + Math.random() * 900000).toString();
              const otpExp = Date.now() + 5 * 60 * 1000; // 5 m bad expire otp.

              await verificationMail(email, otp)

              const hashPassword = await bcrypt.hash(password, 10);

              const userCreated = await User.create({
                     email,
                     userName,
                     name,
                     password: hashPassword,
                     otp,
                     otpExp,
              });

              userCreated.password = undefined;

              return res.status(200).json({
                     success: true,
                     message: "OTP sent to your email",
                     userId: userCreated._id,
                     data: userCreated,
              });

       }
       catch (error) {
              console.log(error);
              return res.status(500).json({
                     success: false,
                     message: "Server Error",
              });
       }
};

