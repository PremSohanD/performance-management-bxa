import { useNavigate } from "react-router-dom";
import { authStore, logout } from "../auth/auth.store";
import { useEffect, useState } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(authStore.getState());

  useEffect(() => {
    return authStore.subscribe(setAuthState);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <span>
        Welcome {authState.user?.loginId}
      </span>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Topbar;
