import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Type, 
  Gauge, 
  Eye, 
  Clock,
  Sparkles
} from 'lucide-react';

export default function TeleprompterModal({
  isOpen,
  onClose,
  scriptText = '',
  wpm = 220
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2); // 1 to 5
  const [fontSize, setFontSize] = useState(36); // px
  const [countdown, setCountdown] = useState(null);
  
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Format oral text with highlights for [停顿] and 【重音】
  const formattedLines = (scriptText || '暂无口播脚本内容，请在创作工场中先生成口播逐字稿。')
    .split('\n')
    .filter(line => line.trim().length > 0);

  // Spacebar toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

  // Smooth scroll loop
  useEffect(() => {
    if (isPlaying && scrollContainerRef.current) {
      const scroll = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += scrollSpeed * 0.75;
          // Loop or stop if reached bottom
          if (
            scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
            scrollContainerRef.current.scrollHeight - 10
          ) {
            setIsPlaying(false);
            return;
          }
        }
        animationFrameRef.current = requestAnimationFrame(scroll);
      };
      animationFrameRef.current = requestAnimationFrame(scroll);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, scrollSpeed]);

  const togglePlay = () => {
    if (!isPlaying) {
      // 3s countdown before start
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsPlaying(true);
            return null;
          }
          return prev - 1;
        });
      }, 700);
    } else {
      setIsPlaying(false);
      setCountdown(null);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCountdown(null);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col text-white backdrop-blur-2xl select-none">
      {/* Top Floating Control Bar */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff2442] flex items-center justify-center font-black text-sm">
            播
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">1:1 专属口播智能提词器</h2>
            <p className="text-[11px] text-slate-400">支持空格键暂停/开始 · 语速参考：{wpm} 字/分</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Speed Adjust */}
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">滚速:</span>
            <input 
              type="range" 
              min="1" 
              max="6" 
              step="0.5"
              value={scrollSpeed} 
              onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
              className="w-20 accent-[#ff2442] cursor-pointer"
            />
            <span className="font-mono text-cyan-400">{scrollSpeed}x</span>
          </div>

          {/* Font Size Adjust */}
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs">
            <Type className="w-4 h-4 text-amber-400" />
            <button 
              onClick={() => setFontSize(prev => Math.max(24, prev - 4))}
              className="hover:text-white text-slate-300 px-1 font-bold"
            >
              -
            </button>
            <span className="font-mono text-amber-400">{fontSize}px</span>
            <button 
              onClick={() => setFontSize(prev => Math.min(64, prev + 4))}
              className="hover:text-white text-slate-300 px-1 font-bold"
            >
              +
            </button>
          </div>

          {/* Reset */}
          <button 
            onClick={handleReset}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
            title="重置到顶部"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className={`px-5 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
              isPlaying 
                ? 'bg-amber-500 text-black hover:bg-amber-400' 
                : 'bg-[#ff2442] text-white hover:bg-[#ff3b56]'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? '暂停' : '开始滚动'}
          </button>

          {/* Close */}
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition-all ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm pointer-events-none">
          <div className="text-9xl font-black text-[#ff2442] animate-ping font-mono">
            {countdown}
          </div>
        </div>
      )}

      {/* Focus Eyeline Indicator (Center Guide) */}
      <div className="absolute top-1/2 left-0 right-0 h-16 -translate-y-1/2 border-y border-[#ff2442]/30 bg-[#ff2442]/5 pointer-events-none z-10 flex items-center justify-between px-8">
        <span className="text-[10px] uppercase font-mono text-[#ff2442] tracking-widest">
          ◀ 视线黄金聚焦行
        </span>
        <span className="text-[10px] uppercase font-mono text-[#ff2442] tracking-widest">
          视线黄金聚焦行 ▶
        </span>
      </div>

      {/* Main Teleprompter Text Canvas */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-8 md:px-32 lg:px-48 py-48 text-center scroll-smooth no-scrollbar"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-8 font-medium">
          {formattedLines.map((line, idx) => {
            // Render styled tokens for [停顿] and 【重音】
            let rendered = line;
            return (
              <p key={idx} className="transition-all tracking-wide text-slate-100 font-sans">
                {line.split(/(\[停顿.*?\]|【.*?】|\(.*?\))/g).map((part, pIdx) => {
                  if (part.startsWith('[停顿')) {
                    return (
                      <span key={pIdx} className="inline-block px-2 py-0.5 mx-1.5 rounded bg-cyan-500/20 text-cyan-300 text-[0.6em] font-mono border border-cyan-500/40 align-middle">
                        ⏳ {part.replace(/[\[\]]/g, '')}
                      </span>
                    );
                  } else if (part.startsWith('【')) {
                    return (
                      <span key={pIdx} className="text-[#ff2442] font-black underline decoration-2 underline-offset-8 px-1">
                        {part}
                      </span>
                    );
                  } else if (part.startsWith('(') && part.endsWith(')')) {
                    return (
                      <span key={pIdx} className="text-amber-400 text-[0.65em] font-normal italic mx-1">
                        {part}
                      </span>
                    );
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
