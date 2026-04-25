import { readStorageList, storageKeys } from '../../utils/mentalHealthData';

Page({
  data: {
    hasResult: false,
    result: null,
    ringStyle: '',
  },

  onLoad(options) {
    this.loadResult(options && options.id);
  },

  onShow() {
    if (!this.data.hasResult) {
      this.loadResult();
    }
  },

  loadResult(resultId) {
    const history = readStorageList(storageKeys.assessmentHistory);
    const result = resultId ? history.find((item) => item.id === resultId) : history[0];
    if (!result) {
      this.setData({
        hasResult: false,
        result: null,
        ringStyle: '',
      });
      return;
    }

    this.setData({
      hasResult: true,
      result,
      ringStyle: `background: conic-gradient(#1a73e8 ${result.stressIndex}%, #e8f0fe 0);`,
    });
  },

  goAssessment() {
    wx.switchTab({
      url: '/pages/assessment/index',
    });
  },

  goEmotion() {
    wx.switchTab({
      url: '/pages/emotion/index',
    });
  },

  goCourse() {
    wx.navigateTo({
      url: '/pages/course/index',
    });
  },

  goAppointment() {
    wx.navigateTo({
      url: '/pages/appointment/index',
    });
  },
});
