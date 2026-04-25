import { predictMlPressure } from './mlPressureModel.js';

export const storageKeys = {
  assessmentHistory: 'mh_assessment_history',
  emotionLogs: 'mh_emotion_logs',
  appointments: 'mh_appointments',
};

export const surveyInsights = {
  sampleSize: 199,
  avgTotalScore: 67.1,
  scoreRange: '20-100',
  pressureOverview: [
    { label: '轻度压力', value: 137, percent: 69, tone: 'blue' },
    { label: '中度压力', value: 52, percent: 26, tone: 'yellow' },
    { label: '无明显压力', value: 6, percent: 3, tone: 'green' },
    { label: '重度压力', value: 4, percent: 2, tone: 'red' },
  ],
  coreLoop: [
    { label: '筛查', desc: 'SMSHS 自评量表' },
    { label: '评估', desc: '维度分与总分' },
    { label: '干预', desc: '课程与预约' },
    { label: '跟踪', desc: '情绪档案趋势' },
  ],
  dimensionAverages: [
    { label: '升学/就业竞争', value: 3.62, desc: '考研、医院招聘、岗位稀缺带来的持续压力' },
    { label: '学业考核', value: 3.48, desc: '期末、执业医、四六级和考研备考叠加' },
    { label: '专业课程学习', value: 3.42, desc: '解剖、病理、药理等课程难度与知识量' },
    { label: '职业规划', value: 3.42, desc: '择校、就业方向、规培前景和科室选择' },
    { label: '临床实践', value: 3.29, desc: '医患沟通、操作不熟练和急诊场景应对' },
    { label: '时间平衡', value: 3.22, desc: '学习、实习、学生工作和生活难以兼顾' },
    { label: '身心适应', value: 3.06, desc: '作息不规律、疲劳和情绪调节困难' },
    { label: '人际关系', value: 3.04, desc: '同学、老师、带教医生、患者沟通摩擦' },
    { label: '家庭期待', value: 3.01, desc: '家人对学业与就业的高期待' },
    { label: '经济压力', value: 2.81, desc: '学费、生活费、备考和实习成本' },
  ],
  topSources: [
    { label: '专业课程学习', value: 166 },
    { label: '职业规划与就业压力', value: 130 },
    { label: '临床实践', value: 105 },
    { label: '学业与生活平衡', value: 81 },
  ],
  topImpacts: [
    { label: '情绪低落、烦躁、焦虑', value: 114 },
    { label: '学习效率降低', value: 110 },
    { label: '注意力不集中', value: 98 },
    { label: '睡眠障碍', value: 74 },
  ],
  topFeatures: [
    { label: '智能压力测评', value: 102 },
    { label: '心理咨询预约', value: 86 },
    { label: '课程/资源库', value: 79 },
    { label: '情绪日记', value: 67 },
  ],
  topServices: [
    { label: '压力源精准测评', value: 79 },
    { label: '一对一专业心理咨询', value: 77 },
    { label: '压力调节技巧课程', value: 63 },
    { label: '团体辅导/减压沙龙', value: 62 },
  ],
  preference: '线上+线下结合',
};

export const assessmentOptions = [
  { label: '从不', value: 1, desc: '几乎没有出现' },
  { label: '偶尔', value: 2, desc: '一周 1-2 天' },
  { label: '经常', value: 3, desc: '一周 3-4 天' },
  { label: '持续', value: 4, desc: '几乎每天' },
];

export const dimensionMeta = {
  mood: {
    name: '情绪低落',
    color: '#ea4335',
    weight: 0.26,
    advice: '先降低任务密度，安排一次可完成的小目标，并和可信任的人保持连接。',
  },
  anxiety: {
    name: '焦虑紧张',
    color: '#fbbc04',
    weight: 0.27,
    advice: '用 4-7-8 呼吸、考试清单和时间块拆分，减少不确定感。',
  },
  fatigue: {
    name: '身心疲惫',
    color: '#34a853',
    weight: 0.23,
    advice: '优先恢复睡眠和进食节律，给临床/学习日程留出缓冲。',
  },
  support: {
    name: '支持感不足',
    color: '#1a73e8',
    weight: 0.24,
    advice: '建议预约一次辅导或加入同伴支持，避免独自承担高压事件。',
  },
};

export const assessmentQuestions = [
  { id: 'q1', dimension: 'mood', text: '过去两周，我常感到情绪低落、空落或提不起兴趣。' },
  { id: 'q2', dimension: 'mood', text: '面对专业课或实习任务时，我容易产生无力感。' },
  { id: 'q3', dimension: 'mood', text: '我会因为成绩、排名或未来选择而否定自己。' },
  { id: 'q4', dimension: 'mood', text: '我很难从休息、娱乐或社交中获得放松。' },
  { id: 'q5', dimension: 'anxiety', text: '我经常担心考试、考研、规培或就业结果。' },
  { id: 'q6', dimension: 'anxiety', text: '临床沟通、操作考核或突发场景会让我明显紧张。' },
  { id: 'q7', dimension: 'anxiety', text: '我会反复想象不好的结果，难以停止担忧。' },
  { id: 'q8', dimension: 'anxiety', text: '我因为压力出现心慌、胸闷、胃口变化或睡眠变浅。' },
  { id: 'q9', dimension: 'fatigue', text: '我觉得学习、实习和生活时间经常失衡。' },
  { id: 'q10', dimension: 'fatigue', text: '长期熬夜或疲劳影响了我的学习效率。' },
  { id: 'q11', dimension: 'fatigue', text: '我很难在高强度课程后恢复精力。' },
  { id: 'q12', dimension: 'fatigue', text: '我会因为任务太多而拖延或逃避。' },
  { id: 'q13', dimension: 'support', text: '当我压力很大时，我不知道该向谁求助。' },
  { id: 'q14', dimension: 'support', text: '我担心寻求心理帮助会被误解或贴标签。' },
  { id: 'q15', dimension: 'support', text: '家庭期待或同伴比较让我更难表达真实压力。' },
  { id: 'q16', dimension: 'support', text: '我能够主动使用学校资源或同伴支持来调节压力。', reverse: true },
];

export const courses = [
  {
    id: 'course-1',
    category: '学业压力',
    title: '考试周压力急救包',
    duration: '18 分钟',
    level: '轻量',
    desc: '把复习焦虑拆成可执行任务，配合番茄钟和错题回收。',
  },
  {
    id: 'course-2',
    category: '临床实践',
    title: '医患沟通前的 5 分钟稳定练习',
    duration: '12 分钟',
    level: '场景',
    desc: '围绕问诊前准备、表达脚本和突发反馈进行演练。',
  },
  {
    id: 'course-3',
    category: '就业规划',
    title: '考研与就业双线决策表',
    duration: '25 分钟',
    level: '工具',
    desc: '用价值排序、风险评估和下一步行动降低选择焦虑。',
  },
  {
    id: 'course-4',
    category: '睡眠恢复',
    title: '熬夜后的身心恢复流程',
    duration: '15 分钟',
    level: '恢复',
    desc: '从光照、饮食、短休息和夜间节律四个环节恢复能量。',
  },
  {
    id: 'course-5',
    category: '情绪管理',
    title: '焦虑高峰的呼吸与落地技术',
    duration: '10 分钟',
    level: '即时',
    desc: '4-7-8 呼吸、五感定位和自我对话，适合临考或实习前。',
  },
  {
    id: 'course-6',
    category: '同伴支持',
    title: '如何向同学或老师发出求助信号',
    duration: '14 分钟',
    level: '沟通',
    desc: '提供三段式表达模板，帮助你把压力说清楚。',
  },
];

export const counselors = [
  {
    id: 'teacher-lin',
    name: '林老师',
    title: '医学心理咨询师',
    tags: ['学业压力', '焦虑管理', '考研规划'],
    desc: '擅长帮助医学生拆解长期学业压力和考试焦虑。',
    slots: ['周一 19:00', '周三 16:30', '周五 20:00'],
  },
  {
    id: 'doctor-chen',
    name: '陈医生',
    title: '精神心理科医师',
    tags: ['睡眠', '情绪低落', '身心症状'],
    desc: '关注睡眠、躯体化压力反应和持续情绪困扰。',
    slots: ['周二 18:30', '周四 15:00', '周六 10:00'],
  },
  {
    id: 'mentor-zhou',
    name: '周导员',
    title: '学生发展导师',
    tags: ['临床实践', '人际关系', '资源转介'],
    desc: '适合需要学校资源对接、实习沟通和学习安排支持的同学。',
    slots: ['周一 12:30', '周三 20:30', '周日 09:30'],
  },
];

export const emotionTags = ['焦虑', '低落', '烦躁', '疲惫', '迷茫', '平静', '有动力', '需要支持'];

const levelRules = [
  { max: 29, label: '稳定', tone: 'green', desc: '整体状态较稳定，继续保持规律记录。' },
  { max: 49, label: '轻度压力', tone: 'blue', desc: '已出现一些压力信号，适合用课程和情绪记录提前干预。' },
  { max: 69, label: '中度压力', tone: 'yellow', desc: '压力正在影响学习效率或睡眠，建议预约辅导并持续跟踪。' },
  { max: 100, label: '高压预警', tone: 'red', desc: '压力水平较高，请尽快联系老师、咨询师或校医院获得支持。' },
];

export function formatDate(dateInput) {
  const date = dateInput ? new Date(dateInput) : new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
}

export function readStorageList(key) {
  try {
    const list = wx.getStorageSync(key);
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return [];
  }
}

export function prependStorageItem(key, item, limit = 30) {
  const list = readStorageList(key);
  const next = [item].concat(list).slice(0, limit);
  wx.setStorageSync(key, next);
  return next;
}

export function getLatestAssessment() {
  const history = readStorageList(storageKeys.assessmentHistory);
  return history.length ? history[0] : null;
}

export function calculateAssessment(answers) {
  const dimensionTotals = {};
  Object.keys(dimensionMeta).forEach((key) => {
    dimensionTotals[key] = {
      raw: 0,
      count: 0,
    };
  });

  assessmentQuestions.forEach((question) => {
    const original = Number(answers[question.id] || 1);
    const score = question.reverse ? 5 - original : original;
    dimensionTotals[question.dimension].raw += score;
    dimensionTotals[question.dimension].count += 1;
  });

  const dimensionSummaries = Object.keys(dimensionMeta).map((key) => {
    const meta = dimensionMeta[key];
    const total = dimensionTotals[key];
    const min = total.count;
    const max = total.count * 4;
    const percent = Math.round(((total.raw - min) / (max - min)) * 100);
    return {
      key,
      name: meta.name,
      raw: total.raw,
      max,
      percent,
      color: meta.color,
      advice: meta.advice,
    };
  });

  const rawTotal = dimensionSummaries.reduce((sum, item) => sum + item.raw, 0);
  const scaleScore = Math.round(((rawTotal - assessmentQuestions.length) / (assessmentQuestions.length * 3)) * 100);
  const modelScore = Math.round(
    dimensionSummaries.reduce((sum, item) => sum + item.percent * dimensionMeta[item.key].weight, 0),
  );
  const stressIndex = Math.min(100, Math.max(0, Math.round(scaleScore * 0.58 + modelScore * 0.42)));
  const level = levelRules.find((item) => stressIndex <= item.max) || levelRules[levelRules.length - 1];
  const riskDimension = dimensionSummaries.slice().sort((a, b) => b.percent - a.percent)[0];
  const mlAuxiliary = predictMlPressure(dimensionSummaries, stressIndex);

  return {
    id: `mh_${Date.now()}`,
    createdAt: new Date().toISOString(),
    createdLabel: formatDate(),
    rawTotal,
    maxTotal: assessmentQuestions.length * 4,
    scaleScore,
    modelScore,
    stressIndex,
    mlAuxiliary,
    level,
    riskDimension,
    dimensionSummaries,
    adviceList: [
      riskDimension.advice,
      '连续 7 天记录情绪与睡眠，可帮助系统判断压力是否正在缓解。',
      '如果出现持续失眠、明显绝望感或自伤想法，请立刻联系辅导员、校医院或当地急救资源。',
    ],
    modelSignals: [
      { label: '量表总分', value: scaleScore, desc: '来自 SMSHS 自评题目的标准化得分' },
      { label: '回归估计', value: modelScore, desc: '按情绪、焦虑、疲惫、支持感四维权重估计' },
      { label: '最高风险维度', value: riskDimension.percent, desc: riskDimension.name },
    ],
    answers,
  };
}

export function saveAssessmentResult(result) {
  return prependStorageItem(storageKeys.assessmentHistory, result, 20);
}

export function saveEmotionLog(log) {
  return prependStorageItem(storageKeys.emotionLogs, log, 40);
}

export function saveAppointment(appointment) {
  return prependStorageItem(storageKeys.appointments, appointment, 20);
}
