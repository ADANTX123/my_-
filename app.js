import config from './config';
import Mock from './mock/index';
import createBus from './utils/eventBus';
import { connectSocket, fetchUnreadNum } from './mock/chat';
import { clearAuth, getStoredAuth, isLoggedIn, isLoginRoute, LOGIN_PAGE, wxCheckSession } from './utils/auth';

if (config.isMock) {
  Mock();
}

App({
  onLaunch() {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(() => {});
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });

    this.restoreAuth();
    this.verifyWechatSession();
    this.getUnreadNum();
    this.connect();
  },

  onShow() {
    this.guardLogin();
  },

  globalData: {
    auth: null,
    userInfo: null,
    isLoggedIn: false,
    unreadNum: 0,
    socket: null,
  },

  eventBus: createBus(),

  restoreAuth() {
    const auth = getStoredAuth();
    this.globalData.auth = auth;
    this.globalData.userInfo = auth ? auth.userInfo : null;
    this.globalData.isLoggedIn = Boolean(auth);
  },

  async verifyWechatSession() {
    if (!isLoggedIn()) {
      return;
    }

    try {
      await wxCheckSession();
    } catch (error) {
      this.logout(false);
    }
  },

  guardLogin() {
    setTimeout(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (!currentPage || isLoginRoute(currentPage.route)) {
        return;
      }
      if (!isLoggedIn()) {
        wx.reLaunch({
          url: LOGIN_PAGE,
        });
      }
    }, 0);
  },

  setAuth(auth) {
    this.globalData.auth = auth;
    this.globalData.userInfo = auth ? auth.userInfo : null;
    this.globalData.isLoggedIn = Boolean(auth);
  },

  logout(redirect = true) {
    clearAuth();
    this.setAuth(null);
    if (redirect) {
      wx.reLaunch({
        url: LOGIN_PAGE,
      });
    }
  },

  connect() {
    const socket = connectSocket();
    socket.onMessage((data) => {
      data = JSON.parse(data);
      if (data.type === 'message' && !data.data.message.read) {
        this.setUnreadNum(this.globalData.unreadNum + 1);
      }
    });
    this.globalData.socket = socket;
  },

  getUnreadNum() {
    fetchUnreadNum().then(({ data }) => {
      this.globalData.unreadNum = data;
      this.eventBus.emit('unread-num-change', data);
    });
  },

  setUnreadNum(unreadNum) {
    this.globalData.unreadNum = unreadNum;
    this.eventBus.emit('unread-num-change', unreadNum);
  },
});
