import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Topbar - Fixed height */}
        <Topbar />

        {/* Scrollable Content Canvas */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;