const TOKEN_KEY = "access_token";
const USER_INFO = "user_info";

const AuthService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUserInfo() {
    return localStorage.getItem(USER_INFO);
  },

  setUserInfo(userInfo) {
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  }
};

export { AuthService };
