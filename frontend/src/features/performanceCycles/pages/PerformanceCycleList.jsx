import { useEffect, useState } from "react";
import { performanceCyclesStore, fetchCycles } from "../performanceCycles.store";
import CreatePerformanceCycleForm from "../components/CreatePerformanceCycleForm";
import PerformanceCycleTable from "../components/PerformanceCycleTable";
import { authStore } from "../../../auth/auth.store";

const PerformanceCycleList = () => {
  const [state, setState] = useState(performanceCyclesStore.getState());
  const { user } = authStore.getState();

  useEffect(() => {
    performanceCyclesStore.subscribe(setState);
    fetchCycles();
  }, []);

  const canManage = user?.role === "HR" || user?.role === "ADMIN";

  return (
    <div className="space-y-8">

      {/* --- Page Header --- */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Performance Cycles</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage review periods, timelines, and active status.
        </p>
      </div>

      {/* --- Create Section (Card) --- */}
      {canManage && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Create New Cycle
            </h2>
          </div>
          <div className="p-6">
            <CreatePerformanceCycleForm />
          </div>
        </div>
      )}

      {/* --- Table Section --- */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Cycle History ({state.cycles.length})
          </h3>
        </div>
        <PerformanceCycleTable cycles={state.cycles} />
      </div>
    </div>
  );
};

export default PerformanceCycleList;