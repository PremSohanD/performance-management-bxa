import { useEffect, useState } from "react";
import {
  departmentsStore,
  fetchDepartments
} from "../departments.store";

const DepartmentSelect = ({ value, onChange }) => {
  const [state, setState] = useState(departmentsStore.getState());

  useEffect(() => {
    departmentsStore.subscribe(setState);
    if (state.departments.length === 0) {
      fetchDepartments();
    }
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} required>
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
