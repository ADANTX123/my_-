import { mbtiDimensionPairs, mbtiQuestions, calculateMbtiResult } from '../../utils/mbtiGame';

const routes = {
  assessment: () => wx.switchTab({ url: '/pages/assessment/index' }),
  emotion: () => wx.switchTab({ url: '/pages/emotion/index' }),
  course: () => wx.navigateTo({ url: '/pages/course/index' }),
  appointment: () => wx.navigateTo({ url: '/pages/appointment/index' }),
};

Page({
  data: {
    questions: mbtiQuestions,
    dimensionPairs: mbtiDimensionPairs,
    currentIndex: 0,
    currentQuestion: mbtiQuestions[0],
    currentDimension: mbtiQuestions[0].dimension,
    answers: {},
    answeredCount: 0,
    progress: 0,
    primaryLabel: '下一题',
    result: null,
  },

  syncState(nextState) {
    const currentQuestion = this.data.questions[nextState.currentIndex];
    const answeredCount = Object.keys(nextState.answers).length;
    const progress = Math.round((answeredCount / this.data.questions.length) * 100);
    const primaryLabel = nextState.currentIndex === this.data.questions.length - 1 ? '生成结果' : '下一题';

    this.setData({
      ...nextState,
      currentQuestion,
      currentDimension: currentQuestion.dimension,
      answeredCount,
      progress,
      primaryLabel,
    });
  },

  chooseOption(event) {
    const { id, key } = event.currentTarget.dataset;
    const answers = Object.assign({}, this.data.answers, {
      [id]: key,
    });

    this.syncState({
      currentIndex: this.data.currentIndex,
      answers,
      result: null,
    });
  },

  goPrev() {
    if (this.data.currentIndex === 0) {
      return;
    }

    this.syncState({
      currentIndex: this.data.currentIndex - 1,
      answers: this.data.answers,
      result: null,
    });
  },

  goNext() {
    const currentQuestion = this.data.currentQuestion;
    if (!this.data.answers[currentQuestion.id]) {
      wx.showToast({
        title: '先选一个更像你的选项',
        icon: 'none',
      });
      return;
    }

    if (this.data.currentIndex === this.data.questions.length - 1) {
      this.finishGame();
      return;
    }

    this.syncState({
      currentIndex: this.data.currentIndex + 1,
      answers: this.data.answers,
      result: null,
    });
  },

  finishGame() {
    if (this.data.answeredCount < this.data.questions.length) {
      const firstMissingIndex = this.data.questions.findIndex((question) => !this.data.answers[question.id]);
      this.syncState({
        currentIndex: firstMissingIndex === -1 ? this.data.currentIndex : firstMissingIndex,
        answers: this.data.answers,
        result: null,
      });
      wx.showToast({
        title: '还有题目没完成，先补齐再看结果',
        icon: 'none',
      });
      return;
    }

    const result = calculateMbtiResult(this.data.answers);
    this.setData({
      result,
      progress: 100,
    });
  },

  restartGame() {
    this.setData({
      currentIndex: 0,
      currentQuestion: this.data.questions[0],
      currentDimension: this.data.questions[0].dimension,
      answers: {},
      answeredCount: 0,
      progress: 0,
      primaryLabel: '下一题',
      result: null,
    });
  },

  goAction(event) {
    const { route } = event.currentTarget.dataset;
    if (routes[route]) {
      routes[route]();
    }
  },

  onShareAppMessage() {
    if (this.data.result) {
      return {
        title: `我的 MBTI 趣味类型是 ${this.data.result.type} · ${this.data.result.nickname}`,
        path: '/pages/mbti/index',
      };
    }

    return {
      title: '来玩一下医学生版 MBTI 趣味测试',
      path: '/pages/mbti/index',
    };
  },
});
