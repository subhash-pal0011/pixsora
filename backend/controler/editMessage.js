import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";

export const editMessage = async (req, res) => {
       try {
              const userId = req.userId;
              const messageId = req.params.id;
              const { message } = req.body;

              if (!message || message.trim() === "") {
                     return res.status(400).json({
                            success: false,
                            message: "Message cannot be empty",
                     });
              }

              const user = await User.findById(userId);
              if (!user) {
                     return res.status(404).json({
                            success: false,
                            message: "User does not exist",
                     });
              }

              const existingMessage = await Message.findById(messageId);
              if (!existingMessage) {
                     return res.status(404).json({
                            success: false,
                            message: "Message does not exist",
                     });
              }

              // 🔐 only sender can edit
              if (existingMessage.sender.toString() !== userId) {
                     return res.status(403).json({
                            success: false,
                            message: "You are not allowed to edit this message",
                     });
              }

              // ✏️ update message text
              existingMessage.message = message.trim();
              await existingMessage.save();

              return res.status(200).json({
                     success: true,
                     message: "Message edited successfully",
                     data: existingMessage,
              });
       } catch (error) {
              console.error(error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
