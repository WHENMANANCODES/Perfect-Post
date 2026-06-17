import React, { useState } from 'react';
import CreationStudio from './Components/CreationStudio';
import ResultView from './Components/ResultView';

export default function App() {
  // Global frontend state to track if we are viewing the input screen or output screen
  const [isGenerated, setIsGenerated] = useState(false);
  
  // Passed down states to map the data across components
  const [studioData, setStudioData] = useState({
    imagePreview: null,
    platform: 'instagram',
    vibe: 'Aesthetic',
    aiData: null // NEW: Response ka asli AI data yahan safe baithega
  });

  // Handler triggered when the user hits "Generate Perfect Post"
  // Upgraded parameters to catch Cloudinary URL, selected platform, selected vibe, AND Gemini Insights
  const handleGenerationTrigger = (cloudImageUrl, platform, vibe, aiResponseData) => {
    setStudioData({ 
      imagePreview: cloudImageUrl, // Cloudinary secure URL
      platform, 
      vibe,
      aiData: aiResponseData // Gemini response object contains { captions, suggestedSongs }
    });
    setIsGenerated(true);
  };

  // Reset function to take user back to the studio workspace
  const handleReset = () => {
    setIsGenerated(false);
    setStudioData({
      imagePreview: null,
      platform: 'instagram',
      vibe: 'Aesthetic',
      aiData: null
    });
  };

  return (
    <div className="min-h-screen bg-alabaster">
      {/* Top Navbar */}
      <nav className="border-b border-charcoal/5 bg-white/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <span className="text-xl">✨</span>
            <span className="font-bold tracking-tight text-charcoal text-lg">perfect post.</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-apricot flex items-center justify-center text-xs font-bold shadow-inner">
            👤
          </div>
        </div>
      </nav>

      {/* Workspace Area with Conditional Logic */}
      <main>
        {isGenerated ? (
          <ResultView 
            imagePreview={studioData.imagePreview}
            platform={studioData.platform}
            vibe={studioData.vibe}
            aiData={studioData.aiData} // Pass global AI data smoothly to ResultView
            onReset={handleReset}
          />
        ) : (
          <CreationStudio onGenerate={handleGenerationTrigger} />
        )}
      </main>
    </div>
  );
}