import AuthRoute from "../components/AuthRoute";
import Login from "../pages/Login";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Customer = lazy(() => import("../pages/Customer"));
const NewCustomer = lazy(() => import("../pages/NewCustomer"));
const UserCenter = lazy(() => import("../pages/UserCenter"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthRoute>
          <Layout />
        </AuthRoute>
      ),
      errorElement: <Error></Error>,
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={
                <Box sx={{ width: "100%", mt: 8 }}>
                  <LinearProgress />
                </Box>
              }
            >
              <Home />
            </Suspense>
          ),
        },
        {
          path: "customer",
          element: (
            <Suspense
              fallback={
                <Box sx={{ width: "100%", mt: 8 }}>
                  <LinearProgress />
                </Box>
              }
            >
              <Customer />
            </Suspense>
          ),
        },
        {
          path: "newCustomer",
          element: (
            <Suspense
              fallback={
                <Box sx={{ width: "100%", mt: 8 }}>
                  <LinearProgress />
                </Box>
              }
            >
              <NewCustomer />
            </Suspense>
          ),
        },
        {
          path: "userCenter",
          element: (
            <Suspense
              fallback={
                <Box sx={{ width: "100%", mt: 8 }}>
                  <LinearProgress />
                </Box>
              }
            >
              <UserCenter />
            </Suspense>
          ),
        },
      ],
    },
    { path: "/auth", element: <Login /> },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default router;
