import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopNav from "../components/common/TopNav";
import { useLayout } from "../context/LayoutContext";
import Logout from "../components/Forms/LogoutModel";
import { useState } from "react";
import CreateProjectModal from "../components/projects/CreateProjectModel";
import { useProjectContext } from "../context/ProjectContext";
import { useTaskContext } from "../context/TaskContext";
import CreateTaskModal from "../components/tasks/CreateTaskModel";
import UpdateTaskModal from "../components/tasks/UpdateTaskModal";
import InviteMultipleMembers from "../components/projects/InviteMultipleMembers";

const Layout = () => {
  const { isMinimized } = useLayout();

  const [isClickOnLogout, setIsClickOnLogout] = useState(false);
  const { isClickOnNewProject, inviteMembers } = useProjectContext();
  const { isClickOnNewTask, isClickOnUpdateTask } = useTaskContext();

  const location = useLocation()


  return (
    <div className="flex relative h-screen bg-slate-100 dark:bg-[#0b0e14] transition-colors duration-300">

      <Sidebar />

      {/* TopNav and Dynamic Content Area  */}
      <div
        className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${isMinimized ? "ml-20" : "ml-64"
          }`}
      >
        {/* Top Navbar */}
        {location.pathname !== "/settings" && (
          <div className="sticky top-0 z-10">
            <TopNav setIsClickOnLogout={setIsClickOnLogout} isClickOnLogout={isClickOnLogout} />
          </div>
        )}

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-[#0d1117] m-1 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Outlet />
        </main>
      </div>


      {isClickOnLogout && <Logout setIsClickOnLogout={setIsClickOnLogout} />}
      {isClickOnNewProject && <CreateProjectModal />}
      {isClickOnNewTask && <CreateTaskModal />}
      {isClickOnUpdateTask && <UpdateTaskModal />}
      {inviteMembers.isClickOnInviteMembers && <InviteMultipleMembers />}



    </div>
  );
};

export default Layout;