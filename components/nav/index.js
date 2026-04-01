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
        title: 'Inbox',
        url: 'pages/home/index',
        isSidebar: true,
      },
      {
        title: 'Search',
        url: 'pages/search/index',
        isSidebar: false,
      },
      {
        title: 'Compose',
        url: 'pages/release/index',
        isSidebar: false,
      },
      {
        title: 'Messages',
        url: 'pages/message/index',
        isSidebar: true,
      },
      {
        title: 'Chats',
        url: 'pages/chat/index',
        isSidebar: false,
      },
      {
        title: 'Profile',
        url: 'pages/my/index',
        isSidebar: true,
      },
      {
        title: 'Edit profile',
        url: 'pages/my/info-edit/index',
        isSidebar: false,
      },
      {
        title: 'Settings',
        url: 'pages/setting/index',
        isSidebar: false,
      },
      {
        title: 'Data center',
        url: 'pages/dataCenter/index',
        isSidebar: false,
      },
      {
        title: 'Login',
        url: 'pages/login/login',
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
        url: '/pages/my/index',
      });
    },
  },
});