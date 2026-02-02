// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { authStore } from "../auth/auth.store";

const useAuth = () => {
  const [authState, setAuthState] = useState(authStore.getState());

  useEffect(() => {
    const unsubscribe = authStore.subscribe(setAuthState);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return authState;
};

export default useAuth;
