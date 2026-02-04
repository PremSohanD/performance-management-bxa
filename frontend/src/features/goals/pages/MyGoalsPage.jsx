import { useEffect, useState } from "react";
import { goalsStore, fetchMyGoals } from "../goals.store";
import CreateGoalForm from "../components/CreateGoalForm";
import GoalsTable from "../components/GoalsTable";

const MyGoalsPage = () => {
  const [state, setState] = useState(goalsStore.getState());
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    const unsub = goalsStore.subscribe(setState);
    fetchMyGoals();
    return unsub;
  }, []);

  return (
    <div className="space-y-8">

      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Goals</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your objectives and key results (OKRs).
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          {showCreate ? "Cancel Goal" : "+ Set New Goal"}
        </button>
      </div>

      {/* --- Create Goal Section (Collapsible) --- */}
      {showCreate && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-semibold text-slate-800">Define New Objective</h2>
          </div>
          <div className="p-6">
            <CreateGoalForm onSuccess={() => setShowCreate(false)} />
          </div>
        </div>
      )}

      {/* --- Goals List --- */}
      <div className="space-y-4">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Active Objectives
         </h3>
         <GoalsTable goals={state.goals} />
      </div>
    </div>
  );
};

export default MyGoalsPage;