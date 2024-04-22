import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoutes = () => {
  const { role } = useAuth();

  // Check if user has admin role
  const isManager = role === "manager";

  // If user is not an admin, navigate to "/admin"
  return isManager ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
