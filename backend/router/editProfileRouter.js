import express from "express"
import { isAuth } from "../middelware/isAuth.js"
import { editProfile } from "../controler/editProfile.js"
import { upload } from "../middelware/multer.js"

export const editProfileRouter = express.Router()
//                                 single img chiye to single agr  1 se jada to dusra func
editProfileRouter.post("/" ,isAuth , upload.single("profilepic"), editProfile)
//                                                profilepic frontend mea  isi name se profilePic bjejenge..