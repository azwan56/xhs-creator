const { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  AlignmentType, 
  ShadingType 
} = require('docx');
const fs = require('fs');
const path = require('path');

// Colors
const PRIMARY_COLOR = 'E11D48'; // 经典玫瑰红/小红书红
const SECONDARY_COLOR = '0284C7'; // 科技蓝
const TEXT_DARK = '1E293B';
const TEXT_MUTED = '64748B';
const BG_HEADER = 'F1F5F9';
const BG_ALT = 'F8FAFC';
const BORDER_COLOR = 'CBD5E1';

// Total usable width in DXA for standard A4 with 1-inch margins: 9026 dxa
const TOTAL_WIDTH_DXA = 9026;

function createTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 34, // 17pt
        color: PRIMARY_COLOR,
        font: 'Microsoft YaHei'
      })
    ]
  });
}

function createSubtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 280 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22, // 11pt
        color: TEXT_MUTED,
        font: 'Microsoft YaHei'
      })
    ]
  });
}

function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 340, after: 140 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26, // 13pt
        color: '0F172A',
        font: 'Microsoft YaHei'
      })
    ]
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 90 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 23, // 11.5pt
        color: PRIMARY_COLOR,
        font: 'Microsoft YaHei'
      })
    ]
  });
}

function createParagraph(text) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, size: 21, color: TEXT_DARK, font: 'Microsoft YaHei' })];
  return new Paragraph({
    spacing: { before: 50, after: 90, line: 350 },
    children: runs
  });
}

function createBullet(text, level = 0) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, size: 21, color: TEXT_DARK, font: 'Microsoft YaHei' })];
  return new Paragraph({
    bullet: { level },
    spacing: { before: 40, after: 50, line: 330 },
    children: runs
  });
}

function createCalloutBox(title, content) {
  return new Table({
    width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: [TOTAL_WIDTH_DXA],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
            shading: { fill: 'FFF1F2', type: ShadingType.CLEAR },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 24, color: PRIMARY_COLOR },
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE }
            },
            margins: { top: 130, bottom: 130, left: 180, right: 180 },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 50 },
                children: [new TextRun({ text: title, bold: true, size: 22, color: PRIMARY_COLOR, font: 'Microsoft YaHei' })]
              }),
              new Paragraph({
                spacing: { before: 0, after: 0, line: 320 },
                children: [new TextRun({ text: content, size: 20, color: TEXT_DARK, font: 'Microsoft YaHei' })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Fixed width table with explicit cell widths in DXA
function createTableWithWidths(headers, colWidths, rowsData) {
  const headerRow = new TableRow({
    children: headers.map((header, idx) => new TableCell({
      width: { size: colWidths[idx], type: WidthType.DXA },
      shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: BORDER_COLOR },
        bottom: { style: BorderStyle.SINGLE, size: 14, color: PRIMARY_COLOR },
        left: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
        right: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR }
      },
      margins: { top: 110, bottom: 110, left: 90, right: 90 },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0 },
          children: [new TextRun({ text: header, bold: true, size: 19, color: '0F172A', font: 'Microsoft YaHei' })]
        })
      ]
    }))
  });

  const bodyRows = rowsData.map((row, rowIndex) => new TableRow({
    children: row.map((cellText, cellIndex) => {
      const lines = String(cellText).split('\n');
      const paragraphs = lines.map(line => new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 25, after: 25, line: 270 },
        children: [new TextRun({ text: line, size: 18, color: TEXT_DARK, font: 'Microsoft YaHei' })]
      }));

      return new TableCell({
        width: { size: colWidths[cellIndex], type: WidthType.DXA },
        shading: { fill: rowIndex % 2 === 1 ? BG_ALT : 'FFFFFF', type: ShadingType.CLEAR },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
          left: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
          right: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR }
        },
        margins: { top: 90, bottom: 90, left: 90, right: 90 },
        children: paragraphs
      });
    })
  }));

  return new Table({
    width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...bodyRows]
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Microsoft YaHei',
          size: 21
        }
      }
    }
  },
  sections: [
    {
      properties: {
        page: {
          size: {
            width: 11906,
            height: 16838
          },
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440
          }
        }
      },
      children: [
        createTitle("小红书博主专属创作智能体（Agent）流程管理手册"),
        createSubtitle("【终极进化版：风格固化 + 自我迭代 + 封面视觉框架 + 豆包模型 + 阿里云部署】"),

        createCalloutBox("💡 核心定位与技术底座", "本系统是专属博主的终身进化型私人创作大脑与爆款交付工作台。系统全面接入【字节跳动火山引擎·豆包大模型（Doubao Ark API）】，并针对【阿里云基础设施（Serverless FC 3.0 与 ECS 容器化）】进行全栈生产级适配，实现风格 100% 固化、质感持续升级、3:4 视觉封面与文案一站式高效交付。"),

        createHeading1("一、 核心升级设计理念与技术选型"),
        createBullet([new TextRun({ text: "1. 核心模型引擎：豆包大模型（Doubao Ark API）：", bold: true, color: PRIMARY_COLOR }), new TextRun("接入火山引擎方舟平台 Doubao-pro-32k/128k 与 Doubao-lite，具备长上下文、极低延迟流式输出（SSE）、卓越的中文语感与原生小红书爆款文风。")]),
        createBullet([new TextRun({ text: "2. 部署基础设施：阿里云（Alibaba Cloud）全栈适配：", bold: true, color: PRIMARY_COLOR }), new TextRun("支持阿里云函数计算 FC 3.0 (Serverless 极低成本免运维) 与 ECS / 轻量应用服务器 (Docker 容器化) 双模式一键交付。")]),
        createBullet([new TextRun({ text: "3. 视觉优先与封面设计框架（Visual-First Engine）：", bold: true, color: PRIMARY_COLOR }), new TextRun("小红书 70% 点击取决于封面，80% 留存取决于多页轮播。系统建立工业级 3:4 封面设计框架规范，文案生成即自动切片渲染为 1080×1440 高清图集。")]),
        createBullet([new TextRun({ text: "4. 动态反思进化（Reflective DNA Evolution）：", bold: true, color: PRIMARY_COLOR }), new TextRun("采用「反思比对 ➔ 增量 DNA 补丁 ➔ 记忆择优锁定 ➔ 历史版本快照」机制，杜绝模型退化，只进不退。")]),
        createBullet([new TextRun({ text: "5. 多赛道自适应模态（Multi-Niche Adaptation）：", bold: true, color: PRIMARY_COLOR }), new TextRun("内置商业财经、认知成长、好物测评、探店攻略等差异化叙事模型、专属视觉卡片主题与打分权重。")]),
        createBullet([new TextRun({ text: "6. 小红书算法质检闭环（Algorithm Quality Gate）：", bold: true, color: PRIMARY_COLOR }), new TextRun("内置 CTR 点击预测、CES 完播度打分与违禁词/AI腔扫描，确保产出即为高流量达标内容。")]),

        createHeading1("二、 📐 小红书爆款封面视觉设计标准框架体系"),
        createParagraph("封面决定 70% 的点击率（0.5秒视觉决策）。系统将封面设计规范化为工业级参数系统："),

        createHeading2("1. 空间布局与三道安全红线"),
        createBullet([new TextRun({ text: "标准比例与分辨率：", bold: true }), new TextRun("3:4 黄金宽高比，输出 1080px × 1440px 高清分辨率。")]),
        createBullet([new TextRun({ text: "顶部安全区（Top 120px）：", bold: true }), new TextRun("放置栏目胶囊徽章（Badge）、期数编号与副标。")]),
        createBullet([new TextRun({ text: "黄金焦点区（Y: 20% ~ 55%）：", bold: true }), new TextRun("核心抓手大标题（8~14字，大字加粗，重点关键词高亮变色）。")]),
        createBullet([new TextRun({ text: "信息承载区（Y: 55% ~ 80%）：", bold: true }), new TextRun("核心视觉锚点卡片（对比框/数据卡/操作界面/清单）。")]),
        createBullet([new TextRun({ text: "底部避让区（Bottom 180px - 绝对红线）：", bold: true, color: PRIMARY_COLOR }), new TextRun("禁止放置任何核心文字或关键图表，避开小红书客户端常驻的作者头像、昵称与点赞覆盖。")]),
        createBullet([new TextRun({ text: "左右呼吸边距（Margin 60px~80px）：", bold: true }), new TextRun("严格留白，杜绝文字贴边拥挤感。")]),

        createHeading2("2. 五大标准爆款排版版型规范"),
        createTableWithWidths(
          ["版型代码", "版型名称", "结构特征", "核心传达目的"],
          [1400, 2200, 3000, 2426],
          [
            ["版型 A", "大字报 / 核心观点型", "超大主标题（占画面 40%）+ 2~3 行要点解析", "强力吸睛、观点颠覆、0.5秒直击认知"],
            ["版型 B", "三段式 / 结构化卡片型", "顶栏标题 + 中间悬浮数据/工具卡片 + 底部交付", "展示专业度、结构化交付方法论"],
            ["版型 C", "红黑 / 前后对比型", "左右或上下双区（错误做法 ❌ vs 正确解法 ✅）", "激发损失厌恶心理、痛点排雷"],
            ["版型 D", "画中画 / 悬浮浮岛型", "背景是真实截图/照片（带暗角），前景悬浮高质感标题框", "增强真实感、实操教程、实盘/工具展示"],
            ["版型 E", "序号索引 / 集合清单型", "主标题 + ①②③④ 结构化干货要点罗列", "激发收藏欲、保姆级步骤打包"]
          ]
        ),

        createHeading2("3. 配色与质感主题库（Design Tokens）"),
        createBullet([new TextRun({ text: "燕麦知性系：", bold: true }), new TextRun("暖燕麦白 #F8F6F0 + 深炭灰 #1C1917 + 赤陶红 #E11D48（知性、杂志留白、从容）")]),
        createBullet([new TextRun({ text: "商务科技系：", bold: true }), new TextRun("纯雅白 #FFFFFF / 深空灰 #0F172A + 科技深蓝 #0284C7 + 荧光青 #06B6D4（理性、严谨、专业）")]),
        createBullet([new TextRun({ text: "治愈生活系：", bold: true }), new TextRun("鼠尾草灰绿 #F0FDF4 + 森林深墨 #14532D + 柔暖金 #F59E0B（温暖、陪伴、亲切）")]),
        createBullet([new TextRun({ text: "高对比警示系：", bold: true }), new TextRun("哑光纯黑 #18181B + 亮白 #FFFFFF + 警示黄 #FACC15 / 爆款红 #FF2442（冲突、避坑、高转化）")]),

        createHeading1("三、 豆包模型接入与阿里云部署方案"),

        createHeading2("1. 字节跳动火山引擎·豆包大模型（Ark API）规范"),
        createBullet([new TextRun({ text: "API 协议：", bold: true }), new TextRun("标准 OpenAI 兼容协议，Base URL 为 https://ark.cn-beijing.volces.com/api/v3")]),
        createBullet([new TextRun({ text: "模型选型：", bold: true }), new TextRun("Doubao-pro-32k/128k（复杂反思进化、长文拆解、深度逻辑）；Doubao-lite（毫秒级极速生成）")]),
        createBullet([new TextRun({ text: "传输特性：", bold: true }), new TextRun("支持 SSE（Server-Sent Events）流式打字机响应，生成过程零等待")]),

        createHeading2("2. 阿里云部署交付架构"),
        createBullet([new TextRun({ text: "方案 A：阿里云函数计算 FC 3.0（Serverless 推荐）：", bold: true }), new TextRun("免买服务器、免运维、按量计费，内置 s.yaml 配置文件，支持一键命令自动化上线。")]),
        createBullet([new TextRun({ text: "方案 B：阿里云 ECS / 轻量应用服务器（Docker 容器化）：", bold: true }), new TextRun("独立主机环境，内置 Dockerfile、docker-compose.yml 与 Nginx 反代配置，支持绑定域名与 SSL。")]),

        createHeading1("四、 四大主流题材板块差异化策略"),
        createTableWithWidths(
          ["题材板块 (垂直赛道)", "核心用户心理与指标", "3:4 视觉卡片重心", "文案与口播风格要求", "避坑禁区 (Negative Rules)"],
          [1600, 1800, 1800, 2000, 1826],
          [
            [
              "📊 商业财经 / 科技研报",
              "寻求增量信息、防割韭菜\n核心：收藏率 + 转发率",
              "高对比数据图表、大字核心研判、深蓝/黑金商务质感",
              "结论先行、数据支撑、逻辑严密、语速中偏快、沉稳干练",
              "严禁废话铺垫、严禁无数据支撑的盲目看多看空、严禁说教"
            ],
            [
              "🌿 个人成长 / 情感疗愈",
              "情绪共鸣、精神抚慰、缓解焦虑\n核心：评论互动率 + 点赞",
              "杂志风大留白、治愈大字金句、暖杏/奶白/牛油果绿",
              "第一人称故事代入、娓娓道来、温柔真诚、去距离感语气词",
              "严禁居高临下讲大道理、严禁假大空鸡汤、严禁无细节宣泄"
            ],
            [
              "🛍️ 好物种草 / 测评穿搭",
              "即时变美、解决痛点、决策参考\n核心：求链接/求配置 + 收藏",
              "实拍图/前后对比(Before/After)、细节放大标注、红黑榜",
              "场景痛点开场、直观使用体感描述、亲切闺蜜感碎碎念",
              "严禁生硬说明书、严禁只夸不提缺点（需有客观小缺点增信任）"
            ],
            [
              "🗺️ 美食探店 / 旅游攻略",
              "保姆级抄作业、真实避雷\n核心：超高收藏率",
              "清晰路线时间轴(Day1/Day2)、价格地点标签、避坑打叉标识",
              "极致清晰的信息索引（时间/费用/机位）、避坑Tips突出",
              "严禁行程模糊、严禁滤镜过度与实际严重不符"
            ]
          ]
        ),

        createHeading1("五、 六大核心模块功能深度规划"),
        createBullet([new TextRun({ text: "1. 四大素材入库矩阵：", bold: true }), new TextRun("对标爆款拆解库 + 个人真迹标杆库 + 灵感选题库 + AI爆款框架公式库。")]),
        createBullet([new TextRun({ text: "2. 创作者 DNA 永久锁定：", bold: true }), new TextRun("段落呼吸感、Emoji 密度、专属词汇、负向避坑黑名单（拒绝 AI 腔）。")]),
        createBullet([new TextRun({ text: "3. 1:1 口播深度复刻与提词器：", bold: true }), new TextRun("语速节奏、气口停顿标记 [停顿 0.5s]、【重音】、全屏平滑滚动提词器。")]),
        createBullet([new TextRun({ text: "4. 动态反思进化与成长看板：", bold: true }), new TextRun("DNA Patching 增量补丁、记忆择优锁（只进不退）、版本快照回滚、多维成长雷达图。")]),
        createBullet([new TextRun({ text: "5. 创作 Studio 与 3:4 渲染引擎：", bold: true }), new TextRun("选题 × 4 维爆款矩阵 ➔ 小红书图文 + 1:1 口播稿 ➔ 3:4 高清图集一键打包 ➔ 算法质检打分。")]),
        createBullet([new TextRun({ text: "6. 移动端仿真与一键交付：", bold: true }), new TextRun("1:1 还原小红书移动端预览，一键复制富文本/Markdown，支持 PNG 打包导出。")]),

        createHeading1("六、 整体闭环交付流程对比"),
        createTableWithWidths(
          ["对比维度", "传统生成工具 / 简单仿写", "升级版专属博主创作智能体系统"],
          [1800, 3400, 3826],
          [
            ["风格沉淀", "每次重新输入提示词，风格飘忽不定", "个人 DNA 永久锁定，新素材自动反思迭代升级"],
            ["视觉交付", "仅输出文字，博主仍需花数小时做图", "严格遵循 3:4 封面框架规范，自动渲染 1080×1440 高清图集（一键打包）"],
            ["口播体验", "机械念稿，缺乏停顿与情绪提示", "1:1 复刻真实口吻，带重音/停顿标记与全屏提词器"],
            ["流量把控", "全凭运气，可能违规或踩中平台降权", "内置小红书算法质检打分机与敏感词实时过滤"],
            ["模型与部署", "依赖国外 API，部署繁琐脆弱", "原生支持字节火山方舟豆包大模型，一键部署阿里云 FC 3.0 / Docker"]
          ]
        ),

        createHeading1("七、 总结与实施路径"),
        createParagraph("本系统通过「素材沉淀 ➔ 习惯固化 ➔ 动态反思 ➔ 封面框架规范 ➔ 豆包大模型驱动 ➔ 阿里云生产级部署」的完整闭环，彻底解决内容创作中“耗时长、质量不稳定、风格不统一、做图繁琐、部署成本高”的核心痛点。")
      ]
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = path.join('/Users/azwan/Projects/小红书博主', '小红书博主专属创作智能体流程管理手册.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Alibaba & Doubao updated Word document created successfully at:', outputPath);
}).catch(err => {
  console.error('Error creating docx:', err);
});
