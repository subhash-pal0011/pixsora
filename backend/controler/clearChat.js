import { Conversation } from "../models/conversationSchema.js";
import { Message } from "../models/messageSchema.js";

export const clearChat = async (req, res) => {
       try {
              const senderId = req.userId;
              const otherUser = req.params.id;

              const conversation = await Conversation.findOne({
                     participants: { $all: [senderId, otherUser] },
              });

              if (!conversation) {
                     return res.status(404).json({
                            success: false,
                            message: "Conversation not found",
                     });
              }

              // sirf apne side ke messages delete
              await Message.deleteMany({
                     sender: senderId,
                     receiver: otherUser,
              });

              //ISSE DONO TRF KE MESSAGE DELETE HO JYENGE.
              // await Message.deleteMany({
              //        $or: [
              //               { sender: senderId, receiver: otherUser },
              //               { sender: otherUser, receiver: senderId }
              //        ]
              // });


              return res.status(200).json({
                     success: true,
                     message: "Chat cleared successfully",
              });
       } catch (error) {
              console.error(error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
