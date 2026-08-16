import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Tv, 
  RefreshCw, 
  ShieldCheck, 
  FileText, 
  Mic, 
  Layers, 
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Share2,
  Sliders,
  Award
} from 'lucide-react';
import CardCanvasRenderer from './CardCanvasRenderer';
import { generateCreationPackage } from '../services/doubaoService';

export default function StudioCreation({
  currentNiche,
  creatorDNA,
  apiKey,
  endpointId,
  modelName,
  topicMatrix = [],
  onOpenTeleprompter,
  currentPackage,
  setCurrentPackage
}) {
  const [selectedTopic, setSelectedTopic] = useState(topicMatrix[0] || {
    type: '💥 认知颠覆型',
    title: '不要再禁止孩子用 AI 了！未来10年拉开差距的不是刷题，是提问能力',
    angle: '打破传统家长把 AI 当作作弊工具的偏见，树立提问力才是核心竞争力的大厂全局观。',
    suitableLayout: 'B'
  });

  const [customTitle, setCustomTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [activeOutputTab, setActiveOutputTab] = useState('post'); // 'post' | 'oral' | 'qa'
  const [showFullMatrix, setShowFullMatrix] = useState(false);
  
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Trigger Creation Process
  const handleGenerate = async (topicOverride) => {
    setIsGenerating(true);
    setGenerationStep('正在装载创作者 DNA 与 1:1 风格模型...');

    try {
      const topicToUse = topicOverride || {
        title: customTitle.trim() || selectedTopic.title,
        angle: selectedTopic.angle || '爆款高点击'
      };

      const result = await generateCreationPackage({
        niche: currentNiche,
        topic: topicToUse,
        creatorDNA,
        apiKey,
        endpointId,
        modelName,
        onProgress: (msg) => setGenerationStep(msg)
      });

      setCurrentPackage(result);
    } catch (e) {
      console.error(e);
      alert('生成过程出错，请重试');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Copy Rich Text
  const handleCopyRichText = () => {
    if (!currentPackage) return;
    const richContent = `【${currentPackage.selectedTitle}】\n\n${currentPackage.content}\n\n${currentPackage.tags.join(' ')}`;
    navigator.clipboard.writeText(richContent);
    setCopiedRich(true);
    setTimeout(() => setCopiedRich(false), 2000);
  };

  // Copy Plain Text
  const handleCopyPlainText = () => {
    if (!currentPackage) return;
    navigator.clipboard.writeText(currentPackage.content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      
      {/* 1. TOP ELEGANT TOPIC & INSPIRATION BAR */}
      <section className="glass-panel p-6 border border-white/[0.08] relative overflow-hidden">
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#ff2442]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-4">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff2442] animate-pulse" />
              <h2 className="text-base font-bold text-white tracking-tight">
                灵感选题与叙事引擎
              </h2>
              <span className="text-xs text-slate-400 font-normal">
                （当前赛道：<strong className="text-slate-200">{currentNiche.name}</strong>）
              </span>
            </div>

            <button
              onClick={() => setShowFullMatrix(!showFullMatrix)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 self-start sm:self-auto transition-colors"
            >
              <span>{showFullMatrix ? '收起选题矩阵' : '展开精选 4 维爆款选题'}</span>
              {showFullMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Quick Pill Selector for 4 Angles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {topicMatrix.map((item, idx) => {
              const isSelected = selectedTopic.title === item.title;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedTopic(item);
                    setCustomTitle('');
                  }}
                  className={`p-3 rounded-xl cursor-pointer border transition-all duration-200 flex flex-col justify-between gap-1.5 ${
                    isSelected 
                      ? 'bg-[#ff2442]/10 border-[#ff2442] shadow-sm shadow-[#ff2442]/20' 
                      : 'bg-slate-900/60 border-white/[0.06] hover:border-white/20 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-[#ff2442] text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.type}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#ff2442]" />}
                  </div>
                  <h4 className="text-xs font-semibold text-white line-clamp-1 leading-snug">
                    {item.title}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Collapsible Detailed Topic Cards */}
          {showFullMatrix && (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06] flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold text-slate-300">当前选中选题深度拆解：</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                • <strong>核心标题：</strong>{selectedTopic.title}<br />
                • <strong>破题切角：</strong>{selectedTopic.angle}<br />
                • <strong>适配视觉版型：</strong>版型 {selectedTopic.suitableLayout || 'B'}（三段式结构化）
              </p>
            </div>
          )}

          {/* Input & 1-Click Action Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="flex-1 w-full relative">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder={`输入自定义想法，或直接使用当前选题：《${selectedTopic.title}》`}
                className="glass-input w-full text-sm pl-4 pr-10 py-3"
              />
              {customTitle && (
                <button 
                  onClick={() => setCustomTitle('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="btn-xhs w-full sm:w-auto px-8 py-3 shrink-0 text-sm font-bold tracking-wide"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{generationStep || '豆包大模型全速创作中...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>一键生成全套方案 (图文+口播+3:4封面)</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* 2. MAIN CREATIVE WORKSPACE (ELEGANT DUAL-PANE) */}
      {currentPackage && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Post Copy, Oral Script & Algorithm QA (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Output Sub-Tabs Bar */}
            <div className="glass-panel p-2 flex items-center justify-between gap-2 border border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveOutputTab('post')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeOutputTab === 'post'
                      ? 'bg-[#ff2442] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>小红书图文</span>
                </button>

                <button
                  onClick={() => setActiveOutputTab('oral')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeOutputTab === 'oral'
                      ? 'bg-cyan-500 text-black shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>1:1 口播逐字稿</span>
                </button>

                <button
                  onClick={() => setActiveOutputTab('qa')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeOutputTab === 'qa'
                      ? 'bg-emerald-500 text-black shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>算法质检</span>
                </button>
              </div>

              {/* Quick Action Button */}
              {activeOutputTab === 'oral' ? (
                <button
                  onClick={() => onOpenTeleprompter(currentPackage.oralScript)}
                  className="btn-secondary text-xs py-1.5 px-3 bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
                >
                  <Tv className="w-3.5 h-3.5 text-cyan-400" />
                  <span>提词器</span>
                </button>
              ) : (
                <button
                  onClick={handleCopyRichText}
                  className="btn-xhs text-xs py-1.5 px-3"
                >
                  {copiedRich ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRich ? '已复制' : '复制图文'}</span>
                </button>
              )}
            </div>

            {/* TAB 1: 小红书图文文案 */}
            {activeOutputTab === 'post' && (
              <div className="glass-panel p-6 flex flex-col gap-6 border border-white/[0.08]">
                
                {/* 3 Clickable Title Options */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    备选高 CTR 爆款标题（点击即可选用）：
                  </span>

                  <div className="flex flex-col gap-2">
                    {(currentPackage.titles || [currentPackage.selectedTitle]).map((t, idx) => {
                      const isSelected = currentPackage.selectedTitle === t;
                      return (
                        <div
                          key={idx}
                          onClick={() => setCurrentPackage(prev => ({ ...prev, selectedTitle: t }))}
                          className={`p-3 rounded-xl text-xs font-semibold cursor-pointer border transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-[#ff2442]/15 text-white border-[#ff2442] shadow-sm'
                              : 'bg-slate-900/60 text-slate-300 border-white/[0.06] hover:border-white/20'
                          }`}
                        >
                          <span className="line-clamp-1">{t}</span>
                          {isSelected && (
                            <span className="text-[10px] bg-[#ff2442] text-white px-2 py-0.5 rounded-full font-bold shrink-0">
                              主推
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Post Body (Clean & Comfortable Reading Experience) */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">正文内容（带呼吸感断句与人设节奏）：</span>
                    <button
                      onClick={handleCopyPlainText}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedText ? '已复制纯文本' : '复制纯正文'}
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] text-[14px] text-slate-200 whitespace-pre-line leading-relaxed max-h-[460px] overflow-y-auto font-normal">
                    {currentPackage.content}
                  </div>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                  {(currentPackage.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 2: 1:1 口播逐字稿 */}
            {activeOutputTab === 'oral' && (
              <div className="glass-panel p-6 flex flex-col gap-5 border border-cyan-500/20 bg-cyan-950/5">
                
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-cyan-500/30 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-slate-300 font-semibold">1:1 私人定制口播流</span>
                  </div>
                  <div className="text-slate-400 font-mono">
                    预估时长：<strong className="text-cyan-300">{currentPackage.oralDurationSec || 65}秒</strong>（约 {creatorDNA.oralPacingWPM || 220} 字/分）
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] text-[14px] text-slate-200 whitespace-pre-line leading-relaxed max-h-[460px] overflow-y-auto">
                  {currentPackage.oralScript}
                </div>

                <button
                  onClick={() => onOpenTeleprompter(currentPackage.oralScript)}
                  className="btn-xhs w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20 text-sm"
                >
                  <Tv className="w-4 h-4" />
                  立即启动全屏专业口播提词器
                </button>
              </div>
            )}

            {/* TAB 3: 算法质检报告 */}
            {activeOutputTab === 'qa' && (
              <div className="glass-panel p-6 flex flex-col gap-5 border border-emerald-500/20 bg-emerald-950/5">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06] flex flex-col gap-1">
                    <span className="text-xs text-slate-400">CTR 封面点击预测</span>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {currentPackage.algorithmQA?.ctrScore || 95} / 100
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06] flex flex-col gap-1">
                    <span className="text-xs text-slate-400">CES 完播与互动留存</span>
                    <div className="text-2xl font-black text-cyan-400 font-mono">
                      {currentPackage.algorithmQA?.cesScore || 96} / 100
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-xs text-slate-300">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <strong className="text-amber-300 block mb-1">🔥 封面与开篇抓手评估：</strong>
                    {currentPackage.algorithmQA?.ctrEvaluation}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <strong className="text-cyan-300 block mb-1">✨ 留存与完播体验：</strong>
                    {currentPackage.algorithmQA?.cesEvaluation}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                    <strong className="text-emerald-300 block mb-1">✅ 合规与去 AI 腔校验：</strong>
                    {currentPackage.algorithmQA?.complianceCheck}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: 3:4 Visual Card Canvas Studio (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <CardCanvasRenderer
              slides={currentPackage.cardSlides || []}
              selectedTitle={currentPackage.selectedTitle}
              authorName={creatorDNA.personaName || '大厂知性妈妈'}
            />
          </div>

        </section>
      )}

    </div>
  );
}
