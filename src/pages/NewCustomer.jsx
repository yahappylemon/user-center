import {
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import Wrapper from "../components/Wrapper";
import NewCard from "../components/styledCard";
import Inputs from "../components/Inputs";
import Selects from "../components/Selects";
import DatePickers from "../components/DatePickers";
import {
  getSingleCustomerAPI,
  postCustomerAPI,
  putCustomerAPI,
} from "../apis/customer";
import {
  exercisesOptions,
  approachesOptions,
  medicalHistoryOptions,
} from "../utils/options";
import { valueIsNull, valueIsEmail } from "../utils/formValidation";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { initialState } from "../utils/options";

export default function NewCustomer() {
  const navigate = useNavigate();
  // 表單錯誤狀態管理
  const [emptyError, setEmptyError] = useState({
    customerName: false,
    gender: false,
    firstLesson: false,
  });
  const [emailError, setEmailError] = useState(false);

  // 表單預設值
  const [formValue, setFormValue] = useState(initialState);

  // 從url的查詢參數，獲取當前客戶名稱
  const [searchParams] = useSearchParams();
  const [currentCustomer, setCurrentCustomer] = useState(
    searchParams.get("id")
  );
  // 有客戶(edit模式)=>沒客戶(再次點擊newCustomer)，重新獲取查詢參數、清空表單
  useEffect(() => {
    const id = searchParams.get("id");
    setCurrentCustomer(id);
    id === null && setFormValue(initialState);
  }, [searchParams]);

  // 若有當前客戶(edit模式)，向後端請求當前客戶資訊、更新表單預設值
  useEffect(() => {
    async function getCurrentCustomerInfo() {
      try {
        const res = await getSingleCustomerAPI({
          id: currentCustomer,
        });
        const customerData = res.data.data;
        setFormValue({
          ...formValue,
          ...customerData,
          birthYear:
            customerData.birthYear !== null
              ? dayjs(`${customerData.birthYear}-01-01`)
              : null,
          firstLesson: dayjs(customerData.firstLesson),
          lastLesson:
            customerData.lastLesson !== null
              ? dayjs(customerData.lastLesson)
              : null,
        });
      } catch (error) {
        if (
          error?.response?.status === 404 ||
          error?.response?.status === 500
        ) {
          setCurrentCustomer(null);
        }
      }
    }
    if (currentCustomer) {
      getCurrentCustomerInfo();
    }
  }, [currentCustomer]);

  // 監聽表單變化
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
    // 若為需要驗證之項目則進行校驗
    if (Object.keys(emptyError).includes(name)) {
      setEmptyError((error) => ({
        ...error,
        [name]: valueIsNull(value),
      }));
    }
    if (name === "email") {
      setEmailError(valueIsEmail(value));
    }
  }

  // 監聽日期變化
  function handleDateChange(date, name) {
    setFormValue((formValue) => ({
      ...formValue,
      [name]: date,
    }));
    // 若為需要驗證之項目則進行校驗
    if (Object.keys(emptyError).includes(name)) {
      setEmptyError((error) => ({
        ...error,
        [name]: valueIsNull(dateFormatter(date, "YYYY-MM-DD")),
      }));
    }
  }

  // 轉換表單日期格式
  function dateFormatter(date, format) {
    if (!date) {
      return null;
    }
    const dateValue = dayjs(date.toDate());
    const formattedDate = dateValue.format(format);
    return formattedDate;
  }

  // 校驗表單
  function validateForm(submitValue) {
    const emptyKeys = Object.keys(emptyError);
    const validatedObj = Object.fromEntries(
      emptyKeys.map((key, index) => [
        key,
        emptyKeys
          .map((key) => submitValue[key])
          .map((value) => valueIsNull(value))[index],
      ])
    );
    setEmptyError((error) => ({
      ...error,
      ...validatedObj,
    }));

    setEmailError(valueIsEmail(submitValue.email));
  }

  // 送出表單
  async function handleSubmit(e) {
    e.preventDefault();
    // 收集表單數據並轉換表單日期格式
    const submitValue = {
      ...formValue,
      birthYear: dateFormatter(formValue.birthYear, "YYYY"),
      firstLesson: dateFormatter(formValue.firstLesson, "YYYY-MM-DD"),
      lastLesson: dateFormatter(formValue.lastLesson, "YYYY-MM-DD"),
    };
    // 校驗表單
    validateForm(submitValue);
    if (
      !submitValue.firstLesson ||
      !submitValue.gender ||
      !submitValue.customerName ||
      emailError ||
      emptyError.customerName ||
      emptyError.gender ||
      emptyError.firstLesson
    ) {
      return;
    } else {
      // 依據是否有當前客戶(edit模式)，判斷傳送方式
      currentCustomer
        ? await putCustomerAPI(submitValue)
        : await postCustomerAPI(submitValue);
      // 跳轉回客戶頁面
      navigate("/customer");
    }
  }

  return (
    <Wrapper>
      <NewCard sx={{ width: "100%" }}>
        {/* 根據有無當前客戶(edit模式)渲染標題 */}
        <Typography variant="h5" component="h1">
          {currentCustomer ? "Edit Customer" : "New Customer"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 1,
          }}
        >
          <Grid container rowSpacing={1} columnSpacing={4}>
            {/* 客戶姓名，必填 */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Inputs
                id="customerName"
                label="Customer Name"
                type="text"
                value={formValue}
                onChange={handleInputChange}
                required
                autoFocus
                error={emptyError.customerName && true}
                helperText={emptyError.customerName}
              />
            </Grid>
            {/* 客戶出生年份 */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DatePickers
                label="Birth Year"
                name="birthYear"
                views={["year"]}
                value={formValue}
                onChange={(date) => handleDateChange(date, "birthYear")}
                minDate={dayjs("1920-01-01")}
                maxDate={dayjs()}
              />
            </Grid>
            {/* 客戶性別，必填 */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel
                  htmlFor="gender"
                  required
                  error={emptyError.gender && true}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  sx={{ flexWrap: "nowrap" }}
                  name="gender"
                  value={formValue.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
                {emptyError.gender && (
                  <FormHelperText error sx={{ m: 0 }}>
                    {emptyError.gender}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            {/* 客戶電話 */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Inputs
                id="phoneNumber"
                label="Phone"
                type="tel"
                value={formValue}
                onChange={handleInputChange}
              />
            </Grid>
            {/* 客戶Email */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Inputs
                id="email"
                label="Email"
                type="email"
                value={formValue}
                onChange={handleInputChange}
                error={emailError && true}
                helperText={emailError}
              />
            </Grid>
            {/* 客戶運動頻率 */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Inputs
                id="frequency"
                label="Exercise Frequency"
                type="text"
                value={formValue}
                onChange={handleInputChange}
              />
            </Grid>
            {/* 客戶運動型態 */}
            <Selects
              id="regularExercises"
              label="Regular Exercises"
              value={formValue}
              options={exercisesOptions}
              onChangeFn={handleInputChange}
              otherId="otherExercises"
              otherLabel="Other Exercises"
            />
            {/* 客戶得知途徑 */}
            <Selects
              id="approaches"
              label="How Did You Hear About Us"
              value={formValue}
              options={approachesOptions}
              onChangeFn={handleInputChange}
              otherId="otherApproaches"
              otherLabel="Other Approaches"
            />
            {/* 客戶首堂課日期 */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DatePickers
                label="First Lesson *"
                name="firstLesson"
                required
                value={formValue}
                onChange={(date) => handleDateChange(date, "firstLesson")}
                helperText={emptyError.firstLesson}
                minDate={dayjs("2023-01-01")}
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    error: emptyError.firstLesson && true,
                  },
                }}
              />
            </Grid>
            {/* 客戶末堂課日期 */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DatePickers
                label="Last Lesson"
                name="lastLesson"
                value={formValue}
                minDate={dayjs(formValue.firstLesson)}
                onChange={(date) => handleDateChange(date, "lastLesson")}
              />
            </Grid>
            {/* 客戶總課程數 */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Inputs
                id="totalLessons"
                label="Total Lessons"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={formValue}
                onChange={handleInputChange}
              />
            </Grid>
            {/* 客戶課程剩餘堂數 */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Inputs
                id="remainingLessons"
                label="Remaining Lessons"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={formValue}
                onChange={handleInputChange}
              />
            </Grid>
            {/* 客戶病歷史 */}
            <Selects
              id="medicalHistoryCategory"
              label="Medical History"
              value={formValue}
              options={medicalHistoryOptions}
              onChangeFn={handleInputChange}
              otherId="medicalHistoryOther"
              otherLabel="Other Medical Histories"
            />
          </Grid>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </NewCard>
    </Wrapper>
  );
}
