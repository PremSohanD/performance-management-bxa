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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">

      {/* Left side (Breadcrumb or Welcome text) */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Overview
        </h2>
      </div>

      {/* Right side (User info & Actions) */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-700">
            {authState.user?.loginId}
          </span>
          <span className="text-xs text-gray-500">
            {authState.user?.role} Account
          </span>
        </div>

        <div className="h-8 w-px bg-gray-200 mx-2"></div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;