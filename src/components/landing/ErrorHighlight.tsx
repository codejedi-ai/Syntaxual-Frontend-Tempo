import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ErrorHighlightProps {
  text?: string;
  errorMessage?: string;
  isVisible?: boolean;
  className?: string;
}

const ErrorHighlight = ({
  text = "let unusedVariable = 'test';",
  errorMessage = "Variable is declared but never used",
  isVisible = true,
  className = "",
}: ErrorHighlightProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={`relative font-mono text-sm ${className} bg-slate-900`}
    >
      <div className="group relative inline-block">
        <span className="text-red-400 border-b-2 border-red-500/50 group-hover:border-red-500 transition-colors cursor-help">
          {text}
        </span>

        {/* Error tooltip */}
        <div className="absolute left-0 -top-8 w-max opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 border border-red-500/20 rounded-md px-3 py-1 text-xs flex items-center gap-2">
          <AlertCircle className="w-3 h-3 text-red-400" />
          <span className="text-red-200">{errorMessage}</span>
        </div>

        {/* Squiggly underline animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full w-[200%] bg-red-500/50"
            animate={{
              x: ["-50%", "0%"],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 0%, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%, transparent 100%)",
              backgroundSize: "10px 100%",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorHighlight;
