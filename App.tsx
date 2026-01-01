
import React, { useState, useMemo } from 'react';
import { Search, Tv, Info, Home, Heart, Globe, Menu, X, Github, ExternalLink, Play, Sparkles } from 'lucide-react';
import { CHANNELS } from './constants';
import { Category, Channel } from './types';
import Player from './components/Player';
import ChannelCard from './components/ChannelCard';

const App: React.FC = () => {
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const categories = useMemo(() => ['All', ...Object.values(Category)], []);

  const filteredChannels = useMemo(() => {
    return CHANNELS.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          channel.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-indigo-500/30">
      {/* Premium Header */}
      <header className="h-16 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-xl text-slate-400 lg:hidden transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Tv className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white leading-none">SATV</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Liberia Digital</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Discover 50+ live channels..."
              className="w-full bg-slate-800/40 border border-white/5 text-slate-100 pl-10 pr-4 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-slate-800/80 transition-all placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Founder</span>
            <span className="text-sm font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Akin S. Sokpah</span>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white/10 overflow-hidden shadow-lg">
             <img src="https://picsum.photos/seed/akin/100/100" alt="Akin" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar (Desktop) */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} hidden lg:flex flex-col border-r border-white/5 transition-all duration-300 bg-slate-900/20 backdrop-blur-sm`}>
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${selectedCategory === 'All' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <Home size={20} />
              {isSidebarOpen && <span className="font-semibold text-sm">Discover Live</span>}
            </button>
            <button 
              onClick={() => setSelectedCategory(Category.LIBERIA)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${selectedCategory === Category.LIBERIA ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <Globe size={20} />
              {isSidebarOpen && <span className="font-semibold text-sm">Liberia & Africa</span>}
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl text-slate-400 hover:bg-white/5 transition-all group">
              <Heart size={20} className="group-hover:text-rose-500 transition-colors" />
              {isSidebarOpen && <span className="font-semibold text-sm">My Favorites</span>}
            </button>
          </nav>
          
          <div className="mt-auto p-4">
            {isSidebarOpen && (
              <div className="bg-indigo-600/10 p-4 rounded-3xl border border-indigo-500/20 space-y-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                </div>
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Premium Access</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  Streaming 50+ free license public channels directly from Monrovia to the world.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/10 via-slate-950 to-slate-950">
          <div className="max-w-[1600px] mx-auto space-y-8">
            
            {/* Top Grid: Player & Side List */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-4">
                <Player channel={currentChannel} />
                
                {currentChannel ? (
                  <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded-md uppercase tracking-widest border border-indigo-600/30">
                            {currentChannel.category}
                          </span>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">{currentChannel.name}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-slate-300 hover:text-rose-500">
                          <Heart size={20} />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all text-white font-black shadow-xl shadow-indigo-600/30 text-sm">
                          <ExternalLink size={18} />
                          SHARE BROADCAST
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 text-slate-400 leading-relaxed font-medium text-sm">
                      {currentChannel.description}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-900/30 p-12 rounded-[40px] border border-white/5 text-center flex flex-col items-center backdrop-blur-sm">
                    <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center mb-6 text-indigo-500 shadow-inner">
                      <Tv size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">Experience SATV Liberia</h3>
                    <p className="text-slate-500 max-w-md font-medium leading-relaxed">
                      Choose from our curated collection of over 50+ high-definition public license channels. Curated by Akin S. Sokpah.
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar: Categories & Recommended */}
              <div className="xl:col-span-1 space-y-6">
                <div className="bg-slate-900/40 rounded-[32px] border border-white/5 p-4 flex flex-col h-[700px]">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2 px-2">
                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                    Trending Now
                  </h3>
                  
                  {/* Category Pills inside sidebar for quick access */}
                  <div className="flex flex-wrap gap-1.5 mb-4 px-2">
                    {categories.slice(0, 5).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          selectedCategory === cat 
                            ? 'bg-indigo-600 border-indigo-500 text-white' 
                            : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                    {filteredChannels.map(channel => (
                      <button 
                        key={channel.id}
                        onClick={() => setCurrentChannel(channel)}
                        className={`w-full flex items-center gap-3 p-2 rounded-2xl border transition-all duration-300 group ${
                          currentChannel?.id === channel.id 
                            ? 'bg-indigo-600/10 border-indigo-500/50' 
                            : 'bg-transparent border-transparent hover:bg-white/5'
                        }`}
                      >
                        <div className="w-20 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800 border border-white/10 group-hover:scale-105 transition-transform">
                          <img src={channel.logo} className="w-full h-full object-cover" alt={channel.name} />
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className={`text-xs font-bold truncate ${currentChannel?.id === channel.id ? 'text-indigo-400' : 'text-slate-200'}`}>{channel.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{channel.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Channel Gallery */}
            <div className="space-y-6 pt-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-4">
                  Global Broadcast Network
                  <span className="text-xs font-bold text-slate-500 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                    {filteredChannels.length} Live Sources
                  </span>
                </h2>
                
                {/* Horizontal Category Filter for the Gallery */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                          selectedCategory === cat 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                {filteredChannels.map(channel => (
                  <ChannelCard 
                    key={channel.id}
                    channel={channel}
                    isActive={currentChannel?.id === channel.id}
                    onClick={setCurrentChannel}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Majestic Footer */}
          <footer className="mt-32 py-16 border-t border-white/5 flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <Tv className="text-slate-950" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter text-white">SATV LIBERIA</h1>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em]">The Heart of Africa</p>
              </div>
            </div>
            
            <div className="text-center text-slate-500 max-w-2xl space-y-4 px-4">
              <p className="text-sm font-medium leading-relaxed">
                SATV is a premier digital aggregator of free-to-air public license broadcasts. We do not host content but provide a unified gateway for Liberian and global audiences to access open information.
              </p>
              <div className="pt-4 flex flex-col items-center gap-1">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Project Leadership</p>
                <p className="text-xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-white">Akin S. Sokpah</p>
              </div>
            </div>

            <div className="flex gap-6">
               <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
                 <Github size={24} />
               </button>
               <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
                 <Globe size={24} />
               </button>
            </div>
            
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">© 2024 SATV Digital Monrovia</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
