import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Lock, 
  Sparkles, 
  RotateCcw, 
  Check, 
  GitBranch, 
  Award,
  Zap
} from 'lucide-react';

export default function EvolutionRadar({
  snapshots = [],
  onRollbackSnapshot
}) {
  const [activeVersion, setActiveVersion] = useState(snapshots[snapshots.length - 1]?.version || 'v2.0 (当前最新)');
  const [showPatchModal, setShowPatchModal] = useState(false);
  const [patchApplied, setPatchApplied] = useState(false);

  const currentSnap = snapshots.find(s => s.version === activeVersion) || snapshots[snapshots.length - 1] || {
    styleSharpness: 96,
    personaConsistency: 98,
    viralFusion: 94,
    habitLocking: 97
  };

  // SVG Radar coordinates calculation for 4 axes
  // Center: (150, 150), Radius: 100
  const center = 150;
  const radius = 100;
  
  const getCoordinates = (val, angleDeg) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = (val / 100) * radius;
    return {
      x: center + r * Math.cos(angleRad),
      y: center + r * Math.sin(angleRad)
    };
  };

  // 4 Axes: Top (270°), Right (0°), Bottom (90°), Left (180°)
  const p1 = getCoordinates(currentSnap.styleSharpness || 90, 270); // 风格鲜明度
  const p2 = getCoordinates(currentSnap.personaConsistency || 90, 0); // 人设一致性
  const p3 = getCoordinates(currentSnap.viralFusion || 90, 90); // 爆款融合度
  const p4 = getCoordinates(currentSnap.habitLocking || 90, 180); // 习惯锁定度

  const radarPolygonPoints = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;

  const handleApplyNewPatch = () => {
    setPatchApplied(true);
    setTimeout(() => {
      setPatchApplied(false);
      setShowPatchModal(false);
      alert('🎉 动态反思完成！已成功将《新素材进阶特征》合并入当前 DNA 画像，版本已固化！');
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            智能体自我进化与可视化成长轨迹看板
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            动态反思进化（Reflective DNA Evolution）· 记忆择优锁（防退化）· 越投喂越精准、风格越用越统一
          </p>
        </div>

        <button
          onClick={() => setShowPatchModal(true)}
          className="btn-xhs text-xs py-2 px-5 self-start md:self-auto flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          触发新素材反思进化 (DNA Patch)
        </button>
      </div>

      {/* Main Grid: Radar Chart + Growth Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 4-Axis Dynamic Radar Chart (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col items-center justify-between gap-4">
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              当前版本多维能力雷达 ({currentSnap.version})
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
              只进不退锁：已激活
            </span>
          </div>

          {/* SVG Radar */}
          <div className="relative w-[300px] h-[300px] my-2">
            <svg width="300" height="300" className="overflow-visible">
              {/* Background Concentric Rings (25%, 50%, 75%, 100%) */}
              {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={radius * scale}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeDasharray={scale === 1 ? 'none' : '4 4'}
                />
              ))}

              {/* Cross Axis Lines */}
              <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="rgba(255,255,255,0.1)" />
              <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="rgba(255,255,255,0.1)" />

              {/* Polygon Area */}
              <polygon
                points={radarPolygonPoints}
                fill="rgba(6, 182, 212, 0.25)"
                stroke="#06b6d4"
                strokeWidth="2.5"
                className="transition-all duration-500 ease-out"
              />

              {/* Point Circles */}
              {[p1, p2, p3, p4].map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  fill="#ff2442"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Labels around the radar */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-200 text-center">
              风格鲜明度 <span className="text-[#ff2442] font-mono">{currentSnap.styleSharpness}分</span>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-200 text-left pl-2">
              人设一致性 <span className="text-cyan-400 font-mono">{currentSnap.personaConsistency}分</span>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-200 text-center">
              爆款融合度 <span className="text-amber-400 font-mono">{currentSnap.viralFusion}分</span>
            </div>

            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-200 text-right pr-2">
              习惯锁定度 <span className="text-emerald-400 font-mono">{currentSnap.habitLocking}分</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs text-slate-300">
            <div className="p-2 rounded-lg bg-slate-900/60 flex items-center justify-between">
              <span>综合进化指数</span>
              <strong className="text-cyan-300 font-mono text-sm">96.3 / 100</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 flex items-center justify-between">
              <span>素材沉淀总数</span>
              <strong className="text-[#ff2442] font-mono text-sm">38 篇</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Version History & Evolution Snapshots (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-[#ff2442]" />
              创作大脑版本演进轨迹（支持快照回滚与防退化锁定）
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              3个里程碑版本
            </span>
          </div>

          {/* Version Cards */}
          <div className="flex flex-col gap-3">
            {snapshots.map((snap) => {
              const isSelected = activeVersion === snap.version;
              return (
                <div
                  key={snap.version}
                  onClick={() => setActiveVersion(snap.version)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-slate-800/90 border-[#ff2442] shadow-md shadow-[#ff2442]/15'
                      : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                        snap.version.includes('最新')
                          ? 'bg-[#ff2442] text-white'
                          : 'bg-slate-700 text-slate-200'
                      }`}>
                        {snap.version}
                      </span>
                      <h4 className="text-xs font-bold text-white">{snap.title}</h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span>{snap.date}</span>
                      {snap.isLocked && (
                        <Lock className="w-3.5 h-3.5 text-emerald-400" title="防退化择优锁锁定" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {snap.changelog}
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono">
                    <span>鲜明度: <strong className="text-white">{snap.styleSharpness}</strong></span>
                    <span>一致性: <strong className="text-cyan-300">{snap.personaConsistency}</strong></span>
                    <span>融合度: <strong className="text-amber-300">{snap.viralFusion}</strong></span>
                    <span>锁定度: <strong className="text-emerald-300">{snap.habitLocking}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evolution Principles Callout */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col gap-1.5 text-xs text-slate-300">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              智能体择优进化三大铁律：
            </span>
            <div>1. <strong>只进不退：</strong>始终以历史最高满意度作为基线，吸收高级表达，淘汰平庸套路。</div>
            <div>2. <strong>人设绝对锚定：</strong>吸收公域爆款框架的同时，100% 捍卫 40+ 大厂知性女性的核心声线与价值观。</div>
          </div>
        </div>

      </div>

      {/* DNA Upgrade Patch Simulation Modal */}
      {showPatchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-white/15 rounded-2xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                《DNA 动态反思与升级补丁报告》
              </h3>
              <button 
                onClick={() => setShowPatchModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              系统对比了最新投喂的 2 篇代表作与对标爆款，提取出以下<strong>进阶特征补丁</strong>：
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2.5 text-xs">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> 新增特征 1：强化「坏示范 vs 好示范」对比结构权重 (+18%)
              </div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> 新增特征 2：口播停顿气口优化，长句平均切断为 12 字内短句
              </div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> 新增特征 3：3:4 视觉卡片版型自动适配为「三段式大字报」
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setShowPatchModal(false)}
                className="btn-secondary text-xs py-1.5 px-4"
              >
                稍后更新
              </button>
              <button
                onClick={handleApplyNewPatch}
                disabled={patchApplied}
                className="btn-xhs text-xs py-1.5 px-6"
              >
                {patchApplied ? '正在合并并固化...' : '一键应用补丁并锁定'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
