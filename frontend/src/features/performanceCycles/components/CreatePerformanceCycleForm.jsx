import { useState } from "react";
import { createCycle } from "../performanceCycles.store";

const CreatePerformanceCycleForm = () => {
  const [form, setForm] = useState({
    name: "",
    cycleType: "",
    startDate: "",
    endDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCycle(form);
    setForm({ name: "", cycleType: "", startDate: "", endDate: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Performance Cycle</h3>

      <input
        placeholder="Cycle Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <select
        value={form.cycleType}
        onChange={(e) =>
          setForm({ ...form, cycleType: e.target.value })
        }
        required
      >
        <option value="">Select Type</option>
        <option value="ANNUAL">ANNUAL</option>
        <option value="QUARTERLY">QUARTERLY</option>
      </select>

      <input
        type="date"
        value={form.startDate}
        onChange={(e) =>
          setForm({ ...form, startDate: e.target.value })
        }
        required
      />

      <input
        type="date"
        value={form.endDate}
        onChange={(e) =>
          setForm({ ...form, endDate: e.target.value })
        }
        required
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePerformanceCycleForm;
