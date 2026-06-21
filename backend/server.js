import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Post from './models/Post.js';
import upload from './middleware/upload.js'; 
import { uploadToCloudinary } from './middleware/cloudinaryConfig.js'; 
import { generateContentAndSongs } from './controllers/aiController.js'; //Import AI Controller

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection block
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`🍃 Cloud Database Connected Cleanly!`);
  } catch (error) {
    console.error(` DB Error: ${error.message}`);
  }
};
connectDB();

// THE ASLI MAIN AI ENGINE ENDPOINT
app.post('/api/posts/generate', upload.single('image'), async (req, res) => {
  try {
    // 1. Check if file is received
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file payload received" });
    }

    console.log(`Multer ne file pakad li. Cloudinary par ja rahi hai...`);

    // 2. Upload to Cloudinary
   const cloudUrl = await uploadToCloudinary(req.file.buffer);
    if (!cloudUrl) {
      return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
    }

    console.log(`Cloudinary Upload Success: ${cloudUrl}. Now waking up Gemini AI...`);

    // 3. Call our AI Engine with the Cloudinary URL
    const aiData = await generateContentAndSongs(req, res, cloudUrl);

    // 4. Send the ultimate combination back to frontend
    res.status(200).json({
      success: true,
      message: "Boom! Content and Songs Generated Successfully!",
      imageUrl: cloudUrl,
      data: aiData
    });

  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Testing endpoint 
app.post('/api/posts/test-upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file payload received" });
    }
    const cloudUrl = await uploadToCloudinary(req.file.path);
    if (!cloudUrl) {
      return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
    }
    res.status(200).json({
      success: true,
      message: "Image uploaded permanently to Cloudinary Cloud Network!",
      permanentCloudUrl: cloudUrl
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// server check
app.get('/api/health', (req, res) => {
  res.json({ status: "running", database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});