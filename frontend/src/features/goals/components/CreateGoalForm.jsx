import { useState } from "react";
import { createGoal } from "../goals.store";

const CreateGoalForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    keyResults: [{ metric: "", targetValue: "", currentValue: 0 }]
  });
  const [loading, setLoading] = useState(false);

  // --- Handlers ---
  const handleAddKR = () => {
    setForm({
      ...form,
      keyResults: [...form.keyResults, { metric: "", targetValue: "", currentValue: 0 }]
    });
  };

  const handleKRChange = (index, field, value) => {
    const newKRs = [...form.keyResults];
    newKRs[index][field] = value;
    setForm({ ...form, keyResults: newKRs });
  };

  const handleRemoveKR = (index) => {
    const newKRs = form.keyResults.filter((_, i) => i !== index);
    setForm({ ...form, keyResults: newKRs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createGoal(form);
    setLoading(false);
    setForm({ title: "", description: "", keyResults: [] });
    if (onSuccess) onSuccess();
  };

  const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition shadow-sm";
  const labelClass = "block text-xs font-medium text-slate-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title & Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelClass}>Objective Title</label>
          <input
            placeholder="e.g. Increase Customer Retention by 15%"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            rows={3}
            placeholder="Explain the context and why this matters..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Key Results Section */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-700">Key Results (Measurable Outcomes)</h3>
        </div>

        <div className="space-y-3">
          {form.keyResults.map((kr, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 items-end bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">Metric Name</label>
                <input
                  placeholder="e.g. churn rate"
                  value={kr.metric}
                  onChange={(e) => handleKRChange(index, "metric", e.target.value)}
                  className="w-full text-sm border-b border-slate-200 focus:border-blue-500 focus:outline-none pb-1"
                  required
                />
              </div>
              <div className="w-24">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">Target</label>
                <input
                  type="number"
                  placeholder="100"
                  value={kr.targetValue}
                  onChange={(e) => handleKRChange(index, "targetValue", e.target.value)}
                  className="w-full text-sm border-b border-slate-200 focus:border-blue-500 focus:outline-none pb-1"
                  required
                />
              </div>
              {form.keyResults.length > 1 && (
                <button type="button" onClick={() => handleRemoveKR(index)} className="text-slate-400 hover:text-red-500 p-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddKR}
          className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          + Add another Key Result
        </button>
      </div>

      {/* Footer Actions */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-70 flex items-center gap-2"
        >
          {loading ? "Saving..." : "Save Goal"}
        </button>
      </div>
    </form>
  );
};

export default CreateGoalForm;