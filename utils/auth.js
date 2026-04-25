export const AUTH_STORAGE_KEY = 'mh_wechat_auth';
export const LOGIN_PAGE = '/pages/login/login';
export const HOME_PAGE = '/pages/home/index';

const AUTH_TTL = 7 * 24 * 60 * 60 * 1000;

export function getStoredAuth() {
  try {
    const auth = wx.getStorageSync(AUTH_STORAGE_KEY);
    if (!auth || !auth.loginAt) {
      return null;
    }
    if (Date.now() - auth.loginAt > AUTH_TTL) {
      wx.removeStorageSync(AUTH_STORAGE_KEY);
      return null;
    }
    return auth;
  } catch (error) {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getStoredAuth());
}

export function isLoginRoute(route) {
  return route === 'pages/login/login';
}

export function saveAuth(auth) {
  const nextAuth = Object.assign({}, auth, {
    loginAt: Date.now(),
  });
  wx.setStorageSync(AUTH_STORAGE_KEY, nextAuth);
  return nextAuth;
}

export function clearAuth() {
  wx.removeStorageSync(AUTH_STORAGE_KEY);
}

export function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject,
    });
  });
}

export function wxGetUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于登录小程序并保存心理健康测评档案',
      success: resolve,
      fail: reject,
    });
  });
}

export function wxCheckSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: resolve,
      fail: reject,
    });
  });
}
