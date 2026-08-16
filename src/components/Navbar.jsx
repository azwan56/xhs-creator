import React from 'react';
import { 
  Sparkles, 
  Settings, 
  Download, 
  Upload, 
  Tv, 
  Layers, 
  Cpu, 
  BookOpen, 
  Activity, 
  Feather,
  Palette
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
  onExportBackup,
  onImportBackup
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2442] to-[#e11d48] flex items-center justify-center shadow-lg shadow-[#ff2442]/25 font-black text-white text-lg tracking-wider">
            书
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">小红书专属创作智能体</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#ff2442]/20 text-[#ff4b64] border border-[#ff2442]/30">
                PRO EVOLUTION
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal hidden sm:block">
              私人创作大脑 · 风格固化 · 3:4封面框架 · 豆包驱动
            </p>
          </div>
        </div>

        {/* Center: Niche Selector */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-white/10 max-w-md">
          <Palette className="w-4 h-4 text-slate-400 ml-2 hidden md:block shrink-0" />
          <select
            value={currentNiche.id}
            onChange={(e) => {
              const found = niches.find(n => n.id === e.target.value);
              if (found) setCurrentNiche(found);
            }}
            className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer py-1 px-2 pr-8"
          >
            {niches.map(n => (
              <option key={n.id} value={n.id} className="bg-slate-900 text-white">
                {n.name}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Quick Actions & Status */}
        <div className="flex items-center gap-2">
          {/* Model Status Indicator */}
          <div 
            onClick={onOpenSettings}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
              isApiConfigured 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
            title={isApiConfigured ? '火山引擎豆包 API 已配置' : '正在使用高质量内置智能引擎，点击配置豆包 API'}
          >
            <span className={`w-2 h-2 rounded-full ${isApiConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="hidden lg:inline">{isApiConfigured ? '豆包大模型已连接' : '智能引擎 (离线/体验)'}</span>
          </div>

          {/* Quick Teleprompter Button */}
          <button
            onClick={onOpenTeleprompter}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            title="打开全屏智能口播提词器"
          >
            <Tv className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Backup / Export */}
          <button
            onClick={onExportBackup}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all hidden sm:flex"
            title="导出全量创作资产备份 (JSON)"
          >
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            title="设置：火山引擎 API、阿里云与系统配置"
          >
            <Settings className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-t border-white/5">
        <button
          onClick={() => setActiveTab('studio')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'studio'
              ? 'bg-[#ff2442] text-white shadow-md shadow-[#ff2442]/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          🎨 创作工场 (Studio)
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'materials'
              ? 'bg-slate-800 text-white border border-white/20 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          📂 四大素材库管理
        </button>

        <button
          onClick={() => setActiveTab('dna')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'dna'
              ? 'bg-slate-800 text-white border border-white/20 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Feather className="w-4 h-4" />
          🧠 创作者 DNA 记忆
        </button>

        <button
          onClick={() => setActiveTab('evolution')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'evolution'
              ? 'bg-slate-800 text-white border border-white/20 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          📈 反思进化与成长看板
        </button>
      </div>
    </header>
  );
}
