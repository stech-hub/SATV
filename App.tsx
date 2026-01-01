
import React, { useState, useMemo } from 'react';
import { Search, Tv, Info, Home, Heart, Globe, Menu, X, Github, ExternalLink, Play } from 'lucide-react';
import { CHANNELS } from './constants';
import { Category, Channel } from './types';
import Player from './components/Player';
import ChannelCard from './components/ChannelCard';

const App: React.FC = () => {
  // Initialize to null to force user interaction (click) before playback, 
  // which avoids the "play() failed" autoplay error.
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
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-colors">
              <Tv className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">SATV</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Liberia Digital</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search 50+ channels..."
              className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-100 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-slate-400">Created by</span>
            <span className="text-sm font-semibold text-white">Akin S. Sokpah</span>
          </div>
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 overflow-hidden">
             <img src="https://picsum.photos/seed/akin/100/100" alt="Akin" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar (Desktop) */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} hidden lg:flex flex-col border-r border-slate-800 transition-all duration-300 bg-slate-900/40`}>
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedCategory === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Home size={20} />
              {isSidebarOpen && <span className="font-medium">Discover</span>}
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-800 transition-all">
              <Heart size={20} />
              {isSidebarOpen && <span className="font-medium">Favorites</span>}
            </button>
            <button 
              onClick={() => setSelectedCategory(Category.LIBERIA)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedCategory === Category.LIBERIA ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Globe size={20} />
              {isSidebarOpen && <span className="font-medium">Liberia & Africa</span>}
            </button>
          </nav>
          
          <div className="mt-auto p-6">
            {isSidebarOpen && (
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Pro Tip</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SATV is best experienced in full screen. Click the player to expand.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Featured Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-4">
                <Player channel={currentChannel} />
                {currentChannel ? (
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded-md uppercase tracking-wide border border-indigo-600/30">
                            {currentChannel.category}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">{currentChannel.name}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-slate-300">
                          <Heart size={20} />
                        </button>
                        <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-slate-300">
                          <Info size={20} />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all text-white font-bold shadow-lg shadow-indigo-600/20">
                          <ExternalLink size={18} />
                          Share Channel
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 text-slate-400 leading-relaxed">
                      {currentChannel.description}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-900/50 p-12 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-indigo-500">
                      <Tv size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Welcome to SATV Liberia</h3>
                    <p className="text-slate-400 max-w-md">
                      Experience premium digital broadcasting. Select any channel from the list to begin your viewing experience.
                    </p>
                  </div>
                )}
              </div>

              {/* Category Filter Pills (Mobile/Tablet Friendly) */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        selectedCategory === cat 
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Vertical Mini Grid for Quick Selection */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 space-y-4 h-[500px] overflow-y-auto">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Tv size={16} className="text-indigo-400" />
                    Recommended
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {filteredChannels.slice(0, 15).map(channel => (
                      <button 
                        key={channel.id}
                        onClick={() => setCurrentChannel(channel)}
                        className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${
                          currentChannel?.id === channel.id 
                            ? 'bg-slate-800 border-indigo-500/50' 
                            : 'bg-transparent border-transparent hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 border border-slate-700">
                          <img src={channel.logo} className="w-full h-full object-cover" alt={channel.name} />
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className="text-xs font-bold text-slate-200 truncate">{channel.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{channel.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Full Channel Grid Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  All Channels
                  <span className="text-sm font-normal text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {filteredChannels.length} available
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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

          {/* Footer Branding */}
          <footer className="mt-20 py-10 border-t border-slate-900 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 opacity-50 grayscale">
              <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                <Tv className="text-white" size={18} />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">SATV</h1>
            </div>
            <div className="text-center text-slate-500 max-w-lg space-y-2">
              <p className="text-sm">© 2024 SATV Liberia. All public license streams are sourced from their respective official digital platforms.</p>
              <p className="text-xs font-medium">Platform Architected & Developed by <span className="text-indigo-400">Akin S. Sokpah</span></p>
            </div>
            <div className="flex gap-4">
               <Github className="text-slate-600 hover:text-indigo-400 cursor-pointer transition-colors" size={20} />
               <Globe className="text-slate-600 hover:text-indigo-400 cursor-pointer transition-colors" size={20} />
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
