import React, { useState, useRef } from 'react';

export default function ResultView({ imagePreview, platform, vibe, aiData, onReset }) {
  const [copied, setCopied] = useState(false);
  
  // 🔥 Audio Streaming Controller States
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRef = useRef(null);

  const activeCaption = aiData?.captions?.[platform] || aiData?.captions?.instagram || "Perfection cultivated! ✨";
  const activeSongs = aiData?.suggestedSongs || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🔥 Dynamic 30-Sec Playback Execution Engine
  const togglePlayTrack = (url, index) => {
    if (!url) {
      alert("Bhai, is track ka 30-sec audio link internet par nahi mila! 😢");
      return;
    }

    if (playingIndex === index) {
      // If clicking the currently playing song, pause it
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      // If an old song was playing, kill it first
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Instantiate fresh stream track
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setPlayingIndex(index);

      // Auto clear index pointer when 30 seconds track ends naturally
      audioRef.current.onended = () => {
        setPlayingIndex(null);
      };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
      
      {/* Header Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <span className="bg-peach/30 text-charcoal px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Your Perfect Post is Ready
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-charcoal mt-1">
            Cultivated Perfection ✨
          </h1>
        </div>
        <button 
          onClick={() => {
            if (audioRef.current) audioRef.current.pause(); // Kill sound on exit
            onReset();
          }}
          className="bg-white text-charcoal/80 border border-charcoal/10 font-medium py-2.5 px-5 rounded-xl hover:bg-alabaster transition-all text-sm cursor-pointer shadow-soft"
        >
          ← Create Another Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Card: Showcase Image */}
        <div className="lg:col-span-5 bg-white p-4 rounded-3xl shadow-soft border border-charcoal/5">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-sm bg-alabaster">
            <img src={imagePreview} alt="Canvas Showcase" className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 flex items-center justify-between px-1">
            <span className="text-sm font-semibold capitalize bg-mint/40 text-charcoal px-2.5 py-0.5 rounded-md">
              {vibe} Vibe
            </span>
            <span className="text-xs font-medium text-charcoal/40 uppercase tracking-wider">
              Target: {platform}
            </span>
          </div>
        </div>

        {/* Right Card Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Caption Container */}
          <div className="bg-white p-6 rounded-3xl shadow-soft border border-charcoal/5 relative group">
            <div className="flex items-center justify-between mb-3 border-b border-charcoal/5 pb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 flex items-center gap-1.5">
                📝 Caption for you
              </h3>
              <button 
                onClick={handleCopy}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer
                  ${copied ? 'bg-mint text-charcoal' : 'bg-alabaster text-charcoal/70 border border-charcoal/5 hover:bg-peach/30'}`}
              >
                {copied ? '✅ Copied!' : '📋 Copy Caption'}
              </button>
            </div>
            <p className="text-charcoal/80 text-sm font-medium leading-relaxed whitespace-pre-line bg-alabaster/40 p-4 rounded-2xl border border-charcoal/[0.02]">
              {activeCaption}
            </p>
          </div>

          {/* Dynamic Audio Jukebox Card */}
          <div className="bg-white p-6 rounded-3xl shadow-soft border border-charcoal/5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-4 flex items-center gap-1.5">
              🎵 Recommended Songs
            </h3>
            
            <div className="space-y-3">
              {activeSongs.map((song, index) => (
                <div 
                  key={index} 
                  onClick={() => togglePlayTrack(song.previewUrl, index)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 group cursor-pointer
                    ${playingIndex === index 
                      ? 'bg-peach/20 border-peach shadow-sm scale-[1.01]' 
                      : 'bg-alabaster/60 border-charcoal/[0.03] hover:bg-peach/5 hover:border-peach/20'}`}
                >
                  <div className="flex items-center gap-3 w-full min-w-0">
                    {/* Status Playback Indicator */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-transform duration-300
                      ${playingIndex === index ? 'bg-peach text-charcoal scale-105 animate-spin-slow' : 'bg-peach/10 text-charcoal'}`}>
                      {playingIndex === index ? '⏸️' : '▶️'}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-charcoal tracking-tight truncate flex items-center gap-2">
                        {song.title}
                        {playingIndex === index && <span className="text-xs text-peach animate-pulse">🔊 Playing Preview...</span>}
                      </h4>
                      <p className="text-xs text-charcoal/60 font-medium truncate">by {song.artist}</p>
                      <p className="text-[11px] text-charcoal/40 font-medium italic mt-0.5 truncate">
                        ✨ {song.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}