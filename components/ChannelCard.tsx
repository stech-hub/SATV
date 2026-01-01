
import React from 'react';
import { Channel } from '../types';
import { Play } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  isActive: boolean;
  onClick: (channel: Channel) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(channel)}
      className={`relative flex flex-col w-full text-left group transition-all duration-300 rounded-xl overflow-hidden border ${
        isActive 
          ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
          : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
      }`}
    >
      <div className="aspect-video relative overflow-hidden bg-slate-900">
        <img 
          src={channel.logo} 
          alt={channel.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isActive ? 'scale-105' : ''}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        
        {/* Play Icon Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="bg-indigo-600 p-3 rounded-full shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Play className="w-6 h-6 fill-white" />
          </div>
        </div>

        {/* Live Indicator */}
        {channel.isLive && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            Live
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className={`font-semibold text-sm line-clamp-1 ${isActive ? 'text-indigo-300' : 'text-slate-100 group-hover:text-indigo-400'}`}>
          {channel.name}
        </h3>
        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mt-1">
          {channel.category}
        </span>
      </div>
    </button>
  );
};

export default ChannelCard;
