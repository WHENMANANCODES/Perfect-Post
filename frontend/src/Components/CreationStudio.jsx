import React, { useState } from 'react';

export default function CreationStudio({ onGenerate }) {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedVibe, setSelectedVibe] = useState('Aesthetic');
  const [imagePreview, setImagePreview] = useState(null);

  const vibes = [
    { name: 'Aesthetic', emoji: '☕', color: 'bg-lavender/20 hover:bg-lavender/40 border-lavender/30' },
    { name: 'Moody', emoji: '🌃', color: 'bg-charcoal/5 hover:bg-charcoal/10 border-charcoal/10' },
    { name: 'Energetic', emoji: '⚡', color: 'bg-apricot/30 hover:bg-apricot/50 border-apricot/40' },
    { name: 'Happy', emoji: '✨', color: 'bg-peach/30 hover:bg-peach/50 border-peach/40' },
    { name: 'Professional', emoji: '💼', color: 'bg-mint/30 hover:bg-mint/50 border-mint/40' }
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'twitter', name: 'X / Twitter', icon: '🐦' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-charcoal">
          Create Perfect Content
        </h1>
        <p className="text-charcoal/60 mt-2 text-base">
          Upload your media, set your mood, and let the AI cultivate absolute perfection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Canvas */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-charcoal/5 h-full min-h-[400px] flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-4 text-charcoal/80 flex items-center gap-2">
            <span>🖼️</span> Your Canvas
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-charcoal/10 rounded-2xl p-6 transition-all bg-alabaster/50 relative overflow-hidden group">
            {imagePreview ? (
              <div className="w-full h-full min-h-[300px] max-h-[400px] rounded-xl overflow-hidden relative">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setImagePreview(null)}
                  className="absolute top-3 right-3 bg-white/90 text-charcoal p-2 rounded-full shadow-md text-xs font-semibold hover:bg-white transition-colors"
                >
                  Remove ❌
                </button>
              </div>
           ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center text-center p-4 w-full h-full">
                <div className="w-16 h-16 bg-peach/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">✨</span>
                </div>
                <p className="font-medium text-charcoal">Drag & drop your picture here</p>
                <p className="text-xs text-charcoal/50 mt-1">or click to browse from your device</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-soft border border-charcoal/5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-4">
              Select Destination
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 font-medium text-sm cursor-pointer
                    ${selectedPlatform === platform.id 
                      ? 'border-peach bg-peach/10 shadow-sm text-charcoal font-semibold' 
                      : 'border-charcoal/5 bg-white text-charcoal/70 hover:bg-alabaster'}`}
                >
                  <span className="text-xl">{platform.icon}</span>
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-soft border border-charcoal/5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-4">
              Choose the Vibe
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {vibes.map((vibe) => (
                <button
                  key={vibe.name}
                  onClick={() => setSelectedVibe(vibe.name)}
                  className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer
                    ${vibe.color} 
                    ${selectedVibe === vibe.name 
                      ? 'ring-2 ring-charcoal/20 scale-[1.03] font-semibold' 
                      : 'opacity-70 hover:opacity-100'}`}
                >
                  <span>{vibe.emoji}</span>
                  {vibe.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              if (!imagePreview) {
                alert("Please upload a picture first to make it perfect! 🖼️✨");
                return;
              }
              onGenerate(imagePreview, selectedPlatform, selectedVibe);
            }}
            className="w-full bg-peach text-charcoal font-bold py-4 px-6 rounded-2xl shadow-dopamine hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>✨</span> Generate Perfect Post
          </button>
        </div>
      </div>
    </div>
  );
}