import { Conversation } from "../models/conversationSchema.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";
import { uploadCloudinary } from "../storageSetup/uplodCloudenry.js";

export const sendMessage = async (req, res) => {
       try {
              const senderId = req.userId;
              const receiverId = req.params.id;
              const { message, share, mediaType } = req.body;

              const senderExists = await User.findById(senderId);
              const receiverExists = await User.findById(receiverId);

              if (!senderExists || !receiverExists) {
                     return res.status(404).json({
                            success: false,
                            message: "User not found",
                     });
              }
              let media;
              if (req.file) {
                     media = await uploadCloudinary(req.file.path);
              }

              if (!message && !media && !share) {
                     return res.status(400).json({
                            success: false,
                            message: "Message content missing",
                     });
              }

              //📨create message
              const newMessage = await Message.create({
                     sender: senderId,
                     receiver: receiverId,
                     message: message || null,//NULL IS LIYE KYUKI MESSAGE NA SEND KRKE IMG ETC.
                     media,
                     mediaType,
                     share: share || null,// ISI TRIKE SE SHARE BHI HII.
              });

              // 💬 find or create conversation
              let conversation = await Conversation.findOne({
                     participants: { $all: [senderId, receiverId] },
              });

              if (!conversation) {
                     conversation = await Conversation.create({
                            participants: [senderId, receiverId],
                            messages: [newMessage._id],
                            lastMessage: newMessage._id,
                     });
              } else {
                     conversation.messages.push(newMessage._id);
                     conversation.lastMessage = newMessage._id;
                     await conversation.save();
              }

              return res.status(201).json({
                     success: true,
                     data: newMessage,
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

