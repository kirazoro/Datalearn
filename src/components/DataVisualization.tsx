import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  ScatterController,
  LineController,
  BarController,
  PieController,
  RadarController,
} from 'chart.js';
import { Line, Bar, Scatter, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  LineController,
  BarController,
  PieController,
  RadarController
);

interface Props {
  data: any;
  type: 'line' | 'bar' | 'scatter' | 'pie' | 'radar';
  title: string;
}

export default function DataVisualization({ data, type, title }: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const chartComponents = {
    line: Line,
    bar: Bar,
    scatter: Scatter,
    pie: Pie,
    radar: Radar,
  };

  const ChartComponent = chartComponents[type];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <ChartComponent options={options} data={data} />
    </div>
  );
}