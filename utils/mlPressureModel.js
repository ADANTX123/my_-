const levelLabels = {
  stable: { label: '稳定倾向', tone: 'green' },
  mild: { label: '轻度压力倾向', tone: 'blue' },
  moderate: { label: '中度压力倾向', tone: 'yellow' },
  high: { label: '高压预警倾向', tone: 'red' },
};

export const mlPressureModel = {
  meta: {
    algorithm: 'Ridge 回归 + 平衡多分类 Logistic 回归',
    sampleSize: 199,
    trainingSource: 'data/medical_student_survey.xlsx',
    validation: {
      ridgeMae: 4.01,
      ridgeR2: 0.86,
      levelAccuracy: 0.553,
      levelBalancedAccuracy: 0.69,
      classCounts: {
        mild: 137,
        moderate: 52,
        stable: 6,
        high: 4,
      },
    },
    caveat: '样本量较小且重度样本很少，本模型只作为测评后的辅助分析与推荐依据，不构成医学诊断。',
  },
  features: [
    '专业课程学习',
    '学业考核',
    '临床实践',
    '职业规划',
    '升学/就业竞争',
    '时间平衡',
    '经济压力',
    '人际关系',
    '家庭期待',
    '身心适应',
  ],
  scoreModel: {
    means: [3.422111, 3.482412, 3.286432, 3.422111, 3.623116, 3.221106, 2.81407, 3.035176, 3.005025, 3.060302],
    scales: [0.993807, 1.011711, 1.038634, 1.043146, 1.019246, 0.982948, 1.169376, 1.086125, 1.024805, 1.091945],
    intercept: 67.145729,
    coefficients: [1.329304, 1.843878, 1.712163, 1.977119, 1.288336, 2.759905, 1.474594, 1.484405, 1.954687, 1.837417],
  },
  levelModel: {
    classes: ['high', 'mild', 'moderate', 'stable'],
    means: [3.422111, 3.482412, 3.286432, 3.422111, 3.623116, 3.221106, 2.81407, 3.035176, 3.005025, 3.060302],
    scales: [0.993807, 1.011711, 1.038634, 1.043146, 1.019246, 0.982948, 1.169376, 1.086125, 1.024805, 1.091945],
    intercepts: [-7.356954, 3.168901, 2.968702, 1.21935],
    coefficients: [
      [0.591658, 0.876831, 0.833565, 0.73792, 0.217282, 0.362169, 0.826163, 0.485737, 0.967584, 0.499266],
      [-0.066503, -0.063399, -0.273424, -0.042136, 0.467692, -0.373027, -0.532827, -0.507899, -0.328008, -0.299076],
      [-0.22318, -0.145681, -0.026071, 0.190552, 0.167302, 0.336254, -0.608735, -0.138704, -0.473726, -0.007733],
      [-0.301975, -0.667751, -0.53407, -0.886337, -0.852276, -0.325396, 0.315399, 0.160865, -0.16585, -0.192457],
    ],
  },
};

const featureAdvice = {
  专业课程学习: '优先使用“考试周压力急救包”，把课程压力拆成每日可完成任务。',
  学业考核: '建议建立考试清单，先处理最近一次考核的高频失分点。',
  临床实践: '使用医患沟通前稳定练习，提前准备问诊脚本和操作检查表。',
  职业规划: '用考研/就业双线决策表降低选择不确定感。',
  '升学/就业竞争': '把目标拆成保底、稳妥、冲刺三档，减少单一路径压力。',
  时间平衡: '先恢复作息边界，给学习、实习和休息安排缓冲块。',
  经济压力: '建议记录备考/实习支出，必要时联系辅导员了解资助资源。',
  人际关系: '用三段式表达向同学、老师或带教医生说明当前压力。',
  家庭期待: '可以先准备一段事实+感受+请求的沟通脚本。',
  身心适应: '优先处理睡眠、饮食和疲劳，连续 7 天记录身体信号。',
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round(value, digits = 0) {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
}

function toSurveyScale(percent) {
  return clamp(1 + (Number(percent) || 0) / 25, 1, 5);
}

function weightedAverage(items) {
  return items.reduce((sum, item) => sum + item.value * item.weight, 0);
}

function buildDimensionMap(dimensionSummaries) {
  return dimensionSummaries.reduce((map, item) => {
    map[item.key] = toSurveyScale(item.percent);
    return map;
  }, {});
}

function mapAssessmentToSurveyFeatures(dimensionSummaries) {
  const dimensions = buildDimensionMap(dimensionSummaries);
  const mood = dimensions.mood || 1;
  const anxiety = dimensions.anxiety || 1;
  const fatigue = dimensions.fatigue || 1;
  const support = dimensions.support || 1;

  return [
    weightedAverage([
      { value: fatigue, weight: 0.55 },
      { value: anxiety, weight: 0.45 },
    ]),
    weightedAverage([
      { value: anxiety, weight: 0.75 },
      { value: fatigue, weight: 0.25 },
    ]),
    weightedAverage([
      { value: anxiety, weight: 0.55 },
      { value: fatigue, weight: 0.25 },
      { value: support, weight: 0.2 },
    ]),
    weightedAverage([
      { value: anxiety, weight: 0.65 },
      { value: support, weight: 0.2 },
      { value: mood, weight: 0.15 },
    ]),
    weightedAverage([
      { value: anxiety, weight: 0.7 },
      { value: mood, weight: 0.2 },
      { value: support, weight: 0.1 },
    ]),
    weightedAverage([
      { value: fatigue, weight: 0.75 },
      { value: anxiety, weight: 0.25 },
    ]),
    weightedAverage([
      { value: support, weight: 0.45 },
      { value: mood, weight: 0.35 },
      { value: anxiety, weight: 0.2 },
    ]),
    weightedAverage([
      { value: support, weight: 0.55 },
      { value: mood, weight: 0.25 },
      { value: anxiety, weight: 0.2 },
    ]),
    weightedAverage([
      { value: support, weight: 0.4 },
      { value: anxiety, weight: 0.35 },
      { value: mood, weight: 0.25 },
    ]),
    weightedAverage([
      { value: fatigue, weight: 0.45 },
      { value: mood, weight: 0.35 },
      { value: anxiety, weight: 0.2 },
    ]),
  ].map((value) => round(clamp(value, 1, 5), 2));
}

function standardize(values, means, scales) {
  return values.map((value, index) => (value - means[index]) / scales[index]);
}

function predictScore(featureValues) {
  const model = mlPressureModel.scoreModel;
  const zValues = standardize(featureValues, model.means, model.scales);
  const score = zValues.reduce((sum, value, index) => sum + value * model.coefficients[index], model.intercept);
  return round(clamp(score, 20, 100));
}

function predictProbabilities(featureValues) {
  const model = mlPressureModel.levelModel;
  const zValues = standardize(featureValues, model.means, model.scales);
  const logits = model.intercepts.map((intercept, classIndex) =>
    zValues.reduce((sum, value, featureIndex) => sum + value * model.coefficients[classIndex][featureIndex], intercept),
  );
  const maxLogit = Math.max.apply(null, logits);
  const expValues = logits.map((value) => Math.exp(value - maxLogit));
  const expSum = expValues.reduce((sum, value) => sum + value, 0);
  return expValues.map((value, index) => ({
    key: model.classes[index],
    probability: value / expSum,
  }));
}

function buildContributors(featureValues) {
  const model = mlPressureModel.scoreModel;
  const zValues = standardize(featureValues, model.means, model.scales);
  const contributors = mlPressureModel.features.map((feature, index) => {
    const impact = Math.max(0, zValues[index] * Math.abs(model.coefficients[index]));
    return {
      label: feature,
      value: featureValues[index],
      sampleMean: round(model.means[index], 2),
      impact: round(impact, 2),
      impactPercent: clamp(Math.round(impact * 24), 8, 100),
      advice: featureAdvice[feature],
    };
  });
  const positive = contributors.filter((item) => item.impact > 0.05).sort((a, b) => b.impact - a.impact);
  return (positive.length ? positive : contributors.sort((a, b) => b.value - a.value)).slice(0, 3);
}

export function predictMlPressure(dimensionSummaries, ruleStressIndex) {
  if (!Array.isArray(dimensionSummaries) || !dimensionSummaries.length) {
    return null;
  }

  const featureValues = mapAssessmentToSurveyFeatures(dimensionSummaries);
  const predictedScore = predictScore(featureValues);
  const probabilities = predictProbabilities(featureValues)
    .map((item) => ({
      key: item.key,
      label: levelLabels[item.key].label,
      tone: levelLabels[item.key].tone,
      percent: Math.round(item.probability * 100),
      probability: round(item.probability, 3),
    }))
    .sort((a, b) => b.probability - a.probability);
  const predictedLevel = probabilities[0];
  const blendedScore = round(clamp(ruleStressIndex * 0.65 + predictedScore * 0.35, 0, 100));
  const contributors = buildContributors(featureValues);

  return {
    algorithm: mlPressureModel.meta.algorithm,
    sampleSize: mlPressureModel.meta.sampleSize,
    predictedScore,
    blendedScore,
    predictedLevel,
    confidence: predictedLevel.percent,
    probabilities,
    contributors,
    validation: mlPressureModel.meta.validation,
    caveat: mlPressureModel.meta.caveat,
    featureValues: mlPressureModel.features.map((label, index) => ({
      label,
      value: featureValues[index],
      sampleMean: round(mlPressureModel.scoreModel.means[index], 2),
    })),
  };
}
