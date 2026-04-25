import { getStoredAuth, HOME_PAGE, saveAuth, wxLogin } from '../../utils/auth';

const app = getApp();

Page({
  data: {
    agreed: false,
    loading: false,
  },

  onLoad() {
    this.redirectIfLoggedIn();
  },

  onShow() {
    this.redirectIfLoggedIn();
  },

  redirectIfLoggedIn() {
    if (getStoredAuth()) {
      wx.switchTab({
        url: HOME_PAGE,
      });
    }
  },

  onAgreeChange(event) {
    const values = event.detail.value || [];
    this.setData({
      agreed: values.indexOf('agree') >= 0,
    });
  },

  async handleWechatLogin() {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先勾选授权说明',
        icon: 'none',
      });
      return;
    }

    this.setData({ loading: true });
    try {
      const loginRes = await wxLogin();
      if (!loginRes.code) {
        throw new Error('未获取到微信登录凭证');
      }

      const auth = saveAuth({
        userInfo: {
          nickName: '微信用户',
          avatarUrl: '/static/avatar1.png',
        },
        loginCode: loginRes.code,
        provider: 'wechat',
      });
      app.setAuth(auth);

      wx.showToast({
        title: '登录成功',
        icon: 'success',
      });
      setTimeout(() => {
        wx.switchTab({
          url: HOME_PAGE,
        });
      }, 350);
    } catch (error) {
      wx.showToast({
        title: '微信授权未完成',
        icon: 'none',
      });
    } finally {
      this.setData({ loading: false });
    }
  },
});
