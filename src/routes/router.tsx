import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "@/features/auth/routes/auth.routes";
import { diplomaRoutes } from "@/features/diploma/routes/diploma.routes";


export const router = createBrowserRouter([
  ...authRoutes,
  ...diplomaRoutes,

 
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);