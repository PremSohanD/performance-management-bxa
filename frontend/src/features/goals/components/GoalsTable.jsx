import GoalActions from "./GoalActions";

const GoalsTable = ({ goals = [] }) => {
  if (!goals.length) {
    return <p>No goals found</p>;
  }

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {goals.map((g) => (
          <tr key={g.id}>
            <td>{g.title}</td>
            <td>
              {g.status}
              {g.status === "REJECTED" && g.rejectionReason && (
                <div style={{ color: "red" }}>
                  Rejected: {g.rejectionReason}
                </div>
              )}
            </td>
            <td>
              <GoalActions goal={g} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GoalsTable;
