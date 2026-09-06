import { initialState } from "../utils/options";

const CUSTOMERS_KEY = "demoCustomers";
const USERS_KEY = "demoUsers";
const USER_KEY = "demoCurrentUser";

const demoUsers = [
  {
    id: 1,
    username: "demo",
    userName: "demo",
    userPassword: "Demo1234",
    email: "demo@example.com",
  },
];

const demoCustomers = [
  {
    id: 1,
    customerName: "Mia Chen",
    birthYear: "1994",
    gender: "F",
    phoneNumber: "0912-345-678",
    email: "mia@example.com",
    frequency: "Twice a week",
    regularExercises: ["Yoga", "Workout"],
    otherExercises: "",
    approaches: ["Social media"],
    otherApproaches: "",
    firstLesson: "2024-01-12",
    lastLesson: "2024-07-12",
    totalLessons: 24,
    remainingLessons: 8,
    medicalHistoryCategory: ["Back Injury"],
    medicalHistoryOther: "",
    medicalHistoryBroken: "",
    medicalHistorySurgery: "",
    medication: "",
    symptoms: "",
    symptomCauses: "",
    transportationCategory: [],
  },
  {
    id: 2,
    customerName: "Leo Wang",
    birthYear: "1988",
    gender: "M",
    phoneNumber: "0922-456-789",
    email: "leo@example.com",
    frequency: "Once a week",
    regularExercises: ["Jogging"],
    otherExercises: "",
    approaches: ["Referral by friend/family"],
    otherApproaches: "",
    firstLesson: "2024-03-20",
    lastLesson: "2024-08-07",
    totalLessons: 16,
    remainingLessons: 3,
    medicalHistoryCategory: [],
    medicalHistoryOther: "",
    medicalHistoryBroken: "",
    medicalHistorySurgery: "",
    medication: "",
    symptoms: "",
    symptomCauses: "",
    transportationCategory: [],
  },
  {
    id: 3,
    customerName: "Sofia Lin",
    birthYear: "1999",
    gender: "F",
    phoneNumber: "0933-567-890",
    email: "sofia@example.com",
    frequency: "Three times a week",
    regularExercises: ["Dancing", "Swimming"],
    otherExercises: "",
    approaches: ["Other"],
    otherApproaches: "Walk-in",
    firstLesson: "2023-11-05",
    lastLesson: null,
    totalLessons: 12,
    remainingLessons: 12,
    medicalHistoryCategory: ["Other"],
    medicalHistoryOther: "Knee discomfort",
    medicalHistoryBroken: "",
    medicalHistorySurgery: "",
    medication: "",
    symptoms: "",
    symptomCauses: "",
    transportationCategory: [],
  },
  {
    id: 4,
    customerName: "Ethan Huang",
    birthYear: "1991",
    gender: "M",
    phoneNumber: "0944-678-901",
    email: "ethan@example.com",
    frequency: "Twice a month",
    regularExercises: ["Basketball", "Workout"],
    otherExercises: "",
    approaches: ["Social media", "Referral by friend/family"],
    otherApproaches: "",
    firstLesson: "2023-06-15",
    lastLesson: "2024-01-10",
    totalLessons: 20,
    remainingLessons: 0,
    medicalHistoryCategory: ["High Blood Pressure"],
    medicalHistoryOther: "",
    medicalHistoryBroken: "",
    medicalHistorySurgery: "",
    medication: "",
    symptoms: "",
    symptomCauses: "",
    transportationCategory: [],
  },
];

function response(data) {
  return Promise.resolve({ data: { data } });
}

function errorResponse(message, status = 400) {
  return Promise.reject({ response: { status, data: { message } } });
}

function readJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function users() {
  return readJSON(USERS_KEY, demoUsers);
}

function customers() {
  return readJSON(CUSTOMERS_KEY, demoCustomers);
}

function normalizeCustomer(customer) {
  return {
    ...initialState,
    ...customer,
    id: customer.id ? Number(customer.id) : Date.now(),
  };
}

function monthSeries(year, list) {
  const series = Array(12).fill(0);
  list.forEach((customer) => {
    const date = new Date(customer.firstLesson);
    if (!Number.isNaN(date.getTime()) && date.getFullYear() === year) {
      series[date.getMonth()] += 1;
    }
  });
  return series;
}

function firstLessonStatistics(list) {
  const years = [
    ...new Set(
      list
        .map((customer) => new Date(customer.firstLesson))
        .filter((date) => !Number.isNaN(date.getTime()))
        .map((date) => date.getFullYear())
    ),
  ].sort();

  return Object.fromEntries(years.map((year) => [year, monthSeries(year, list)]));
}

export const demoAPI = {
  login(loginForm) {
    const user = users().find(
      (item) =>
        item.userName === loginForm.userName &&
        item.userPassword === loginForm.userPassword
    );
    if (!user) {
      return errorResponse("用戶不存在", 404);
    }
    writeJSON(USER_KEY, { id: user.id, username: user.username });
    return response("demo-token");
  },

  register(registerForm) {
    const existingUsers = users();
    if (existingUsers.some((user) => user.userName === registerForm.userName)) {
      return errorResponse("已存在相同使用者名稱", 409);
    }
    const nextUser = {
      id: Date.now(),
      username: registerForm.userName,
      userName: registerForm.userName,
      userPassword: registerForm.userPassword,
      email: "",
    };
    writeJSON(USERS_KEY, [...existingUsers, nextUser]);
    return response(nextUser);
  },

  userInfo() {
    const currentUser =
      readJSON(USER_KEY, null) || { id: 1, username: "demo", email: "" };
    return response(currentUser);
  },

  updateUserInfo(userInfo) {
    const existingUsers = users();
    const currentUser = readJSON(USER_KEY, { id: 1, username: "demo" });
    if (
      existingUsers.some(
        (user) => user.username === userInfo.username && user.id !== currentUser.id
      )
    ) {
      return errorResponse("用戶名已被使用", 409);
    }
    const updatedUser = { ...currentUser, ...userInfo };
    writeJSON(USER_KEY, updatedUser);
    writeJSON(
      USERS_KEY,
      existingUsers.map((user) =>
        user.id === currentUser.id
          ? { ...user, username: updatedUser.username, userName: updatedUser.username }
          : user
      )
    );
    return response(updatedUser);
  },

  getCustomers(params = {}) {
    const pageNum = Number(params.pageNum || 1);
    const pageSize = Number(params.pageSize || 7);
    const keyword = params.customerName?.trim().toLowerCase() || "";
    const filtered = customers().filter((customer) =>
      customer.customerName.toLowerCase().includes(keyword)
    );
    const start = (pageNum - 1) * pageSize;
    return response({
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
    });
  },

  getCustomer(params = {}) {
    const id = Number(params.id);
    const customer = customers().find((item) => Number(item.id) === id);
    if (!customer) {
      return errorResponse("customer not found", 404);
    }
    return response(customer);
  },

  createCustomer(data) {
    const nextCustomer = normalizeCustomer(data);
    writeJSON(CUSTOMERS_KEY, [...customers(), nextCustomer]);
    return response(nextCustomer);
  },

  updateCustomer(data) {
    const list = customers();
    const id = Number(data.id);
    if (!list.some((customer) => Number(customer.id) === id)) {
      return errorResponse("customer not found", 404);
    }
    const updatedCustomer = normalizeCustomer(data);
    writeJSON(
      CUSTOMERS_KEY,
      list.map((customer) => (Number(customer.id) === id ? updatedCustomer : customer))
    );
    return response(updatedCustomer);
  },

  deleteCustomer(params = {}) {
    const id = Number(params.id);
    writeJSON(
      CUSTOMERS_KEY,
      customers().filter((customer) => Number(customer.id) !== id)
    );
    return response(true);
  },

  statistics(category) {
    const list = customers();
    if (category === "gender") {
      return response([
        list.filter((customer) => customer.gender === "F").length,
        list.filter((customer) => customer.gender === "M").length,
      ]);
    }
    if (category === "approach") {
      return response([
        list.filter((customer) => customer.approaches.includes("Social media")).length,
        list.filter((customer) =>
          customer.approaches.includes("Referral by friend/family")
        ).length,
        list.filter((customer) => customer.approaches.includes("Other")).length,
      ]);
    }
    if (category === "firstLesson") {
      return response(firstLessonStatistics(list));
    }
    return response(null);
  },

  reset() {
    writeJSON(CUSTOMERS_KEY, demoCustomers);
    writeJSON(USERS_KEY, demoUsers);
    writeJSON(USER_KEY, { id: 1, username: "demo", email: "" });
  },
};
