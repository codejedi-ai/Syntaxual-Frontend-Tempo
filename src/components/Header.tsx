import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 px-6 backdrop-blur-md bg-black/50 border-b border-white/10",
      className
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-tr from-white to-fuchsia-500 text-transparent bg-clip-text">
          Syntaxual
        </Link>
        <div className="flex space-x-6">
          <Link to="#" className="text-white/70 hover:text-white">Discord</Link>
          <Link to="#" className="text-white/70 hover:text-white">Blog</Link>
          <Link to="#" className="text-white/70 hover:text-white">Documentation</Link>
          <Link to="#" className="text-white/70 hover:text-white">Contact</Link>
        </div>
      </div>
    </header>
  );
}
