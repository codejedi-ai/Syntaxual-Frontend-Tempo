import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code2, GitBranch, Zap } from "lucide-react";

interface FeatureCardProps {
  icon?: "code" | "git" | "ai";
  title?: string;
  description?: string;
  className?: string;
}

const FeatureCard = ({
  icon = "code",
  title = "Smart Code Analysis",
  description = "Real-time code suggestions and improvements as you type, powered by advanced AI.",
  className = "",
}: FeatureCardProps) => {
  const icons = {
    code: Code2,
    git: GitBranch,
    ai: Zap,
  };

  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-[350px] h-[300px] bg-slate-900 ${className}`}
    >
      <Card className="h-full p-6 border-slate-700/50 bg-slate-900/90 backdrop-blur-sm hover:border-indigo-500/50 transition-colors group">
        <div className="relative h-full flex flex-col">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
              <Icon className="w-6 h-6 text-indigo-400" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
          </div>

          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-violet-500/0 group-hover:from-indigo-500/5 group-hover:to-violet-500/5 transition-colors rounded-lg pointer-events-none" />
        </div>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
