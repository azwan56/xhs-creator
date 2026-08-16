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
  Edit3, 
  Copy,
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

export default function CardCanvasRenderer({
  slides = [],
  onUpdateSlide,
  initialTheme = 'oat',
  initialLayout = 'B'
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(initialTheme);
  const [selectedLayoutId, setSelectedLayoutId] = useState(initialLayout);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const cardRef = useRef(null);
  const theme = CARD_THEMES[selectedThemeId] || CARD_THEMES.oat;

  const currentSlide = slides[currentSlideIndex] || {
    badge: '大厂妈妈育儿实录 #18',
    mainTitle: '不要再禁止孩子用 AI 了！',
    highlightKeywords: '禁止孩子用 AI',
    subTitle: '未来10年拉开差距的，从来不是刷题量，而是「提问力」',
    keyPoints: ['大厂高管思维带娃', '3个启发式提问指令', '从被动作弊到主动思考']
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
            color: theme.accent, 
            backgroundColor: selectedThemeId === 'oat' || selectedThemeId === 'healing' ? `${theme.accent}15` : `${theme.accent}25`,
            padding: '2px 8px',
            borderRadius: '6px',
            margin: '0 2px'
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
        pixelRatio: 3 // High resolution 1080x1440 equivalent
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
        // Wait for DOM render
        await new Promise(r => setTimeout(r, 150));
        if (cardRef.current) {
          const dataUrl = await toPng(cardRef.current, { pixelRatio: 2.5 });
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          zip.file(`小红书轮播图_第${i + 1}页_${slides[i].slideType || 'card'}.png`, base64Data, { base64: true });
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

  return (
    <div className="flex flex-col gap-5">
      {/* Control Bar: Theme & Layout Pickers */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">配色质感:</span>
            <select
              value={selectedThemeId}
              onChange={(e) => setSelectedThemeId(e.target.value)}
              className="bg-slate-900 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              {Object.values(CARD_THEMES).map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Layout Selector */}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">封面版型:</span>
            <select
              value={selectedLayoutId}
              onChange={(e) => setSelectedLayoutId(e.target.value)}
              className="bg-slate-900 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              {LAYOUT_TYPES.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSinglePng}
            disabled={isExporting}
            className="btn-secondary text-xs py-1.5 px-3"
          >
            <Download className="w-3.5 h-3.5" />
            导出当前页 PNG
          </button>

          <button
            onClick={handleExportAllZip}
            disabled={isExporting}
            className="btn-xhs text-xs py-1.5 px-3 shadow-sm"
          >
            {exportSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                已打包完成！
              </>
            ) : (
              <>
                <Package className="w-3.5 h-3.5" />
                一键打包下载全部图集 ({slides.length || 1}张)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Display with 3:4 Aspect Ratio */}
      <div className="flex flex-col items-center">
        
        {/* The 3:4 Container Element */}
        <div 
          ref={cardRef}
          className="card-canvas-3-4 select-none"
          style={{
            backgroundColor: theme.bg,
            color: theme.textMain,
            padding: '36px 30px 48px 30px', // Strict Safe Zone margins (Bottom 180px safe area compensated visually)
            border: `1px solid ${theme.borderColor}`,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)'
          }}
        >
          {/* Layer 4: Top Safe Zone (Top 120px area) - Badge & Series Meta */}
          <div className="flex items-center justify-between w-full mb-4">
            <div 
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.badgeText,
                border: `1px solid ${theme.accent}40`,
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '9999px',
                letterSpacing: '0.5px'
              }}
            >
              🏷️ {currentSlide.badge || '小红书精选专栏'}
            </div>

            <div style={{ fontSize: '11px', color: theme.textSub, fontWeight: '600' }}>
              {currentSlideIndex + 1} / {slides.length || 1}
            </div>
          </div>

          {/* Dynamic Layout Rendering (Archetypes A ~ E) */}
          <div className="flex-1 flex flex-col justify-center my-auto">
            
            {/* Archetype A: 大字报核心观点型 */}
            {selectedLayoutId === 'A' && (
              <div className="flex flex-col gap-4">
                <h1 
                  style={{
                    fontSize: '28px',
                    lineHeight: '1.3',
                    fontWeight: '900',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                </h1>

                {currentSlide.subTitle && (
                  <p style={{ fontSize: '14px', color: theme.textSub, lineHeight: '1.5', fontWeight: '500' }}>
                    {currentSlide.subTitle}
                  </p>
                )}

                {/* Key Points List */}
                <div 
                  className="mt-3 p-4 rounded-xl flex flex-col gap-2.5"
                  style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
                >
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold">
                      <span style={{ color: theme.accent }}>▍</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Archetype B: 三段结构卡片型 (Default) */}
            {selectedLayoutId === 'B' && (
              <div className="flex flex-col gap-4">
                <div>
                  <h1 
                    style={{
                      fontSize: '25px',
                      lineHeight: '1.3',
                      fontWeight: '800',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                  </h1>
                  {currentSlide.subTitle && (
                    <p className="mt-1.5 text-xs font-medium" style={{ color: theme.textSub }}>
                      💡 {currentSlide.subTitle}
                    </p>
                  )}
                </div>

                {/* Middle Floating Hero Card */}
                <div 
                  className="p-4 rounded-2xl shadow-sm flex flex-col gap-2.5 my-2"
                  style={{ 
                    backgroundColor: theme.cardBg, 
                    border: `1px solid ${theme.borderColor}`,
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)'
                  }}
                >
                  <div className="text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5" style={{ color: theme.accent }}>
                    <Sparkles className="w-3.5 h-3.5" />
                    核心认知与实操要点
                  </div>
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <div 
                      key={idx} 
                      className="p-2.5 rounded-lg text-xs font-medium leading-relaxed"
                      style={{ 
                        backgroundColor: selectedThemeId === 'oat' || selectedThemeId === 'healing' ? '#F8FAFC' : '#111827',
                        borderLeft: `3px solid ${theme.accent}`
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
                <h1 style={{ fontSize: '24px', lineHeight: '1.3', fontWeight: '800' }}>
                  {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                </h1>

                <div className="grid grid-cols-1 gap-2.5 mt-2">
                  {/* Bad Practice */}
                  <div 
                    className="p-3.5 rounded-xl border"
                    style={{ 
                      backgroundColor: selectedThemeId === 'oat' ? '#FEF2F2' : '#450A0A',
                      borderColor: '#EF4444'
                    }}
                  >
                    <div className="text-xs font-bold text-red-500 mb-1 flex items-center gap-1">
                      ❌ 常见误区 (坏示范)
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {(currentSlide.keyPoints && currentSlide.keyPoints[0]) || '直接向 AI 索要现成答案，放弃思考'}
                    </div>
                  </div>

                  {/* Smart Solution */}
                  <div 
                    className="p-3.5 rounded-xl border"
                    style={{ 
                      backgroundColor: selectedThemeId === 'oat' ? '#F0FDF4' : '#052E16',
                      borderColor: '#10B981'
                    }}
                  >
                    <div className="text-xs font-bold text-emerald-500 mb-1 flex items-center gap-1">
                      ✅ 破局解法 (大厂高效法)
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {(currentSlide.keyPoints && currentSlide.keyPoints[1]) || '启发式提问公式：角色 + 场景 + 引导反思'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Archetype D: 画中画悬浮浮岛型 */}
            {selectedLayoutId === 'D' && (
              <div className="flex flex-col gap-4">
                <div 
                  className="p-5 rounded-2xl text-center shadow-lg"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `2px solid ${theme.accent}`,
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ color: theme.accent, backgroundColor: `${theme.accent}20` }}>
                    TOP PICK
                  </span>
                  <h1 className="text-2xl font-black mt-2 leading-snug">
                    {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                  </h1>
                  <p className="text-xs mt-2 font-medium" style={{ color: theme.textSub }}>
                    {currentSlide.subTitle}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
                    >
                      ✨ {pt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Archetype E: 序号索引清单型 */}
            {selectedLayoutId === 'E' && (
              <div className="flex flex-col gap-3">
                <h1 style={{ fontSize: '24px', fontWeight: '900', lineHeight: '1.3' }}>
                  {renderHighlightedTitle(currentSlide.mainTitle, currentSlide.highlightKeywords)}
                </h1>
                <p className="text-xs font-medium" style={{ color: theme.textSub }}>
                  📌 {currentSlide.subTitle}
                </p>

                <div className="flex flex-col gap-2 mt-2">
                  {(currentSlide.keyPoints || []).map((pt, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl flex items-center gap-3 text-xs font-semibold"
                      style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
                    >
                      <span 
                        className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-[11px]"
                        style={{ backgroundColor: theme.accent }}
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

          {/* Bottom Area: Creator Identity & Xiaohongshu Safe Zone Indicator */}
          <div className="pt-4 border-t border-current/10 flex items-center justify-between text-[11px]" style={{ color: theme.textSub }}>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
              知性科技博主 · 私人创作大脑
            </div>
            <div className="text-[10px] font-mono opacity-60">
              3:4 1080×1440
            </div>
          </div>
        </div>

        {/* Slide Deck Pagination Switcher */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx 
                    ? 'bg-[#ff2442] w-6' 
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`第 ${idx + 1} 页`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
