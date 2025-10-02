import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

interface CodeEditorProps {
  initialCode: string
  className?: string
}

export default function CodeEditor({ initialCode, className }: CodeEditorProps) {
  return (
    <div className={`rounded-xl overflow-hidden border border-gray-700 ${className}`}>
      <CodeMirror
        value={initialCode}
        theme={vscodeDark}
        extensions={[javascript()]}
        editable={false}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: false,
          highlightActiveLine: false,
        }}
      />
    </div>
  )
}
