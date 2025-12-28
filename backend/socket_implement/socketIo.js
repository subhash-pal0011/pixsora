import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Post } from "../models/postSchema.js";

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
       cors: {
              origin: "https://pixora-app.onrender.com",
              methods: ["GET", "POST", "PUT", "DELETE"],
              credentials: true,
       },
});

// userId -> socketId
export const onlineUsers = {};

io.on("connection", (socket) => {
       // console.log("socket connected:", socket.id);

       // ✅ USER ONLINE
       socket.on("onlineUser", (userId) => {
              onlineUsers[userId] = socket.id;
              // ✅ onlineUsers YE SARE JITNE BHI LIKHE HII YE FRONTEND KE STH emit krne mea KAM AYEG.
              io.emit("onlineUsers", Object.keys(onlineUsers)); // ONLINE USER BHEJNA PADEGA FRONTEND SE ISME
       });

       // ✅ SEND MESSAGE (REALTIME)
       socket.on("sendMessage", ({ sender, receiver, datas }) => {
              const receiverSocketId = onlineUsers[receiver];
              if (receiverSocketId) {
                     io.to(receiverSocketId).emit("receiveMessage", datas);
              }
       });

       // ✅ EDIT MESSAGE
       socket.on("editMessage", ({ sender, receiver, updatedMessage }) => {
              const receiverSocketId = onlineUsers[receiver];
              if (receiverSocketId) {
                     io.to(receiverSocketId).emit("messageEdited", updatedMessage);
              }
       });

       // ✅ DELETE MESSAGE
       socket.on("deleteMessage", ({ sender, receiver, deletedMessageId }) => {
              const receiverSocketId = onlineUsers[receiver];

              if (receiverSocketId) {
                     io.to(receiverSocketId).emit("messageDeleted", deletedMessageId);
              }
       });

       // ✅ SEEN MESSAGE
       socket.on("seenMessage", ({ sender, receiver }) => {
              // sender = current user (who saw the messages)
              // receiver = original sender (whose messages were seen)
              const receiverSocketId = onlineUsers[receiver];
              if (receiverSocketId) {
                     io.to(receiverSocketId).emit("messageSeen", { viewerId: sender });
              }
       });




       // socket.js ya io connection wale file me
       socket.on("likePost", async ({ postId, userId }) => {
              try {
                     const post = await Post.findById(postId).populate("author", "_id");

                     if (!post) return;

                     const receiverSocketId = onlineUsers[post.author._id]; // author ka socket
                     if (receiverSocketId) {
                            io.to(receiverSocketId).emit("postLiked", { postId, userId });
                     }
              } catch (error) {
                     console.log("Socket like error:", error);
              }
       });

       // ✅ COMMENT
       socket.on("postComment", async ({ postId }) => {
              try {
                     const post = await Post.findById(postId)
                            .populate("comment.author", "name userName profilePic");

                     if (!post) return;

                     const latestComment = post.comment[post.comment.length - 1];

                     const authorSocketId = onlineUsers[post.author.toString()];
                     if (authorSocketId) {
                            io.to(authorSocketId).emit("newComment", {
                                   postId,
                                   comment: latestComment,
                            });
                     }

                     socket.broadcast.emit("newComment", {
                            postId,
                            comment: latestComment,
                     });
              } catch (error) {
                     console.log("socket comment error:", error);
              }
       });


       // ✅ DISCONNECT
       socket.on("disconnect", () => {
              for (const userId in onlineUsers) {
                     if (onlineUsers[userId] === socket.id) {
                            delete onlineUsers[userId];
                            break;
                     }
              }
              io.emit("onlineUsers", Object.keys(onlineUsers));
       });
});

export { app, server, io };
