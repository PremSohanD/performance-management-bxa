import { NavLink } from "react-router-dom";
import { authStore } from "../auth/auth.store";

const Sidebar = () => {
  const { user } = authStore.getState();
  console.log("Logged in user:", user);

  return (
    <div style={{ width: "220px", background: "#1e293b", color: "#fff" }}>
      <h3 style={{ padding: "20px" }}>PMS</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 20px" }}>
        <NavLink to="/dashboard" style={{ color: "#fff" }}>
          Dashboard
        </NavLink>

        {(user?.role === "HR" || user?.role === "ADMIN") && (
                <>
                  <NavLink to="/users">Users</NavLink>
                  <NavLink to="/departments">Departments</NavLink>
                  <NavLink to="/performance-cycles">
                    Performance Cycles
                  </NavLink>
                </>
              )}

        {(user?.role === "EMPLOYEE" || user?.role === "MANAGER") && (
                <NavLink to="/goals">Goals</NavLink>
              )}

        {user?.role === "MANAGER" && (
          <>
            <NavLink to="/goals">My Goals</NavLink>
            <NavLink to="/goals/team">Team Goals</NavLink>
          </>
        )}



      </nav>
    </div>
  );
};


export default Sidebar;
