Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    navType: {
      type: String,
      value: 'title',
    },
    titleText: String,
  },
  data: {
    visible: false,
    sidebar: [
      {
        title: '首页看板',
        url: 'pages/home/index',
        isSidebar: true,
      },
      {
        title: '智能测评',
        url: 'pages/assessment/index',
        isSidebar: true,
      },
      {
        title: '情绪记录',
        url: 'pages/emotion/index',
        isSidebar: true,
      },
      {
        title: '心理档案',
        url: 'pages/profile/index',
        isSidebar: true,
      },
      {
        title: '课程资源',
        url: 'pages/course/index',
        isSidebar: false,
      },
      {
        title: '辅导预约',
        url: 'pages/appointment/index',
        isSidebar: false,
      },
      {
        title: '搜索资料',
        url: 'pages/search/index',
        isSidebar: false,
      },
    ],
    statusHeight: 0,
  },
  lifetimes: {
    ready() {
      const statusHeight = wx.getWindowInfo().statusBarHeight;
      this.setData({ statusHeight });
    },
  },
  methods: {
    openDrawer() {
      this.setData({
        visible: true,
      });
    },
    itemClick(e) {
      const that = this;
      const { isSidebar, url } = e.detail.item;
      if (isSidebar) {
        wx.switchTab({
          url: `/${url}`,
        }).then(() => {
          that.setData({
            visible: false,
          });
        });
      } else {
        wx.navigateTo({
          url: `/${url}`,
        }).then(() => {
          that.setData({
            visible: false,
          });
        });
      }
    },

    searchTurn() {
      wx.navigateTo({
        url: '/pages/search/index',
      });
    },

    toProfile() {
      wx.switchTab({
        url: '/pages/profile/index',
      });
    },
  },
});
