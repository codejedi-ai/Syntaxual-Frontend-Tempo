import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import CodeSuggestion from "./CodeSuggestion";
import ErrorHighlight from "./ErrorHighlight";

interface CodeEditorProps {
  initialCode?: string;
  className?: string;
}

const CodeEditor = ({
  initialCode = `function calculateTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.price
  })
  return total
}

let unusedVariable = 'test';
`,
  className = "",
}: CodeEditorProps) => {
  const [code] = useState(initialCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-[800px] h-[400px] ${className} bg-slate-900`}
    >
      <Card className="h-full border-slate-700/50 bg-slate-900/90 backdrop-blur-sm overflow-hidden">
        {/* Editor header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs text-slate-400 font-mono ml-2">script.js</div>
        </div>

        {/* Editor content */}
        <div className="relative p-4 font-mono text-sm">
          {/* Line numbers */}
          <div className="absolute left-4 top-4 select-none">
            {code.split("\n").map((_, i) => (
              <div key={i} className="text-slate-500 text-right pr-4 w-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="ml-12 text-slate-300">
            <div className="mb-2">
              <span className="text-indigo-400">function</span>{" "}
              <span className="text-yellow-300">calculateTotal</span>
              <span className="text-slate-300">(items) {"{"};</span>
            </div>

            <div className="ml-4 mb-2">
              <ErrorHighlight
                text="let total = 0;"
                errorMessage="Consider using 'const' instead of 'let' for values that aren't reassigned"
                className="inline-block"
              />
            </div>

            <div className="ml-4 mb-2">
              <span className="text-slate-300">items.</span>
              <span className="text-yellow-300">forEach</span>
              <span className="text-slate-300">
                (item {"=>"} {"{"})
              </span>
            </div>

            <div className="ml-8 mb-2">
              <span className="text-slate-300">total += item.price</span>
            </div>

            <div className="ml-4 mb-2">
              <span className="text-slate-300">{"}"})</span>
            </div>

            <div className="ml-4 mb-2">
              <span className="text-indigo-400">return</span>
              <span className="text-slate-300"> total</span>
            </div>

            <div className="mb-4">
              <span className="text-slate-300">{"}"};</span>
            </div>

            <div>
              <ErrorHighlight
                text="let unusedVariable = 'test';"
                errorMessage="Variable is declared but never used"
                className="inline-block"
              />
            </div>
          </div>

          {/* Floating suggestions */}
          <CodeSuggestion
            suggestion="Consider using const instead of let"
            improvement="This variable is never reassigned within its scope"
            position={{ x: 320, y: 80 }}
          />

          <CodeSuggestion
            suggestion="Remove unused variable"
            improvement="This variable is declared but never used in the code"
            position={{ x: 320, y: 280 }}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default CodeEditor;
