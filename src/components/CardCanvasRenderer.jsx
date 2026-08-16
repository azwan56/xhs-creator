import React, { useState, useRef } from 'react';
import { 
  Download, 
  Layers, 
  Palette, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Package, 
  Check, 
  Image as ImageIcon,
  Upload,
  Wand2,
  Trash2,
  SunMedium,
  Sliders,
  Maximize2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const CARD_THEMES = {
  oat: {
    id: 'oat',
    name: '🌾 燕麦知性 (40+知性妈妈)',
    bg: '#FBF9F5',
    cardBg: '#FFFFFF',
    textMain: '#1C1917',
    textSub: '#78716C',
    accent: '#E11D48',
    badgeBg: '#FFF1F2',
    badgeText: '#E11D48',
    borderColor: '#E7E5E4'
  },
  tech: {
    id: 'tech',
    name: '🤖 商务科技 (AI大厂风)',
    bg: '#0F172A',
    cardBg: '#1E293B',
    textMain: '#FFFFFF',
    textSub: '#94A3B8',
    accent: '#38BDF8',
    badgeBg: '#0284C7',
    badgeText: '#FFFFFF',
    borderColor: '#334155'
  },
  healing: {
    id: 'healing',
    name: '🌿 治愈生活 (松弛感成长)',
    bg: '#F0FDF4',
    cardBg: '#FFFFFF',
    textMain: '#14532D',
    textSub: '#4B5563',
    accent: '#F59E0B',
    badgeBg: '#DCFCE7',
    badgeText: '#15803D',
    borderColor: '#DCFCE7'
  },
  alert: {
    id: 'alert',
    name: '⚡ 高对比警示 (避坑排雷)',
    bg: '#18181B',
    cardBg: '#27272A',
    textMain: '#FFFFFF',
    textSub: '#A1A1AA',
    accent: '#FF2442',
    badgeBg: '#FACC15',
    badgeText: '#000000',
    borderColor: '#3F3F46'
  }
};

export const LAYOUT_TYPES = [
  { id: 'A', name: '版型 A: 大字报观点型', desc: '超大主标题 + 痛点解析' },
  { id: 'B', name: '版型 B: 三段结构卡片', desc: '标题 + 悬浮数据/指令卡 + 交付' },
  { id: 'C', name: '版型 C: 左右前后对比', desc: '错误做法 ❌ vs 正确解法 ✅' },
  { id: 'D', name: '版型 D: 画中画悬浮型', desc: '背景渐变暗角 + 悬浮玻璃牌' },
  { id: 'E', name: '版型 E: 序号索引清单', desc: '大标题 + ①②③ 清单排列' }
];

// Preset Thematic Background Images for 40+ Tech Mom Creators
export const AI_PRESET_IMAGES = [
  {
    id: 'study-coffee',
    name: '☕ 知性书房与咖啡',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    desc: '温暖木质书桌、笔记本与拿铁，知性办公'
  },
  {
    id: 'tech-laptop',
    name: '💻 极简大厂办公',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    desc: '现代技术工作流与科技生产力氛围'
  },
  {
    id: 'cozy-reading',
    name: '📖 亲子温情与阅读',
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    desc: '温暖阳光、翻开的经典书页与从容松弛'
  },
  {
    id: 'morning-sunlight',
    name: '🌿 清晨阳光客厅',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    desc: '自然光影绿植，治愈舒适生活方式'
  },
  {
    id: 'abstract-gradient',
    name: '🌌 科技流动光晕',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    desc: '高级流动弥散光，未来感与算力美学'
  }
];

// AI Filters & Beautify Presets
export const AI_FILTERS = [
  { id: 'none', name: '原图效果', filter: 'none' },
  { id: 'ai-enhance', name: '✨ AI 智能自然增强', filter: 'contrast(1.12) brightness(1.05) saturate(1.15)' },
  { id: 'warm-oat', name: '🌾 知性暖胶片', filter: 'sepia(0.2) contrast(1.06) brightness(1.02) saturate(1.1)' },
  { id: 'tech-cool', name: '🤖 科技轻奢冷感', filter: 'contrast(1.15) brightness(0.96) hue-rotate(185deg) saturate(1.1)' },
  { id: 'soft-glow', name: '🌿 清透松弛感', filter: 'brightness(1.08) contrast(0.96) saturate(1.08)' },
  { id: 'monochrome', name: '🖤 黑白高级大片', filter: 'grayscale(1) contrast(1.25) brightness(0.92)' }
];

export default function CardCanvasRenderer({
  slides = [],
  onUpdateSlide,
  initialTheme = 'oat',
  initialLayout = 'B',
  selectedTitle = '',
  authorName = '大厂知性妈妈'
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(initialTheme);
  const [selectedLayoutId, setSelectedLayoutId] = useState(initialLayout);
  
  // Image & Beautify States
  const [bgImage, setBgImage] = useState(null); // URL or base64
  const [activeFilterId, setActiveFilterId] = useState('none');
  const [overlayMode, setOverlayMode] = useState('glass-card'); // 'glass-card' | 'bottom-gradient' | 'dark-mask' | 'none'
  const [overlayOpacity, setOverlayOpacity] = useState(45); // 0 to 80%
  const [showImageTools, setShowImageTools] = useState(false);

  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const cardRef = useRef(null);
  const fileInputRef = useRef(null);
  const theme = CARD_THEMES[selectedThemeId] || CARD_THEMES.oat;

  const currentSlide = slides[currentSlideIndex] || {
    badge: '大厂妈妈育儿实录 #18',
    mainTitle: selectedTitle || '不要再禁止孩子用 AI 了！',
    highlightKeywords: '禁止孩子用 AI',
    subTitle: '未来10年拉开差距的，从来不是刷题量，而是「提问力」',
    keyPoints: ['大厂高管思维带娃', '3个启发式提问指令', '从被动作弊到主动思考']
  };

  // Handle local photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBgImage(event.target?.result);
      setActiveFilterId('ai-enhance'); // Auto apply AI enhancement on upload
    };
    reader.readAsDataURL(file);
  };

  // Helper to highlight keywords in title
  const renderHighlightedTitle = (title, keywords) => {
    if (!keywords || !title.includes(keywords)) {
      return <span>{title}</span>;
    }
    const parts = title.split(keywords);
    return (
      <span>
        {parts[0]}
        <span 
          style={{ 
            color: bgImage ? '#FFE600' : theme.accent, 
            backgroundColor: bgImage ? 'rgba(0,0,0,0.5)' : (selectedThemeId === 'oat' || selectedThemeId === 'healing' ? `${theme.accent}15` : `${theme.accent}25`),
            padding: '2px 8px',
            borderRadius: '6px',
            margin: '0 2px',
            backdropFilter: bgImage ? 'blur(4px)' : 'none'
          }}
        >
          {keywords}
        </span>
        {parts.slice(1).join(keywords)}
      </span>
    );
  };

  // Export Current Single Card as PNG
  const handleExportSinglePng = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3 // Ultra High resolution 1080x1440 equivalent
      });
      saveAs(dataUrl, `小红书卡片_第${currentSlideIndex + 1}页_${Date.now()}.png`);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
    } catch (err) {
      console.error('Export failed:', err);
      alert('导出图片失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // Export All Slides as a Zip Package
  const handleExportAllZip = async () => {
    if (!cardRef.current || slides.length === 0) return;
    try {
      setIsExporting(true);
      const zip = new JSZip();
      const originalIndex = currentSlideIndex;

      for (let i = 0; i < slides.length; i++) {
        setCurrentSlideIndex(i);
        await new Promise(r => setTimeout(r, 180));
        if (cardRef.current) {
          const dataUrl = await toPng(cardRef.current, { pixelRatio: 2.5 });
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          zip.file(`小红书高清卡片_第${i + 1}页_${slides[i].slideType || 'card'}.png`, base64Data, { base64: true });
        }
      }

      setCurrentSlideIndex(originalIndex);
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `小红书3比4高清图集_${Date.now()}.zip`);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2500);
    } catch (err) {
      console.error('Zip export failed:', err);
      alert('打包图集失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const currentFilter = AI_FILTERS.find(f => f.id === activeFilterId)?.filter || 'none';

  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. TOP TOOLBAR: Theme, Layout & Image Enhancer Switch */}
      <div className="glass-panel p-3.5 flex flex-col gap-3 border border-white/[0.08]">
        
        {/* Main Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Theme Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-white/[0.06]">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedThemeId}
                onChange={(e) => setSelectedThemeId(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                {Object.values(CARD_THEMES).map(t => (
                  <option key={t.id} value={t.id} className="bg-slate-900">{t.name}</option>
                ))}
              </select>
            </div>

            {/* Layout Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-white/[0.06]">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedLayoutId}
                onChange={(e) => setSelectedLayoutId(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                {LAYOUT_TYPES.map(l => (
                  <option key={l.id} value={l.id} className="bg-slate-900">{l.name}</option>
                ))}
              </select>
            </div>

            {/* Image / Beautify Tool Toggle */}
            <button
              onClick={() => setShowImageTools(!showImageTools)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showImageTools || bgImage
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                  : 'bg-slate-900/90 text-slate-300 border-white/[0.06] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
              <span>{bgImage ? '🖼️ 背景图已应用' : '🖼️ AI生图/上传照片'}</span>
            </button>

          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSinglePng}
              disabled={isExporting}
              className="btn-secondary text-xs py-1.5 px-3"
              title="导出当前第 1 页为高清 PNG"
            >
              <Download className="w-3.5 h-3.5" />
              <span>单页 PNG</span>
            </button>

            <button
              onClick={handleExportAllZip}
              disabled={isExporting}
              className="btn-xhs text-xs py-1.5 px-3 shadow-md"
            >
              {exportSuccess ? <Check className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5" />}
              <span>{exportSuccess ? '已打包！' : `打包下载全套 (${slides.length || 1}张)`}</span>
            </button>
          </div>
        </div>

        {/* 2. COLLAPSIBLE IMAGE, AI GENERATION & BEAUTIFY SUITE */}
        {showImageTools && (
          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-3.5 text-xs">
            
            {/* Row A: Presets & Upload Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  1. AI 精选场景背景图：
                </span>
                
                {/* Upload Local Photo */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center gap-1 text-[11px]"
                >
                  <Upload className="w-3 h-3 text-cyan-400" />
                  <span>上传我的照片</span>
                </button>

                {bgImage && (
                  <button
                    onClick={() => {
                      setBgImage(null);
                      setActiveFilterId('none');
                    }}
                    className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1 ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>恢复纯色</span>
                  </button>
                )}
              </div>

              {/* Overlay Style Switcher */}
              {bgImage && (
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400">文字叠层:</span>
                  <select
                    value={overlayMode}
                    onChange={(e) => setOverlayMode(e.target.value)}
                    className="bg-slate-900 border border-white/10 text-white rounded-md px-2 py-0.5"
                  >
                    <option value="glass-card">毛玻璃悬浮卡</option>
                    <option value="bottom-gradient">底部暗角渐变</option>
                    <option value="dark-mask">暗色通透遮罩</option>
                    <option value="none">无遮罩 (纯透明)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Row B: 5 Preset Photography Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {AI_PRESET_IMAGES.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setBgImage(img.url)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all aspect-[4/3] ${
                    bgImage === img.url
                      ? 'border-[#ff2442] ring-2 ring-[#ff2442]/30 scale-[1.02]'
                      : 'border-white/10 hover:border-white/30 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-end p-1">
                    <span className="text-[10px] text-white font-medium line-clamp-1">{img.name.split(' ')[1]}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row C: AI 1-Click Beautify Filters (Visible when photo is selected) */}
            {bgImage && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                <span className="text-slate-400 shrink-0 flex items-center gap-1 font-semibold">
                  <Wand2 className="w-3 h-3 text-cyan-400" />
                  2. AI 滤镜美化:
                </span>
                {AI_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilterId(f.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-all ${
                      activeFilterId === f.id
                        ? 'bg-cyan-500 text-black font-bold shadow-sm'
                        : 'bg-slate-900 text-slate-300 border border-white/[0.06] hover:bg-slate-800'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* 3. MAIN 3:4 CANVAS WORKSPACE */}
      <div className="flex flex-col items-center">
        
        {/* The 1080x1440 Proportion Canvas */}
        <div 
          ref={cardRef}
          className="canvas-3-4 select-none rounded-2xl flex flex-col justify-between"
          style={{
            backgroundColor: bgImage ? '#000000' : theme.bg,
            color: bgImage ? '#FFFFFF' : theme.textMain,
            padding: '36px 28px 42px 28px',
            border: `1px solid ${bgImage ? 'rgba(255,255,255,0.15)' : theme.borderColor}`,
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Background Image Layer with AI Filter & Dynamic Mask */}
          {bgImage && (
            <>
              <img
                src={bgImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300 pointer-events-none"
                style={{ filter: currentFilter }}
              />

              {/* Dynamic Overlay Mask for Text Legibility */}
              {overlayMode === 'dark-mask' && (
                <div 
                  className="absolute inset-0 bg-black pointer-events-none"
                  style={{ opacity: overlayOpacity / 100 }}
                />
              )}

              {overlayMode === 'bottom-gradient' && (
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none"
                />
              )}

              {overlayMode === 'glass-card' && (
                <div 
                  className="absolute inset-0 bg-black/30 pointer-events-none"
                />
              )}
            </>
          )}

          {/* Top Layer: Safe Zone Badge (Top 120px Area) */}
          <div className="relative z-10 flex items-center justify-between w-full mb-3">
            <div 
              style={{
                backgroundColor: bgImage ? 'rgba(0,0,0,0.6)' : theme.badgeBg,
                color: bgImage ? '#FFFFFF' : theme.badgeText,
                border: `1px solid ${bgImage ? 'rgba(255,255,255,0.3)' : `${theme.accent}40`}`,
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '9999px',
                backdropFilter: bgImage ? 'blur(8px)' : 'none',
                letterSpacing: '0.5px'
              }}
            >
              🏷️ {currentSlide.badge || '小红书精选专栏'}
            </div>

            <div 
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ 
                color: bgImage ? '#FFFFFF' : theme.textSub,
                backgroundColor: bgImage ? 'rgba(0,0,0,0.5)' : 'transparent',
                backdropFilter: bgImage ? 'blur(6px)' : 'none'
              }}
            >
              {currentSlideIndex + 1} / {slides.length || 1}
            </div>
          </div>

          {/* Center Layer: Dynamic Layout Rendering (Archetypes A ~ E) */}
          <div 
            className={`relative z-10 flex-1 flex flex-col justify-center my-auto ${
              bgImage && overlayMode === 'glass-card' 
                ? 'p-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl my-2' 
                : ''
            }`}
          >
            
            {/* Archetype A: 大字报核心观点型 */}
            {selectedLayoutId === 'A' && (
              <div className="flex flex-col gap-3.5">
                <h1 
                  style={{
                    fontSize: '27px',
                    lineHeight: '1.3',
                    fontWeight: '900',
                    letterSpacing: '-0.5px',
                    textShadow: bgImage ? '0 2px 12px rgba(0,0,0,0.8)' : 'none'
                  }}
                >
                  {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                </h1>

                {currentSlide.subTitle && (
                  <p 
                    style={{ 
                      fontSize: '13px', 
                      color: bgImage ? '#E2E8F0' : theme.textSub, 
                      lineHeight: '1.5', 
                      fontWeight: '500',
                      textShadow: bgImage ? '0 1px 6px rgba(0,0,0,0.7)' : 'none'
                    }}
                  >
                    {currentSlide.subTitle}
                  </p>
                )}

                {/* Key Points List */}
                <div 
                  className="mt-2 p-3.5 rounded-xl flex flex-col gap-2"
                  style={{ 
                    backgroundColor: bgImage ? 'rgba(0,0,0,0.4)' : theme.cardBg, 
                    border: `1px solid ${bgImage ? 'rgba(255,255,255,0.15)' : theme.borderColor}`,
                    backdropFilter: bgImage ? 'blur(6px)' : 'none'
                  }}
                >
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold leading-relaxed">
                      <span style={{ color: bgImage ? '#38BDF8' : theme.accent }}>▍</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Archetype B: 三段结构卡片型 (Default) */}
            {selectedLayoutId === 'B' && (
              <div className="flex flex-col gap-3.5">
                <div>
                  <h1 
                    style={{
                      fontSize: '25px',
                      lineHeight: '1.3',
                      fontWeight: '800',
                      letterSpacing: '-0.5px',
                      textShadow: bgImage ? '0 2px 12px rgba(0,0,0,0.8)' : 'none'
                    }}
                  >
                    {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                  </h1>
                  {currentSlide.subTitle && (
                    <p 
                      className="mt-1.5 text-xs font-medium" 
                      style={{ 
                        color: bgImage ? '#E2E8F0' : theme.textSub,
                        textShadow: bgImage ? '0 1px 6px rgba(0,0,0,0.7)' : 'none'
                      }}
                    >
                      💡 {currentSlide.subTitle}
                    </p>
                  )}
                </div>

                {/* Middle Floating Hero Card */}
                <div 
                  className="p-3.5 rounded-2xl shadow-sm flex flex-col gap-2 my-1"
                  style={{ 
                    backgroundColor: bgImage ? 'rgba(0,0,0,0.5)' : theme.cardBg, 
                    border: `1px solid ${bgImage ? 'rgba(255,255,255,0.2)' : theme.borderColor}`,
                    backdropFilter: bgImage ? 'blur(8px)' : 'none'
                  }}
                >
                  <div className="text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5" style={{ color: bgImage ? '#38BDF8' : theme.accent }}>
                    <Sparkles className="w-3.5 h-3.5" />
                    核心认知与实操要点
                  </div>
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <div 
                      key={idx} 
                      className="p-2.5 rounded-lg text-xs font-medium leading-relaxed"
                      style={{ 
                        backgroundColor: bgImage ? 'rgba(255,255,255,0.08)' : (selectedThemeId === 'oat' || selectedThemeId === 'healing' ? '#F8FAFC' : '#111827'),
                        borderLeft: `3px solid ${bgImage ? '#38BDF8' : theme.accent}`
                      }}
                    >
                      {pt}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Archetype C: 左右/前后对比型 (Before vs After) */}
            {selectedLayoutId === 'C' && (
              <div className="flex flex-col gap-3">
                <h1 style={{ fontSize: '23px', lineHeight: '1.3', fontWeight: '800', textShadow: bgImage ? '0 2px 10px rgba(0,0,0,0.8)' : 'none' }}>
                  {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                </h1>

                <div className="grid grid-cols-1 gap-2.5 mt-1">
                  <div 
                    className="p-3 rounded-xl border"
                    style={{ 
                      backgroundColor: bgImage ? 'rgba(69,10,10,0.7)' : (selectedThemeId === 'oat' ? '#FEF2F2' : '#450A0A'),
                      borderColor: '#EF4444',
                      backdropFilter: bgImage ? 'blur(6px)' : 'none'
                    }}
                  >
                    <div className="text-xs font-bold text-red-400 mb-1 flex items-center gap-1">
                      ❌ 常见误区 (坏示范)
                    </div>
                    <div className="text-xs text-slate-200 font-medium">
                      {(currentSlide.keyPoints && currentSlide.keyPoints[0]) || '直接向 AI 索要现成答案，放弃思考'}
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-xl border"
                    style={{ 
                      backgroundColor: bgImage ? 'rgba(5,46,22,0.7)' : (selectedThemeId === 'oat' ? '#F0FDF4' : '#052E16'),
                      borderColor: '#10B981',
                      backdropFilter: bgImage ? 'blur(6px)' : 'none'
                    }}
                  >
                    <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                      ✅ 破局解法 (大厂高效法)
                    </div>
                    <div className="text-xs text-slate-200 font-medium">
                      {(currentSlide.keyPoints && currentSlide.keyPoints[1]) || '启发式提问公式：角色 + 场景 + 引导反思'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Archetype D: 画中画悬浮浮岛型 */}
            {selectedLayoutId === 'D' && (
              <div className="flex flex-col gap-3 text-center">
                <div 
                  className="p-4 rounded-2xl shadow-xl"
                  style={{
                    backgroundColor: bgImage ? 'rgba(0,0,0,0.6)' : theme.cardBg,
                    border: `2px solid ${bgImage ? '#38BDF8' : theme.accent}`,
                    backdropFilter: 'blur(16px)'
                  }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ color: bgImage ? '#38BDF8' : theme.accent, backgroundColor: `${theme.accent}25` }}>
                    TOP PICK
                  </span>
                  <h1 className="text-2xl font-black mt-2 leading-snug">
                    {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                  </h1>
                  <p className="text-xs mt-1.5 font-medium opacity-90">
                    {currentSlide.subTitle}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm"
                      style={{ 
                        backgroundColor: bgImage ? 'rgba(0,0,0,0.6)' : `${theme.accent}15`, 
                        color: bgImage ? '#FFFFFF' : theme.accent,
                        border: bgImage ? '1px solid rgba(255,255,255,0.2)' : 'none'
                      }}
                    >
                      ✨ {pt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Archetype E: 序号索引清单型 */}
            {selectedLayoutId === 'E' && (
              <div className="flex flex-col gap-2.5">
                <h1 style={{ fontSize: '23px', fontWeight: '900', lineHeight: '1.3', textShadow: bgImage ? '0 2px 10px rgba(0,0,0,0.8)' : 'none' }}>
                  {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                </h1>
                <p className="text-xs font-medium opacity-90">
                  📌 {currentSlide.subTitle}
                </p>

                <div className="flex flex-col gap-2 mt-1">
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl flex items-center gap-2.5 text-xs font-semibold"
                      style={{ 
                        backgroundColor: bgImage ? 'rgba(0,0,0,0.5)' : theme.cardBg, 
                        border: `1px solid ${bgImage ? 'rgba(255,255,255,0.2)' : theme.borderColor}`,
                        backdropFilter: bgImage ? 'blur(6px)' : 'none'
                      }}
                    >
                      <span 
                        className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-[10px]"
                        style={{ backgroundColor: bgImage ? '#38BDF8' : theme.accent }}
                      >
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Layer: Creator Identity & Xiaohongshu Safe Area Indicator */}
          <div 
            className="relative z-10 pt-3 border-t flex items-center justify-between text-[11px]" 
            style={{ 
              color: bgImage ? 'rgba(255,255,255,0.8)' : theme.textSub,
              borderColor: bgImage ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'
            }}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bgImage ? '#38BDF8' : theme.accent }} />
              <span>{authorName} · 私人创作大脑</span>
            </div>
            <div className="text-[10px] font-mono opacity-75">
              3:4 1080×1440
            </div>
          </div>

        </div>

        {/* Slide Deck Pagination Switcher */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx 
                    ? 'bg-[#ff2442] w-5' 
                    : 'bg-slate-700 hover:bg-slate-500 w-2'
                }`}
                title={`第 ${idx + 1} 页`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
