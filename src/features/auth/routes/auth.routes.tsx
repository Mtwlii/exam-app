import type { RouteObject } from "react-router-dom";
import Login from "../components/forms/login/login";
import Register from "../components/forms/register/register";
// import Login from "../components/forms/";



export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//   },
];