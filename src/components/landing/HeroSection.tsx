import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import CTAButton from "./CTAButton";

interface HeroSectionProps {
  onGetStarted?: () => void;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  onGetStarted = () => {},
  title = "Grammarly for Code",
  subtitle = "AI-powered code analysis that helps you write better, cleaner, and more maintainable code.",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-[600px] bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-slate-900" />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo className="mx-auto mb-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-slate-300 max-w-2xl mb-12"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CTAButton onClick={onGetStarted} />
        </motion.div>

        {/* Code pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
          <pre className="text-[8px] text-white whitespace-pre font-mono leading-tight">
            {Array(50)
              .fill(
                "function analyze() { const code = getCode(); return AI.suggest(code); } // Syntaxtual AI\n",
              )
              .join("")}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
