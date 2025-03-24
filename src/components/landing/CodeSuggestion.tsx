import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lightbulb, Check } from "lucide-react";

interface CodeSuggestionProps {
  suggestion?: string;
  improvement?: string;
  position?: { x: number; y: number };
  isVisible?: boolean;
}

const CodeSuggestion = ({
  suggestion = "Consider using const instead of let",
  improvement = "This variable is never reassigned",
  position = { x: 0, y: 0 },
  isVisible = true,
}: CodeSuggestionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.9,
        y: isVisible ? 0 : -10,
      }}
      transition={{ duration: 0.2 }}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 50,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      className="w-[300px] bg-slate-900"
    >
      <Card className="border-indigo-500/20 shadow-lg shadow-indigo-500/10 backdrop-blur-sm bg-slate-900/90">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 rounded-full bg-indigo-500/20">
              <Lightbulb className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-indigo-400 mb-1 flex items-center gap-2">
                Suggestion
                <span className="inline-flex items-center rounded-full border border-indigo-500/30 px-2 py-0.5 text-xs font-medium text-indigo-400 bg-indigo-500/10">
                  Style
                </span>
              </h4>
              <p className="text-sm text-slate-300 mb-2">{suggestion}</p>
              <div className="p-2 rounded-md bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5" />
                  <p className="text-xs text-slate-400">{improvement}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CodeSuggestion;
