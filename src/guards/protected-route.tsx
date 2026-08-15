import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";


export default function ProtectedRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}