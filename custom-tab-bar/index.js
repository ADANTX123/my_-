const app = getApp();

Component({
  data: {
    value: '',
    unreadNum: 0,
    list: [
      {
        icon: 'home',
        value: 'home',
        label: '首页',
      },
      {
        icon: 'edit-1',
        value: 'assessment',
        label: '测评',
      },
      {
        icon: 'chat',
        value: 'emotion',
        label: '记录',
      },
      {
        icon: 'user',
        value: 'profile',
        label: '档案',
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
