const chapters = [...document.querySelectorAll("[data-scene][data-chapter]")];
const layers = [...document.querySelectorAll("[data-scene-layer]")];
const chapterNumber = document.querySelector("[data-chapter-number]");
const progressBar = document.querySelector("[data-progress]");
const stage = document.querySelector(".stage");
const canvas = document.querySelector("[data-atmosphere]");
const context = canvas.getContext("2d");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const detailPanel = document.querySelector("[data-detail-panel]");
const detailScrim = document.querySelector("[data-detail-scrim]");
const detailClose = document.querySelector("[data-detail-close]");
const detailTriggers = [...document.querySelectorAll("[data-detail]")];
const metricValues = [...document.querySelectorAll("[data-count]")];
const easterEggs = [...document.querySelectorAll("[data-easter]")];
const discoveryToast = document.querySelector("[data-discovery-toast]");
const discoveryLabel = document.querySelector("[data-discovery-label]");
const discoveryText = document.querySelector("[data-discovery-text]");
const resumeModal = document.querySelector("[data-resume-modal]");
const resumeOpen = document.querySelector("[data-resume-open]");
const resumeCloseButtons = [...document.querySelectorAll("[data-resume-close]")];
const resumeFrame = document.querySelector("[data-resume-frame]");

const DETAIL_CONTENT = {
  hackathon: {
    kicker: "探月计划 · 产品负责人 · 2026",
    title: "桌面冰球机械臂",
    summary: "全国最大具身智能黑客松「探月计划」",
    bullets: [
      { lead: "产品定位与用户策略：", body: "主导桌面冰球机械臂的产品定位，结合用户需求与机器人能力边界，完成目标用户、核心使用场景及产品价值主张设计，推动产品从创意概念落地为可演示的完整产品方案。", highlights: ["桌面冰球机械臂", "目标用户、核心使用场景及产品价值主张设计"] },
      { lead: "智能语音交互设计：", body: "负责产品语音交互体系设计，规划机器人在不同场景下的主动搭话、垃圾话互动、模型选择及对话触发机制，设计“主动交互 + 游戏反馈”的交互逻辑，提升产品趣味性与用户参与度。", highlights: ["产品语音交互体系设计", "主动搭话、垃圾话互动、模型选择及对话触发机制"] },
      { lead: "路演与产品表达：", body: "负责项目前期的采访、评审讲解以及路演演讲，围绕用户痛点、产品定位、核心功能及商业价值构建完整叙事框架，向评审展示产品创新性与落地价值。", highlights: ["前期的采访、评审讲解以及路演演讲"] },
      { lead: "核心成果：", body: "获全国最大具身智能黑客松「探月计划」最佳团队协作奖，获得奖金 2000 元及探月投资孵化直通卡。", highlights: ["最佳团队协作奖", "奖金 2000 元及探月投资孵化直通卡"] },
    ],
  },
  delivery: {
    kicker: "浪潮云 · 即将上市",
    title: "配送巡检复合机器人",
    summary: "浪潮云与山东大学研发团队合作项目，由我担任浪潮云侧产品负责人。",
    bullets: [
      { lead: "从 0-1 产品定义：", body: "主导与山东大学研发团队合作全流程——产品需求定义、竞品调研（越凡创新、算丰科技、中科重德、穿山甲）、技术规格明确、方案设计及研发里程碑跟踪。", highlights: ["产品需求定义、竞品调研", "技术规格明确、方案设计及研发里程碑跟踪"] },
      { lead: "整机 BOM 与硬件选型：", body: "主导四轮线控移动底盘选型，从承载能力、户外通过性、国产化率与价格四个维度对比候选方案；参与整机 BOM 清单管理与上装结构设计沟通。", highlights: ["四轮线控移动底盘选型", "整机 BOM 清单管理"] },
      { lead: "模块化硬件架构：", body: "基于“线控底盘 + 模块化载荷 + 统一调度大脑”三层硬件解耦架构，定义本体接口标准与载荷扩展规则，使后续新增任务模块的开发周期显著缩短。", highlights: ["三层硬件解耦架构", "本体接口标准与载荷扩展规则"] },
      { lead: "C 端产品与样机验证：", body: "独立输出配送服务 C 端小程序原型图并主导多轮迭代；实体机器人交付后主导功能验证测试，识别运行逻辑与产品体验问题，反推研发优化。", highlights: ["C 端小程序原型图", "功能验证测试"] },
    ],
  },
  dispatch: {
    kicker: "浪潮云 · 已上市销售",
    title: "海若具身智能调度平台",
    summary: "连接异构机器人、边缘算力和真实政企客户的具身智能调度管理平台。",
    bullets: [
      { lead: "产品迭代与异构兼容设计：", body: "接手前任 PM 初版定义后，主导产品逻辑优化与核心模块定义重构，重新设计任务模板、地图模板等模块的业务逻辑，提升对异构硬件设备的接入与兼容能力；定义“一脑多形 + 一盒多形 + 确定性大脑”差异化定位。", highlights: ["产品逻辑优化与核心模块定义重构", "一脑多形 + 一盒多形 + 确定性大脑"] },
      { lead: "硬件选型：", body: "为满足“一盒多形”的产品需求，与六联智能、天数智芯沟通选型需求，从算力、CPU、显存、尺寸等维度输出选型评估矩阵。", highlights: ["算力、CPU、显存、尺寸", "选型评估矩阵"] },
      { lead: "商业化落地：", body: "主导多家政企客户的方案讲解与技术答疑，配合销售团队推进商机；产品已签约 2 套，营收 70.7 万元，成为浪潮云具身业务线首个商业闭环产品。", highlights: ["已签约 2 套，营收 70.7 万元", "首个商业闭环产品"] },
    ],
  },
  grid: {
    kicker: "国家电网 · POC 验证中",
    title: "空地协同输电作业机器人",
    summary: "面向高压带电作业极端工况，将业务需求转化为可验证的整机方案。",
    bullets: [
      { lead: "客户与硬件需求转化：", body: "参与国网山东省公司 2 次需求对接会，将带电作业业务需求转化为产品硬件规格——输出作业半径、负载、续航、防电磁干扰等硬件约束边界与需求文档。", highlights: ["国网山东省公司", "作业半径、负载、续航、防电磁干扰"] },
      { lead: "供应商选型与 BOM：", body: "主导机械臂候选厂商（节卡、睿尔曼、越疆、Clau）产品手册研究，从负载、精度、接口开放度、防护等级、价格 5 个维度输出选型评估矩阵，重点考察接口开放度（VLA 模型适配）与防护等级（户外带电作业适配）。", highlights: ["5 个维度输出选型评估矩阵", "VLA 模型适配"] },
      { lead: "硬件架构与跨团队协同：", body: "输出项目整体硬件架构图（无人机平台层 + 模块化双臂作业层 + 地面控制层）；对齐无人机与机械臂两个外部生态供应商研发节奏，推动里程碑同步。", highlights: ["整体硬件架构图", "推动里程碑同步"] },
      { lead: "作业安全与失效设计：", body: "基于高压带电作业极端工况，参与定义紧急停机、电磁干扰防护、失效模式响应等作业安全要求，确保产品满足国网带电作业规范。", highlights: ["紧急停机、电磁干扰防护、失效模式响应"] },
      { lead: "战略复用价值：", body: "项目落地后可向山东省国家电网 16 地市公司复制，延展至南方电网、铁路接触网、风电塔筒等同类高空带电作业场景。", highlights: ["山东省国家电网 16 地市公司", "南方电网、铁路接触网、风电塔筒"] },
    ],
  },
  cube: {
    kicker: "前瞻硬件方向探索",
    title: "家庭 AI 终端 AI CUBE",
    summary: "围绕本地大模型、家庭多模态数据和隐私边界展开的前瞻硬件探索。",
    bullets: [
      { lead: "从 0 到 1 产品定义：", body: "1 个月内完成产品规划 PPT 撰写、项目进度规划与工程样机表盘形态定义；基于公司“本地大模型 + 家庭 AI 硬件”战略，评估本地推理芯片候选方案、多模态传感器组合与全屋设备协同接口标准。", highlights: ["本地大模型 + 家庭 AI 硬件", "本地推理芯片候选方案、多模态传感器组合"] },
      { lead: "差异化定位：", body: "协同推动“数字记忆图谱 + 本地隐私围栏 + 生态算力分发”三层差异化定位，参与产品外观形态决策与硬件架构方向探索。", highlights: ["数字记忆图谱 + 本地隐私围栏 + 生态算力分发"] },
      { lead: "战略前瞻性验证：", body: "所探索的“本地大模型推理 + 家庭多模态数据底座”两大核心方向，与 2026 年初行业明星产品 OpenClaw 在产品形态与技术路径选择上高度吻合；项目因公司聚焦 B/G 端战略而被迫中止。", highlights: ["本地大模型推理 + 家庭多模态数据底座", "OpenClaw"] },
    ],
  },
  startup: {
    kicker: "山东海明国际贸易 · 创始人 & CEO",
    title: "跨境硬件创业",
    summary: "独立跑通从 SKU 规划、供应链搭建，到获客、履约和复购的跨境 B2B 硬件商业闭环。",
    bullets: [
      { lead: "SKU 与硬件品类规划：", body: "主导五金硬件品类用户画像分析，识别 ToB（工业批发商）与 ToC（DIY 零售）两大类、6 个细分核心需求，制定 SKU 结构与硬件品类产品线规划，实现从 0 到 1 的硬件品类商业化方案。", highlights: ["SKU 结构", "从 0 到 1 的硬件品类商业化方案"] },
      { lead: "供应链体系搭建：", body: "建立供应商评估体系与物流服务评分机制，推动采购、仓储、运输履约环节标准化操作，采购成本降低 15%、物流费用降低 20%。", highlights: ["采购成本降低 15%、物流费用降低 20%"] },
      { lead: "客户与流量增长：", body: "搭建标准化询盘转化漏斗，客户转化率由 10% 提升至 25%（+150%）；构建 SEO + 投流双轮增长，平台流量超过 10 倍增长。", highlights: ["客户转化率由 10% 提升至 25%（+150%）", "平台流量超过 10 倍增长"] },
      { lead: "核心成果：", body: "年 GMV 达到 117 万元，复购率 15%，单笔订单 20 万元+；积累硬件品类供应链与跨境履约能力。", highlights: ["年 GMV 达到 117 万元，复购率 15%，单笔订单 20 万元+", "硬件品类供应链与跨境履约能力"] },
    ],
  },
  byd: {
    kicker: "比亚迪 · 智能驾驶算法工程师",
    title: "智能驾驶边界识别",
    summary: "2022.12-2023.06 · 在复杂光照与道路场景中提升边界识别鲁棒性。",
    bullets: [
      { lead: "边界识别策略设计：", body: "独立设计“底边最优点选择策略”，结合颜色特征与 Canny 边缘检测算法，在不同光照条件与复杂场景下提升边界识别鲁棒性，平均识别准确率提升 19%。", highlights: ["底边最优点选择策略", "平均识别准确率提升 19%"] },
      { lead: "SLAM 技术调研：", body: "协助 SLAM 技术路径调研与方案选型，系统对比分析多种激光雷达测距算法性能，对 VI-NS Mono 等主流算法输入接口进行适配性评估，提出关键技术路径建议，助力团队完成技术决策与项目交付。", highlights: ["SLAM 技术路径调研与方案选型", "关键技术路径建议"] },
    ],
  },
};

const EASTER_CONTENT = {
  star: ["DISCOVERY 01", "保持好奇，是一切产品的起点。"],
  trophy: ["DISCOVERY 02", "真正的胜利，是让每个人都成为方案的一部分。"],
  circuit: ["DISCOVERY 03", "电流经过硬件，需求才真正进入现实。"],
  plant: ["DISCOVERY 04", "边界之外，总有尚未被定义的新场景。"],
};

const animatedChapters = chapters.filter((chapter) => !chapter.classList.contains("chapter--closing"));
animatedChapters.forEach((chapter) => {
  const container = chapter.querySelector(".chapter__content");
  if (!container) return;
  const items = [];
  [...container.children].forEach((child) => {
    if (child.matches("[data-reveal-lines]")) {
      items.push(...child.children);
    } else if (child.matches(".project-list, .metrics, .frontier-list")) {
      items.push(...child.children);
    } else {
      items.push(child);
    }
  });
  const heroMeta = chapter.querySelector(":scope > .hero-meta");
  if (heroMeta) items.push(heroMeta);
  items.forEach((item, index) => {
    item.classList.add("safe-reveal");
    item.style.setProperty("--reveal-order", String(index));
  });
});
document.documentElement.classList.add("has-safe-reveal");

const textRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-text-visible", entry.isIntersecting);
  });
}, { threshold: .28, rootMargin: "0px 0px -8% 0px" });
animatedChapters.forEach((chapter) => textRevealObserver.observe(chapter));

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from, to, amount) => from + (to - from) * amount;

let targetProgress = 0;
let renderedProgress = 0;
let activeChapter = 0;
let activeScene = 0;
let previousTime = performance.now();
let particles = [];
let bursts = [];
let atmosphereTransition = { from: 0, to: 0, mix: 0 };
let activeDetailTrigger = null;
let toastTimer = 0;
let resumeReturnFocus = null;

function closeDetail(restoreFocus = true) {
  if (!detailPanel.classList.contains("is-open")) return;
  detailPanel.classList.remove("is-open");
  detailScrim.classList.remove("is-open");
  detailPanel.setAttribute("aria-hidden", "true");
  activeDetailTrigger?.setAttribute("aria-expanded", "false");
  if (restoreFocus) activeDetailTrigger?.focus();
  activeDetailTrigger = null;
}

function openDetail(trigger) {
  const content = DETAIL_CONTENT[trigger.dataset.detail];
  if (!content) return;
  activeDetailTrigger?.setAttribute("aria-expanded", "false");
  activeDetailTrigger = trigger;
  trigger.setAttribute("aria-expanded", "true");
  detailPanel.dataset.side = trigger.dataset.panelSide || "left";
  detailPanel.querySelector("[data-detail-kicker]").textContent = content.kicker;
  detailPanel.querySelector("[data-detail-title]").textContent = content.title;
  detailPanel.querySelector("[data-detail-summary]").textContent = content.summary;
  const list = detailPanel.querySelector("[data-detail-list]");
  list.replaceChildren(...content.bullets.map((bullet) => {
    const item = document.createElement("li");
    const lead = document.createElement("strong");
    lead.textContent = bullet.lead;
    item.append(lead, " ");

    let remaining = bullet.body;
    bullet.highlights.forEach((highlight) => {
      const index = remaining.indexOf(highlight);
      if (index < 0) return;
      item.append(remaining.slice(0, index));
      const emphasis = document.createElement("strong");
      emphasis.textContent = highlight;
      item.append(emphasis);
      remaining = remaining.slice(index + highlight.length);
    });
    item.append(remaining);
    return item;
  }));
  detailPanel.classList.add("is-open");
  detailScrim.classList.add("is-open");
  detailPanel.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => detailClose.focus());
}

function openResume() {
  closeDetail(false);
  resumeReturnFocus = document.activeElement;
  resumeFrame.src = resumeFrame.dataset.src;
  resumeModal.classList.add("is-open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("resume-open");
  const closeButton = resumeModal.querySelector(".resume-viewer [data-resume-close]");
  requestAnimationFrame(() => closeButton.focus());
}

function closeResume() {
  if (!resumeModal.classList.contains("is-open")) return;
  resumeModal.classList.remove("is-open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("resume-open");
  setTimeout(() => {
    if (!resumeModal.classList.contains("is-open")) resumeFrame.removeAttribute("src");
  }, 280);
  resumeReturnFocus?.focus();
  resumeReturnFocus = null;
}

function resizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(innerWidth * dpr);
  canvas.height = Math.round(innerHeight * dpr);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  createParticles();
}

function createParticles() {
  particles = Array.from({ length: 110 }, (_, index) => ({
    index,
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    size: .6 + Math.random() * 2.2,
    speed: .12 + Math.random() * .52,
    drift: (Math.random() - .5) * .32,
    phase: Math.random() * Math.PI * 2,
    color: ["#a7ff37", "#ff3aa8", "#18e1ff", "#9e52ff"][index % 4],
  }));
}

function sceneParticleLimit(scene) {
  return [105, 48, 34, 42, 58][scene] ?? 48;
}

function particleMotion(scene, particle, time) {
  if (scene === 1) return { x: Math.sin(time * .0015 + particle.phase) * .35, y: particle.speed * 1.8 };
  if (scene === 2) return { x: particle.drift, y: -particle.speed * .7 };
  if (scene === 3) return { x: Math.sin(time * .001 + particle.phase) * .16, y: Math.cos(time * .0012 + particle.phase) * .11 };
  if (scene === 4) return { x: particle.speed * .09, y: -particle.speed * .06 };
  return { x: particle.speed * .08, y: Math.sin(time * .0008 + particle.phase) * .025 };
}

function drawParticleStyle(scene, particle, time, opacity) {
  if (opacity <= .005 || particle.index >= sceneParticleLimit(scene)) return;
  context.save();
  context.globalAlpha = opacity;

  if (scene === 0) {
    const alpha = .18 + (Math.sin(time * .002 + particle.phase) + 1) * .22;
    context.fillStyle = `rgba(219,231,255,${alpha})`;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
  } else if (scene === 1) {
    const confettiSize = 3 + particle.size * 2.2;
    context.translate(particle.x, particle.y);
    context.rotate(time * .001 + particle.phase);
    context.fillStyle = particle.color;
    context.fillRect(-confettiSize / 2, -confettiSize, confettiSize, confettiSize * 2);
  } else if (scene === 2) {
    context.strokeStyle = "rgba(54,238,255,.72)";
    context.lineWidth = particle.size * .55;
    context.beginPath();
    context.moveTo(particle.x, particle.y);
    context.lineTo(particle.x + particle.drift * 8, particle.y + 6 + particle.size * 3);
    context.stroke();
  } else if (scene === 3) {
    const glow = .25 + (Math.sin(time * .002 + particle.phase) + 1) * .24;
    const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 5);
    gradient.addColorStop(0, `rgba(140,255,131,${glow})`);
    gradient.addColorStop(1, "rgba(140,255,131,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2);
    context.fill();
  } else {
    const alpha = .12 + (Math.sin(time * .0017 + particle.phase) + 1) * .16;
    context.fillStyle = `rgba(156,247,218,${alpha})`;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size * 1.3, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function triggerBurst(x, y, color = "#a7ff37") {
  bursts.push(...Array.from({ length: 22 }, (_, index) => ({
    x,
    y,
    vx: Math.cos((index / 22) * Math.PI * 2) * (1.1 + Math.random() * 2.3),
    vy: Math.sin((index / 22) * Math.PI * 2) * (1.1 + Math.random() * 2.3),
    life: 1,
    size: 1 + Math.random() * 2.4,
    color,
  })));
}

function drawAtmosphere(time) {
  if (reducedMotion.matches) return;
  context.clearRect(0, 0, innerWidth, innerHeight);
  const { from, to, mix } = atmosphereTransition;
  const easedMix = mix * mix * (3 - 2 * mix);

  for (const particle of particles) {
    const fromMotion = particleMotion(from, particle, time);
    const toMotion = particleMotion(to, particle, time);
    particle.x += lerp(fromMotion.x, toMotion.x, easedMix);
    particle.y += lerp(fromMotion.y, toMotion.y, easedMix);
    if (particle.x > innerWidth + 20) particle.x = -20;
    if (particle.x < -20) particle.x = innerWidth + 20;
    if (particle.y > innerHeight + 20) particle.y = -20;
    if (particle.y < -20) particle.y = innerHeight + 20;
    drawParticleStyle(from, particle, time, 1 - easedMix);
    if (to !== from) drawParticleStyle(to, particle, time, easedMix);
  }

  bursts = bursts.filter((burst) => burst.life > .02);
  for (const burst of bursts) {
    burst.x += burst.vx;
    burst.y += burst.vy;
    burst.vx *= .976;
    burst.vy *= .976;
    burst.life *= .955;
    context.save();
    context.globalAlpha = burst.life;
    context.fillStyle = burst.color;
    context.beginPath();
    context.arc(burst.x, burst.y, burst.size, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}

function readScroll() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  targetProgress = clamp(scrollY / maxScroll);
}

function sceneBlend(progress) {
  const viewportCenter = progress * (document.documentElement.scrollHeight - innerHeight) + innerHeight / 2;
  const centers = chapters.map((chapter) => chapter.offsetTop + chapter.offsetHeight / 2);

  if (viewportCenter <= centers[0]) return { from: 0, to: 0, mix: 0, chapter: 0 };
  if (viewportCenter >= centers.at(-1)) {
    const last = chapters.length - 1;
    return { from: last, to: last, mix: 0, chapter: last };
  }

  for (let index = 0; index < centers.length - 1; index += 1) {
    if (viewportCenter >= centers[index] && viewportCenter < centers[index + 1]) {
      const mix = clamp((viewportCenter - centers[index]) / (centers[index + 1] - centers[index]));
      return { from: index, to: index + 1, mix, chapter: mix < .5 ? index : index + 1 };
    }
  }
  return { from: 0, to: 0, mix: 0, chapter: 0 };
}

function updateLayers(progress, time) {
  const blend = sceneBlend(progress);
  const weights = new Array(layers.length).fill(0);
  const fromScene = Number(chapters[blend.from].dataset.scene);
  const toScene = Number(chapters[blend.to].dataset.scene);
  atmosphereTransition = { from: fromScene, to: toScene, mix: blend.mix };
  weights[fromScene] += 1 - blend.mix;
  weights[toScene] += blend.mix;

  layers.forEach((layer, index) => {
    const opacity = weights[index];
    layer.style.opacity = opacity.toFixed(4);
    layer.classList.toggle("is-visible", opacity > .01);

    const image = layer.querySelector("img");
    const breath = Math.sin(time * .00018 + index * 1.7);
    const scrollWave = Math.sin((progress * 1.5 + index * .18) * Math.PI * 2);
    const transforms = [
      { x: -2.2 + progress * 4.5 + breath * .35, y: breath * .35, scale: 1.075 + progress * .035 },
      { x: 2.4 - progress * 5 + breath * .3, y: -1.2 + progress * 2, scale: 1.09 + scrollWave * .015 },
      { x: -1.6 + progress * 3.4, y: 1.2 - progress * 2.4 + breath * .25, scale: 1.08 + progress * .045 },
      { x: 2.2 - progress * 4.3 + breath * .25, y: -.8 + progress * 1.6, scale: 1.095 + scrollWave * .012 },
      { x: 1.8 - progress * 3.2 + breath * .2, y: -.4 + progress * .8, scale: 1.075 + scrollWave * .01 },
    ][index];
    image.style.transform = `translate3d(${transforms.x}%, ${transforms.y}%, 0) scale(${transforms.scale})`;
  });

  if (blend.chapter !== activeChapter) {
    closeDetail(false);
    activeChapter = blend.chapter;
    chapterNumber.textContent = String(activeChapter + 1).padStart(2, "0");
    document.body.dataset.chapter = String(activeChapter);
  }

  const nextScene = Number(chapters[activeChapter].dataset.scene);
  if (nextScene !== activeScene) {
    activeScene = nextScene;
    document.body.dataset.scene = String(activeScene);
  }

  const scanOpacity = weights[2] * .8;
  stage.style.setProperty("--scan-opacity", scanOpacity.toFixed(3));
  stage.style.setProperty("--scan-x", `${-75 + progress * 150}%`);
}

function animateMetric(element) {
  if (element.dataset.counted === "true") return;
  element.dataset.counted = "true";
  const target = Number(element.dataset.count);
  const decimals = Number(element.dataset.decimals || 0);
  const prefix = element.dataset.prefix || "";
  if (reducedMotion.matches) {
    element.textContent = `${prefix}${target.toFixed(decimals)}`;
    return;
  }

  const startedAt = performance.now();
  const duration = 1200;
  const tick = (now) => {
    const progress = clamp((now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${prefix}${(target * eased).toFixed(decimals)}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function revealEasterEgg(trigger) {
  const content = EASTER_CONTENT[trigger.dataset.easter];
  if (!content) return;
  trigger.classList.remove("is-found");
  void trigger.offsetWidth;
  trigger.classList.add("is-found");
  discoveryLabel.textContent = content[0];
  discoveryText.textContent = content[1];
  discoveryToast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => discoveryToast.classList.remove("is-visible"), 4200);

  const rect = trigger.getBoundingClientRect();
  const colors = { trophy: "#ff3aa8", circuit: "#18e1ff", plant: "#8cff83" };
  triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, colors[trigger.dataset.easter] || "#a7ff37");
}

function render(time) {
  const delta = Math.min(.05, (time - previousTime) / 1000);
  previousTime = time;
  renderedProgress = reducedMotion.matches
    ? targetProgress
    : lerp(renderedProgress, targetProgress, 1 - Math.exp(-9 * delta));

  updateLayers(renderedProgress, time);
  drawAtmosphere(time);
  progressBar.style.setProperty("--page-progress", renderedProgress.toFixed(4));
  requestAnimationFrame(render);
}

addEventListener("scroll", readScroll, { passive: true });
addEventListener("resize", () => { resizeCanvas(); readScroll(); });
reducedMotion.addEventListener("change", () => { createParticles(); });
detailTriggers.forEach((trigger) => trigger.addEventListener("click", () => openDetail(trigger)));
easterEggs.forEach((trigger) => trigger.addEventListener("click", () => revealEasterEgg(trigger)));
detailClose.addEventListener("click", () => closeDetail());
detailScrim.addEventListener("click", () => closeDetail());
resumeOpen.addEventListener("click", openResume);
resumeCloseButtons.forEach((button) => button.addEventListener("click", closeResume));
addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (resumeModal.classList.contains("is-open")) closeResume();
    else closeDetail();
  }
});

const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateMetric(entry.target);
      metricObserver.unobserve(entry.target);
    }
  });
}, { threshold: .55 });
metricValues.forEach((metric) => metricObserver.observe(metric));

resizeCanvas();
readScroll();
document.body.dataset.scene = "0";
document.body.dataset.chapter = "0";
requestAnimationFrame(render);
