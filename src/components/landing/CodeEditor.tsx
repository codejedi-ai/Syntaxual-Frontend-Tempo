import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import CodeSuggestion from "./CodeSuggestion";
import ErrorHighlight from "./ErrorHighlight";
import { Button } from "@/components/ui/button";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

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
  const [code, setCode] = useState(initialCode);
  const [hasSuggestions, setHasSuggestions] = useState(false);
  const [lineCount, setLineCount] = useState(initialCode.split('\n').length);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Apply syntax highlighting when code changes
  useEffect(() => {
    if (editorRef.current) {
      Prism.highlightAllUnder(editorRef.current);
    }
  }, [code]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    setLineCount(newCode.split('\n').length);
  };

  const handleGetSuggestions = () => {
    setHasSuggestions(!hasSuggestions);
  };

  // Generate highlighted code
  const highlightedCode = () => {
    return { __html: Prism.highlight(code, Prism.languages.javascript, 'javascript') };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full h-auto max-w-full ${className} bg-slate-900`}
    >
      <Card className="h-[350px] md:h-[400px] border-slate-700/50 bg-slate-900/90 backdrop-blur-sm overflow-hidden flex flex-col">
        {/* Editor header */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-slate-700/50">
          <div className="flex items-center">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs text-slate-400 font-mono ml-2">script.js</div>
          </div>
          <Button 
            onClick={handleGetSuggestions}
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700 text-xs"
          >
            {hasSuggestions ? "Clear Suggestions" : "Analyze Code"}
          </Button>
        </div>

        {/* Main content container with code editor and suggestions side by side */}
        <div className="flex flex-1 overflow-hidden">
          {/* Code editor container */}
          <div className="flex flex-1 overflow-hidden">
            {/* Line numbers */}
            <div className="select-none py-4 pl-4 w-12 bg-slate-950/50 flex-shrink-0">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i} className="text-slate-500 text-xs text-right pr-2 font-mono" 
                  style={{ 
                    height: '21px', 
                    lineHeight: '21px',
                    fontFamily: '"DejaVu Sans Mono", monospace'
                  }}>
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Main editor area */}
            <div className="relative flex-grow overflow-auto" ref={editorRef}>
              {/* Hidden textarea for editing */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={handleCodeChange}
                className="absolute top-0 left-0 w-full h-full font-mono text-sm resize-none focus:outline-none border-none z-10 bg-transparent text-transparent caret-white whitespace-pre"
                spellCheck="false"
                style={{
                  fontFamily: '"DejaVu Sans Mono", monospace',
                  fontSize: '14px',
                  lineHeight: '21px',
                  padding: '16px',
                  margin: '0',
                  tabSize: 4,
                }}
              />

              {/* Syntax highlighted code */}
              <pre 
                className="font-mono text-sm h-full overflow-auto"
                style={{
                  fontFamily: '"DejaVu Sans Mono", monospace',
                  fontSize: '14px',
                  lineHeight: '21px',
                  padding: '16px',
                  margin: '0',
                  tabSize: 4,
                }}>
                <code className="language-javascript" dangerouslySetInnerHTML={highlightedCode()} />
              </pre>
            </div>
          </div>

          {/* Suggestions panel - always visible */}
          <div className="w-2/5 border-l border-slate-700/50 bg-slate-800/50 overflow-y-auto flex-shrink-0">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white/90 mb-3 border-b border-slate-700/50 pb-2">Suggestions</h3>
              
              {hasSuggestions ? (
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-purple-400 mb-1">Line 1-6</h4>
                    <p className="text-xs text-slate-300">Consider using const instead of let</p>
                    <p className="text-xs text-slate-400 mt-1">This variable is never reassigned within its scope</p>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-red-400 mb-1">Line 8</h4>
                    <p className="text-xs text-slate-300">Remove unused variable</p>
                    <p className="text-xs text-slate-400 mt-1">This variable is declared but never used in the code</p>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-1">Line 3-5</h4>
                    <p className="text-xs text-slate-300">Missing semicolons</p>
                    <p className="text-xs text-slate-400 mt-1">For consistency, add semicolons at the end of statements</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="text-slate-500 text-sm mb-2">No suggestions yet</div>
                  <p className="text-xs text-slate-400">Click "Analyze Code" to get AI-powered suggestions for your code</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CodeEditor;
