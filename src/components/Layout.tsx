import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  onNavItemClick?: (sectionId: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavItemClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500/10 via-violet-500/10 to-slate-900 text-white">
      <Header onNavItemClick={onNavItemClick} />
      <main>
        {children}
      </main>
      <Footer onNavItemClick={onNavItemClick} />
    </div>
  );
};

export default Layout;