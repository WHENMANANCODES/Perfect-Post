import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// 1. Cloudinary SDK ko hamare .env credentials ke sath map kiya
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Main Helper Function: Jo RAM buffer se content stream karke Cloudinary par upload karega 🚀
export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      console.error("❌ No file buffer payload found!");
      return resolve(null);
    }

    // Cloudinary standard node memory stream handler call kiya
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'perfect_post_assets', // Cloudinary storage me automatic is folder me jayega
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          console.error(`❌ Cloudinary Upload Process Error: ${error.message}`);
          return reject(error);
        }
        // Success hote hi secure HTTPS production link resolve hoga
        resolve(result.secure_url);
      }
    );

    // RAM memory buffer ko stream me end-to-end pipe write kar diya
    uploadStream.end(fileBuffer);
  });
};