import { useState, useEffect } from "react";
import { login, authStore } from "../auth.store";
import ErrorAlert from "./ErrorAlert";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState(authStore.getState());

  useEffect(() => {
    authStore.subscribe(setAuthState);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // IMPORTANT: match LoginRequest DTO
    const payload = {
      email: email.trim(),
      password: password
    };

    login(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {authState.error && <ErrorAlert message={authState.error} />}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={authState.loading}>
        {authState.loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
