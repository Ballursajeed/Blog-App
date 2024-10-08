import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from "dotenv";

dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to convert a buffer to a readable stream
const bufferToStream = (buffer) => {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    return readable;
};

const uploadOnCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, // Cloudinary options
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        // Convert buffer to stream and pipe it to Cloudinary
        bufferToStream(fileBuffer).pipe(stream);
    });
};

export { uploadOnCloudinary };
