import { useEffect, useState } from "react";
import {
  departmentsStore,
  fetchDepartments
} from "../departments.store";
import DepartmentForm from "../components/DepartmentForm";

const DepartmentList = () => {
  const [state, setState] = useState(departmentsStore.getState());

  useEffect(() => {
    departmentsStore.subscribe(setState);
    fetchDepartments();
  }, []);

  return (
    <div>
      <h2>Departments</h2>

      <DepartmentForm />

      <ul>
        {state.departments.map((dept) => (
          <li key={dept.id}>
            {dept.displayName} ({dept.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
