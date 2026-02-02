import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpClient from "../../../services/httpClient";
import ManagerSelect from "../components/ManagerSelect";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="MANAGER">MANAGER</option>
          <option value="HR">HR</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <select
          name="departmentType"
          value={form.departmentType}
          onChange={handleChange}
          required
        >
          <option value="ENGINEERING">ENGINEERING</option>
          <option value="HR">HR</option>
          <option value="SALES">SALES</option>
          <option value="MARKETING">MARKETING</option>
        </select>

        <input
          name="departmentDisplayName"
          value={form.departmentDisplayName || ""}
          onChange={handleChange}
        />

        <ManagerSelect
          value={form.managerId}
          onChange={(managerId) =>
            setForm({ ...form, managerId })
          }
        />

        <select
          name="active"
          value={form.active}
          onChange={(e) =>
            setForm({ ...form, active: e.target.value === "true" })
          }
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
