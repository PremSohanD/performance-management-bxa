import { useState } from "react";
import { createDepartment } from "../departments.store";

const DepartmentForm = () => {
  const [form, setForm] = useState({
    type: "",
    displayName: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createDepartment(form);
    setLoading(false);
    setForm({ type: "", displayName: "" });
  };

  const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-end gap-4">

      {/* Department Type */}
      <div className="w-full md:w-1/3">
        <label className="block text-xs font-medium text-slate-700 mb-1">Department Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
          className={inputClass}
        >
          <option value="">Select Type...</option>
          <option value="ENGINEERING">Engineering</option>
          <option value="HR">Human Resources</option>
          <option value="SALES">Sales</option>
          <option value="MARKETING">Marketing</option>
          <option value="FINANCE">Finance</option>
        </select>
      </div>

      {/* Display Name */}
      <div className="w-full md:w-1/2">
        <label className="block text-xs font-medium text-slate-700 mb-1">Display Name</label>
        <input
          placeholder="e.g. Financial Operations"
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          className={inputClass}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="w-full md:w-auto">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;