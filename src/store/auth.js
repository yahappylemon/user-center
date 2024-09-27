import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, userInfoAPI } from "../apis/user";
import {
  setToken as setToken_Local,
  getToken,
  removeToken,
} from "../utils/token";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: getToken() || "", username: "" },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      setToken_Local(action.payload);
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
    dispatch(setToken(res.data.data));
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
