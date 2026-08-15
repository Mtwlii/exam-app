import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/guards/protected-route";


export const diplomaRoutes: RouteObject[] = [
  {
    path: "/diplomas",
    element: (
      <ProtectedRoute>
        <div>Diplomas page (component coming soon)</div>
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/diplomas/:id",
  //   element: (
  //     <ProtectedRoute>
  //       <DiplomaDetails />
  //     </ProtectedRoute>
  //   ),
  // },
];