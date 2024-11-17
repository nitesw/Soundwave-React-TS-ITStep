import { useNavigate } from "react-router-dom";
import { tokenService } from "../services/token.service";
import { useEffect } from "react";
import { useAccountContext } from "../contexts/accounts.context";

export default function Profile() {
  const navigate = useNavigate();
  const { account } = useAccountContext();

  useEffect(() => {
    if (!tokenService.isAuthenticated()) navigate("/login");
  }, [navigate, account]);

  return tokenService.isAuthenticated() ? (
    <div>Profile page</div>
  ) : (
    <div>
      <h2 style={{ fontWeight: "normal" }}>Redirecting to Login page...</h2>
    </div>
  );
}
