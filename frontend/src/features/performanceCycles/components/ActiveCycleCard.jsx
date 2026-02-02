const ActiveCycleCard = ({ cycle }) => {
  if (!cycle) {
    return (
      <div style={{ border: "1px solid #ddd", padding: "16px" }}>
        <h3>Active Performance Cycle</h3>
        <p>No active performance cycle</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: "16px" }}>
      <h3>Active Performance Cycle</h3>

      <p><strong>Name:</strong> {cycle.name}</p>
      <p><strong>Type:</strong> {cycle.cycleType}</p>
      <p>
        <strong>Duration:</strong>{" "}
        {cycle.startDate} – {cycle.endDate}
      </p>
      <p><strong>Status:</strong> {cycle.status}</p>
    </div>
  );
};

export default ActiveCycleCard;

