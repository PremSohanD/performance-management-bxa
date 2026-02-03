import { Link } from "react-router-dom";

const UserTable = ({ users = [], loading }) => {
  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Role</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Department</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
              <th className="px-6 py-3 text-right font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                <td className="px-6 py-4 text-slate-500">{user.email}</td>
                <td className="px-6 py-4">
                  {/* Role Badge */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'HR' ? 'bg-pink-100 text-pink-700' :
                    user.role === 'MANAGER' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {user.departmentDisplayName || user.departmentType || <span className="text-slate-400 italic">None</span>}
                </td>
                <td className="px-6 py-4">
                  {/* Status Badge with Dot */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.active ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.active ? 'bg-green-600' : 'bg-slate-500'}`}></span>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && !loading && (
        <div className="p-8 text-center text-slate-500 bg-slate-50">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UserTable;