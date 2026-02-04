import { useEffect, useState } from "react";
import {
  getReviewCyclesApi,
  activateReviewCycleApi,
  closeReviewCycleApi
} from "../reviewCycles.api";
import CreateReviewCycleForm from "../components/CreateReviewCycleForm";

const ReviewCyclePage = () => {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    getReviewCyclesApi().then(res => {
      setCycles(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActivate = async (id) => {
    await activateReviewCycleApi(id);
    fetchData();
  };

  const handleClose = async (id) => {
    await closeReviewCycleApi(id);
    fetchData();
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Review Cycles</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure and manage 360° reviews and manager evaluations.
        </p>
      </div>

      {/* Create Section (Card) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            {/* Matches Performance Page Icon Style */}
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Create New Review Cycle
          </h2>
        </div>
        <div className="p-6">
          <CreateReviewCycleForm onSuccess={fetchData} />
        </div>
      </div>

      {/* Cycle List Table */}
      <div className="space-y-4">
        {/* Uppercase Header matching Performance Page */}
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Cycle History ({cycles.length})
        </h3>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Cycle Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Timeline</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Configuration</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-3 text-right font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {cycles.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500 italic">
                      No review cycles found. Create one above to get started.
                    </td>
                  </tr>
                ) : (
                  cycles.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {c.startDate} <span className="text-slate-300 mx-1">→</span> {c.endDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {c.selfReviewEnabled && <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">Self</span>}
                          {c.managerReviewEnabled && <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">Manager</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          c.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' :
                          c.status === 'DRAFT' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            c.status === 'ACTIVE' ? 'bg-green-600' :
                            c.status === 'DRAFT' ? 'bg-yellow-500' :
                            'bg-slate-400'
                          }`}></span>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {c.status === "DRAFT" && (
                          <button
                            onClick={() => handleActivate(c.id)}
                            className="text-xs font-medium px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition shadow-sm"
                          >
                            Activate
                          </button>
                        )}
                        {c.status === "ACTIVE" && (
                          <button
                            onClick={() => handleClose(c.id)}
                            className="text-xs font-medium px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition"
                          >
                            Close
                          </button>
                        )}
                        {c.status === "CLOSED" && (
                          <span className="text-slate-400 text-xs italic">Read only</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCyclePage;