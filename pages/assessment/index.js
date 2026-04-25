import {
  assessmentOptions,
  assessmentQuestions,
  calculateAssessment,
  saveAssessmentResult,
  surveyInsights,
} from '../../utils/mentalHealthData';

Page({
  data: {
    answers: {},
    answeredCount: 0,
    assessmentOptions,
    questions: assessmentQuestions,
    progress: 0,
    coreLoop: surveyInsights.coreLoop,
  },

  chooseOption(event) {
    const { id, value } = event.currentTarget.dataset;
    const answers = Object.assign({}, this.data.answers, {
      [id]: Number(value),
    });
    const answeredCount = Object.keys(answers).length;
    this.setData({
      answers,
      answeredCount,
      progress: Math.round((answeredCount / this.data.questions.length) * 100),
    });
  },

  submitAssessment() {
    if (this.data.answeredCount < this.data.questions.length) {
      wx.showToast({
        title: `还差 ${this.data.questions.length - this.data.answeredCount} 题`,
        icon: 'none',
      });
      return;
    }

    const result = calculateAssessment(this.data.answers);
    saveAssessmentResult(result);
    wx.navigateTo({
      url: `/pages/result/index?id=${result.id}`,
    });
  },

  resetAssessment() {
    this.setData({
      answers: {},
      answeredCount: 0,
      progress: 0,
    });
  },
});
