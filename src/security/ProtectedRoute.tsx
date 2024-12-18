import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectAccount, selectIsAuth } from "../redux/account/accountSlice";
interface ProtectedRouteProps {
  children: JSX.Element;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const account = useAppSelector(selectAccount);
  const location = useLocation();
  if (
    !isAuth &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  )
    return <Navigate to="/login" />;

  if (
    (isAuth && location.pathname === "/login") ||
    (isAuth && location.pathname === "/register")
  )
    return <Navigate to="/profile" />;

  if (isAuth) {
    const isNotAdmin = account?.role !== "admin";
    const isNotPro = account?.role !== "pro";
    const isNotUser = account?.role !== "user";
    const isRestrictedPage = location.pathname === "/playlists";

    if (isNotAdmin && isNotPro && isNotUser && isRestrictedPage) {
      return <Navigate to="/" />;
    }
  }

  if (isAuth) {
    const isNotAdmin = account?.role !== "admin";
    const isRestrictedPage = location.pathname === "/users";

    if (isNotAdmin && isRestrictedPage) {
      return <Navigate to="/" />;
    }
  }

  if (isAuth) {
    const isNotAdmin = account?.role !== "admin";
    const isNotPro = account?.role !== "pro";
    const isRestrictedPage =
      location.pathname === "/music" ||
      location.pathname === "/music/create" ||
      location.pathname.startsWith("/music/edit/");

    if (isNotAdmin && isNotPro && isRestrictedPage) {
      return <Navigate to="/" />;
    }
  }

  return children;
};
