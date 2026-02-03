import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usersStore, fetchUsers } from "../users.store";
import { authStore } from "../../../auth/auth.store";
import UserTable from "../components/UserTable";
import Pagination from "../../../components/common/Pagination"; // Assuming this exists

const UserList = () => {
  const [usersState, setUsersState] = useState(usersStore.getState());
  const [authState, setAuthState] = useState(authStore.getState());

  useEffect(() => {
    usersStore.subscribe(setUsersState);
    authStore.subscribe(setAuthState);
    fetchUsers(0);
  }, []);

  const canCreateUser =
    authState.user?.role === "HR" || authState.user?.role === "ADMIN";

  const handlePageChange = (newPage) => {
    fetchUsers(newPage);
  };

  return (
    <div className="space-y-6">

      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            View and manage employee accounts and permissions.
          </p>
        </div>

        {canCreateUser && (
          <Link
            to="/users/create"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create User
          </Link>
        )}
      </div>

      {/* --- Table Section --- */}
      <UserTable users={usersState.users} loading={usersState.loading} />

      {/* --- Footer / Pagination --- */}
      <div className="flex justify-center pt-4">
        <Pagination
          page={usersState.page}
          totalPages={usersState.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserList;