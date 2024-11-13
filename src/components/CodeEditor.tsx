import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface Props {
  initialCode: string;
  onCodeChange: (code: string) => void;
  onRunCode: () => void;
  isCorrect: boolean;
  hints: string[];
}

export default function CodeEditor({ initialCode, onCodeChange, onRunCode, isCorrect, hints }: Props) {
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="border-b border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">Code Editor</h3>
        <div className="flex gap-2">
          {isCorrect && (
            <span className="flex items-center text-green-600">
              <CheckCircle2 className="w-5 h-5 mr-1" />
              Correct!
            </span>
          )}
          <button
            onClick={() => {
              setShowHint(true);
              setCurrentHint((prev) => (prev + 1) % hints.length);
            }}
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Hint
          </button>
        </div>
      </div>

      {showHint && (
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <p className="text-sm text-blue-700">{hints[currentHint]}</p>
        </div>
      )}

      <Editor
        height="300px"
        defaultLanguage="javascript"
        defaultValue={initialCode}
        onChange={(value) => onCodeChange(value || '')}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={onRunCode}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Run Code
        </button>
      </div>
    </div>
  );
}