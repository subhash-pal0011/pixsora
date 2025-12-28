import { Message } from "../models/messageSchema.js";
import { Conversation } from "../models/conversationSchema.js";

export const deleteMessage = async (req, res) => {
       try {
              const userId = req.userId;       
              const messageId = req.params.id;  

              const message = await Message.findById(messageId);
              if (!message) {
                     return res.status(404).json({
                            success: false,
                            message: "Message not found",
                     });
              }

              if (message.sender.toString() !== userId) {
                     return res.status(403).json({
                            success: false,
                            message: "You are not allowed to delete this message",
                     });
              }
              await Message.findByIdAndDelete(messageId);

              // 💬 conversation update
              const conversation = await Conversation.findOne({
                     messages: messageId,
              });

              if (conversation) {
                     // messages array se remove
                     conversation.messages.pull(messageId);
                     // agar lastMessage wahi tha TO HUME USKE PAHLE VALE MSJ KO LAST MSJ BANA PADEGA.
                     if(conversation.lastMessage && conversation.lastMessage.toString() === messageId){
                            conversation.lastMessage = conversation.messages.length > 0
                            ? conversation.messages[conversation.messages.length - 1] : null;
                     }
                     await conversation.save();
              }

              return res.status(200).json({
                     success: true,
                     message: "Message deleted successfully",
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
