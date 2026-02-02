import { useEffect, useState } from "react";
import {
  performanceCyclesStore,
  fetchCycles
} from "../performanceCycles.store";
import CreatePerformanceCycleForm from "../components/CreatePerformanceCycleForm";
import PerformanceCycleTable from "../components/PerformanceCycleTable";
import { authStore } from "../../../auth/auth.store";

const PerformanceCycleList = () => {
  const [state, setState] = useState(
    performanceCyclesStore.getState()
  );
  const { user } = authStore.getState();

  useEffect(() => {
    performanceCyclesStore.subscribe(setState);
    fetchCycles();
  }, []);

  return (
    <div>
      <h2>Performance Cycles</h2>

      {(user?.role === "HR" || user?.role === "ADMIN") && (
        <CreatePerformanceCycleForm />
      )}

      <PerformanceCycleTable cycles={state.cycles} />
    </div>
  );
};

export default PerformanceCycleList;
