import { useEffect, useState } from "react";
import { startCycle, closeCycle } from "../performanceCycles.store";
import { authStore } from "../../../auth/auth.store";

const PerformanceCycleTable = ({ cycles }) => {
  const [authState, setAuthState] = useState(authStore.getState());

  useEffect(() => {
    return authStore.subscribe(setAuthState);
  }, []);

  const isHR = authState.user?.role === "HR";
  console.log("Auth user:", authState.user);
  console.log("Cycles:", cycles);

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cycles.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.cycleType}</td>
            <td>{c.startDate}</td>
            <td>{c.endDate}</td>
            <td>{c.status}</td>
            <td>
              {isHR && c.status === "DRAFT" && (
                <button onClick={() => startCycle(c.id)}>
                  Start
                </button>
              )}
              {isHR && c.status === "ACTIVE" && (
                <button onClick={() => closeCycle(c.id)}>
                  Close
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PerformanceCycleTable;
