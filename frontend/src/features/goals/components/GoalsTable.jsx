const GoalsTable = ({ goals }) => {
  if (!goals || goals.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
        <p>No goals found. Start by creating one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {goals.map((goal) => (
        <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">

          {/* Goal Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{goal.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{goal.description}</p>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${
              goal.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'
            }`}>
              {goal.status || 'In Progress'}
            </span>
          </div>

          {/* Key Results Progress */}
          <div className="space-y-3">
            {goal.keyResults?.map((kr) => {
              const progress = Math.min(100, Math.round((kr.currentValue / kr.targetValue) * 100)) || 0;
              return (
                <div key={kr.id} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">{kr.metric}</span>
                    <span className="text-slate-500 text-xs">
                      {kr.currentValue} / <span className="text-slate-900 font-semibold">{kr.targetValue}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
};

export default GoalsTable;