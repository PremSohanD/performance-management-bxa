import { Link } from "react-router-dom";

const UserTable = ({ users = [], loading }) => {
  if (loading) return <p>Loading users...</p>;

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Department</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.departmentDisplayName || user.departmentType}</td>
            <td>{user.active ? "Active" : "Inactive"}</td>
            <td>
              <Link to={`/users/${user.id}/edit`}>
                <button>Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
