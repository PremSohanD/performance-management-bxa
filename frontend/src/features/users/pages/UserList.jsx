import { useEffect, useState } from "react";
import { usersStore, fetchUsers } from "../users.store";
import { authStore } from "../../../auth/auth.store";
import UserTable from "../components/UserTable";
import Pagination from "../../../components/common/Pagination";
import { Link } from "react-router-dom";

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
    <div>
      <h2>Users</h2>

      {canCreateUser && (
        <Link to="/users/create">
          <button>Create User</button>
        </Link>
      )}

      <UserTable users={usersState.users} loading={usersState.loading} />

      <Pagination
        page={usersState.page}
        totalPages={usersState.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;
