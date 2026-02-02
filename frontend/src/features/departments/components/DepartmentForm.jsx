import { useState } from "react";
import { createDepartment } from "../departments.store";

const DepartmentForm = () => {
  const [form, setForm] = useState({
    type: "",
    displayName: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDepartment(form);
    setForm({ type: "", displayName: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        required
      >
        <option value="">Select Department Type</option>
        <option value="ENGINEERING">ENGINEERING</option>
        <option value="HR">HR</option>
        <option value="SALES">SALES</option>
        <option value="MARKETING">MARKETING</option>
      </select>

      <input
        placeholder="Display Name"
        value={form.displayName}
        onChange={(e) =>
          setForm({ ...form, displayName: e.target.value })
        }
      />

      <button type="submit">Create Department</button>
    </form>
  );
};

export default DepartmentForm;
