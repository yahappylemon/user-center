import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: getLocalStorage("theme") || "butter" },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload.theme;
      setLocalStorage(action.payload.key, action.payload.theme);
    },
  },
});

const { setTheme } = themeSlice.actions;

export { setTheme };
export default themeSlice.reducer;
