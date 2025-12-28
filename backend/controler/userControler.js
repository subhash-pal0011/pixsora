// ISKE THRUGH HUM RHENGE MTLB JO USER SIGNUP LOGIN KIYA HII  KYUKI  REDUX SE DATA PAGE KO REFRSE KRTE HUT JA RHA THA IS LIYE API BHI BANANI PADI.

import { User } from "../models/userSchema.js";

export const getCurrentUser = async (req, res) => {
       try {
              const user = await User.findById(req.userId).select("-password -otp -otpExp").populate("following" , "userName , name profilePic")//FOLLWOING KO POPULATE IS LIYE KARNA PADA KYUKI HUME ONLINE USER DIKHNA THA 
              if (!user) return res.status(404).json({ success: false, message: "User not found" });
              res.status(200).json({ success: true, data: user });
       } 
       catch(err){
              res.status(500).json({ success: false, message: "Server error" });
       }
};






