import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoutes = () => {
  const { role } = useAuth();

  // Check if user has admin role
  const isReceptionist = role === "receptionist";

  // If user is not an admin, navigate to "/admin"
  return isReceptionist ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
