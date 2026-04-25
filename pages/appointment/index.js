import { counselors, formatDate, readStorageList, saveAppointment, storageKeys } from '../../utils/mentalHealthData';

Page({
  data: {
    counselors,
    selectedCounselorId: '',
    selectedSlot: '',
    concern: '',
    appointments: [],
  },

  onShow() {
    this.setData({
      appointments: readStorageList(storageKeys.appointments),
    });
  },

  selectCounselor(event) {
    this.setData({
      selectedCounselorId: event.currentTarget.dataset.id,
      selectedSlot: '',
    });
  },

  selectSlot(event) {
    this.setData({
      selectedSlot: event.currentTarget.dataset.slot,
    });
  },

  onConcernInput(event) {
    this.setData({
      concern: event.detail.value,
    });
  },

  submitAppointment() {
    const counselor = counselors.find((item) => item.id === this.data.selectedCounselorId);
    if (!counselor || !this.data.selectedSlot) {
      wx.showToast({
        title: '请选择咨询师和时间',
        icon: 'none',
      });
      return;
    }

    const appointment = {
      id: `apt_${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdLabel: formatDate(),
      counselorName: counselor.name,
      counselorTitle: counselor.title,
      slot: this.data.selectedSlot,
      concern: this.data.concern.trim() || '暂未填写',
      status: '待确认',
    };
    const appointments = saveAppointment(appointment);
    this.setData({
      appointments,
      selectedCounselorId: '',
      selectedSlot: '',
      concern: '',
    });
    wx.showToast({
      title: '预约已提交',
      icon: 'success',
    });
  },
});
