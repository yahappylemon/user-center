import { request } from "../utils/request";

// 查詢客戶列表
export function getCustomerAPI(params) {
  return request({
    url: "/customer",
    method: "GET",
    params: params,
  });
}

// 查詢個別客戶
export function getSingleCustomerAPI(customerName) {
  return request({
    url: "/customer/userByName",
    method: "POST",
    data: customerName,
  });
}

// 新增客戶
export function postCustomerAPI(data) {
  return request({
    url: "/customer",
    method: "POST",
    data: data,
  });
}

// 更新客戶資訊
export function putCustomerAPI(data) {
  return request({
    url: "/customer",
    method: "PUT",
    data: data,
  });
}

// 刪除客戶
export function deleteCustomerAPI(id) {
  return request({
    url: "/customer",
    method: "DELETE",
    params: id,
  });
}

// 查詢客戶統計資訊
export function getCustomerStatisticsAPI(category) {
  return request({
    url: `/customer/statistics/${category}`,
    method: "GET",
  });
}
