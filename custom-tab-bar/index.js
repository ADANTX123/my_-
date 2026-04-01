const app = getApp();

Component({
  data: {
    value: '',
    unreadNum: 0,
    list: [
      {
        icon: 'home',
        value: 'home',
        label: 'Home',
      },
      {
        icon: 'chat',
        value: 'message',
        label: 'Inbox',
      },
      {
        icon: 'user',
        value: 'my',
        label: 'Profile',
      },
    ],
  },
  lifetimes: {
    ready() {
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      if (curPage) {
        const nameRe = /pages\/(\w+)\/index/.exec(curPage.route);
        if (nameRe === null) return;
        if (nameRe[1] && nameRe) {
          this.setData({
            value: nameRe[1],
          });
        }
      }

      this.setUnreadNum(app.globalData.unreadNum);
      app.eventBus.on('unread-num-change', (unreadNum) => {
        this.setUnreadNum(unreadNum);
      });
    },
  },
  methods: {
    handleChange(e) {
      const { value } = e.detail;
      wx.switchTab({ url: `/pages/${value}/index` });
    },

    setUnreadNum(unreadNum) {
      this.setData({ unreadNum });
    },
  },
});