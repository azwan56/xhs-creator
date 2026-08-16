// Initial data for Creator Persona (40+ Ex-Tech Mom, Smart Parenting & AI, Career Growth, Finance/Tech)

export const DEFAULT_NICHES = [
  {
    id: 'ai-parenting',
    name: '🤖 AI × 科学育儿',
    description: '大厂高管思维带娃，AI 工具赋能辅导，培养未来竞争力与抗内卷哲学',
    tagColor: '#ff2442',
    defaultTheme: 'oat',
    defaultLayout: 'B',
    systemPromptSupplement: '博主为40+大厂前高管精英妈妈。文风知性、从容、温柔且有力量，绝不贩卖鸡娃焦虑，善用大厂项目管理与AI工具转化为亲子场景大白话。'
  },
  {
    id: 'women-ai-career',
    name: '💼 40+ 职场女性 × AI 破局',
    description: '女性第二增长曲线，大模型提效神器，摆脱职场与年龄内耗',
    tagColor: '#0284c7',
    defaultTheme: 'tech',
    defaultLayout: 'A',
    systemPromptSupplement: '博主为40+女性创业者/自媒体人。文风清醒干练、富有大厂前沿视野，侧重大模型实操降维打击，鼓励女性掌控技术与时间。'
  },
  {
    id: 'mindset-growth',
    name: '🌿 40+ 知性成长与松弛感',
    description: '大厂裸辞深度复盘，戒掉完美主义，女性精力管理与人生不惑哲学',
    tagColor: '#10b981',
    defaultTheme: 'healing',
    defaultLayout: 'A',
    systemPromptSupplement: '博主为40+不惑女性。文风真诚走心、娓娓道来、富有生活智慧与哲学深度，强调精神松弛与自我接纳。'
  },
  {
    id: 'tech-finance',
    name: '📊 科技商业 & 研报洞察',
    description: '前沿科技趋势拆解，美股与AI商业化落地，硬核数据分析',
    tagColor: '#f59e0b',
    defaultTheme: 'alert',
    defaultLayout: 'B',
    systemPromptSupplement: '博主为科技从业者。结论先行、数据翔实、逻辑严密、客观理性，高收藏价值。'
  }
];

export const INITIAL_CREATOR_DNA = {
  personaName: '知性科技妈妈 / 40+ 大厂转型博主',
  bio: '曾就职多家大科技公司管理层，40+ 岁独立自媒体人，专注 AI 赋能育儿与职场女性不内卷成长。',
  voiceTone: '知性从容、温柔有力量、大厂逻辑透彻、去浮躁、极具松弛感',
  
  // Writing Habits
  paragraphLength: '短小精悍，每段 1~2 句话即换行，保持视觉呼吸感',
  emojiDensity: '中等偏雅致（每段开头搭配 1~2 个语义强相关的 Emoji，如 💡、🍼、🤖、✨、📌）',
  catchphrases: [
    '“在大厂做了十几年管理，我发现带娃也是一套底层逻辑……”',
    '“40岁之后，我最大的松弛感来自于……”',
    '“别再焦虑被 AI 淘汰了，教你一个把大模型当免费助理的指令：”',
    '“说句大实话，真正拉开差距的从来不是……”',
    '“这套打法建议先收藏，随时抄作业。”'
  ],
  
  // Negative Blacklist (Strict Rules)
  bannedWords: [
    '家人们谁懂啊',
    '今天给大家分享一个绝绝子宝藏',
    '赶紧点赞收藏吧不然找不到',
    '综上所述',
    '小编认为',
    '不得不说',
    '狠狠心动了',
    '打在公屏上'
  ],
  avoidedStyles: '严禁泼妇吵架式对立、严禁制造无底线恐慌焦虑、严禁生硬学术技术黑话堆砌、严禁空洞喊口号。',
  
  // 1:1 Oral Speaking Configuration
  oralPacingWPM: 220, // Words Per Minute
  oralTone: '真诚坦诚、知性大方、像面对面和闺蜜/朋友喝咖啡聊天',
  oralOpeningHooks: [
    '“如果你家娃还在死记硬背学英语，停一下！今天教你用 AI 每天省出 2 小时……”',
    '“在大厂管过几百人团队，离开后我把这套 OKR 搬到了带娃上，结果出乎意料……”',
    '“很多 40+ 的姐妹总问我，怎么做到既带好娃又把自媒体做起来的？其实秘诀只有 3 个字……”'
  ],
  oralClosingCTAs: [
    '“你平时会给孩子用 AI 工具吗？在评论区聊聊你的困惑，我一条条看。”',
    '“觉得有用记得点个关注，下期我们聊聊大厂妈妈的时间管理术。”'
  ]
};

export const INITIAL_BENCHMARK_POSTS = [
  {
    id: 'bench-1',
    nicheId: 'ai-parenting',
    title: '别再禁止孩子用AI了！未来10年拉开差距的是提问能力',
    author: '硅谷工程师妈妈',
    likes: '4.8万',
    collects: '3.2万',
    content: `很多家长一提到 AI 就如临大敌，担心孩子偷懒、不动脑子。🙅‍♀️\n\n在大厂做了10年技术，我必须说句大实话：未来拉开孩子差距的，绝对不是死记硬背的刷题量，而是「如何向 AI 提问」的能力！💡\n\n📌 传统提问法：“帮我写一篇关于春天的作文。”\n➡️ 结果：空洞、千篇一律、毫无思考。\n\n✨ 大厂高手的 AI 提问公式：\n【角色设定 + 场景细节 + 启发式反问】\n“你是一位温柔的小学语文特级教师，请不要直接给我答案，先问我3个关于春天的五感观察问题，引导我写出第一段。”\n\n你看，AI 瞬间从「代写工具」变成了「24小时启发式私教」！孩子不仅学会了思考，还掌握了提问逻辑。\n\n建议家长们先收藏这套指令，今晚就带娃试试看！❤️`,
    deconstruction: {
      hookLogic: '开篇反常识破题（打破家长普遍抵触 AI 的误区），激发好奇与紧迫感',
      rhythm: '痛点指出 ➔ 坏示范 vs 好示范对比 ➔ 核心方法论拆解 ➔ 价值总结与收藏诱导',
      emojiStyle: '功能指示型 Emoji（🙅‍♀️、💡、📌、✨、❤️），层次极度分明',
      viralFormula: '反常识认知颠覆 + 坏示范 vs 好示范对比 + 可直接复制的 Prompt 模板'
    }
  },
  {
    id: 'bench-2',
    nicheId: 'women-ai-career',
    title: '40岁从大厂离开，我用AI把自己活成了一支队伍',
    author: '知性张姐AI创业',
    likes: '2.3万',
    collects: '1.9万',
    content: `很多人问我：40+ 岁从大厂裸辞，你就不慌吗？\n\n实话实说，第一周确实慌。但当我开始把 AI 深度嵌入日常生活和创作后，我发现一个人真的可以抵得上一整个团队。👩‍💻\n\n我的极简 AI 提效工作流：\n1️⃣ 选题库管理：用大模型做全网爆款趋势抓取\n2️⃣ 口播提词稿：自建私有语气模型，1:1 复刻我的语速与口吻\n3️⃣ 封面卡片：自动化排版生成，5分钟搞定多页轮播图\n\n技术不是年轻人的专属，40岁女性多年积累的人生阅历和深度思考，加上 AI 的执行力，才是最强的降维打击。🔥`,
    deconstruction: {
      hookLogic: '个人脆弱时刻开场（中年裸辞真实心境），引发同龄女性强烈共鸣',
      rhythm: '共鸣痛点 ➔ 3步实操工作流清单 ➔ 升华女性价值主张与力量赋能',
      emojiStyle: '精炼知性，段落呼吸感强',
      viralFormula: '真实人生故事 + 结构化工作流清单 + 情感共鸣金句'
    }
  }
];

export const INITIAL_GOLDEN_WORKS = [
  {
    id: 'gold-1',
    nicheId: 'ai-parenting',
    title: '管过百人团队，我把这套 OKR 搬到了带娃上',
    stars: 5,
    likes: '1.8万',
    type: '图文 + 口播',
    tags: ['科学育儿', '大厂思维', '时间管理'],
    content: `在大厂管团队15年，回到家面对辅导作业，我也曾一度抓狂崩溃。🤯\n\n直到我把大厂经典的 OKR（目标与关键结果）工具用在了带娃上，整个家庭氛围瞬间从“鸡飞狗跳”变成了“高效自驱”。✨\n\n👉 传统育儿的误区：\n家长给的是任务（“快去把数学卷子做了！”）➔ 孩子被动抗拒、拖延。\n\n💡 OKR 育儿法则：\n把控制权还给孩子，让孩子自己定 Objective（大目标）和 Key Results（关键行动）。\n\n例：\n• O：这个周末要玩得开心无负担\n• KR 1：周五晚上 8 点前完成数学与英语作业\n• KR 2：周六下午户外骑行 2 小时\n• KR 3：自己检查错题并给妈妈讲一遍解题思路\n\n从被动催促到主动管理，孩子的责任感一下就被激发了。\n\n大厂的方法论，本质上就是做事的底层逻辑。带娃也是一样。`,
    notes: '这是我最满意的代表作，完播率极高，语气沉稳、案例具体、大厂视角接地气。'
  }
];

export const INITIAL_INSPIRATIONS = [
  {
    id: 'insp-1',
    nicheId: 'ai-parenting',
    title: 'AI 时代培养孩子哪三种能力不会被淘汰？',
    points: ['审美与感知力', '精准提问与反思力', '真实人际同理心与沟通'],
    status: 'planned'
  },
  {
    id: 'insp-2',
    nicheId: 'women-ai-career',
    title: '40岁女性如何搭建自己的个人知识库和AI第二大脑？',
    points: ['Notion / 本地笔记 + 向量检索', '用自己过去的经验喂饱大模型', '建立个人专属资产'],
    status: 'planned'
  }
];

export const INITIAL_EVOLUTION_SNAPSHOTS = [
  {
    version: 'v1.0',
    date: '2026-07-01',
    title: '初始基线模型',
    styleSharpness: 72,
    personaConsistency: 75,
    viralFusion: 70,
    habitLocking: 78,
    changelog: '建立 40+ 大厂女性精英妈妈人设基线，提取段落短句与 Emoji 密度规则。',
    isLocked: true
  },
  {
    version: 'v1.1',
    date: '2026-07-20',
    title: '反思升级：坏示范 vs 好示范对比法',
    styleSharpness: 86,
    personaConsistency: 88,
    viralFusion: 85,
    habitLocking: 89,
    changelog: '投喂《别再禁止孩子用AI了》，学习坏示范对比排版，强化开篇 3 秒破题钩子。',
    isLocked: true
  },
  {
    version: 'v2.0 (当前最新)',
    date: '2026-08-16',
    title: '终极专属范式：大厂方法论 + 1:1 口播节奏',
    styleSharpness: 96,
    personaConsistency: 98,
    viralFusion: 94,
    habitLocking: 97,
    changelog: '深度固化 1:1 口播停顿重音逻辑、3:4 视觉卡片切片引擎与小红书算法质检合规门禁。',
    isLocked: true
  }
];

export const INITIAL_TOPIC_MATRIX = [
  {
    type: '💥 认知颠覆型',
    title: '不要再禁止孩子用 AI 了！未来10年拉开差距的不是刷题，是提问能力',
    angle: '打破传统家长把 AI 当作作弊工具的偏见，树立“提问力”才是核心竞争力的大厂全局观。',
    suitableLayout: 'B'
  },
  {
    type: '🛠️ 保姆级指南型',
    title: '建议收藏！3 个神仙 AI 指令，让大模型变成孩子的 24 小时外教',
    angle: '手把手给出可以直接复制粘贴的 Prompt，教妈妈用大模型引导孩子练英语对话与纠错。',
    suitableLayout: 'E'
  },
  {
    type: '⚠️ 避坑排雷型',
    title: '千万别用这套方式给孩子用 ChatGPT，反而会毁了独立思考力',
    angle: '直击家长常见的 3 个致命操作误区（直接抄答案/无引导输入），并给出科学修正解法。',
    suitableLayout: 'C'
  },
  {
    type: '📖 真实经历故事型',
    title: '在大厂管团队15年，离开后我把这套 OKR 搬到了带娃上',
    angle: '第一人称讲述从崩溃抓狂到用现代项目管理赋能孩子自驱力的真实心路历程。',
    suitableLayout: 'A'
  }
];
