import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoutes = () => {
  const { user, role } = useAuth();

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    // If user is logged in but not an admin, redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }

  // If user is an admin, render the requested route
  return <Outlet />;
};

export default AdminRoutes;
