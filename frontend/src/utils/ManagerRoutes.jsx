import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoutes = () => {
  const { role } = useAuth();

  const isManager = role === "manager";

  return isManager ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
