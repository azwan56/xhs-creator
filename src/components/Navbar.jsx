import React from 'react';
import { 
  Sparkles, 
  Settings, 
  Download, 
  Tv, 
  BookOpen, 
  Activity, 
  Feather,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentNiche,
  setCurrentNiche,
  niches,
  isApiConfigured,
  onOpenSettings,
  onOpenTeleprompter,
  onExportBackup
}) {
  const tabs = [
    { id: 'studio', label: '创作工场', icon: Sparkles },
    { id: 'materials', label: '素材库', icon: BookOpen },
    { id: 'dna', label: '创作者DNA', icon: Feather },
    { id: 'evolution', label: '进化看板', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff2442] to-[#ff526b] flex items-center justify-center shadow-lg shadow-[#ff2442]/30 text-white font-black text-lg">
            书
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">小红书创作大脑</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff2442]/15 text-[#ff4b64] border border-[#ff2442]/25 font-semibold">
                40+知性女性定制
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal hidden sm:block">
              豆包 Seed-2.1-pro 驱动 · 3:4 爆款排版 · 1:1 风格固化
            </p>
          </div>
        </div>

        {/* Center: Elegant Floating Tab Pills */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-white/[0.08] shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#ff2442] text-white shadow-md shadow-[#ff2442]/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Niche Switcher, Status & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Niche Selector */}
          <div className="relative flex items-center">
            <select
              value={currentNiche.id}
              onChange={(e) => {
                const found = niches.find(n => n.id === e.target.value);
                if (found) setCurrentNiche(found);
              }}
              className="appearance-none bg-slate-900/90 text-xs text-slate-200 font-medium pl-3.5 pr-8 py-2 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#ff2442]/60 cursor-pointer hover:border-white/20 transition-colors"
            >
              {niches.map(n => (
                <option key={n.id} value={n.id} className="bg-slate-900 text-white">
                  赛道：{n.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Model Status Dot */}
          <div 
            onClick={onOpenSettings}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
              isApiConfigured 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/25 hover:bg-amber-500/20'
            }`}
            title={isApiConfigured ? '火山方舟豆包 Seed-2.1-pro 已连接' : '点击配置火山引擎 API Key'}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isApiConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isApiConfigured ? '豆包Pro' : '智能引擎'}</span>
          </div>

          {/* Teleprompter Quick Launch */}
          <button
            onClick={onOpenTeleprompter}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-xl transition-all"
            title="打开全屏智能口播提词器"
          >
            <Tv className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Backup */}
          <button
            onClick={onExportBackup}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-xl transition-all hidden lg:block"
            title="导出备份 (JSON)"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-xl transition-all"
            title="系统设置"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Sub Navigation (Visible on Small Screens Only) */}
      <div className="md:hidden flex items-center justify-around px-4 py-2 border-t border-white/[0.06] bg-slate-950/60">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-[#ff2442] text-white' : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
