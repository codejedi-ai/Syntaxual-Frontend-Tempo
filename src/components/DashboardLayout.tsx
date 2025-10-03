import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header showDashboard={true} />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
