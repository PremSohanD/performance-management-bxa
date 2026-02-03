import { useEffect, useState } from "react";
import { departmentsStore, fetchDepartments } from "../departments.store";

const DepartmentSelect = ({ value, onChange, className }) => {
  const [state, setState] = useState(departmentsStore.getState());

  useEffect(() => {
    departmentsStore.subscribe(setState);
    // Fetch if empty to ensure dropdown has options
    if (state.departments.length === 0) {
      fetchDepartments();
    }
  }, []);

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      required
      className={className} // <--- Allows Parent to style it
    >
      <option value="">Select Department</option>
      {state.departments.map((d) => (
        <option key={d.id} value={d.type}>
          {d.displayName || d.type}
        </option>
      ))}
    </select>
  );
};

export default DepartmentSelect;