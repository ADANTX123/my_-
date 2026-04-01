import request from '~/api/request';
import useToastBehavior from '~/behaviors/useToast';

Page({
  behaviors: [useToastBehavior],

  data: {
    isLoad: false,
    service: [],
    personalInfo: {},
    accountInfo: {
      email: 'workspace.user@gmail.com',
      plan: 'Google Workspace style demo',
      storage: '12.4 GB of 15 GB used',
    },
    gridList: [
      {
        name: 'All mail',
        icon: 'root-list',
        type: 'all',
        url: '',
      },
      {
        name: 'Scheduled',
        icon: 'search',
        type: 'scheduled',
        url: '',
      },
      {
        name: 'Sent',
        icon: 'upload',
        type: 'sent',
        url: '',
      },
      {
        name: 'Drafts',
        icon: 'file-copy',
        type: 'draft',
        url: '',
      },
    ],

    settingList: [
      { name: 'Help & feedback', icon: 'service', type: 'service' },
      { name: 'Settings', icon: 'setting', type: 'setting', url: '/pages/setting/index' },
    ],
  },

  onLoad() {
    this.getServiceList();
  },

  async onShow() {
    const token = wx.getStorageSync('access_token');
    const personalInfo = await this.getPersonalInfo();

    if (token) {
      this.setData({
        isLoad: true,
        personalInfo,
      });
      return;
    }

    this.setData({
      isLoad: false,
    });
  },

  getServiceList() {
    request('/api/getServiceList').then((res) => {
      const { service } = res.data.data;
      const mapped = service.slice(0, 4).map((item, index) => ({
        ...item,
        name: ['Calendar', 'Meet', 'Docs', 'Drive'][index] || item.name,
      }));
      this.setData({ service: mapped });
    });
  },

  async getPersonalInfo() {
    const info = await request('/api/genPersonalInfo').then((res) => res.data.data);
    return info;
  },

  onLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  onNavigateTo() {
    wx.navigateTo({ url: '/pages/my/info-edit/index' });
  },

  onEleClick(e) {
    const { name, url } = e.currentTarget.dataset.data;
    if (url) {
      wx.navigateTo({ url });
      return;
    }
    this.onShowToast('#t-toast', `${name} is coming soon`);
  },
});