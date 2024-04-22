import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoutes = () => {
  const { role } = useAuth();

  // Check if user has admin role
  const isAdmin = role === "admin";

  // If user is not an admin, navigate to "/login"
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
