import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { authStore } from "../auth.store";

const Login = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(authStore.getState());

  useEffect(() => {
    authStore.subscribe(setAuthState);
  }, []);

  // 🔥 REDIRECT ON SUCCESS
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authState.isAuthenticated, navigate]);

  return (
    <div className="auth-container">
      <h2>Login to PMS</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
