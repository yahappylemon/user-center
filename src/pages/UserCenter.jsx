import {
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Wrapper from "../components/Wrapper";
import NewCard from "../components/styledCard";
import Inputs from "../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAPI, updateUserInfoAPI } from "../apis/user";
import { hasLengthLimit, hasSameValue } from "../utils/formValidation";
import { setTheme } from "../store/theme";
import { palette } from "../utils/palette";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isDemoMode } from "../config/apiMode";
import { demoAPI } from "../apis/demoStore";

export default function UserCenter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUsername = useSelector((state) => state.auth.username);
  const currentTheme = useSelector((state) => state.theme.theme);

  // 表單錯誤狀態管理
  const [error, setError] = useState({
    username: false,
    usernameExist: false,
    sameUsername: false,
  });
  const [formValue, setFormValue] = useState({
    id: "",
    email: "",
    username: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function getCurrentUserInfo() {
      try {
        const res = await userInfoAPI();
        setFormValue(res.data.data);
      } catch {
        setStatusMessage("Unable to load user info. Please try again later.");
      }
    }
    getCurrentUserInfo();
  }, []);

  // 監聽表單變化
  function handleInputChange(e, errorsFromAPI1, errorsFromAPI2) {
    const { name, value } = e.target;
    setFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
    setStatusMessage("");
    // 當用戶正在輸入該欄位時，不顯示錯誤狀態
    setError(() => ({
      ...error,
      [name]: false,
      [errorsFromAPI1]: false,
      [errorsFromAPI2]: false,
    }));
  }

  // 校驗表單
  function validateForm(formValue) {
    const usernameError = hasLengthLimit(formValue.username, 3, 20);
    const sameUsernameError = hasSameValue(formValue.username, currentUsername);
    return {
      username: usernameError,
      sameUsername: sameUsernameError,
    };
  }

  // 送出表單
  async function handleRegister(e) {
    e.preventDefault();
    // 校驗表單
    const validationResult = validateForm(formValue);
    setError((error) => ({
      ...error,
      ...validationResult,
    }));

    if (validationResult.username || validationResult.sameUsername) {
      return;
    }

    try {
      await updateUserInfoAPI(formValue);
      // 跳轉到登入頁
      navigate("/auth?mode=login");
    } catch (error) {
      if (error?.response?.data?.message === "用戶名已被使用") {
        setError((error) => ({
          ...error,
          usernameExist: `${formValue.username} is already taken`,
        }));
      }
    }
  }

  function handleResetDemoData() {
    demoAPI.reset();
    setStatusMessage("Demo data has been reset.");
  }

  return (
    <Wrapper>
      <NewCard sx={{ width: "100%" }}>
        <Typography variant="h5" component="h1">
          User Center
        </Typography>
        {statusMessage && (
          <Typography variant="body2" color="primary.contrastText">
            {statusMessage}
          </Typography>
        )}
        <Grid
          component="form"
          onSubmit={handleRegister}
          noValidate
          container
          rowSpacing={1}
          columnSpacing={1}
          sx={{ alignItems: "flex-end" }}
        >
          {/* 用戶名稱 */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <FormControl fullWidth>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  {error.username && (
                    <FormHelperText error sx={{ m: 0 }}>
                      {error.username}
                    </FormHelperText>
                  )}
                  {error.usernameExist && (
                    <FormHelperText error sx={{ m: 0 }}>
                      {error.usernameExist}
                    </FormHelperText>
                  )}
                  {error.sameUsername && (
                    <FormHelperText error sx={{ m: 0 }}>
                      {error.sameUsername}
                    </FormHelperText>
                  )}
                </Box>
              </Box>
              <Inputs
                id="username"
                label={""}
                type="text"
                placeholder="name"
                fullWidth
                required
                value={formValue}
                variant="outlined"
                onChange={(e) =>
                  handleInputChange(e, "sameUsername", "usernameExist")
                }
                error={
                  (error.username && true) ||
                  (error.sameUsername && true) ||
                  (error.usernameExist && true)
                }
                onBlur={() =>
                  setError((error) => ({
                    ...error,
                    username: hasLengthLimit(formValue.username, 3, 20),
                    sameUsername: hasSameValue(
                      formValue.username,
                      currentUsername
                    ),
                  }))
                }
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              type="submit"
              fullWidth
              disabled={
                formValue.username === currentUsername ||
                formValue.username === ""
              }
              variant="contained"
              sx={{ py: 2 }}
            >
              Change Username
            </Button>
          </Grid>
        </Grid>
        {/* 用戶主題 */}
        <FormLabel>Change Theme</FormLabel>
        <Grid container rowSpacing={1} columnSpacing={1}>
          {Object.keys(palette).map((theme) => (
            <Grid size={{ xs: 12, sm: 4 }} key={theme}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  dispatch(setTheme({ key: "theme", theme: `${theme}` }));
                }}
                sx={{
                  py: 2,
                  bgcolor: palette[theme].primary.main,
                  color: palette[theme].primary.contrastText,
                  "&:hover": {
                    bgcolor: palette[theme].primary.dark,
                  },
                }}
                disabled={theme === currentTheme}
              >
                {theme}
              </Button>
            </Grid>
          ))}
        </Grid>
        {isDemoMode && (
          <Button variant="outlined" onClick={handleResetDemoData}>
            Reset Demo Data
          </Button>
        )}
      </NewCard>
    </Wrapper>
  );
}
