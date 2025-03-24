import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

interface FeatureGridProps {
  features?: Array<{
    icon: "code" | "git" | "ai";
    title: string;
    description: string;
  }>;
  className?: string;
}

const FeatureGrid = ({
  features = [
    {
      icon: "code",
      title: "Smart Code Analysis",
      description:
        "Real-time code suggestions and improvements as you type, powered by advanced AI.",
    },
    {
      icon: "git",
      title: "Automated Code Reviews",
      description:
        "Get comprehensive code reviews with contextual suggestions and best practices.",
    },
    {
      icon: "ai",
      title: "Style Consistency",
      description:
        "Maintain consistent code style across your entire codebase with AI-powered suggestions.",
    },
  ],
  className = "",
}: FeatureGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-[1200px] mx-auto px-4 py-16 bg-slate-900 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureGrid;
