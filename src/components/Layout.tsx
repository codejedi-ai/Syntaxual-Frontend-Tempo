import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  onNavItemClick?: (sectionId: string) => void;
  showDashboard?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavItemClick, showDashboard = true }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white">
      <Header onNavItemClick={onNavItemClick} showDashboard={showDashboard} />
      <main>
        {children}
      </main>
      <Footer onNavItemClick={onNavItemClick} />
    </div>
  );
};

export default Layout;