import { request } from "../utils/request";

// 登入帳號
export function loginAPI(loginform) {
  return request({
    url: "/user/login",
    method: "POST",
    data: loginform,
  });
}

// 註冊帳號
export function registerAPI(registerform) {
  return request({
    url: "/user/register",
    method: "POST",
    data: registerform,
  });
}

// 獲取當前帳號資訊
export function userInfoAPI() {
  return request({
    url: "/user/userinfo",
    method: "GET",
  });
}

// 更新當前帳號資訊
export function updateUserInfoAPI(userInfo) {
  return request({
    url: "/user",
    method: "PUT",
    data: userInfo,
  });
}
