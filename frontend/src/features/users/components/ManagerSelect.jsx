import { useEffect, useState } from "react";
import httpClient from "../../../services/httpClient";

const ManagerSelect = ({ value, onChange }) => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    httpClient
      .get("/api/users", {
        params: { size: 100 } // temp large page
      })
      .then((res) => {
        const users = res.data.content || [];
        const eligibleManagers = users.filter(
          (u) =>
            u.role === "MANAGER" ||
            u.role === "HR" ||
            u.role === "ADMIN"
        );
        setManagers(eligibleManagers);
      });
  }, []);

  return (
    <select
      value={value || ""}
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : null)
      }
    >
      <option value="">No Manager</option>
      {managers.map((m) => (
        <option key={m.id} value={m.id}>
          {m.name} ({m.role})
        </option>
      ))}
    </select>
  );
};

export default ManagerSelect;
