import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, BarChart3, PieChart, LineChart, Download, Filter, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { FileViewer } from "@/components/FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";

interface AnalyticsProps {
  currentUser: any;
}

const Analytics = ({ currentUser }: AnalyticsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [selectedChart, setSelectedChart] = useState("all");

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  // Only published files appear in analytics
  const analyticsData = [
    {
      id: 1,
      fileName: "sales_data_q4.xlsx",
      chartType: "Bar Chart",
      createdDate: "2024-06-03",
      views: 145,
      downloads: 23,
      insights: "Sales peaked in December with 34% growth",
      performance: "excellent",
      isPublished: true
    },
    {
      id: 2,
      fileName: "inventory_analysis.xlsx",
      chartType: "Line Chart",
      createdDate: "2024-06-02",
      views: 89,
      downloads: 12,
      insights: "Inventory turnover improved by 18%",
      performance: "good",
      isPublished: true
    }
  ].filter(item => item.isPublished); // Only show published files

  const performanceMetrics = {
    totalCharts: analyticsData.length * 2, // Simulate multiple charts per file
    totalViews: analyticsData.reduce((sum, item) => sum + item.views, 0),
    totalDownloads: analyticsData.reduce((sum, item) => sum + item.downloads, 0),
    avgEngagement: analyticsData.length > 0 ? "78%" : "0%",
    topPerformingChart: analyticsData.length > 0 ? "Sales Dashboard Q4" : "None",
    mostUsedChartType: "Bar Chart"
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case 'average':
        return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getChartIcon = (chartType: string) => {
    switch (chartType) {
      case 'Bar Chart':
        return <BarChart3 className="w-4 h-4" />;
      case 'Line Chart':
        return <LineChart className="w-4 h-4" />;
      case 'Pie Chart':
        return <PieChart className="w-4 h-4" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  const handleViewChart = (item: any) => {
    openFileViewer(item);
    toast.success(`Viewing chart for ${item.fileName}`);
  };

  const handleDownloadChart = (item: any) => {
    console.log(`Downloading chart for: ${item.fileName}`);
    toast.success(`Downloaded chart from ${item.fileName}`);
  };

  const handleExportReport = () => {
    console.log(`Exporting analytics report for period: ${selectedPeriod}, chart type: ${selectedChart}`);
    toast.success("Analytics report exported successfully!");
  };

  const filteredAnalyticsData = analyticsData.filter(item => {
    if (selectedChart === "all") return true;
    return item.chartType.toLowerCase().includes(selectedChart);
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track performance of your published charts and data insights</p>
      </div>

      {/* Performance Overview - Only from published files */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{performanceMetrics.totalCharts}</div>
            <div className="text-sm opacity-90">Published Charts</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{performanceMetrics.totalViews}</div>
            <div className="text-sm opacity-90">Total Views</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <Download className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{performanceMetrics.totalDownloads}</div>
            <div className="text-sm opacity-90">Downloads</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{performanceMetrics.avgEngagement}</div>
            <div className="text-sm opacity-90">Avg Engagement</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white col-span-2">
          <CardContent className="p-4">
            <div className="text-lg font-bold">{performanceMetrics.topPerformingChart}</div>
            <div className="text-sm opacity-90">Top Performing Chart</div>
            <div className="text-sm mt-1">Most Used: {performanceMetrics.mostUsedChartType}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0 bg-white mb-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Filter by:</span>
            </div>
            
            <div className="flex gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                    <SelectItem value="lastyear">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Chart Type</label>
                <Select value={selectedChart} onValueChange={setSelectedChart}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Charts</SelectItem>
                    <SelectItem value="bar">Bar Charts</SelectItem>
                    <SelectItem value="line">Line Charts</SelectItem>
                    <SelectItem value="pie">Pie Charts</SelectItem>
                    <SelectItem value="3d">3D Charts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline" className="ml-auto" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Table - Only published files */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Published Chart Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAnalyticsData.length > 0 ? (
            <div className="space-y-4">
              {filteredAnalyticsData.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      {getChartIcon(item.chartType)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.fileName}</h3>
                      <p className="text-sm text-gray-600">{item.chartType} • Created {item.createdDate}</p>
                      <p className="text-xs text-blue-600 mt-1">{item.insights}</p>
                      <Badge className="bg-green-100 text-green-800 mt-1">Published</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{item.views}</div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{item.downloads}</div>
                      <div className="text-xs text-gray-500">Downloads</div>
                    </div>
                    
                    <div className="text-center">
                      {getPerformanceBadge(item.performance)}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewChart(item)}
                        title="View Chart"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDownloadChart(item)}
                        title="Download Chart"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileSpreadsheet className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Published Analytics</h3>
              <p className="text-gray-600 mb-4">You need to publish Excel files to see analytics data here.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Go to Dashboard to Publish Files
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <FileViewer 
        isOpen={isViewerOpen}
        onClose={closeFileViewer}
        file={selectedFile}
      />
    </div>
  );
};

export default Analytics;
