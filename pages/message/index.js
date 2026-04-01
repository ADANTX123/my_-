import { fetchMessageList, markMessagesRead } from '~/mock/chat';

const app = getApp();
const { socket } = app.globalData;
let currentUser = null;

function formatThreadTime(time) {
  if (!time) return '';
  const current = new Date();
  const target = new Date(time);
  const isSameDay =
    current.getFullYear() === target.getFullYear() &&
    current.getMonth() === target.getMonth() &&
    current.getDate() === target.getDate();

  if (isSameDay) {
    const hour = `${target.getHours()}`.padStart(2, '0');
    const minute = `${target.getMinutes()}`.padStart(2, '0');
    return `${hour}:${minute}`;
  }

  return `${target.getMonth() + 1}/${target.getDate()}`;
}

Page({
  data: {
    messageList: [],
    threads: [],
    loading: true,
    activeFilter: 'all',
    filters: [
      { label: 'Primary', value: 'all' },
      { label: 'Unread', value: 'unread' },
      { label: 'Read', value: 'read' },
    ],
  },

  onLoad() {
    this.getMessageList();
    if (socket && typeof socket.onMessage === 'function') {
      socket.onMessage((payload) => {
        const parsed = typeof payload === 'string' ? JSON.parse(payload) : JSON.parse(payload.data);
        if (parsed.type !== 'message') return;

        const { userId, message } = parsed.data;
        const record = this.getUserById(userId);
        if (!record) return;

        const { user, index } = record;
        this.data.messageList.splice(index, 1);
        this.data.messageList.unshift(user);
        user.messages.push(message);

        if (currentUser && userId === currentUser.userId) {
          this.setMessagesRead(userId);
          currentUser.eventChannel.emit('update', user);
          return;
        }

        this.setData({ messageList: this.data.messageList }, () => {
          this.syncThreads();
        });
        app.setUnreadNum(this.computeUnreadNum());
      });
    }
  },

  onShow() {
    currentUser = null;
    this.syncThreads();
  },

  getMessageList() {
    this.setData({ loading: true });
    fetchMessageList().then(({ data }) => {
      this.setData({ messageList: data, loading: false }, () => {
        this.syncThreads();
      });
      app.setUnreadNum(this.computeUnreadNum());
    });
  },

  getUserById(userId) {
    let index = 0;
    while (index < this.data.messageList.length) {
      const user = this.data.messageList[index];
      if (user.userId === userId) return { user, index };
      index += 1;
    }
    return null;
  },

  computeUnreadNum() {
    let unreadNum = 0;
    this.data.messageList.forEach(({ messages }) => {
      unreadNum += messages.filter((item) => !item.read).length;
    });
    return unreadNum;
  },

  buildThreads() {
    return this.data.messageList
      .map((item) => {
        const latestMessage = item.messages[item.messages.length - 1] || {};
        const unreadCount = item.messages.filter((message) => !message.read).length;
        const isRead = unreadCount === 0;

        return {
          ...item,
          unreadCount,
          isRead,
          timeLabel: formatThreadTime(latestMessage.time),
          subject: isRead ? 'Conversation updated' : 'Waiting for your reply',
          snippet: latestMessage.content || 'Open this thread to continue the conversation.',
          sortTime: latestMessage.time || 0,
        };
      })
      .filter((item) => {
        if (this.data.activeFilter === 'unread') return !item.isRead;
        if (this.data.activeFilter === 'read') return item.isRead;
        return true;
      })
      .sort((left, right) => right.sortTime - left.sortTime);
  },

  syncThreads() {
    const threads = this.buildThreads();
    this.setData({ threads });
  },

  handleFilterTap(event) {
    const { value } = event.currentTarget.dataset;
    if (!value || value === this.data.activeFilter) return;
    this.setData({ activeFilter: value }, () => {
      this.syncThreads();
    });
  },

  toChat(event) {
    const { userId } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/chat/index?userId=${userId}` }).then(({ eventChannel }) => {
      currentUser = { userId, eventChannel };
      const record = this.getUserById(userId);
      if (!record) return;
      eventChannel.emit('update', record.user);
    });
    this.setMessagesRead(userId);
  },

  setMessagesRead(userId) {
    const record = this.getUserById(userId);
    if (!record) return;

    record.user.messages.forEach((message) => {
      message.read = true;
    });

    this.setData({ messageList: this.data.messageList }, () => {
      this.syncThreads();
    });
    app.setUnreadNum(this.computeUnreadNum());
    markMessagesRead(userId);
  },

  goCompose() {
    wx.navigateTo({
      url: '/pages/release/index',
    });
  },
});