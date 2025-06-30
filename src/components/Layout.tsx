import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  onNavItemClick?: (sectionId: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavItemClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/30 to-black text-white">
      <Header onNavItemClick={onNavItemClick} />
      <main>
        {children}
      </main>
      <Footer onNavItemClick={onNavItemClick} />
    </div>
  );
};

export default Layout;