import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
       try {
              const { email, password } = req.body;

              if (!email || !password) {
                     return res.status(400).json({
                            success: false,
                            message: "All fields are required",
                     });
              }

              const existingUser = await User.findOne({ email });
              if (!existingUser) {
                     return res.status(400).json({
                            success: false,
                            message: "User not found",
                     });
              }

              const isMatch = await bcrypt.compare(password, existingUser.password);
              if (!isMatch) {
                     return res.status(400).json({
                            success: false,
                            message: "Incorrect password",
                     });
              }

              existingUser.isLogin = true;
              await existingUser.save();

              const token = jwt.sign(
                     // id YHI ID IS AUTH MEA LIKHI GYI HII ISI KE HELP SE USER_ID BANTI HII.
                     { _id: existingUser._id.toString() },
                     process.env.SECRET_KEY,
                     { expiresIn: "7d" }
              );

              res.cookie("token", token, {
                     httpOnly: true,
                     maxAge: 7 * 24 * 60 * 60 * 1000,
                     secure: true,       // ❗ LOCALHOST me ALWAYS false
                     sameSite: "none",     // ❗ localhost me "lax"
                     
              });

              existingUser.password = undefined

              return res.status(200).json({
                     success: true,
                     message: `Welcome back ${existingUser.userName}`,
                     token,
                     user: existingUser
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

