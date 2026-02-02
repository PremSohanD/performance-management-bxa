import { submitGoal, approveGoal, rejectGoal } from "../goals.store";
import { authStore } from "../../../auth/auth.store";

const GoalActions = ({ goal }) => {
  const { user } = authStore.getState();

  // EMPLOYEE → submit
  if (user.role === "EMPLOYEE" && goal.status === "DRAFT") {
    return (
      <button onClick={() => submitGoal(goal.id)}>
        Submit
      </button>
    );
  }

  // MANAGER → approve / reject
  if (user.role === "MANAGER" && goal.status === "SUBMITTED") {
    return (
      <>
        <button onClick={() => approveGoal(goal.id)}>
          Approve
        </button>

        <button
          onClick={() => {
            const reason = prompt("Rejection reason:");
            if (reason) rejectGoal(goal.id, reason);
          }}
        >
          Reject
        </button>
      </>
    );
  }

  return null;
};

export default GoalActions;
