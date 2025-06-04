
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, BarChart3, LineChart, PieChart } from "lucide-react";
import { toast } from "sonner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDisplayProps {
  data: any;
  selectedChart: string;
  onChartChange: (chart: string) => void;
}

export const ChartDisplay = ({ data, selectedChart, onChartChange }: ChartDisplayProps) => {
  const [xAxis, setXAxis] = useState<string>("Month");
  const [yAxis, setYAxis] = useState<string>("Sales");

  if (!data) {
    return (
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-12 text-center">
          <BarChart3 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
          <p className="text-gray-500">Upload an Excel file to start creating charts</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: data.data.map((row: any[]) => row[data.headers.indexOf(xAxis)]),
    datasets: [
      {
        label: yAxis,
        data: data.data.map((row: any[]) => row[data.headers.indexOf(yAxis)]),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${yAxis} by ${xAxis}`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: selectedChart !== 'pie' && selectedChart !== 'doughnut' ? {
      y: {
        beginAtZero: true,
      },
    } : {},
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  const handleDownload = () => {
    toast.success("Chart downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChart3 size={24} />
              Chart Configuration
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
              <Select value={selectedChart} onValueChange={onChartChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="bar">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} />
                      Bar Chart
                    </div>
                  </SelectItem>
                  <SelectItem value="line">
                    <div className="flex items-center gap-2">
                      <LineChart size={16} />
                      Line Chart
                    </div>
                  </SelectItem>
                  <SelectItem value="pie">
                    <div className="flex items-center gap-2">
                      <PieChart size={16} />
                      Pie Chart
                    </div>
                  </SelectItem>
                  <SelectItem value="doughnut">
                    <div className="flex items-center gap-2">
                      <PieChart size={16} />
                      Doughnut Chart
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis</label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  {data.headers.map((header: string) => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis</label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  {data.headers.filter((header: string) => header !== xAxis).map((header: string) => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-6">
          <div style={{ height: '400px' }}>
            {renderChart()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
