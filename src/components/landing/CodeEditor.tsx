import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Send, Check } from "lucide-react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { workerManager } from "@/workers/workerManager";

interface CodeEditorProps {
  initialCode?: string;
  className?: string;
}

const languageOptions = [
  { 
    value: "javascript", 
    label: "JavaScript", 
    extension: "js",
    language: () => javascript({ jsx: true }),
    sampleCode: `function calculateTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.price;
  });
  return total;
}

let unusedVariable = 'test';`
  },
  { 
    value: "python", 
    label: "Python", 
    extension: "py",
    language: () => python(),
    sampleCode: `def calculate_total(items):
    total = 0
    for item in items:
        total += item.price
    return total

unused_variable = 'test'`
  },
  { 
    value: "html", 
    label: "HTML", 
    extension: "html",
    language: () => html(),
    sampleCode: `<!DOCTYPE html>
<html>
<head>
  <title>Sample Page</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a sample HTML file.</p>
</body>
</html>`
  },
  { 
    value: "css", 
    label: "CSS", 
    extension: "css",
    language: () => css(),
    sampleCode: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}`
  },
  { 
    value: "cpp", 
    label: "C++", 
    extension: "cpp",
    language: () => cpp(),
    sampleCode: `#include <iostream>
#include <vector>

int calculateTotal(const std::vector<int>& items) {
    int total = 0;
    for (const auto& item : items) {
        total += item;
    }
    return total;
}

int unusedVariable = 42;`
  },
  { 
    value: "java", 
    label: "Java", 
    extension: "java",
    language: () => java(),
    sampleCode: `public class Main {
    public static int calculateTotal(List<Integer> items) {
        int total = 0;
        for (Integer item : items) {
            total += item;
        }
        return total;
    }

    int unusedVariable = 42;
}`
  }
];

const CodeEditor = ({
  initialCode = languageOptions[0].sampleCode,
  className = "",
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [feedback, setFeedback] = useState<null | { issues: Array<{type: string, message: string, line?: number | null}> }>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCodeChange = React.useCallback((value: string) => {
    setCode(value);
    // Clear any previous feedback when code changes
    setFeedback(null);
    setError(null);
    setAnalysisCompleted(false);
  }, []);

  const handleLanguageChange = (value: string) => {
    const selectedLanguage = languageOptions.find((lang) => lang.value === value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setCode(selectedLanguage.sampleCode);
      // Clear any previous feedback
      setFeedback(null);
      setError(null);
      setAnalysisCompleted(false);
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please enter some code to analyze");
      return;
    }
    
    try {
      setAnalyzing(true);
      setAnalysisCompleted(false);
      setError(null);
      
      // Use worker manager to evaluate code
      const result = await workerManager.evaluateCode(code, language.value);
      setFeedback(result);
      setAnalysisCompleted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className={`flex h-[calc(100vh-60px)] ${className}`}>
      {/* Code Editor Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 bg-slate-900"
      >
        <Card className="h-full border-slate-700/50 bg-slate-900/90 backdrop-blur-sm overflow-hidden flex flex-col">
          {/* Editor header */}
          <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-slate-700/50">
            <div className="flex items-center">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs text-slate-400 font-mono ml-2">{`script.${language.extension}`}</div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={language.value} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-white">
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAnalyze}
                disabled={analyzing}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                {analyzing ? <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-purple-500" /> : 
                  analysisCompleted ? <Check size={16} className="text-green-500" /> : <Send size={16} />}
                <span className="ml-2">Analyze</span>
              </Button>
            </div>
          </div>

          {/* Code editor container */}
          <div className="flex-1 overflow-hidden">
            {mounted ? (
              <CodeMirror
                value={code}
                height="100%"
                theme={vscodeDark}
                extensions={[language.language()]}
                onChange={handleCodeChange}
                className="text-sm h-full"
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  highlightSpecialChars: true,
                  foldGutter: true,
                  drawSelection: true,
                  dropCursor: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  syntaxHighlighting: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  rectangularSelection: true,
                  crosshairCursor: true,
                  highlightActiveLine: true,
                  highlightSelectionMatches: true,
                  closeBracketsKeymap: true,
                  searchKeymap: true,
                  foldKeymap: true,
                  completionKeymap: true,
                  lintKeymap: true,
                }}
              />
            ) : (
              // Placeholder while CodeMirror is loading
              <div className="h-full bg-slate-900 flex items-center justify-center">
                <div className="animate-pulse text-slate-500">Loading editor...</div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Analysis Results Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[400px] border-l border-slate-700/50 bg-slate-900 overflow-y-auto"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Code Analysis</h3>
          
          {error && (
            <Alert variant="destructive" className="bg-slate-900 border-red-500/50 text-white mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {analyzing && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
              <span className="ml-2 text-white">Analyzing your code...</span>
            </div>
          )}
          
          {feedback && !analyzing && (
            <div className="space-y-2">
              {feedback.issues.map((issue, index) => (
                <div key={index} className="rounded-md bg-slate-800 p-3">
                  <div className="flex items-start">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      issue.type === 'Style' ? 'bg-blue-900/50 text-blue-300' : 
                      issue.type === 'Grammar' ? 'bg-yellow-900/50 text-yellow-300' : 
                      'bg-purple-900/50 text-purple-300'
                    }`}>
                      {issue.type}
                    </span>
                    {issue.line && (
                      <span className="ml-2 text-xs text-slate-400">Line {issue.line}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{issue.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CodeEditor;
