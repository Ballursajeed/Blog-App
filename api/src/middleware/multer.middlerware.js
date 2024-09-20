import multer from "multer";
import path from "path";

// Define the root directory (assuming you are starting the app from "src")
const rootDir = path.resolve();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(rootDir, './public/temp'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
 export const upload = multer({ storage: storage })