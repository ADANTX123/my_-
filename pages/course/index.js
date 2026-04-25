import { courses, surveyInsights } from '../../utils/mentalHealthData';

const allCategory = '全部';

Page({
  data: {
    categories: [],
    selectedCategory: allCategory,
    courses,
    filteredCourses: courses,
    featureDemand: surveyInsights.topFeatures,
  },

  onLoad() {
    const categories = [allCategory].concat(Array.from(new Set(courses.map((item) => item.category))));
    this.setData({ categories });
  },

  selectCategory(event) {
    const { category } = event.currentTarget.dataset;
    this.setData({
      selectedCategory: category,
      filteredCourses: category === allCategory ? courses : courses.filter((item) => item.category === category),
    });
  },

  startCourse(event) {
    const { title } = event.currentTarget.dataset;
    wx.showToast({
      title: `已加入学习：${title}`,
      icon: 'none',
    });
  },
});
