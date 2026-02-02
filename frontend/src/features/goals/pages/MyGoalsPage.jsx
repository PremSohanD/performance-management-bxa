import { useEffect, useState } from "react";
import {
  goalsStore,
  fetchMyGoals
} from "../goals.store";
import CreateGoalForm from "../components/CreateGoalForm";
import GoalsTable from "../components/GoalsTable";

const MyGoalsPage = () => {
  const [state, setState] = useState(goalsStore.getState());

  useEffect(() => {
    const unsub = goalsStore.subscribe(setState);
    fetchMyGoals(); // 🔥 MUST BE HERE
    return unsub;
  }, []);

    console.log("Goals state:", state.goals);

  return (
    <div>
      <h2>My Goals</h2>
      <CreateGoalForm />
      <GoalsTable goals={state.goals} />
    </div>
  );
};

export default MyGoalsPage;
