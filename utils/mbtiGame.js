export const mbtiDimensionPairs = [
  {
    key: 'EI',
    label: '能量来源',
    left: 'E',
    right: 'I',
    leftLabel: '外向 E',
    rightLabel: '内向 I',
    hint: '你更容易从互动里点亮，还是从独处里恢复。',
  },
  {
    key: 'SN',
    label: '信息偏好',
    left: 'S',
    right: 'N',
    leftLabel: '感觉 S',
    rightLabel: '直觉 N',
    hint: '你更习惯抓事实细节，还是先看图景和可能性。',
  },
  {
    key: 'TF',
    label: '决策方式',
    left: 'T',
    right: 'F',
    leftLabel: '思考 T',
    rightLabel: '情感 F',
    hint: '你更偏向逻辑权衡，还是更在意关系和感受。',
  },
  {
    key: 'JP',
    label: '生活节奏',
    left: 'J',
    right: 'P',
    leftLabel: '判断 J',
    rightLabel: '感知 P',
    hint: '你更喜欢计划确定，还是给自己保留弹性空间。',
  },
];

export const mbtiQuestions = [
  {
    id: 'ei-1',
    dimension: 'EI',
    prompt: '新学期第一次小组会，你通常会怎样进入状态？',
    options: [
      { key: 'E', title: '先主动破冰', desc: '边聊边认识人，顺手把气氛带起来。' },
      { key: 'I', title: '先观察再开口', desc: '先听清楚氛围，想好后再表达。' },
    ],
  },
  {
    id: 'ei-2',
    dimension: 'EI',
    prompt: '忙完一整周之后，你更喜欢怎么给自己充电？',
    options: [
      { key: 'E', title: '和朋友出去走走', desc: '边逛边聊，会感觉自己重新活过来。' },
      { key: 'I', title: '一个人安静待会儿', desc: '独处、看书或听歌更能回电。' },
    ],
  },
  {
    id: 'ei-3',
    dimension: 'EI',
    prompt: '当你压力比较大时，你更可能怎么处理？',
    options: [
      { key: 'E', title: '找人聊出来', desc: '说着说着，思路和情绪都会松一点。' },
      { key: 'I', title: '先自己消化', desc: '会先整理情绪，等想清楚再说。' },
    ],
  },
  {
    id: 'ei-4',
    dimension: 'EI',
    prompt: '班级活动临时缺一个主持或组织者，你会？',
    options: [
      { key: 'E', title: '愿意顶上去', desc: '现场调度和互动会让你很快进入角色。' },
      { key: 'I', title: '更想做幕后', desc: '你会把流程、资料或总结做得更稳。' },
    ],
  },
  {
    id: 'sn-1',
    dimension: 'SN',
    prompt: '学习一个全新的知识点时，你通常先抓什么？',
    options: [
      { key: 'S', title: '定义、步骤和例子', desc: '先把具体内容摸透再说。' },
      { key: 'N', title: '整体逻辑和应用想象', desc: '先知道它为什么重要、能延伸到哪里。' },
    ],
  },
  {
    id: 'sn-2',
    dimension: 'SN',
    prompt: '做病例分析时，你更自然的切入点是？',
    options: [
      { key: 'S', title: '逐项核对现有证据', desc: '从症状、指标和已知信息往下推。' },
      { key: 'N', title: '先搭一个可能性框架', desc: '先看几种方向，再去验证细节。' },
    ],
  },
  {
    id: 'sn-3',
    dimension: 'SN',
    prompt: '安排一次外出或比赛行程时，你先想的是？',
    options: [
      { key: 'S', title: '时间地点和具体细节', desc: '先把能执行的部分排稳。' },
      { key: 'N', title: '整体体验和可能收获', desc: '先看这件事能不能带来新的感受。' },
    ],
  },
  {
    id: 'sn-4',
    dimension: 'SN',
    prompt: '听别人讲一个未来计划时，你最容易先追问？',
    options: [
      { key: 'S', title: '具体怎么落地', desc: '你会本能关心步骤、资源和时间线。' },
      { key: 'N', title: '还有哪些可能性', desc: '你会继续延展愿景和潜在空间。' },
    ],
  },
  {
    id: 'tf-1',
    dimension: 'TF',
    prompt: '朋友来找你倾诉时，你第一反应更接近哪种？',
    options: [
      { key: 'T', title: '帮他分析问题', desc: '想尽快找出原因和解决办法。' },
      { key: 'F', title: '先接住情绪', desc: '先让对方觉得被理解、被看见。' },
    ],
  },
  {
    id: 'tf-2',
    dimension: 'TF',
    prompt: '小组分工时，你会更看重？',
    options: [
      { key: 'T', title: '谁最适合做什么', desc: '效率和能力匹配优先。' },
      { key: 'F', title: '每个人是否都舒服', desc: '关系状态和感受同样重要。' },
    ],
  },
  {
    id: 'tf-3',
    dimension: 'TF',
    prompt: '面对争议或冲突时，你通常最先抓住的是？',
    options: [
      { key: 'T', title: '逻辑和标准', desc: '先看这件事是否成立、有没有依据。' },
      { key: 'F', title: '语气和情绪', desc: '会先感觉到谁被冒犯或忽视了。' },
    ],
  },
  {
    id: 'tf-4',
    dimension: 'TF',
    prompt: '当你需要做一个重要决定时，你更依赖？',
    options: [
      { key: 'T', title: '利弊清单', desc: '把变量列清楚会让你更安心。' },
      { key: 'F', title: '内心价值感', desc: '是否符合自己真正认同的方向更重要。' },
    ],
  },
  {
    id: 'jp-1',
    dimension: 'JP',
    prompt: '一个截止日期在一周后的任务，你通常会怎么开始？',
    options: [
      { key: 'J', title: '立刻拆分计划', desc: '先排时间节点，心里才踏实。' },
      { key: 'P', title: '先留一点弹性', desc: '先观察状态，再逐步推进。' },
    ],
  },
  {
    id: 'jp-2',
    dimension: 'JP',
    prompt: '你的桌面、笔记或文件夹更像哪一种？',
    options: [
      { key: 'J', title: '分类清晰、井井有条', desc: '秩序感会提高你的效率。' },
      { key: 'P', title: '看起来随意但自己知道', desc: '你更习惯灵活地按当下需要取用。' },
    ],
  },
  {
    id: 'jp-3',
    dimension: 'JP',
    prompt: '如果原本的安排突然被打乱，你更可能？',
    options: [
      { key: 'J', title: '先有点不适应', desc: '会想尽快重排流程，把秩序找回来。' },
      { key: 'P', title: '顺势调整就好', desc: '变化反而让你更容易切到新状态。' },
    ],
  },
  {
    id: 'jp-4',
    dimension: 'JP',
    prompt: '如果来一次短途旅行，你更偏向？',
    options: [
      { key: 'J', title: '提前列好路线和清单', desc: '心里有底，会玩得更尽兴。' },
      { key: 'P', title: '边走边看边决定', desc: '把惊喜留给现场才更有趣。' },
    ],
  },
];

const typeNicknames = {
  INTJ: '战略策划者',
  INTP: '逻辑探索者',
  ENTJ: '目标指挥官',
  ENTP: '点子发明家',
  INFJ: '洞察引路人',
  INFP: '理想共情者',
  ENFJ: '氛围组织者',
  ENFP: '灵感点燃者',
  ISTJ: '稳定执行者',
  ISFJ: '温柔守护者',
  ESTJ: '规则推进者',
  ESFJ: '关系协调者',
  ISTP: '冷静拆解者',
  ISFP: '自在体验者',
  ESTP: '临场行动派',
  ESFP: '活力气氛组',
};

const traitLabels = {
  E: '互动蓄能',
  I: '安静蓄能',
  S: '细节落地',
  N: '想法驱动',
  T: '理性判断',
  F: '关系感知',
  J: '计划推进',
  P: '弹性探索',
};

const summaryFragments = {
  E: '你通常会在互动、协作和即时反馈里更快点亮状态',
  I: '你通常会在独处、整理和深度思考里更稳定地恢复能量',
  S: '你习惯先抓住事实、步骤和眼前能落地的细节',
  N: '你会自然关注趋势、想象空间和更大的整体图景',
  T: '你做判断时更偏向逻辑、标准和问题拆解',
  F: '你做判断时更在意感受、价值和关系温度',
  J: '你喜欢把事情排进计划，确定感会让你更安心',
  P: '你更喜欢保留灵活空间，在变化里寻找自己的节奏',
};

const campusStyles = {
  E: '在小组讨论、社交活动和多人协作场景里，你往往启动得更快。',
  I: '在独立学习、安静整理和一对一交流场景里，你往往表现得更稳定。',
  S: '面对课程和任务时，你会优先抓执行步骤，因此很适合把复杂事情一点点落实。',
  N: '面对课程和任务时，你更容易从“为什么做”和“还能怎么做”里找到动力。',
  T: '在决策时你常常先看结构和逻辑，这让你很擅长理清复杂问题。',
  F: '在决策时你会自然注意他人的感受和团队氛围，因此很容易成为关系润滑剂。',
  J: '你的节奏感和推进感比较强，提前安排会给你明显的安全感。',
  P: '你对变化的适应力比较强，临场应变和自由探索会让你更舒服。',
};

const strengthSnippets = {
  E: '善于主动破冰，能把团队气氛快速带起来。',
  I: '擅长深度思考和安静输出，稳定性强。',
  S: '能把抽象目标变成具体步骤，执行扎实。',
  N: '擅长提出新点子，容易看到不同可能性。',
  T: '遇到问题时能保持理性，适合拆解复杂局面。',
  F: '能照顾关系温度，通常更懂得理解他人。',
  J: '计划感强，推进任务时节奏清楚、效率高。',
  P: '灵活度高，临场切换和随机应变能力不错。',
};

const relaxTips = {
  E: '别只靠持续社交来冲淡压力，也给自己一点真正放空的安静时间。',
  I: '别把压力全部压在心里，试着用记录或和信任的人聊聊。',
  S: '细节太多时，先分清“必须完成”和“可以稍后完成”，别让清单无限膨胀。',
  N: '如果想法太多而发散，先挑一个最小行动去落地，会更安心。',
  T: '分析能力很强，但也别忽略自己的情绪疲劳，不必总是独自硬扛。',
  F: '很会共情别人时，也记得给自己留边界，别把所有情绪都接过来。',
  J: '计划被打乱时，允许自己保留一点弹性空间，不必事事都立刻恢复秩序。',
  P: '临近截止容易堆出压力，给自己设一个轻量里程碑会轻松很多。',
};

const recommendationCatalog = {
  assessment: {
    route: 'assessment',
    title: '做一次压力测评',
    desc: '把人格风格和当前压力状态一起看，会更完整。',
  },
  emotion: {
    route: 'emotion',
    title: '连续记录 7 天情绪',
    desc: '看看哪些场景最让你充电，哪些时刻最容易掉电。',
  },
  course: {
    route: 'course',
    title: '挑一节舒压微课',
    desc: '用 5 分钟做呼吸放松或节奏调整，很适合碎片时间。',
  },
  appointment: {
    route: 'appointment',
    title: '需要时预约支持',
    desc: '如果最近状态被顶住了，可以试试找人聊聊。',
  },
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function buildLetterScores(answers) {
  const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  mbtiQuestions.forEach((question) => {
    const choice = answers[question.id];
    if (choice && scores[choice] !== undefined) {
      scores[choice] += 1;
    }
  });

  return scores;
}

function getLastChoiceForPair(pairKey, answers) {
  const pairQuestions = mbtiQuestions.filter((question) => question.dimension === pairKey);
  let lastChoice = null;

  pairQuestions.forEach((question) => {
    if (answers[question.id]) {
      lastChoice = answers[question.id];
    }
  });

  return lastChoice;
}

function buildPairResult(pair, answers, scores) {
  const leftScore = scores[pair.left];
  const rightScore = scores[pair.right];
  const total = leftScore + rightScore;
  const lastChoice = getLastChoiceForPair(pair.key, answers);
  const dominantKey =
    leftScore === rightScore ? lastChoice || pair.left : leftScore > rightScore ? pair.left : pair.right;
  const dominantLabel = dominantKey === pair.left ? pair.leftLabel : pair.rightLabel;
  const leftPercent = total ? Math.round((leftScore / total) * 100) : 50;
  const rightPercent = 100 - leftPercent;

  return {
    key: pair.key,
    label: pair.label,
    left: pair.left,
    right: pair.right,
    leftLabel: pair.leftLabel,
    rightLabel: pair.rightLabel,
    leftPercent,
    rightPercent,
    dominantKey,
    dominantLabel,
    hint: pair.hint,
  };
}

function buildRecommendations(type) {
  const picked = [];

  function pushUnique(key) {
    if (picked.indexOf(key) === -1) {
      picked.push(key);
    }
  }

  if (type[0] === 'I' || type[2] === 'F') {
    pushUnique('emotion');
  }
  if (type[0] === 'E' && type[2] === 'F') {
    pushUnique('appointment');
  }
  if (type[1] === 'N' || type[3] === 'P') {
    pushUnique('course');
  }
  if (type[2] === 'T' || type[3] === 'J') {
    pushUnique('assessment');
  }

  ['emotion', 'course', 'assessment', 'appointment'].forEach((key) => {
    if (picked.length < 3) {
      pushUnique(key);
    }
  });

  return picked.slice(0, 3).map((key) => recommendationCatalog[key]);
}

export function calculateMbtiResult(answers) {
  const scores = buildLetterScores(answers);
  const pairResults = mbtiDimensionPairs.map((pair) => buildPairResult(pair, answers, scores));
  const type = pairResults.map((item) => item.dominantKey).join('');
  const letters = type.split('');

  return {
    type,
    nickname: typeNicknames[type],
    createdLabel: formatDate(new Date()),
    disclaimer: '这是一个趣味版 MBTI 小游戏，适合自我观察，不代替专业人格测评。',
    traitHighlights: letters.map((letter) => traitLabels[letter]),
    summary: letters.map((letter) => summaryFragments[letter]).join('；') + '。',
    campusSnapshots: letters.map((letter) => campusStyles[letter]),
    strengths: letters.map((letter) => strengthSnippets[letter]),
    relaxTips: [relaxTips[type[0]], relaxTips[type[2]], relaxTips[type[3]]],
    dimensionScores: pairResults,
    recommendations: buildRecommendations(type),
  };
}
