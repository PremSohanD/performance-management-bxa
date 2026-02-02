import { useState } from "react";
import { createGoal } from "../goals.store";
import { authStore } from "../../../auth/auth.store";
import KeyResultsInput from "./KeyResultsInput";

const CreateGoalForm = () => {
  const { user } = authStore.getState();

  const [form, setForm] = useState({
    title: "",
    description: "",
    keyResults: [{ metric: "", targetValue: "" }]
  });

  const submit = async (e) => {
    e.preventDefault();

    await createGoal({
      ...form,
      employeeId: user.id
    });

    setForm({
      title: "",
      description: "",
      keyResults: [{ metric: "", targetValue: "" }]
    });
  };

  return (
    <form onSubmit={submit}>
      <h3>Create Goal</h3>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        required
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <KeyResultsInput
        value={form.keyResults}
        onChange={(kr) =>
          setForm({ ...form, keyResults: kr })
        }
      />

      <button type="submit">Save Goal</button>
    </form>
  );
};

export default CreateGoalForm;
