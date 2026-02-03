const ActiveCycleCard = ({ cycle }) => {
  if (!cycle) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="inline-flex p-3 rounded-full bg-slate-50 text-slate-400 mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-slate-900 font-medium">No Active Cycle</h3>
        <p className="text-sm text-slate-500 mt-1">There is currently no performance cycle in progress.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Active Performance Cycle
        </h3>
        <span className="px-2.5 py-0.5 text-xs font-bold text-green-700 bg-green-100 rounded-full border border-green-200 uppercase tracking-wide">
          {cycle.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Cycle Name</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{cycle.name}</h2>
          </div>
          <div className="text-right">
             <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100">
               {cycle.cycleType}
             </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
           <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <div>
             <span className="text-slate-500">Duration: </span>
             <span className="font-medium text-slate-900">
               {cycle.startDate} — {cycle.endDate}
             </span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveCycleCard;