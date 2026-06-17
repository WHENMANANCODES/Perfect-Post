import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper 1: Image to Base64 conversion
async function fetchImageAsBase64(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    let mimeType = url.endsWith('.png') ? 'image/png' : url.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
    return { inlineData: { data: base64, mimeType } };
  } catch (error) {
    throw new Error("Failed to process image bytes.");
  }
}

// 🔥 Helper 2: iTunes API Hook to fetch real 30-sec preview tracks
async function getAudioPreviewUrl(songTitle, artistName) {
  try {
    const query = encodeURIComponent(`${songTitle} ${artistName}`);
    const response = await axios.get(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
    
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].previewUrl; // Asli 30-second .m4a/.mp3 audio streaming url
    }
    return null;
  } catch (err) {
    console.error("Audio fetch miss for:", songTitle);
    return null;
  }
}

export const generateContentAndSongs = async (req, res, cloudUrl) => {
  try {
    const imagePart = await fetchImageAsBase64(cloudUrl);

    // 🔥 HIGHLY SPECIFIC INSTRUCTIONS FOR CAPTIONS
    const textPrompt = `
      Analyze the visual metadata, colors, perspective, and core emotional mood of this image.
      You must strictly generate target outputs following these exact rules:
      - instagram: Max 2 lines, include 2-3 trending relevant hashtags, tone must match the vibe.
      - linkedin: Structured hook, space, 3 actionable bullet points about growth/creative outlook, space, 2 professional tags.
      - twitter: Punchy statement, strictly under 250 characters total including hashtags.

      Return ONLY a JSON matching this structural validation template:
      {
        "captions": { "instagram": "string", "linkedin": "string", "twitter": "string" },
        "suggestedSongs": [
          { "title": "Exact Song Name", "artist": "Main Artist Name", "reason": "1 short line why it fits" },
          { "title": "Exact Song Name", "artist": "Main Artist Name", "reason": "1 short line why it fits" },
          { "title": "Exact Song Name", "artist": "Main Artist Name", "reason": "1 short line why it fits" }
        ]
      }
    `;

    console.log("🧠 Triggering Gemini Engine Layer...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [textPrompt, imagePart],
      config: { responseMimeType: 'application/json' }
    });

    const resultData = JSON.parse(response.text.trim());

    // 🔥 SYNCING AUDIO TRACKS IN REAL-TIME
    console.log("🎵 Fetching 30-second dynamic track previews...");
    if (resultData.suggestedSongs && resultData.suggestedSongs.length > 0) {
      for (let song of resultData.suggestedSongs) {
        const previewUrl = await getAudioPreviewUrl(song.title, song.artist);
        song.previewUrl = previewUrl; // Append stream link inside the object array
      }
    }

    return resultData;

  } catch (error) {
    console.error("Engine Fault:", error);
    throw new Error(`AI Pipeline failure: ${error.message}`);
  }
};