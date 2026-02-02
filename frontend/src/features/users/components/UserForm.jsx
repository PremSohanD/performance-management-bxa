import { useState } from "react";
import { createUser } from "../users.store";
import { useNavigate } from "react-router-dom";
import ManagerSelect from "./ManagerSelect";
import DepartmentSelect from "../../departments/components/DepartmentSelect";

const UserForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    departmentType: "",
    departmentDisplayName: "",
    managerId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
      departmentType: form.departmentType,
      departmentDisplayName: form.departmentDisplayName || null,
      managerId: form.managerId ? Number(form.managerId) : null
    };

    await createUser(payload);

    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "450px" }}>
      {/* Username */}
      <div>
        <label>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="new-email"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
      </div>

      {/* Role */}
      <div>
        <label>Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="">Select role</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
          <option value="HR">HR</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Department Type */}
      <div>
        <label>Department Type</label>

        <DepartmentSelect
          value={form.departmentType}
          onChange={(value) =>
            setForm({ ...form, departmentType: value })
          }
        />
      </div>

      {/* Department Display Name */}
      <div>
        <label>Department Display Name (optional)</label>
        <input
          name="departmentDisplayName"
          value={form.departmentDisplayName}
          onChange={handleChange}
          placeholder="e.g. Platform Team"
        />
      </div>

      {/* Manager ID */}
      <div>
        <label>Manager ID (optional)</label>
        <ManagerSelect
          value={form.managerId}
          onChange={(managerId) =>
            setForm({ ...form, managerId })
          }
        />
      </div>

      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
