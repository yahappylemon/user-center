import { request } from "../utils/request";

export function loginAPI(loginform) {
  return request({
    url: "/user/login",
    method: "POST",
    data: loginform,
  });
}

export function registerAPI(registerform) {
  return request({
    url: "/user/register",
    method: "POST",
    data: registerform,
  });
}

export function userInfoAPI() {
  return request({
    url: "/user/userinfo",
    method: "GET",
  });
}
