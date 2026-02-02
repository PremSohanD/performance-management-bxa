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
    <div>
      <h2>Team Goals</h2>
      <GoalsTable goals={state.goals} />
    </div>
  );
};

export default TeamGoalsPage;
