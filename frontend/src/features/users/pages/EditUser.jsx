import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import httpClient from "../../../services/httpClient";
import ManagerSelect from "../components/ManagerSelect";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Styles (reusing the ones we defined for consistency)
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition shadow-sm";

  useEffect(() => {
    httpClient.get(`/api/users/${id}`).then((res) => {
      setForm(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      role: form.role,
      departmentType: form.departmentType,
      departmentDisplayName: form.departmentDisplayName,
      managerId: form.managerId,
      active: form.active
    };

    await httpClient.put(`/api/users/${id}`, payload);
    navigate("/users");
  };

  if (loading) return (
    <div className="p-12 flex items-center justify-center text-slate-500">
      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin mr-3"></div>
      Loading user data...
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">

       {/* Breadcrumb */}
       <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/users" className="hover:text-slate-900 transition-colors">Users</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Edit User</span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">Edit Profile: {form.name}</h2>
            <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${form.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {form.active ? 'Active' : 'Inactive'}
            </span>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className={labelClass}>Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
                <option value="HR">HR Administrator</option>
                <option value="ADMIN">System Admin</option>
              </select>
            </div>

            {/* Status (Active/Inactive) */}
            <div>
              <label className={labelClass}>Account Status</label>
              <select
                name="active"
                value={form.active.toString()}
                onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}
                className={inputClass}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="md:col-span-2 mt-2 border-t border-slate-100 pt-4">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Department & Reporting</h3>
            </div>

            {/* Department */}
            <div>
              <label className={labelClass}>Department</label>
              <select
                name="departmentType"
                value={form.departmentType}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="ENGINEERING">Engineering</option>
                <option value="HR">Human Resources</option>
                <option value="SALES">Sales</option>
                <option value="MARKETING">Marketing</option>
                {/* Add other options as needed */}
              </select>
            </div>

            {/* Display Name */}
            <div>
              <label className={labelClass}>Display Name <span className="text-slate-400 font-normal">(Optional)</span></label>
              <input
                name="departmentDisplayName"
                value={form.departmentDisplayName || ""}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Frontend Team"
              />
            </div>

            {/* Manager Select */}
            <div className="md:col-span-2">
              <label className={labelClass}>Direct Manager</label>
              <ManagerSelect
                value={form.managerId}
                onChange={(managerId) => setForm({ ...form, managerId })}
                className={inputClass}
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
               <button
                 type="button"
                 onClick={() => navigate("/users")}
                 className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
               >
                 Cancel
               </button>
               <button
                 type="submit"
                 className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md"
               >
                 Save Changes
               </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;