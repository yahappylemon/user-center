import Wrapper from "../components/Wrapper";
import LoginCard from "../components/styledCard";
import Inputs from "../components/Inputs";
import {
  Typography,
  Box,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { fetchLogin } from "../store/auth";
import { registerAPI } from "../apis/user";
import {
  hasLengthLimit,
  passwordValidation,
  confirmPassword,
} from "../utils/formValidation";
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 表單錯誤狀態管理
  const [error, setError] = useState({
    userName: false,
    userPassword: false,
    checkPassword: false,
    userNotFound: false,
    usernameExist: false,
    incorrectPassword: false,
  });

  // 表單預設值
  const [formValue, setFormValue] = useState({
    userName: "",
    userPassword: "",
    checkPassword: "",
  });

  // 從url的查詢參數，獲取當前為登入/註冊模式
  const [searchParams] = useSearchParams();
  let isLogin = searchParams.get("mode") === "login";

  // 監聽表單變化
  function handleInputChange(e, errorsFromAPI, errorsFromAPI2) {
    const { name, value } = e.target;
    setFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
    // 當用戶正在輸入該欄位時，不顯示錯誤狀態
    setError(() => ({
      ...error,
      [name]: false,
      [errorsFromAPI]: false,
      [errorsFromAPI2]: false,
    }));
  }

  // 校驗表單
  function validateForm(formValue) {
    setError((error) => ({
      ...error,
      userName: hasLengthLimit(formValue.userName, 3, 20),
      userPassword: passwordValidation(formValue.userPassword),
      checkPassword: confirmPassword(
        formValue.userPassword,
        formValue.checkPassword
      ),
    }));
  }

  // 送出表單(登入模式)
  async function handleLogin(e) {
    e.preventDefault();
    // 校驗表單
    validateForm(formValue);
    // 依據登入/註冊模式，判斷傳送方式
    if (error.userName || error.userPassword) {
      return;
    } else {
      try {
        await dispatch(fetchLogin(formValue));
        // 跳轉到首頁
        navigate("/");
      } catch (error) {
        if (error.response.data.message === "用戶不存在") {
          setError((error) => ({
            ...error,
            userNotFound: "Username not Found",
          }));
        } else if (error.response.data.message === "登入失敗，密碼錯誤") {
          setError((error) => ({
            ...error,
            incorrectPassword: "Incorrect Password",
          }));
        }
      }
    }
  }

  // 送出表單(註冊模式)
  async function handleRegister(e) {
    e.preventDefault();
    // 校驗表單
    validateForm(formValue);
    // 依據登入/註冊模式，判斷傳送方式
    if (error.userName || error.userPassword || error.checkPassword) {
      return;
    } else {
      try {
        await registerAPI(formValue);
        handleModeChange();
        // 跳轉到登入頁
        navigate("/auth?mode=login");
      } catch (error) {
        if (error.response.data.message === "已存在相同使用者名稱") {
          setError((error) => ({
            ...error,
            usernameExist: `${formValue.userName} is already taken`,
          }));
        }
      }
    }
  }

  // 切換模式，清空狀態
  function handleModeChange() {
    setFormValue({
      userName: "",
      userPassword: "",
      checkPassword: "",
    });
    setError({
      userName: false,
      userPassword: false,
      checkPassword: false,
      userNotFound: false,
      usernameExist: false,
      incorrectPassword: false,
    });
  }

  return (
    <Wrapper component="main" backgroundColor="light">
      <LoginCard
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "450px",
          margin: { xs: "auto", sm: "auto" },
          minHeight: { xs: "auto", sm: "auto", md: "auto" },
        }}
      >
        <Typography variant="h4" component="h1" textAlign={"center"}>
          {isLogin ? "Login" : "Create New User"}
        </Typography>
        <Box
          component="form"
          onSubmit={isLogin ? handleLogin : handleRegister}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="userName">Username</FormLabel>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {error.userName && (
                  <FormHelperText error sx={{ m: 0 }}>
                    {error.userName}
                  </FormHelperText>
                )}
                {error.userNotFound && (
                  <FormHelperText error sx={{ m: 0 }}>
                    {error.userNotFound}
                  </FormHelperText>
                )}
                {error.usernameExist && (
                  <FormHelperText error sx={{ m: 0 }}>
                    {error.usernameExist}
                  </FormHelperText>
                )}
              </Box>
            </Box>
            <Inputs
              id="userName"
              label={""}
              type="text"
              placeholder="name"
              fullWidth
              required
              value={formValue}
              variant="outlined"
              onChange={(e) =>
                handleInputChange(e, "userNotFound", "usernameExist")
              }
              error={
                (error.userName && true) ||
                (error.userNotFound && true) ||
                (error.usernameExist && true)
              }
              onBlur={() =>
                setError((error) => ({
                  ...error,
                  userName: hasLengthLimit(formValue.userName, 3, 20),
                }))
              }
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="userPassword">Password</FormLabel>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {error.userPassword && (
                  <FormHelperText error sx={{ m: 0 }}>
                    {error.userPassword}
                  </FormHelperText>
                )}
                {error.incorrectPassword && (
                  <FormHelperText error sx={{ m: 0 }}>
                    {error.incorrectPassword}
                  </FormHelperText>
                )}
              </Box>
            </Box>
            <Inputs
              id="userPassword"
              label={""}
              type="password"
              placeholder="••••••"
              fullWidth
              required
              value={formValue}
              variant="outlined"
              onChange={(e) => handleInputChange(e, "incorrectPassword")}
              error={
                (error.userPassword && true) ||
                (error.incorrectPassword && true)
              }
              onBlur={() =>
                setError((error) => ({
                  ...error,
                  userPassword: passwordValidation(formValue.userPassword),
                }))
              }
            />
          </FormControl>
          {!isLogin && (
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="checkPassword">
                  Confirm Your Password
                </FormLabel>
                {error.checkPassword && (
                  <FormHelperText error sx={{ m: 0 }}>
                    {error.checkPassword}
                  </FormHelperText>
                )}
              </Box>
              <Inputs
                id="checkPassword"
                label={""}
                type="password"
                placeholder="••••••"
                fullWidth
                required
                value={formValue}
                variant="outlined"
                onChange={handleInputChange}
                error={error.checkPassword && true}
                onBlur={() =>
                  setError((error) => ({
                    ...error,
                    checkPassword: confirmPassword(
                      formValue.userPassword,
                      formValue.checkPassword
                    ),
                  }))
                }
              />
            </FormControl>
          )}
          <Button type="submit" fullWidth variant="contained">
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography component="p" variant="subtitle2" color="primary.dark">
              {isLogin ? "Don't have an account?" : "Already a member of us?"}
            </Typography>
            <Button
              component={Link}
              to={`/auth?mode=${isLogin ? "register" : "login"}`}
              variant="text"
              sx={{ color: (theme) => theme.palette.primary.contrastText }}
              onClick={handleModeChange}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Button>
          </Box>
        </Box>
      </LoginCard>
    </Wrapper>
  );
}
