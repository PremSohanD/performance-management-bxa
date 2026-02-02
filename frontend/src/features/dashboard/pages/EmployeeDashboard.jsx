import { useEffect, useState } from "react";
import {
  performanceCyclesStore,
  fetchActiveCycle
} from "../../performanceCycles/performanceCycles.store";
import ActiveCycleCard from
  "../../performanceCycles/components/ActiveCycleCard";

const EmployeeDashboard = () => {
  const [cycleState, setCycleState] = useState(
    performanceCyclesStore.getState()
  );

  useEffect(() => {
    performanceCyclesStore.subscribe(setCycleState);
    fetchActiveCycle();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <ActiveCycleCard cycle={cycleState.activeCycle} />
    </div>
  );
};

export default EmployeeDashboard;
