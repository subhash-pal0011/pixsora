import cron from "node-cron"; //  ye peckej hii nodejs ka . npm i node-cron insll kro jobs folder banao uske under use kr do.

import { Notification } from "../models/notificationSchema.js";

cron.schedule("0 0 * * *", async () => { // ISKA MTLB HAR DIN raat 12 baje

       const fiveDaysAgo = new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000
       );

       const deleted = await Notification.deleteMany({
              isRead: true,       // sirf read notifications
              readAt: { $lt: fiveDaysAgo } // jo 5 din se purani read hai
       });

       console.log(`Deleted ${deleted.deletedCount} old read notifications`);
});

//BHAI JB HUM TTL INDEX USE KRTE HII TO HUM API BANA KE FRONTEND MEA CALL NHI KRANI PADTI AUTO METIC DELETE HO JATA HII [ TTL MTLB TIME TO LIVE] mens ,
// createdAt: {
// type: Date,
// default: Date.now,
// expires: 60 * 60 * 24 * 5,
// }
