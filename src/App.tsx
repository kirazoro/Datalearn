import React, { useState } from 'react';
import { GraduationCap, BarChart, Code2, Trophy } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import ProgressBar from './components/ProgressBar';
import VisualizationGallery from './components/VisualizationGallery';
import { useStore } from './store/useStore';

const exercises = [
  {
    id: 'intro-to-data',
    title: 'Introduction to Data Analysis',
    description: 'Learn how to manipulate arrays and calculate basic statistics.',
    initialCode: `// Calculate the average of the numbers array
function calculateAverage(numbers) {
  // Your code here
}

const data = [65, 59, 80, 81, 56, 55];
`,
    solution: `return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;`,
    hints: [
      'Try using the reduce method to sum all numbers',
      'Don\'t forget to divide by the array length',
      'The average is the sum of all numbers divided by how many numbers there are',
    ],
  },
];

function App() {
  const [code, setCode] = useState(exercises[0].initialCode);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentView, setCurrentView] = useState<'exercises' | 'visualizations'>('exercises');
  const { updateProgress } = useStore();

  const handleRunCode = () => {
    try {
      const userFunction = new Function('numbers', code);
      const result = userFunction([65, 59, 80, 81, 56, 55]);
      const expectedResult = 66;
      
      if (Math.abs(result - expectedResult) < 0.01) {
        setIsCorrect(true);
        updateProgress('intro-to-data');
      } else {
        setIsCorrect(false);
      }
    } catch (error) {
      setIsCorrect(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">DataLearn</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('visualizations')}
                className={`flex items-center ${
                  currentView === 'visualizations' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart className="w-5 h-5 mr-1" />
                Visualizations
              </button>
              <button 
                onClick={() => setCurrentView('exercises')}
                className={`flex items-center ${
                  currentView === 'exercises' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code2 className="w-5 h-5 mr-1" />
                Exercises
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Trophy className="w-5 h-5 mr-1" />
                Progress
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar />
        
        {currentView === 'exercises' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{exercises[0].title}</h2>
                <p className="text-gray-600 mb-4">{exercises[0].description}</p>
              </div>
              
              <CodeEditor
                initialCode={exercises[0].initialCode}
                onCodeChange={setCode}
                onRunCode={handleRunCode}
                isCorrect={isCorrect}
                hints={exercises[0].hints}
              />
            </div>
          </div>
        ) : (
          <VisualizationGallery />
        )}
      </main>
    </div>
  );
}

export default App;