import { useEffect, useState } from "react";
import { departmentsStore, fetchDepartments } from "../departments.store";
import DepartmentForm from "../components/DepartmentForm";

const DepartmentList = () => {
  const [state, setState] = useState(departmentsStore.getState());

  useEffect(() => {
    departmentsStore.subscribe(setState);
    fetchDepartments();
  }, []);

  return (
    <div className="space-y-8">

      {/* --- Page Header --- */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
        <p className="text-sm text-slate-500 mt-1">
          Organize your company structure and teams.
        </p>
      </div>

      {/* --- Section 1: Create New Department (Card) --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Add New Department
        </h2>
        <DepartmentForm />
      </div>

      {/* --- Section 2: Existing Departments (Grid) --- */}
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Active Departments ({state.departments.length})
        </h3>

        {state.departments.length === 0 ? (
          <div className="text-center p-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
            No departments found. Create one above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-900">{dept.displayName}</h4>
                  <span className="inline-block mt-2 px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {dept.type}
                  </span>
                </div>
                {/* Visual Icon based on type */}
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;