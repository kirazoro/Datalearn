import React, { useState } from 'react';
import DataVisualization from './DataVisualization';
import { Play, Code2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

const visualizationTypes = [
  {
    id: 'line',
    title: 'Line Chart',
    description: 'Perfect for showing trends over time and continuous data series.',
    initialCode: `{
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Monthly Sales',
    data: [65, 59, 80, 81, 56, 55],
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
  }]
}`,
  },
  {
    id: 'bar',
    title: 'Bar Chart',
    description: 'Ideal for comparing quantities across different categories.',
    initialCode: `{
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: 'Product Sales',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
}`,
  },
  {
    id: 'scatter',
    title: 'Scatter Plot',
    description: 'Best for showing relationships between two variables.',
    initialCode: `{
  datasets: [{
    label: 'Height vs Weight',
    data: [
      { x: 165, y: 60 },
      { x: 170, y: 65 },
      { x: 175, y: 70 },
      { x: 180, y: 75 },
      { x: 185, y: 80 }
    ],
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
    borderColor: 'rgb(75, 192, 192)',
  }]
}`,
  },
  {
    id: 'pie',
    title: 'Pie Chart',
    description: 'Excellent for showing proportions of a whole.',
    initialCode: `{
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [{
    data: [12, 19, 3, 5, 2],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ],
    borderWidth: 1
  }]
}`,
  },
  {
    id: 'radar',
    title: 'Radar Chart',
    description: 'Useful for comparing multiple variables in a radial layout.',
    initialCode: `{
  labels: ['Speed', 'Power', 'Range', 'Accuracy', 'Control'],
  datasets: [{
    label: 'Player Stats',
    data: [85, 70, 60, 90, 75],
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
    borderColor: 'rgb(75, 192, 192)',
    borderWidth: 1
  }]
}`,
  }
];

export default function VisualizationGallery() {
  const [selectedType, setSelectedType] = useState(visualizationTypes[0]);
  const [code, setCode] = useState(selectedType.initialCode);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  const handleCodeChange = (newCode: string | undefined) => {
    setCode(newCode || '');
    setError(null);
  };

  const handleApplyCode = () => {
    try {
      const parsedData = eval(`(${code})`);
      setSelectedType(prev => ({
        ...prev,
        data: parsedData
      }));
      setError(null);
    } catch (err) {
      setError('Invalid code. Please check your syntax.');
    }
  };

  const handleReset = () => {
    setCode(selectedType.initialCode);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Visualization Gallery</h2>
        <p className="text-gray-600 mb-6">
          Explore different types of charts and visualizations. Select a type and customize the data through code.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {visualizationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type);
                setCode(type.initialCode);
                setError(null);
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedType.id === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{selectedType.title} Preview</h3>
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Code2 className="w-4 h-4 mr-2" />
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>

        <div className={`grid ${showCode ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
          <DataVisualization
            data={eval(`(${code})`)}
            type={selectedType.id as any}
            title={`${selectedType.title} Example`}
          />

          {showCode && (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Editor
                  height="400px"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-light"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleApplyCode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Changes
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Reset Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}