import React, { useState } from 'react';
import { 
  Feather, 
  ShieldAlert, 
  Mic, 
  Check, 
  Lock, 
  Sparkles, 
  Plus, 
  Trash2, 
  Sliders,
  Smile,
  AlertCircle
} from 'lucide-react';

export default function CreatorDNA({
  creatorDNA,
  setCreatorDNA
}) {
  const [newCatchphrase, setNewCatchphrase] = useState('');
  const [newBannedWord, setNewBannedWord] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddCatchphrase = () => {
    if (!newCatchphrase.trim()) return;
    setCreatorDNA({
      ...creatorDNA,
      catchphrases: [...(creatorDNA.catchphrases || []), newCatchphrase.trim()]
    });
    setNewCatchphrase('');
  };

  const handleRemoveCatchphrase = (index) => {
    const list = [...(creatorDNA.catchphrases || [])];
    list.splice(index, 1);
    setCreatorDNA({ ...creatorDNA, catchphrases: list });
  };

  const handleAddBanned = () => {
    if (!newBannedWord.trim()) return;
    setCreatorDNA({
      ...creatorDNA,
      bannedWords: [...(creatorDNA.bannedWords || []), newBannedWord.trim()]
    });
    setNewBannedWord('');
  };

  const handleRemoveBanned = (index) => {
    const list = [...(creatorDNA.bannedWords || [])];
    list.splice(index, 1);
    setCreatorDNA({ ...creatorDNA, bannedWords: list });
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Feather className="w-5 h-5 text-[#ff2442]" />
              创作者 DNA 永久锁定库 (Creator Habit Constitution)
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono flex items-center gap-1 border border-emerald-500/30">
              <Lock className="w-3 h-3" /> 终身记忆锁定
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            固化您的个人行文习惯、断句节奏、口播语气与避坑黑名单，所有 AI 产出严格遵从，杜绝千篇一律与风格漂移
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-xhs text-xs py-2 px-6 self-start md:self-auto"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4" />
              已保存并锁定 DNA！
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              保存并锁定配置
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Persona & Writing Habits (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Block 1: 博主人设与基调 */}
          <div className="glass-panel p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles className="w-4 h-4 text-amber-400" />
              1. 核心人设与声线定位
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">博主昵称 / IP 定位：</label>
                <input
                  type="text"
                  value={creatorDNA.personaName}
                  onChange={(e) => setCreatorDNA({ ...creatorDNA, personaName: e.target.value })}
                  className="glass-input w-full text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">核心文风调性：</label>
                <input
                  type="text"
                  value={creatorDNA.voiceTone}
                  onChange={(e) => setCreatorDNA({ ...creatorDNA, voiceTone: e.target.value })}
                  className="glass-input w-full text-xs"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-300 font-semibold mb-1 block">博主经历背景与核心价值主张：</label>
              <textarea
                value={creatorDNA.bio}
                onChange={(e) => setCreatorDNA({ ...creatorDNA, bio: e.target.value })}
                rows={2}
                className="glass-input w-full text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Block 2: 行文排版与专属口头禅 */}
          <div className="glass-panel p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Smile className="w-4 h-4 text-cyan-400" />
              2. 写作排版习惯与专属口头禅
            </div>

            <div className="text-xs">
              <label className="text-slate-300 font-semibold mb-1 block">段落长短与断句节奏：</label>
              <input
                type="text"
                value={creatorDNA.paragraphLength}
                onChange={(e) => setCreatorDNA({ ...creatorDNA, paragraphLength: e.target.value })}
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="text-xs">
              <label className="text-slate-300 font-semibold mb-1 block">Emoji 使用密度与风格：</label>
              <input
                type="text"
                value={creatorDNA.emojiDensity}
                onChange={(e) => setCreatorDNA({ ...creatorDNA, emojiDensity: e.target.value })}
                className="glass-input w-full text-xs"
              />
            </div>

            {/* Signature Catchphrases List */}
            <div className="text-xs flex flex-col gap-2">
              <label className="text-slate-300 font-semibold block">专属标志性句式 / 口头禅：</label>
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {(creatorDNA.catchphrases || []).map((cp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-200">
                    <span>{cp}</span>
                    <button 
                      onClick={() => handleRemoveCatchphrase(idx)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={newCatchphrase}
                  onChange={(e) => setNewCatchphrase(e.target.value)}
                  placeholder="添加一条专属句式（如：“说句大实话……”）"
                  className="glass-input flex-1 text-xs"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCatchphrase()}
                />
                <button
                  onClick={handleAddCatchphrase}
                  className="btn-secondary text-xs py-2 px-3 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  添加
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Negative Blacklist & 1:1 Oral Parameters (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Block 3: 负向约束与避坑黑名单 */}
          <div className="glass-panel p-5 flex flex-col gap-4 border border-red-500/20 bg-red-950/5">
            <div className="flex items-center gap-2 text-sm font-bold text-red-400">
              <ShieldAlert className="w-4 h-4" />
              3. 避坑黑名单（Negative Prompting）
            </div>

            <p className="text-xs text-slate-400">
              严格禁止 AI 在文案和口播中出现下列套话与译制腔：
            </p>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
              {(creatorDNA.bannedWords || []).map((w, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-full bg-red-500/15 text-red-300 text-xs border border-red-500/30 flex items-center gap-1.5"
                >
                  <span>{w}</span>
                  <button 
                    onClick={() => handleRemoveBanned(idx)}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newBannedWord}
                onChange={(e) => setNewBannedWord(e.target.value)}
                placeholder="输入禁止出现的词汇..."
                className="glass-input flex-1 text-xs border-red-500/30"
                onKeyDown={(e) => e.key === 'Enter' && handleAddBanned()}
              />
              <button
                onClick={handleAddBanned}
                className="btn-secondary text-xs py-2 px-3 shrink-0 text-red-300 hover:bg-red-500/20"
              >
                添加禁词
              </button>
            </div>

            <div className="text-xs">
              <label className="text-slate-300 font-semibold mb-1 block">排斥风格约束：</label>
              <textarea
                value={creatorDNA.avoidedStyles}
                onChange={(e) => setCreatorDNA({ ...creatorDNA, avoidedStyles: e.target.value })}
                rows={2}
                className="glass-input w-full text-xs text-red-200"
              />
            </div>
          </div>

          {/* Block 4: 1:1 口播专属建模 */}
          <div className="glass-panel p-5 flex flex-col gap-4 border border-cyan-500/20 bg-cyan-950/5">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
              <Mic className="w-4 h-4" />
              4. 1:1 口播私有模型参数
            </div>

            <div className="text-xs flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-white/5">
              <span className="text-slate-300 font-semibold">语速节奏 (WPM)：</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={creatorDNA.oralPacingWPM || 220}
                  onChange={(e) => setCreatorDNA({ ...creatorDNA, oralPacingWPM: parseInt(e.target.value) || 220 })}
                  className="glass-input w-20 text-center font-mono font-bold text-xs"
                />
                <span className="text-slate-400 font-mono">字/分钟</span>
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-300 font-semibold mb-1 block">口播语气特质：</label>
              <input
                type="text"
                value={creatorDNA.oralTone}
                onChange={(e) => setCreatorDNA({ ...creatorDNA, oralTone: e.target.value })}
                className="glass-input w-full text-xs text-cyan-100"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
