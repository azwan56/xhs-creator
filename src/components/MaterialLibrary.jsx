import React, { useState } from 'react';
import { 
  BookOpen, 
  Star, 
  Sparkles, 
  Plus, 
  Trash2, 
  Flame, 
  Lightbulb, 
  Award, 
  Search, 
  Layers,
  ChevronDown,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function MaterialLibrary({
  currentNiche,
  benchmarkPosts,
  setBenchmarkPosts,
  goldenWorks,
  setGoldenWorks,
  inspirations,
  setInspirations
}) {
  const [activeSubTab, setActiveSubTab] = useState('benchmark'); // 'benchmark' | 'golden' | 'inspiration' | 'frameworks'
  
  // Modal / Form state for adding new items
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newLikes, setNewLikes] = useState('1.5w');
  const [newRating, setNewRating] = useState(5);

  const handleAddBenchmark = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newItem = {
      id: `bench-${Date.now()}`,
      nicheId: currentNiche.id,
      title: newTitle,
      author: newAuthor || '同行头部博主',
      likes: newLikes || '1.2万',
      collects: '8.5千',
      content: newContent,
      deconstruction: {
        hookLogic: '开篇以强烈痛点/好奇点破题，直击受众痛点',
        rhythm: '痛点铺垫 ➔ 核心方法论 ➔ 案例佐证 ➔ 行动召唤',
        emojiStyle: '结构指示型 Emoji，段落呼吸感良好',
        viralFormula: '公域高点击公式：痛点直击 + 结构化步骤'
      }
    };
    setBenchmarkPosts([newItem, ...benchmarkPosts]);
    setShowAddModal(false);
    resetForm();
  };

  const handleAddGolden = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newItem = {
      id: `gold-${Date.now()}`,
      nicheId: currentNiche.id,
      title: newTitle,
      stars: newRating,
      likes: newLikes || '1.8万',
      type: '图文 + 口播',
      tags: ['个人代表作', '标准风格源'],
      content: newContent,
      notes: '核心风格基准，AI 将深度复刻此篇的断句、口吻与叙事节奏。'
    };
    setGoldenWorks([newItem, ...goldenWorks]);
    setShowAddModal(false);
    resetForm();
  };

  const handleAddInspiration = () => {
    if (!newTitle.trim()) return;
    const newItem = {
      id: `insp-${Date.now()}`,
      nicheId: currentNiche.id,
      title: newTitle,
      points: newContent ? newContent.split('\n').filter(p => p.trim()) : ['核心思考要点 1', '实践落地 2'],
      status: 'planned'
    };
    setInspirations([newItem, ...inspirations]);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setNewLikes('1.5w');
    setNewRating(5);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#ff2442]" />
            四大素材入库与公域流量拆解矩阵
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            当前赛道：<span className="text-white font-semibold">【{currentNiche.name}】</span> · 持续素材投喂是私人创作大脑自我进化的唯一核心源泉
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-xhs text-xs py-2 px-4 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          投喂新素材 / 记录新作品
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('benchmark')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'benchmark'
              ? 'bg-[#ff2442] text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          模块一：对标爆款素材库 ({benchmarkPosts.length})
        </button>

        <button
          onClick={() => setActiveSubTab('golden')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'golden'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          模块二：个人满意真迹库 ({goldenWorks.length})
        </button>

        <button
          onClick={() => setActiveSubTab('inspiration')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'inspiration'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          模块三：灵感选题备忘库 ({inspirations.length})
        </button>

        <button
          onClick={() => setActiveSubTab('frameworks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'frameworks'
              ? 'bg-purple-500 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          模块四：AI 万能爆款框架库 (4套)
        </button>
      </div>

      {/* SUBTAB 1: 对标爆款库 */}
      {activeSubTab === 'benchmark' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benchmarkPosts.map((item) => (
            <div key={item.id} className="glass-panel p-5 flex flex-col justify-between gap-4 border border-white/10">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    🔥 获赞 {item.likes} · 收藏 {item.collects}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    博主：{item.author}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 whitespace-pre-line mt-2.5 p-3 rounded-lg bg-slate-900/80 border border-white/5 max-h-36 overflow-y-auto leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* AI Deconstruction Box */}
              {item.deconstruction && (
                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center gap-1 text-purple-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    AI 自动拆解爆款底层逻辑：
                  </div>
                  <div className="text-slate-300">
                    • <strong>开篇抓手：</strong>{item.deconstruction.hookLogic}
                  </div>
                  <div className="text-slate-300">
                    • <strong>叙事节奏：</strong>{item.deconstruction.rhythm}
                  </div>
                  <div className="text-slate-300">
                    • <strong>爆款公式：</strong>{item.deconstruction.viralFormula}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 2: 个人真迹库 */}
      {activeSubTab === 'golden' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goldenWorks.map((item) => (
            <div key={item.id} className="glass-panel p-5 flex flex-col justify-between gap-4 border border-amber-500/30 bg-amber-950/10">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold ml-1">满意度 5.0</span>
                  </div>

                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    {item.type || '图文+口播'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 whitespace-pre-line mt-2.5 p-3 rounded-lg bg-slate-900/80 border border-white/5 max-h-36 overflow-y-auto leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-amber-200/80 italic">⭐ {item.notes}</span>
                <span className="text-emerald-400 font-bold shrink-0 ml-2">● 核心风格源</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: 灵感备忘库 */}
      {activeSubTab === 'inspiration' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inspirations.map((item) => (
            <div key={item.id} className="glass-panel p-5 flex flex-col justify-between gap-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono inline-block mb-2">
                  💡 备忘灵感
                </span>
                <h3 className="text-xs font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <div className="mt-3 flex flex-col gap-1 text-xs text-slate-300">
                  {(item.points || []).map((pt, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">▪</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>待排期创作</span>
                <button 
                  onClick={() => alert(`已将灵感《${item.title}》加入创作工作台`)}
                  className="text-cyan-400 hover:underline font-bold"
                >
                  一键调用 ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 4: AI 万能框架库 */}
      {activeSubTab === 'frameworks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-5 flex flex-col gap-3 border border-purple-500/30">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 self-start">
              💥 框架 1: 坏示范 vs 好示范对比法
            </span>
            <h4 className="text-sm font-bold text-white">【痛点误区 ➔ 坏示范拆解 ➔ 大厂高效解法 ➔ 行动清单】</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              最适合用于 AI 提示词、亲子沟通与职场提效。通过指出大众的错误操作，激发损失厌恶心理，再给出具体拿来即用的指令模版，收藏转化率极高。
            </p>
          </div>

          <div className="glass-panel p-5 flex flex-col gap-3 border border-cyan-500/30">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 self-start">
              🛠️ 框架 2: 大厂方法论降维赋能法
            </span>
            <h4 className="text-sm font-bold text-white">【管理/技术模型 ➔ 转化生活/带娃场景 ➔ 3步落地OKR ➔ 价值升华】</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              博主专属王牌框架。将大厂的 OKR、敏捷迭代、精细化精力管理转化为普通人或妈妈一听就懂的生动日常，建立极高的人设信任壁垒。
            </p>
          </div>

          <div className="glass-panel p-5 flex flex-col gap-3 border border-emerald-500/30">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 self-start">
              🌿 框架 3: 脆弱时刻与清醒松弛感法
            </span>
            <h4 className="text-sm font-bold text-white">【真实中年迷茫/离职 ➔ 试错反思 ➔ 戒掉完美主义 ➔ 温柔抚慰】</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              以第一人称真实经历开场，不居高临下讲大道理，而是以知心姐姐/闺蜜视角分享心路历程，评论区共鸣与涨粉粘性极强。
            </p>
          </div>

          <div className="glass-panel p-5 flex flex-col gap-3 border border-amber-500/30">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 self-start">
              ⚡ 框架 4: 保姆级神仙工具清单法
            </span>
            <h4 className="text-sm font-bold text-white">【场景痛点 ➔ ①②③④ 精选清单 ➔ 核心特色 ➔ 一键领模板】</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              以序号索引呈现（匹配版型 E），高密度交付实用信息，直接戳中读者“先收藏再看”的心理。
            </p>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-white/15 rounded-2xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">
              {activeSubTab === 'benchmark' && '📥 投喂对标爆款素材（AI 将自动拆解）'}
              {activeSubTab === 'golden' && '⭐ 录入个人满意作品 / 口播稿（核心风格源）'}
              {activeSubTab === 'inspiration' && '💡 记录灵感与选题备忘'}
              {activeSubTab === 'frameworks' && '📥 新增素材'}
            </h3>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">标题 / 选题：</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例如：别再禁止孩子用 AI 了！"
                  className="glass-input w-full text-xs"
                />
              </div>

              {activeSubTab === 'benchmark' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 font-semibold mb-1 block">作者昵称：</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="同行博主名称"
                      className="glass-input w-full text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold mb-1 block">获赞数据：</label>
                    <input
                      type="text"
                      value={newLikes}
                      onChange={(e) => setNewLikes(e.target.value)}
                      placeholder="例如：2.8万"
                      className="glass-input w-full text-xs"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">
                  {activeSubTab === 'inspiration' ? '核心要点与思考备忘（一行一条）：' : '全文正文 / 口播稿内容：'}
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={6}
                  placeholder="直接粘贴文章全文、口播稿或要点..."
                  className="glass-input w-full text-xs leading-relaxed resize-y"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary text-xs py-1.5 px-4"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (activeSubTab === 'benchmark') handleAddBenchmark();
                  else if (activeSubTab === 'golden') handleAddGolden();
                  else handleAddInspiration();
                }}
                className="btn-xhs text-xs py-1.5 px-5"
              >
                确认入库
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
