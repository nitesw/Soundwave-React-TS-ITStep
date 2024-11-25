import { Navigate, useLocation } from "react-router-dom";
import { useAccountContext } from "../contexts/accounts.context";
interface ProtectedRouteProps {
  children: JSX.Element;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth, account } = useAccountContext();
  const location = useLocation();
  if (
    !isAuth() &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  )
    return <Navigate to="/login" />;
  if (
    (isAuth() && location.pathname === "/login") ||
    (isAuth() && location.pathname === "/register")
  )
    return <Navigate to="/profile" />;

  if (isAuth()) {
    const isNotAdmin = account?.role !== "admin";
    const isRestrictedPage =
      location.pathname === "/users" || location.pathname === "/playlists";

    if (isNotAdmin && isRestrictedPage) {
      return <Navigate to="/" />;
    }
  }

  return children;
};
