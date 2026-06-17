import mongoose from 'mongoose';

// 1. Ek sub-schema jo recommended Spotify tracks ka format set karega
const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  albumArt: { type: String, required: true }
});

// 2. Main schema hamare complete post content ke liye
const PostSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image url is strictly required']
  },
  platform: {
    type: String,
    required: true,
    enum: ['instagram', 'linkedin', 'twitter'] // Validations layer
  },
  vibe: {
    type: String,
    required: true,
    default: 'Aesthetic'
  },
  generatedCaption: {
    type: String,
    required: [true, 'Caption text is strictly required']
  },
  recommendedSoundtrack: [TrackSchema] // Humne upar wala track schema isme embed kar diya
}, {
  timestamps: true // Isse har document me 'createdAt' aur 'updatedAt' automatic tracking lag jayegi
});

// Schema ko Model me compile kiya aur default export kar diya
const Post = mongoose.model('Post', PostSchema);
export default Post;