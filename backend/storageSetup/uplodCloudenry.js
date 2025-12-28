import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'  // YE NOD JS KA DEFULT PCK HII YE IS LIYE HOTHA HII JESE HI MULTERT SE DATA A JAYE TO DELTE KT DO

export const uploadCloudinary = async (filePath) => {
       try {
              cloudinary.config({
                     cloud_name: process.env.CLOUD_NAME,
                     api_key: process.env.CLOUD_KEY,
                     api_secret: process.env.CLOUD_SECRET,
              });

              const result = await cloudinary.uploader.upload(filePath, {
                     resource_type: "auto",  // resource_type isme hum auto is liye rkhe hii kyuki hume video aur img dono chahiye.
              });

              if (fs.existsSync(filePath)) {
                     fs.unlinkSync(filePath);// unlinkSync MTLB DELETE KRNA.
              }

              return result.secure_url; // local file delete kar raha hai jaise hi upload ho jaye. ✅
       }
       catch (error) {
              console.log("Cloudinary Upload Error:", error);

              // Error hone par bhi delete local file (IMPORTANT)
              if (fs.existsSync(filePath)) {
                     fs.unlinkSync(filePath);
              }

              return null;
       }
};
