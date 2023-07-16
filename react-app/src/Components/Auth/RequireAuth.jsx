import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const RequireAuth = () => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/?requireLogin=true" state={{ from: location }} replace />
  );
};

export default RequireAuth;
