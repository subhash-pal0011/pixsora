import { Notification } from "../models/notificationSchema.js";

export const getAllNotification = async (req, res) => {
       try {
              const userId = req.userId;

              const notifications = await Notification.find({
                     receiver: userId,
              })
                     .populate("sender", "userName name profilePic")
                     .populate("post", "media caption")
                     .sort({ createdAt: -1 });

              return res.status(200).json({
                     success: true,
                     count: notifications.length,
                     data:notifications,
              });

       } catch (error) {
              console.log("Get Notification Error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Failed to fetch notifications",
              });
       }
};
