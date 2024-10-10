import { getLocalStorage } from "../utils/localStorage";
import { Navigate } from "react-router-dom";

// 若當前帳號token過期、被竄改，跳轉至登入頁
export default function AuthRoute({ children }) {
  const token = getLocalStorage("token");
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth?mode=login" replace />;
  }
}
