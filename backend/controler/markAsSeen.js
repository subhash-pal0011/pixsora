import { Message } from "../models/messageSchema.js"

export const markAsSeen = async (req, res) => {
       try {
              // ISME KUCCH ULTA RHTA HII SMJH KR.

              // 👇 sender = jisne message bheja
              const senderId = req.params.id;

              // 👇 receiver = current logged-in user
              const receiverId = req.userId;

              const updatedMsg = await Message.updateMany(
                     {
                            sender: senderId,
                            receiver: receiverId,
                            seen: false,
                     },
                     {
                            $set: {
                                   seen: true
                            }
                     }
              )
              return res.status(200).json({
                     success: true,
                     updateMsg: updatedMsg.modifiedCount // 🧠 .modifiedCount sirf ek number hai jo batata hai: “kitne messages actually update hue”.
              })
       } 
       catch (error) {
              console.error(error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
}