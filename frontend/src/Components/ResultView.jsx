import React, { useState } from 'react';

export default function ResultView({ imagePreview, platform, vibe, onReset }) {
  const [copied, setCopied] = useState(false);

  const mockCaption = `Chasing golden hours and infinite loops. 🌅✨ There's a certain magic in slowing down just to appreciate the visual rhythm of the world. \n\nWhat's your current vibe? Let me know below! 👇\n\n#AestheticVibes #SlowingDown #VisualStorytelling #GoldenHour #GoodEnergy`;

  const mockSongs = [
    { title: "Midnight City", artist: "M83", albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&q=80" },
    { title: "Sweater Weather", artist: "The Neighbourhood", albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&q=80" },
    { title: "As It Was", artist: "Harry Styles", albumArt: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&q=80" }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(mockCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
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
          onClick={onReset}
          className="self-start sm:self-center bg-white text-charcoal/80 border border-charcoal/10 font-medium py-2.5 px-5 rounded-xl hover:bg-alabaster hover:text-charcoal transition-all text-sm shadow-soft cursor-pointer"
        >
          ← Create Another Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white p-4 rounded-3xl shadow-soft border border-charcoal/5">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-sm bg-alabaster">
            {imagePreview ? (
              <img src={imagePreview} alt="Original Canvas" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-charcoal/30">No Image Uploaded</div>
            )}
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

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-soft border border-charcoal/5 relative group">
            <div className="flex items-center justify-between mb-3 border-b border-charcoal/5 pb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 flex items-center gap-1.5">
                📝 Generated Caption
              </h3>
              <button 
                onClick={handleCopy}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1 cursor-pointer
                  ${copied 
                    ? 'bg-mint text-charcoal shadow-sm' 
                    : 'bg-alabaster text-charcoal/70 hover:bg-peach/30 border border-charcoal/5'}`}
              >
                {copied ? '✅ Copied!' : '📋 Copy Caption'}
              </button>
            </div>
            <p className="text-charcoal/80 text-sm font-medium leading-relaxed whitespace-pre-line bg-alabaster/40 p-4 rounded-2xl border border-charcoal/[0.02]">
              {mockCaption}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-soft border border-charcoal/5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal/50 mb-4 flex items-center gap-1.5">
              🎵 Recommended Soundtrack
            </h3>
            
            <div className="space-y-3">
              {mockSongs.map((song, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-2xl bg-alabaster/60 hover:bg-peach/10 border border-charcoal/[0.03] hover:border-peach/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-charcoal/5 shrink-0">
                      <img src={song.albumArt} alt={song.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-charcoal tracking-tight">
                        {song.title}
                      </h4>
                      <p className="text-xs text-charcoal/60 font-medium">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-xs">
                    🎵
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