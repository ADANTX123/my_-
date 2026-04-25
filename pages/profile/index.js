import { readStorageList, storageKeys } from '../../utils/mentalHealthData';
import { getStoredAuth } from '../../utils/auth';

const app = getApp();

Page({
  data: {
    authUser: null,
    latestResult: null,
    history: [],
    trendBars: [],
    emotionLogs: [],
    appointments: [],
  },

  onShow() {
    this.loadProfile();
  },

  loadProfile() {
    const auth = getStoredAuth();
    const history = readStorageList(storageKeys.assessmentHistory);
    const emotionLogs = readStorageList(storageKeys.emotionLogs).map((item) =>
      Object.assign({}, item, {
        tagText: item.tags && item.tags.length ? item.tags.join('、') : '未选择标签',
      }),
    );
    const appointments = readStorageList(storageKeys.appointments);
    const trendBars = history
      .slice(0, 6)
      .reverse()
      .map((item, index) => ({
        label: `第${index + 1}次`,
        date: item.createdLabel.slice(5, 10),
        value: item.stressIndex,
      }));

    this.setData({
      authUser: auth ? auth.userInfo : null,
      latestResult: history.length ? history[0] : null,
      history,
      trendBars,
      emotionLogs: emotionLogs.slice(0, 4),
      appointments: appointments.slice(0, 3),
    });
  },

  goAssessment() {
    wx.switchTab({
      url: '/pages/assessment/index',
    });
  },

  goResult() {
    wx.navigateTo({
      url: '/pages/result/index',
    });
  },

  goAppointment() {
    wx.navigateTo({
      url: '/pages/appointment/index',
    });
  },

  logout() {
    wx.showModal({
      title: '退出登录',
      content: '退出后需要重新完成微信授权验证，才能继续查看档案。',
      confirmText: '退出',
      confirmColor: '#ea4335',
      success(res) {
        if (res.confirm) {
          app.logout();
        }
      },
    });
  },
});
