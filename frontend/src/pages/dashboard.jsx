import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../auth/auth.store";
import { performanceCyclesStore, fetchCycles } from "../performance/performanceCycles.store";
import ActiveCycleCard from "../performance/components/ActiveCycleCard";

// --- Components ---

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
        {icon}
      </div>
    </div>
  </div>
);

const ActionButton = ({ label, desc, onClick, icon }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-start p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all group w-full text-left"
  >
    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 transition-colors mb-3">
      {icon}
    </div>
    <span className="font-semibold text-slate-800 group-hover:text-blue-700">{label}</span>
    <span className="text-xs text-slate-500 mt-1">{desc}</span>
  </button>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = authStore.getState();

  // State for Performance Cycles
  const [cycleState, setCycleState] = useState(performanceCyclesStore.getState());

  useEffect(() => {
    const unsubscribe = performanceCyclesStore.subscribe(setCycleState);
    fetchCycles();
    return () => unsubscribe();
  }, []);

  // Find the ACTIVE cycle
  const activeCycle = cycleState.cycles.find(c => c.status === "ACTIVE");

  return (
    <div className="space-y-6">

      {/* --- Section 1: Welcome / Stats --- */}
      {/* Removed the redundant "Dashboard" H1. Replaced with Stats Grid immediately for a cleaner look. */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Employees"
          value="12"
          color="bg-blue-50 text-blue-600"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <StatCard
          title="Departments"
          value="4"
          color="bg-purple-50 text-purple-600"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
        <StatCard
          title="Pending Reviews"
          value="3"
          color="bg-orange-50 text-orange-600"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- Section 2: Active Cycle Card (Hero) --- */}
        <div className="lg:col-span-2">
           {/* This component handles its own internal "Active Performance Cycle" title */}
           <ActiveCycleCard cycle={activeCycle} />
        </div>

        {/* --- Section 3: Quick Actions --- */}
        <div className="space-y-4">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-1">Quick Actions</h3>

           <ActionButton
             label="My Goals"
             desc="Update your progress"
             onClick={() => navigate('/goals')}
             icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
           />

           {(user?.role === "HR" || user?.role === "ADMIN") && (
             <ActionButton
               label="Manage Users"
               desc="Add or edit employees"
               onClick={() => navigate('/users')}
               icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
             />
           )}
        </div>
      </div>
    </div>
  );
}