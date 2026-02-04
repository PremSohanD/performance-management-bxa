import { useEffect, useState } from "react";
import { goalsStore, fetchTeamGoals } from "../goals.store";
import GoalsTable from "../components/GoalsTable";

const TeamGoalsPage = () => {
  const [state, setState] = useState(goalsStore.getState());

  useEffect(() => {
    const unsub = goalsStore.subscribe(setState);
    fetchTeamGoals();
    return unsub;
  }, []);

  return (
    <div className="space-y-6">

      {/* --- Page Header --- */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team Goals</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of objectives assigned to your direct reports.
        </p>
      </div>

      {/* --- Goals List --- */}
      <GoalsTable goals={state.goals} />
    </div>
  );
};

export default TeamGoalsPage;