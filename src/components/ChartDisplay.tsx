
import { useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, Scatter, PolarArea, Radar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, BarChart3, LineChart, PieChart, Scatter as ScatterIcon, Target, Radar as RadarIcon } from "lucide-react";
import { toast } from "sonner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
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
  const [yAxis, setYAxis] = useState<string>("Sales ($)");
  const chartRef = useRef<any>(null);

  if (!data) {
    return (
      <Card className="shadow-xl border-0 bg-white">
        <CardContent className="p-12 text-center">
          <BarChart3 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
          <p className="text-gray-500">Upload an Excel file to start creating charts</p>
        </CardContent>
      </Card>
    );
  }

  const generateColors = (count: number) => {
    const baseColors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(6, 182, 212, 0.8)',
      'rgba(132, 204, 22, 0.8)',
    ];
    
    return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
  };

  const getChartData = () => {
    const xAxisIndex = data.headers.indexOf(xAxis);
    const yAxisIndex = data.headers.indexOf(yAxis);
    
    if (xAxisIndex === -1 || yAxisIndex === -1) {
      return {
        labels: [],
        datasets: []
      };
    }

    let labels, datasets;

    if (yAxis === 'Region') {
      // Handle region data specially - group by regions
      const regionData = data.data.reduce((acc: any, row: any[]) => {
        const region = row[yAxisIndex];
        const value = Number(row[data.headers.indexOf('Sales ($)')]) || 0;
        if (!acc[region]) {
          acc[region] = 0;
        }
        acc[region] += value;
        return acc;
      }, {});

      labels = Object.keys(regionData);
      const values = Object.values(regionData) as number[];
      
      datasets = [{
        label: 'Sales by Region',
        data: values,
        backgroundColor: generateColors(labels.length),
        borderColor: generateColors(labels.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
      }];
    } else {
      // Normal chart data
      labels = data.data.map((row: any[]) => row[xAxisIndex]);
      const values = data.data.map((row: any[]) => Number(row[yAxisIndex]) || 0);
      
      datasets = [{
        label: yAxis,
        data: values,
        backgroundColor: generateColors(values.length),
        borderColor: generateColors(values.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        tension: 0.4,
      }];
    }

    // For scatter plot, we need x and y coordinates
    if (selectedChart === 'scatter') {
      const scatterData = data.data.map((row: any[]) => ({
        x: Number(row[xAxisIndex]) || 0,
        y: Number(row[yAxisIndex]) || 0,
      }));
      
      datasets = [{
        label: `${yAxis} vs ${xAxis}`,
        data: scatterData,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 6,
      }];
    }

    return { labels, datasets };
  };

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
          }
        }
      },
      title: {
        display: true,
        text: `${yAxis} by ${xAxis}`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      }
    },
    scales: !['pie', 'doughnut', 'polarArea', 'radar'].includes(selectedChart) ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      }
    } : {},
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    }
  };

  const renderChart = () => {
    const props = { 
      ref: chartRef,
      data: chartData, 
      options: chartOptions 
    };

    switch (selectedChart) {
      case 'line':
        return <Line {...props} />;
      case 'pie':
        return <Pie {...props} />;
      case 'doughnut':
        return <Doughnut {...props} />;
      case 'scatter':
        return <Scatter {...props} />;
      case 'polarArea':
        return <PolarArea {...props} />;
      case 'radar':
        return <Radar {...props} />;
      default:
        return <Bar {...props} />;
    }
  };

  const handleDownload = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${selectedChart}-chart-${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Chart downloaded successfully!");
    } else {
      toast.error("Unable to download chart. Please try again.");
    }
  };

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'line', label: 'Line Chart', icon: LineChart },
    { value: 'pie', label: 'Pie Chart', icon: PieChart },
    { value: 'doughnut', label: 'Doughnut Chart', icon: PieChart },
    { value: 'scatter', label: 'Scatter Plot', icon: ScatterIcon },
    { value: 'polarArea', label: 'Polar Area', icon: Target },
    { value: 'radar', label: 'Radar Chart', icon: RadarIcon },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChart3 size={24} />
              Chart Configuration & Controls
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
                  {chartTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
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
                  {data.headers.map((header: string) => (
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
                className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
              >
                <Download size={16} />
                Download PNG
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={20} />
            Interactive Chart Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div style={{ height: '500px' }}>
            {renderChart()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
