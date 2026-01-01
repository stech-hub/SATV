
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Channel } from '../types';
import { Play, AlertCircle, Radio } from 'lucide-react';

interface PlayerProps {
  channel: Channel | null;
}

const Player: React.FC<PlayerProps> = ({ channel }) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsReady(false);
    setError(null);
  }, [channel]);

  if (!channel) {
    return (
      <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center border border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-10 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="bg-indigo-600/20 p-6 rounded-full mb-6 ring-8 ring-indigo-500/10 group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-12 h-12 text-indigo-500 fill-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Ready to Broadcast</h2>
            <p className="text-slate-400 flex items-center gap-2">
                <Radio size={16} className="text-rose-500 animate-pulse" />
                Select a channel below to start watching
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl group">
      {!isReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 animate-pulse">Connecting to {channel.name}...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10 p-6 text-center">
          <div className="flex flex-col items-center max-w-md">
            <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-100">Broadcast Interrupted</h3>
            <p className="text-slate-400 mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      <ReactPlayer
        url={channel.url}
        width="100%"
        height="100%"
        playing={true} // Now triggered after user selects a channel (valid interaction)
        controls={true}
        onReady={() => setIsReady(true)}
        onError={() => setError("This broadcast is currently unavailable in your region or the source link has changed.")}
        config={{
          youtube: {
            playerVars: { showinfo: 0, autoplay: 1, rel: 0 }
          }
        }}
      />

      {/* Overlay info */}
      <div className="absolute top-4 left-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold uppercase tracking-wider">Live</span>
        </div>
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg">
          <span className="text-sm font-medium">{channel.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
