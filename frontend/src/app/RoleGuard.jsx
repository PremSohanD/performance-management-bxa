import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../auth/auth.store";

const RoleGuard = ({ allowedRoles }) => {
  const { user } = authStore.getState();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
