import { getLatestAssessment, surveyInsights } from '../../utils/mentalHealthData';

Page({
  data: {
    latestResult: null,
    heroBadgeValue: 'GO',
    heroBadgeLabel: '开始测评',
    coreLoop: surveyInsights.coreLoop,
    pressureOverview: surveyInsights.pressureOverview,
    topDimensions: surveyInsights.dimensionAverages.slice(0, 5),
    topSources: surveyInsights.topSources,
    topFeatures: surveyInsights.topFeatures,
    stats: [
      { label: '问卷样本 · 份', value: surveyInsights.sampleSize },
      { label: '平均压力 · 分', value: surveyInsights.avgTotalScore },
      { label: '主偏好', value: surveyInsights.preference },
    ],
    quickActions: [
      { label: '开始测评', value: 'assessment', icon: 'edit-1', desc: 'SMSHS 自评' },
      { label: '记录情绪', value: 'emotion', icon: 'chat', desc: '每日跟踪' },
      { label: '课程资源', value: 'course', icon: 'view-list', desc: '压力调节' },
      { label: '预约辅导', value: 'appointment', icon: 'user', desc: '获得支持' },
      { label: 'MBTI 小游戏', value: 'mbti', icon: 'app', desc: '16 型趣味测试', wide: true },
    ],
  },

  onShow() {
    const latestResult = getLatestAssessment();
    this.setData({
      latestResult,
      heroBadgeValue: latestResult ? latestResult.stressIndex : 'GO',
      heroBadgeLabel: latestResult ? latestResult.level.label : '开始测评',
    });
  },

  handleQuickAction(event) {
    const { value } = event.currentTarget.dataset;
    const routes = {
      assessment: () => wx.switchTab({ url: '/pages/assessment/index' }),
      emotion: () => wx.switchTab({ url: '/pages/emotion/index' }),
      course: () => wx.navigateTo({ url: '/pages/course/index' }),
      appointment: () => wx.navigateTo({ url: '/pages/appointment/index' }),
      mbti: () => wx.navigateTo({ url: '/pages/mbti/index' }),
    };
    routes[value]();
  },

  goResult() {
    if (!this.data.latestResult) {
      wx.switchTab({
        url: '/pages/assessment/index',
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/result/index',
    });
  },
});
