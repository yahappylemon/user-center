import { getLocalStorage } from "../utils/localStorage";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const token = getLocalStorage("token");
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth?mode=login" replace />;
  }
}
