import Message from 'tdesign-miniprogram/message/index';
import request from '~/api/request';

const app = getApp();

Page({
  data: {
    enable: false,
    swiperList: [],
    cardInfo: [],
    focusCardInfo: [],
    workspaceStats: [],
    quickActions: [
      { label: 'Inbox', value: 'inbox', icon: 'chat' },
      { label: 'Search', value: 'search', icon: 'search' },
      { label: 'Compose', value: 'compose', icon: 'edit-1' },
    ],
    workspaceHighlights: [
      {
        title: 'Priority inbox is on',
        desc: 'Unread conversations, starred items and quick actions stay one tap away.',
      },
      {
        title: 'Search everything faster',
        desc: 'Use the top search field to jump between threads, notes and saved assets.',
      },
      {
        title: 'Compose from anywhere',
        desc: 'The floating action button mirrors Gmail and keeps creation in reach.',
      },
    ],
  },

  onLoad(option) {
    this.updateWorkspaceStats();
    if (option && option.oper) {
      let content = '';
      if (option.oper === 'release') {
        content = 'Message created';
      } else if (option.oper === 'save') {
        content = 'Draft saved';
      }
      if (content) {
        this.showOperMsg(content);
      }
    }
  },

  async onReady() {
    const [cardRes, swiperRes] = await Promise.all([
      request('/home/cards').then((res) => res.data),
      request('/home/swipers').then((res) => res.data),
    ]);

    this.applyHomeData(cardRes.data, swiperRes.data);
  },

  onShow() {
    this.updateWorkspaceStats();
  },

  onRefresh() {
    this.refresh();
  },

  async refresh() {
    this.setData({
      enable: true,
    });
    const [cardRes, swiperRes] = await Promise.all([
      request('/home/cards').then((res) => res.data),
      request('/home/swipers').then((res) => res.data),
    ]);

    setTimeout(() => {
      this.applyHomeData(cardRes.data, swiperRes.data);
      this.setData({
        enable: false,
      });
    }, 800);
  },

  applyHomeData(cardInfo, swiperList) {
    this.setData(
      {
        cardInfo,
        focusCardInfo: cardInfo.slice(0, 3),
        swiperList,
      },
      () => {
        this.updateWorkspaceStats();
      },
    );
  },

  updateWorkspaceStats() {
    const unreadThreads = app.globalData.unreadNum || 0;
    const priorityItems = this.data.focusCardInfo.length;
    const totalUpdates = this.data.cardInfo.length;

    this.setData({
      workspaceStats: [
        { label: 'Unread', value: unreadThreads },
        { label: 'Priority', value: priorityItems },
        { label: 'Updates', value: totalUpdates },
      ],
    });
  },

  showOperMsg(content) {
    Message.success({
      context: this,
      offset: [120, 32],
      duration: 3000,
      content,
    });
  },

  goRelease() {
    wx.navigateTo({
      url: '/pages/release/index',
    });
  },

  handleQuickAction(event) {
    const { value } = event.currentTarget.dataset;
    if (value === 'inbox') {
      wx.switchTab({ url: '/pages/message/index' });
      return;
    }
    if (value === 'search') {
      wx.navigateTo({ url: '/pages/search/index' });
      return;
    }
    this.goRelease();
  },
});