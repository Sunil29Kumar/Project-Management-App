// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopNav from "../components/common/TopNav";

const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        {/* Top Navbar yahan aayega */}
        <TopNav />

        {/* Saara dynamic content (Dashboard, Projects) is Outlet mein load hoga */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;