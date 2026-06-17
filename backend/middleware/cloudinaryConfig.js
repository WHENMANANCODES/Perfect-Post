import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// 1. Cloudinary SDK ko hamare .env credentials ke sath map kiya
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Main Helper Function: Jo local path se file uthakar cloud par upload karega
export const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // File ko Cloudinary par push karne ka trigger pipeline
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: 'perfect_post_assets', // Cloudinary storage me automatic is naam ka folder ban jayega
      resource_type: 'auto'
    });

    // 🔥 Garbage Collector / Optimization Layer:
    // Cloud par upload success hote hi local temporary file ko turant server se delete kar do
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response.secure_url; // Yeh hume permanent 'https://...' link return karega
  } catch (error) {
    // Agar cloud upload kisi wajah se fail ho jaye, tab bhi safely local file ko saaf karo taaki RAM/Disk full na ho
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error(`❌ Cloudinary Upload Process Error: ${error.message}`);
    return null;
  }
};