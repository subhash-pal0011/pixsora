import { User } from "../models/userSchema.js";
export const getProfile = async (req, res) => {
       try {
              const { userName, name } = req.params;

              const findUser = await User.findOne({
                     // jb hume db se do chijo ke sath find krna pade chahe userName ya name to is tarike se find krte hii.
                     $or: [
                            {userName : userName},
                            {name: name}
                     ]
              }).select("-password")
              .populate({   // PATH IS LIYE DENA PADA KYUKI EK SATH TO POPULATE KRNA THA (1) POST (2) SAVED.
                     path:"posts",
                     populate:[
                            {path:"author" , select:"userName name profilePic"},
                            {path:"like" , select:"userName name profilePic"},
                            {path:"comment.author" , select:"userName name profilePic"}
                     ]
              })
              .populate({
                     path:"saved",
                     populate:[
                            {path:"author" , select:"userName name profilePic"},
                            {path:"like" , select:"userName name profilePic"},
                            {path:"comment.author" , select:"userName name profilePic"}
                     ]
              })
             
              if (!findUser) {
                     return res.status(400).json({
                            success: false,
                            message: "User does not exist"
                     });
              }

              return res.status(200).json({
                     success: true,
                     data: findUser
              });

       } catch (error) {
              console.log(error);
              return res.status(500).json({
                     success: false,
                     message: "Server error"
              });
       }
};


