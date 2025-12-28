import multer from "multer";
import path from "path";
import fs from "fs";  //YE PATA HI HII KYU USE HOTA HII .

// iSSE HUME APNE APP SE PUBLIC FOLDER NHI BANA PADEGA.
const folder = "./public";
if (!fs.existsSync(folder)) {
       fs.mkdirSync(folder);
}

// Storage
const storage = multer.diskStorage({
       destination: (req, file, cb) => {
              cb(null, folder);
       },
       filename: (req, file, cb) => {
              cb(null, Date.now() + path.extname(file.originalname));
       }
});

// File upload middleware
export const upload = multer({ storage });

