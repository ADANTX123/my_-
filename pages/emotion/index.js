import { emotionTags, formatDate, readStorageList, saveEmotionLog, storageKeys } from '../../utils/mentalHealthData';

Page({
  data: {
    tagOptions: emotionTags.map((label) => ({
      label,
      active: false,
    })),
    selectedTags: [],
    intensity: 3,
    note: '',
    logs: [],
  },

  onShow() {
    this.loadLogs();
  },

  loadLogs() {
    this.setData({
      logs: readStorageList(storageKeys.emotionLogs),
    });
  },

  toggleTag(event) {
    const { tag } = event.currentTarget.dataset;
    const selectedTags = this.data.selectedTags.slice();
    const index = selectedTags.indexOf(tag);
    if (index >= 0) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
    this.setData({
      selectedTags,
      tagOptions: this.data.tagOptions.map((item) =>
        Object.assign({}, item, {
          active: selectedTags.indexOf(item.label) >= 0,
        }),
      ),
    });
  },

  changeIntensity(event) {
    this.setData({
      intensity: event.detail.value,
    });
  },

  onNoteInput(event) {
    this.setData({
      note: event.detail.value,
    });
  },

  saveLog() {
    if (!this.data.selectedTags.length && !this.data.note.trim()) {
      wx.showToast({
        title: '先选一个情绪或写一句记录',
        icon: 'none',
      });
      return;
    }

    const log = {
      id: `emo_${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdLabel: formatDate(),
      tags: this.data.selectedTags,
      intensity: this.data.intensity,
      note: this.data.note.trim(),
    };
    const logs = saveEmotionLog(log);
    this.setData({
      logs,
      selectedTags: [],
      tagOptions: emotionTags.map((label) => ({
        label,
        active: false,
      })),
      intensity: 3,
      note: '',
    });
    wx.showToast({
      title: '已保存记录',
      icon: 'success',
    });
  },
});
