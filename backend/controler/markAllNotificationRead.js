import { Notification } from "../models/notificationSchema.js";

export const markAllNotificationRead = async (req, res) => {
       try {
              await Notification.updateMany(
                     {
                            receiver: req.userId,
                            isRead: false,
                     },
                     {
                            $set: { isRead: true },
                            readAt: new Date()
                     }
              );

              return res.status(200).json({
                     success: true,
                     message: "All notifications marked as read",
              });
       } catch (error) {
              console.log("Mark all read error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
