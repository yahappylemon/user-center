import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, userInfoAPI } from "../apis/user";
import {
  setLocalStorage,
  getLocalStorage,
  removeToken,
} from "../utils/localStorage";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: getLocalStorage("token") || "", username: "" },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      setLocalStorage(action.payload.key, action.payload.token);
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.username = "";
      removeToken();
    },
  },
});

const { setToken, setUsername, clearUserInfo } = authSlice.actions;

const fetchLogin = (loginform) => {
  return async (dispatch) => {
    const res = await loginAPI(loginform);
    dispatch(setToken({ key: "token", token: res.data.data }));
  };
};

const fetchUsername = () => {
  return async (dispatch) => {
    const res = await userInfoAPI();
    dispatch(setUsername(res.data.data.username));
  };
};

export { setToken, fetchLogin, fetchUsername, clearUserInfo };
export default authSlice.reducer;
