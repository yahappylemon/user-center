import { request } from "../utils/request";
import { isDemoMode } from "../config/apiMode";
import { demoAPI } from "./demoStore";

// 登入帳號
export function loginAPI(loginform) {
  if (isDemoMode) {
    return demoAPI.login(loginform);
  }
  return request({
    url: "/user/login",
    method: "POST",
    data: loginform,
  });
}

// 註冊帳號
export function registerAPI(registerform) {
  if (isDemoMode) {
    return demoAPI.register(registerform);
  }
  return request({
    url: "/user/register",
    method: "POST",
    data: registerform,
  });
}

// 獲取當前帳號資訊
export function userInfoAPI() {
  if (isDemoMode) {
    return demoAPI.userInfo();
  }
  return request({
    url: "/user/userinfo",
    method: "GET",
  });
}

// 更新當前帳號資訊
export function updateUserInfoAPI(userInfo) {
  if (isDemoMode) {
    return demoAPI.updateUserInfo(userInfo);
  }
  return request({
    url: "/user",
    method: "PUT",
    data: userInfo,
  });
}
