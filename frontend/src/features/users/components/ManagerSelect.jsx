import { useEffect, useState } from "react";
import httpClient from "../../../services/httpClient";

const ManagerSelect = ({ value, onChange, className }) => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    httpClient
      .get("/api/users", { params: { size: 100 } })
      .then((res) => {
        const users = res.data.content || [];
        const eligibleManagers = users.filter(
          (u) => u.role === "MANAGER" || u.role === "HR" || u.role === "ADMIN"
        );
        setManagers(eligibleManagers);
      });
  }, []);

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      className={className} // Allows passing Tailwind classes from parent
    >
      <option value="">No Manager (Self-Directed)</option>
      {managers.map((m) => (
        <option key={m.id} value={m.id}>
          {m.name} — {m.role}
        </option>
      ))}
    </select>
  );
};

export default ManagerSelect;