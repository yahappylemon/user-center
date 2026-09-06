import { request } from "../utils/request";
import { isDemoMode } from "../config/apiMode";
import { demoAPI } from "./demoStore";

// 查詢客戶列表
export function getCustomerAPI(params) {
  if (isDemoMode) {
    return demoAPI.getCustomers(params);
  }
  return request({
    url: "/customer",
    method: "GET",
    params: params,
  });
}

// 查詢個別客戶
export function getSingleCustomerAPI(id) {
  if (isDemoMode) {
    return demoAPI.getCustomer(id);
  }
  return request({
    url: "/customer/userById",
    method: "GET",
    params: id,
  });
}

// 新增客戶
export function postCustomerAPI(data) {
  if (isDemoMode) {
    return demoAPI.createCustomer(data);
  }
  return request({
    url: "/customer",
    method: "POST",
    data: data,
  });
}

// 更新客戶資訊
export function putCustomerAPI(data) {
  if (isDemoMode) {
    return demoAPI.updateCustomer(data);
  }
  return request({
    url: "/customer",
    method: "PUT",
    data: data,
  });
}

// 刪除客戶
export function deleteCustomerAPI(id) {
  if (isDemoMode) {
    return demoAPI.deleteCustomer(id);
  }
  return request({
    url: "/customer",
    method: "DELETE",
    params: id,
  });
}

// 查詢客戶統計資訊
export function getCustomerStatisticsAPI(category) {
  if (isDemoMode) {
    return demoAPI.statistics(category);
  }
  return request({
    url: `/customer/statistics/${category}`,
    method: "GET",
  });
}
