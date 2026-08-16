import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StudioCreation from './components/StudioCreation';
import MaterialLibrary from './components/MaterialLibrary';
import CreatorDNA from './components/CreatorDNA';
import EvolutionRadar from './components/EvolutionRadar';
import TeleprompterModal from './components/TeleprompterModal';
import SettingsModal from './components/SettingsModal';

import { 
  DEFAULT_NICHES, 
  INITIAL_CREATOR_DNA, 
  INITIAL_BENCHMARK_POSTS, 
  INITIAL_GOLDEN_WORKS, 
  INITIAL_INSPIRATIONS, 
  INITIAL_EVOLUTION_SNAPSHOTS,
  INITIAL_TOPIC_MATRIX 
} from './store/initialData';

const STORAGE_KEY = 'XHS_CREATOR_AGENT_STATE_V2';

export default function App() {
  // Load initial state from LocalStorage or defaults
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved state from localStorage:', e);
    }
    return null;
  };

  const savedState = loadSavedState();

  const [activeTab, setActiveTab] = useState('studio');
  const [niches] = useState(DEFAULT_NICHES);
  const [currentNiche, setCurrentNiche] = useState(savedState?.currentNiche || DEFAULT_NICHES[0]);
  const [creatorDNA, setCreatorDNA] = useState(savedState?.creatorDNA || INITIAL_CREATOR_DNA);
  const [benchmarkPosts, setBenchmarkPosts] = useState(savedState?.benchmarkPosts || INITIAL_BENCHMARK_POSTS);
  const [goldenWorks, setGoldenWorks] = useState(savedState?.goldenWorks || INITIAL_GOLDEN_WORKS);
  const [inspirations, setInspirations] = useState(savedState?.inspirations || INITIAL_INSPIRATIONS);
  const [snapshots, setSnapshots] = useState(savedState?.snapshots || INITIAL_EVOLUTION_SNAPSHOTS);
  const [topicMatrix, setTopicMatrix] = useState(savedState?.topicMatrix || INITIAL_TOPIC_MATRIX);

  // Volcano Engine API credentials
  const [apiKey, setApiKey] = useState(savedState?.apiKey || import.meta.env.VITE_VOLC_API_KEY || '');
  const [endpointId, setEndpointId] = useState(savedState?.endpointId || '');
  const [modelName, setModelName] = useState(savedState?.modelName || 'Doubao-pro-32k');

  // Creation Studio active generated package
  const [currentPackage, setCurrentPackage] = useState(savedState?.currentPackage || null);

  // Modals
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [teleprompterScript, setTeleprompterScript] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Auto-generate initial package on first load if none exists
  useEffect(() => {
    if (!currentPackage) {
      setCurrentPackage({
        titles: [
          '别再禁止孩子用 AI 了！未来10年拉开差距的是「提问能力」',
          '在大厂管过百人团队，我把这套 OKR 搬到了带娃上',
          '建议收藏！3 个神仙 AI 指令，把大模型变成孩子的 24 小时私教'
        ],
        selectedTitle: '别再禁止孩子用 AI 了！未来10年拉开差距的是「提问能力」',
        content: `很多家长一听到孩子用 AI，第一反应就是“偷懒、不思考、作弊”。🙅‍♀️\n\n在大厂做了十几年技术与管理，我必须说句大实话：\n未来真正拉开孩子差距的，从来不是死记硬背的刷题量，而是「如何向 AI 提问并追问」的底层逻辑！💡\n\n📌 很多孩子的错误用法（直接抄答案）：\n“帮我写一篇关于秋天的 300 字作文。”\n➡️ 结果：空洞平庸，孩子的大脑完全没有参与。\n\n✨ 我教我女儿的【大厂启发式 AI 指令】：\n“你是一位温柔的小学语文特级教师。请不要直接给我作文，先问我 3 个关于秋天五感（视觉/气味/触觉）的问题，引导我一步步构思第一段。”\n\n你看，AI 瞬间从「代写枪手」变成了「24小时专属一对一导师」！孩子不仅学会了思考，还掌握了提问的艺术。🌟\n\n育儿的本质不是堵，而是给孩子一把通往未来的钥匙。这套打法建议先收藏，今晚就带娃试试看！❤️`,
        oralScript: `如果你家孩子还在把 AI 当成抄作业的工具，停一下！[停顿 0.5s]\n\n在大厂管了十几年团队，我发现带娃和做项目一样，【底层逻辑】最重要。[停顿 0.5s]\n\n未来十年，真正拉开孩子差距的，不是刷了多少道题，而是【向 AI 精准提问并深度思考】的能力！(微笑，眼神坚定)\n\n今天分享 3 个我们家实测最管用的大厂启发式提问指令：\n第一个，【角色转化法】。别让 AI 直接写答案，让它扮演语文特级教师，反向向孩子提问……[停顿 0.5s]\n\n觉得有用记得点个赞收藏起来，下期我们聊聊怎么用大厂 OKR 治好孩子的拖延症！`,
        oralDurationSec: 68,
        tags: ['#科学育儿', '#AI时代带娃', '#大厂妈妈的育儿经', '#孩子学习方法', '#不内卷育儿', '#家庭教育'],
        cardSlides: [
          {
            slideType: 'cover',
            badge: '大厂妈妈育儿实录 #18',
            mainTitle: '不要再禁止孩子用 AI 了！',
            highlightKeywords: '禁止孩子用 AI',
            subTitle: '未来10年拉开差距的，从来不是刷题量，而是「提问力」',
            keyPoints: ['大厂高管思维带娃', '3个启发式提问指令', '从被动作弊到主动思考']
          },
          {
            slideType: 'content',
            badge: '对比排雷 · 错误用法',
            mainTitle: '为什么孩子用 AI 越用越懒？',
            highlightKeywords: '越用越懒',
            subTitle: '直接向 AI 索取现成答案，等于放弃思考肌肉',
            keyPoints: ['❌ 错误提问：“帮我写一篇秋天作文”', '➡️ 产出千篇一律的空洞套话', '➡️ 孩子的大脑完全处于休眠状态']
          },
          {
            slideType: 'content',
            badge: '核心解法 · 启发式指令',
            mainTitle: '把 AI 变成孩子的 24 小时私教',
            highlightKeywords: '24小时私教',
            subTitle: '【角色设定 + 场景细节 + 启发式反问】公式',
            keyPoints: ['✅ 指令：“请不要直接给答案，先问我3个引导问题”', '🌟 激发孩子对细节的五感观察与逻辑组织', '🚀 让孩子掌握向技术发问的领导力']
          },
          {
            slideType: 'summary',
            badge: '行动总结 · 建议收藏',
            mainTitle: '给孩子通往未来的钥匙',
            highlightKeywords: '未来的钥匙',
            subTitle: '不是把工具锁起来，而是教会孩子驾驭工具',
            keyPoints: ['收藏本篇 Prompt，随时对照练习', '评论区留言“指令”，获取更多亲子提问清单']
          }
        ],
        algorithmQA: {
          ctrScore: 95,
          ctrEvaluation: '🔥 封面大标题具备极强的好奇缺口与痛点共鸣，前 3 秒留存率预测极高。',
          cesScore: 97,
          cesEvaluation: '✨ 段落呼吸感优秀，结构化多页卡片非常利于小红书用户右滑翻页（提升 CES 完播得分）。',
          complianceCheck: '✅ 严格遵从避坑黑名单，未发现违规违禁词与生硬 AI 腔，安全达标。',
          optimizationTips: '💡 建议在发布时搭配封面图第 1 页作为小红书封面，文末主动引导粉丝在评论区互动。'
        }
      });
    }
  }, []);

  // Save state to LocalStorage
  useEffect(() => {
    const stateToSave = {
      currentNiche,
      creatorDNA,
      benchmarkPosts,
      goldenWorks,
      inspirations,
      snapshots,
      topicMatrix,
      apiKey,
      endpointId,
      modelName,
      currentPackage
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }, [
    currentNiche,
    creatorDNA,
    benchmarkPosts,
    goldenWorks,
    inspirations,
    snapshots,
    topicMatrix,
    apiKey,
    endpointId,
    modelName,
    currentPackage
  ]);

  // Export full backup JSON
  const handleExportBackup = () => {
    const backupData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      currentNiche,
      creatorDNA,
      benchmarkPosts,
      goldenWorks,
      inspirations,
      snapshots,
      topicMatrix,
      apiKey,
      endpointId,
      modelName,
      currentPackage
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `小红书创作大脑全量备份_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to factory defaults
  const handleResetToDefaults = () => {
    setCurrentNiche(DEFAULT_NICHES[0]);
    setCreatorDNA(INITIAL_CREATOR_DNA);
    setBenchmarkPosts(INITIAL_BENCHMARK_POSTS);
    setGoldenWorks(INITIAL_GOLDEN_WORKS);
    setInspirations(INITIAL_INSPIRATIONS);
    setSnapshots(INITIAL_EVOLUTION_SNAPSHOTS);
    setTopicMatrix(INITIAL_TOPIC_MATRIX);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleOpenTeleprompter = (script) => {
    setTeleprompterScript(script || currentPackage?.oralScript || '');
    setIsTeleprompterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col selection:bg-[#ff2442] selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentNiche={currentNiche}
        setCurrentNiche={setCurrentNiche}
        niches={niches}
        isApiConfigured={Boolean(apiKey && apiKey.trim())}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTeleprompter={() => handleOpenTeleprompter()}
        onExportBackup={handleExportBackup}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab 1: Studio Creation Workstation */}
        {activeTab === 'studio' && (
          <StudioCreation
            currentNiche={currentNiche}
            creatorDNA={creatorDNA}
            apiKey={apiKey}
            endpointId={endpointId}
            modelName={modelName}
            topicMatrix={topicMatrix}
            onOpenTeleprompter={handleOpenTeleprompter}
            currentPackage={currentPackage}
            setCurrentPackage={setCurrentPackage}
          />
        )}

        {/* Tab 2: Material Ingestion Matrix */}
        {activeTab === 'materials' && (
          <MaterialLibrary
            currentNiche={currentNiche}
            benchmarkPosts={benchmarkPosts}
            setBenchmarkPosts={setBenchmarkPosts}
            goldenWorks={goldenWorks}
            setGoldenWorks={setGoldenWorks}
            inspirations={inspirations}
            setInspirations={setInspirations}
          />
        )}

        {/* Tab 3: Creator DNA Habits */}
        {activeTab === 'dna' && (
          <CreatorDNA
            creatorDNA={creatorDNA}
            setCreatorDNA={setCreatorDNA}
          />
        )}

        {/* Tab 4: Evolution Radar & Growth Milestones */}
        {activeTab === 'evolution' && (
          <EvolutionRadar
            snapshots={snapshots}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500 bg-[#0b0f19]/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            小红书博主专属创作智能体 · 私人创作大脑与爆款工场 · 适配火山引擎豆包大模型
          </div>
          <div className="text-slate-400 font-mono">
            部署目标站点：<a href="https://www.vanpower.net" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">www.vanpower.net</a> (阿里云 ECS)
          </div>
        </div>
      </footer>

      {/* Pro Teleprompter Modal */}
      <TeleprompterModal
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
        scriptText={teleprompterScript}
        wpm={creatorDNA.oralPacingWPM || 220}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        endpointId={endpointId}
        setEndpointId={setEndpointId}
        modelName={modelName}
        setModelName={setModelName}
        onResetToDefaults={handleResetToDefaults}
      />

    </div>
  );
}
