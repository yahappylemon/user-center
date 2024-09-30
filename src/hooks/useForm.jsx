import { useState } from "react";

export default function useForm(errorState = {}, formState = {}) {
  // 表單錯誤狀態管理
  const [error, setError] = useState(errorState);

  // 表單預設值
  const [formValue, setFormValue] = useState(formState);

  // 監聽表單變化
  function handleInputChange(e, ...errorKeys) {
    const { name, value } = e.target;
    setFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
    // 當用戶正在輸入該欄位時，不顯示錯誤狀態
    setError((error) => ({
      ...error,
      [name]: false,
      ...errorKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {}),
    }));
  }

  // 校驗表單
  function validateForm(formValue, validations) {
    const newErrors = {};
    Object.entries(validations).forEach(([field, validateFn]) => {
      const errorMessage = validateFn(formValue[field]);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });
    setError((error) => ({ ...error, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  // 送出表單
  async function handleSubmit(e, errorType, requestFn, errorHandler) {
    e.preventDefault();
    // 校驗表單
    validateForm(formValue);
    // 依據登入/註冊模式，判斷傳送方式
    if (errorType) {
      return;
    } else {
      try {
        await requestFn(formValue);
      } catch (error) {
        if (errorHandler) {
          const newErrors = errorHandler(error);
          setError((error) => ({ ...error, ...newErrors }));
        }
      }
    }
  }
  return {
    formValue,
    setFormValue,
    error,
    setError,
    handleInputChange,
    handleSubmit,
    validateForm,
  };
}
