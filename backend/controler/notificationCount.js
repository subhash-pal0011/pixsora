import { Notification } from "../models/notificationSchema.js";

export const notificationCount = async (req, res) => {
       try {
              const count = await Notification.countDocuments({
                     receiver: req.userId,
                     isRead: false,
              });

              return res.status(200).json({
                     success: true,
                     data: count,
              });
       } 
       catch (error) {
              console.log("Unread count error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};

