import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors";


import { signupRouter } from "./router/signupRouter.js"
import { emailVerificationRouter } from "./router/emailVerificationRouter.js"
import { loginRouter } from "./router/loginRouter.js"
import { sendOtpEmailForgotPassRouter } from "./router/sendOtpEmailForgotPassRouter.js";
import { verifyOtpForgotPasswordRouter } from "./router/verifyOtpForgotPassword.js";
import { forgotPasswordRouter } from "./router/forgotPAsswordRouter.js";
import { userRouter } from "./router/userRouter.js";
import { logoutRouter } from "./router/logoutRouter.js";
import { editProfileRouter } from "./router/editProfileRouter.js";
import { getProfileRouter } from "./router/getProfileRouter.js";
import { suggestedUserRouter } from "./router/suggestedUserRouter.js";
import { createPostRouter } from "./router/createPostRouter.js";
import { getSelfPostRouter } from "./router/getselfPostRouter.js";
import { likePostRouter } from "./router/likePostRouter.js";
import { commentPostRouter } from "./router/commentPostRouter.js";
import { savedPostRouter } from "./router/savedPostRouter.js";
import { createReelsRouter } from "./router/createReelsRouter.js";
import { getAllReelsRouter } from "./router/getAllRelsRouter.js";
import { reelsLiketRouter } from "./router/reelsLikeRouter.js";
import { reelsCommentRouter } from "./router/reelsComentRouter.js";
import { uplodStoryRouter } from "./router/uplodStory.js";
import { deleteStoryRouter } from "./router/deleteStoryRouter.js";
import { getAllPostRouter } from "./router/getAllPostRouter.js";
import { deletePostRouter } from "./router/deltePost.js";
import { deleteCommentRouter } from "./router/deleteComment.js";
import { followUnfollowRouter } from "./router/followUnfollowRouter.js";
import { deleteReelsRouter } from "./router/deleteReelsRouter.js";
import { getAllStoryRouter } from "./router/getAllStory.js";
import { getUserStoryRouter } from "./router/getUserStoryRouter.js";
import { viewrsOfStoryRouter } from "./router/viewrsOfStoryRouter.js";
import { sendMessageRouter } from "./router/sendMessageRouter.js";
import { getMessageRouter } from "./router/getMessageRouter.js";
import { getConversationRouter } from "./router/getConversationsRouter.js";
import { markAsSeenRouter } from "./router/marksAsSeenRouter.js";
import { deleteMessageRouter } from "./router/deleteMessageRouter.js";
import { clearChatRouter } from "./router/clearChatRouter.js";
import { editMessageRouter } from "./router/editMessageRouter.js";
import { app, server } from "./socket_implement/socketIo.js";
import { searchRouter } from "./router/searchRouter.js";
import { getNotificationRouter } from "./router/getNotificationRouter.js";
import { notificationCountRouter } from "./router/notificationCount.js";
import { markAllReadRouter } from "./router/markAllReadRouter.js";
import { deleteAccountRouter } from "./router/deleteAccountRouter.js";


dotenv.config()
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin:"https://pixora-app.onrender.com",
    credentials: true
}));



app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use("/api/signup", signupRouter)
app.use("/api/verificationEmail", emailVerificationRouter)
app.use("/api/login", loginRouter)
app.use("/api/me", userRouter)
app.use("/api/logout", logoutRouter)
app.use("/api/forgot/sendotp", sendOtpEmailForgotPassRouter)
app.use("/api/forgotPass/verify", verifyOtpForgotPasswordRouter)
app.use("/api/forgotpassword", forgotPasswordRouter)
app.use("/api/editProfile", editProfileRouter)
app.use("/api/profile", getProfileRouter)
app.use("/api/suggestedUser", suggestedUserRouter)
app.use("/api/createPost", createPostRouter)
app.use("/api/getSelfPost", getSelfPostRouter)
app.use("/api/getAllPost", getAllPostRouter)
app.use("/api/deletePost", deletePostRouter)
app.use("/api/likePost", likePostRouter)
app.use("/api/commentPost", commentPostRouter)
app.use("/api/deleteComment", deleteCommentRouter)
app.use("/api/savedpost", savedPostRouter)
app.use("/api/reelsCreate", createReelsRouter)
app.use("/api/getReels", getAllReelsRouter)
app.use("/api/deleteReels", deleteReelsRouter)
app.use("/api/like", reelsLiketRouter)
app.use("/api/comment", reelsCommentRouter)
app.use("/api/storyUplod", uplodStoryRouter)
app.use("/api/getAllStory", getAllStoryRouter)
app.use("/api/deleteStory", deleteStoryRouter)
app.use("/api/follow", followUnfollowRouter)
app.use("/api/getUserStory", getUserStoryRouter)

app.use("/api/story/viewers", viewrsOfStoryRouter)

app.use("/api/search", searchRouter)

app.use("/api/sendmsg", sendMessageRouter)
app.use("/api/getmsg", getMessageRouter)
app.use("/api/getconversation", getConversationRouter)
app.use("/api/seenmsg", markAsSeenRouter)
app.use("/api/editmsg", editMessageRouter)
app.use("/api/deletemsg", deleteMessageRouter)
app.use("/api/clearchat", clearChatRouter)

app.use("/api/deleteAccount" , deleteAccountRouter)

app.use("/api/getAllNotification", getNotificationRouter)
app.use("/api/markAllReadNotification", markAllReadRouter);
app.use("/api/countNotification", notificationCountRouter)


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected ✅"))
    .catch((error) => console.log("MongoDB connection error:", error.message))

server.listen(PORT, () => {
    console.log(`port is runing : ${PORT}`)
})