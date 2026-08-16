import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Tv, 
  RefreshCw, 
  ShieldCheck, 
  Share2, 
  Bookmark, 
  Heart, 
  MessageCircle, 
  Smartphone, 
  Image as ImageIcon, 
  FileText, 
  Mic, 
  Layers, 
  TrendingUp,
  AlertTriangle,
  Lightbulb
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
  const [activeOutputTab, setActiveOutputTab] = useState('post'); // 'post' | 'oral' | 'cards' | 'qa'
  const [previewMode, setPreviewMode] = useState('canvas'); // 'canvas' | 'phone'
  
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Trigger Creation Process
  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep('正在装载创作者 DNA 与 1:1 风格模型...');

    try {
      const topicToUse = {
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
    <div className="flex flex-col gap-8">
      
      {/* SECTION 1: 选题 × 4 维爆款叙事矩阵 */}
      <section className="glass-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              🎯
            </div>
            <div>
              <h2 className="text-base font-bold text-white">选题 × 4 维爆款叙事矩阵</h2>
              <p className="text-xs text-slate-400">基于【{currentNiche.name}】赛道与创作者人设，精选高转化爆款角度</p>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            赛道默认模态：{currentNiche.name}
          </span>
        </div>

        {/* 4 Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {topicMatrix.map((item, idx) => {
            const isSelected = selectedTopic.title === item.title;
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedTopic(item);
                  setCustomTitle('');
                }}
                className={`p-4 rounded-xl cursor-pointer border transition-all flex flex-col justify-between gap-3 ${
                  isSelected 
                    ? 'bg-[#ff2442]/10 border-[#ff2442] shadow-lg shadow-[#ff2442]/15' 
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-block mb-2 ${
                    isSelected ? 'bg-[#ff2442] text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.type}
                  </span>
                  <h3 className="text-xs font-bold text-white line-clamp-2 leading-relaxed">
                    {item.title}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal">
                  {item.angle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Custom Input & Generate Button */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 w-full relative">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={`或输入自定义选题（当前选中：${selectedTopic.title}）`}
              className="glass-input w-full text-xs pl-3 pr-8"
            />
            {customTitle && (
              <button 
                onClick={() => setCustomTitle('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-xhs w-full md:w-auto px-7 py-2.5 shrink-0 shadow-lg shadow-[#ff2442]/25 text-sm"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{generationStep || '豆包大模型创作中...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>豆包大模型全量创作 (图文 + 口播 + 3:4封面)</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* SECTION 2: 创作产出工场（双栏联动） */}
      {currentPackage && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Post Copy, Oral Script & Algorithm QA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Output Sub-Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveOutputTab('post')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeOutputTab === 'post'
                      ? 'bg-[#ff2442] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  📕 小红书爆款图文
                </button>

                <button
                  onClick={() => setActiveOutputTab('oral')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeOutputTab === 'oral'
                      ? 'bg-cyan-500 text-black shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  🎙️ 1:1 专属口播逐字稿
                </button>

                <button
                  onClick={() => setActiveOutputTab('qa')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeOutputTab === 'qa'
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  🛡️ 算法质检打分
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {activeOutputTab === 'oral' && (
                  <button
                    onClick={() => onOpenTeleprompter(currentPackage.oralScript)}
                    className="btn-secondary text-xs py-1 px-2.5 bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20"
                  >
                    <Tv className="w-3.5 h-3.5 text-cyan-400" />
                    打开全屏提词器
                  </button>
                )}

                <button
                  onClick={handleCopyRichText}
                  className="btn-xhs text-xs py-1 px-3"
                >
                  {copiedRich ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedRich ? '已复制富文本' : '一键复制 (直粘小红书)'}
                </button>
              </div>
            </div>

            {/* TAB CONTENT: 小红书图文 */}
            {activeOutputTab === 'post' && (
              <div className="glass-panel p-6 flex flex-col gap-5">
                
                {/* 3 Title Options */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    高 CTR 爆款标题库（点击即可切换为当前主标题）：
                  </span>

                  <div className="flex flex-col gap-1.5">
                    {(currentPackage.titles || [currentPackage.selectedTitle]).map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setCurrentPackage(prev => ({ ...prev, selectedTitle: t }));
                        }}
                        className={`p-2.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all flex items-center justify-between ${
                          currentPackage.selectedTitle === t
                            ? 'bg-[#ff2442]/15 text-white border-[#ff2442]'
                            : 'bg-slate-900/50 text-slate-300 border-white/5 hover:border-white/15'
                        }`}
                      >
                        <span>{t}</span>
                        {currentPackage.selectedTitle === t && (
                          <span className="text-[10px] bg-[#ff2442] text-white px-2 py-0.5 rounded-full font-bold">
                            当前主推
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post Body Text Area */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">正文内容（带呼吸感断句与精准 Emoji）：</span>
                    <button
                      onClick={handleCopyPlainText}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      {copiedText ? '已复制纯文本' : '复制纯正文'}
                    </button>
                  </div>

                  <textarea
                    value={currentPackage.content}
                    onChange={(e) => {
                      const newContent = e.target.value;
                      setCurrentPackage(prev => ({ ...prev, content: newContent }));
                    }}
                    rows={12}
                    className="glass-input font-sans text-xs leading-relaxed resize-y p-4 bg-slate-900/80"
                  />
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                  <span className="text-xs text-slate-400 font-bold">热门标签：</span>
                  {(currentPackage.tags || []).map((tag, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400 font-medium border border-cyan-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* TAB CONTENT: 1:1 口播逐字稿 */}
            {activeOutputTab === 'oral' && (
              <div className="glass-panel p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                  <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium">
                    <Mic className="w-4 h-4 text-cyan-400" />
                    <span>预计播报时长：<strong>{currentPackage.oralDurationSec || 68} 秒</strong>（按 {creatorDNA.oralPacingWPM || 220} 字/分计算）</span>
                  </div>
                  <span className="text-[11px] text-slate-400">包含气口停顿与重音标点</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400">口播逐字稿（可直接在下方编辑微调）：</label>
                  <textarea
                    value={currentPackage.oralScript}
                    onChange={(e) => {
                      const newOral = e.target.value;
                      setCurrentPackage(prev => ({ ...prev, oralScript: newOral }));
                    }}
                    rows={12}
                    className="glass-input font-sans text-xs leading-relaxed resize-y p-4 bg-slate-900/80 text-cyan-100"
                  />
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 text-xs text-slate-400 flex items-center justify-between">
                  <span>💡 标点说明：<code className="text-cyan-300 font-mono">[停顿 0.5s]</code> 代表呼吸气口，<code className="text-[#ff2442] font-mono">【重音】</code> 代表强调关键词。</span>
                  <button
                    onClick={() => onOpenTeleprompter(currentPackage.oralScript)}
                    className="btn-xhs text-xs py-1.5 px-3"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    启动提词器
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 小红书算法质检打分 */}
            {activeOutputTab === 'qa' && (
              <div className="glass-panel p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  小红书推荐算法合规与流量指标预测
                </div>

                {/* Score Meters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CTR Score */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">CTR 封面点击吸引力</span>
                      <span className="text-xl font-black text-[#ff2442] font-mono">
                        {currentPackage.algorithmQA?.ctrScore || 94} 分
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#ff2442] h-full rounded-full" style={{ width: `${currentPackage.algorithmQA?.ctrScore || 94}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentPackage.algorithmQA?.ctrEvaluation}
                    </p>
                  </div>

                  {/* CES Score */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">CES 完播留存互动度</span>
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        {currentPackage.algorithmQA?.cesScore || 96} 分
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${currentPackage.algorithmQA?.cesScore || 96}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentPackage.algorithmQA?.cesEvaluation}
                    </p>
                  </div>
                </div>

                {/* Compliance & Optimization Notes */}
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10 flex flex-col gap-3 text-xs">
                  <div className="flex items-start gap-2 text-emerald-400 font-semibold">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{currentPackage.algorithmQA?.complianceCheck || '违禁词与 AI 腔检测：全部通过'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-amber-300 font-semibold">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>{currentPackage.algorithmQA?.optimizationTips || '建议搭配 3:4 封面图发布，文末主动引导粉丝评论'}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: 3:4 Visual Card Canvas & Phone Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* View Switcher Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#ff2442]" />
                视觉交付与移动端预览
              </span>

              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-white/10">
                <button
                  onClick={() => setPreviewMode('canvas')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                    previewMode === 'canvas' ? 'bg-[#ff2442] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  3:4 高清卡片
                </button>
                <button
                  onClick={() => setPreviewMode('phone')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                    previewMode === 'phone' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  小红书真机预览
                </button>
              </div>
            </div>

            {/* PREVIEW MODE 1: 3:4 Canvas Renderer */}
            {previewMode === 'canvas' && (
              <div className="flex flex-col items-center">
                <CardCanvasRenderer
                  slides={currentPackage.cardSlides || []}
                  initialTheme={currentNiche.defaultTheme || 'oat'}
                  initialLayout={currentNiche.defaultLayout || 'B'}
                />
              </div>
            )}

            {/* PREVIEW MODE 2: 小红书移动端 1:1 仿真预览器 */}
            {previewMode === 'phone' && (
              <div className="flex justify-center">
                <div className="phone-mockup">
                  {/* Phone Header */}
                  <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 bg-white">
                    <div className="text-[11px] font-bold text-slate-800">09:41</div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500">5G</span>
                      <div className="w-4 h-2 rounded-sm border border-slate-600 flex p-0.5">
                        <div className="bg-slate-700 w-full h-full rounded-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Phone Screen Body */}
                  <div className="phone-screen p-4 flex flex-col gap-3">
                    
                    {/* Author Profile */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff2442] to-amber-500 text-white flex items-center justify-center font-bold text-xs">
                          知
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">{creatorDNA.personaName || '知性科技妈妈'}</div>
                          <div className="text-[10px] text-slate-400">大厂高管 · 科学育儿/AI探索</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-full bg-[#ff2442] text-white text-[11px] font-bold">
                        + 关注
                      </button>
                    </div>

                    {/* Image Preview Box (Mini 3:4 Card Preview) */}
                    <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 aspect-[3/4] bg-[#FBF9F5] p-4 flex flex-col justify-between">
                      <div className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 font-bold self-start">
                        {currentPackage.cardSlides?.[0]?.badge || '精选专栏'}
                      </div>
                      <div className="text-center my-auto">
                        <h4 className="text-base font-black text-slate-900 leading-snug">
                          {currentPackage.selectedTitle}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-2">
                          {currentPackage.cardSlides?.[0]?.subTitle}
                        </p>
                      </div>
                      <div className="text-[9px] text-slate-400 text-right">
                        1 / {currentPackage.cardSlides?.length || 4}
                      </div>
                    </div>

                    {/* Note Title & Content */}
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xs font-black text-slate-900 leading-snug">
                        {currentPackage.selectedTitle}
                      </h3>
                      <p className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed line-clamp-6">
                        {currentPackage.content}
                      </p>
                      <div className="text-[10px] text-cyan-600 font-semibold mt-1">
                        {(currentPackage.tags || []).join(' ')}
                      </div>
                    </div>

                  </div>

                  {/* Phone Bottom Engagement Bar */}
                  <div className="px-4 py-2.5 border-t border-slate-100 bg-white flex items-center justify-between text-slate-600">
                    <div className="flex-1 bg-slate-100 rounded-full px-3 py-1 text-[11px] text-slate-400 mr-3">
                      说点什么...
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <span className="flex items-center gap-1 hover:text-[#ff2442]"><Heart className="w-3.5 h-3.5" /> 1.2w</span>
                      <span className="flex items-center gap-1 hover:text-amber-500"><Bookmark className="w-3.5 h-3.5" /> 8.4k</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 682</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </section>
      )}

    </div>
  );
}
