import { Conversation } from "../models/conversationSchema.js";

export const getMessage = async (req, res) => {
       try {
              const senderId = req.userId;
              const receiverId = req.params.id;

              const conversation = await Conversation.findOne({
                     participants: {
                            $all: [senderId, receiverId],
                     },
              })
                     .populate({
                            path: "messages",  //1>>HUM MESSAGES KO POPULATE KRENGE STH-2 MEA
                            populate: {
                                   path: "sender receiver",// 1>>USKA INFORMATION SENDR RESVR
                                   select: "userName profilePic name",
                            },
                     })
                     .populate("lastMessage");

              if(!conversation) {
                     return res.status(200).json({
                            success: true,
                            messages: [],
                     });
              }

              return res.status(200).json({
                     success: true,
                     messages: conversation.messages,
              });
       } 
       catch (error) {
              console.error(error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
