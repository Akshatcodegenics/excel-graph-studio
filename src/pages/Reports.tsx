
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, TrendingUp, BarChart3, Brain, Filter } from "lucide-react";

interface ReportsProps {
  currentUser: any;
}

const Reports = ({ currentUser }: ReportsProps) => {
  const [reports] = useState([
    {
      id: 1,
      title: "Monthly Sales Analysis",
      type: "AI Generated",
      fileName: "sales_data_q4.xlsx",
      generatedDate: "2024-06-03",
      status: "completed",
      insights: 15,
      downloadCount: 45,
      summary: "Sales performance exceeded expectations with 34% growth in Q4. Key drivers include improved customer retention and successful holiday campaigns."
    },
    {
      id: 2,
      title: "Inventory Optimization Report",
      type: "Manual",
      fileName: "inventory_analysis.xlsx",
      generatedDate: "2024-06-02",
      status: "completed",
      insights: 8,
      downloadCount: 23,
      summary: "Inventory turnover improved by 18%. Recommendations include reducing slow-moving stock and increasing fast-moving inventory."
    },
    {
      id: 3,
      title: "Customer Segmentation Analysis",
      type: "AI Generated",
      fileName: "customer_data.xlsx",
      generatedDate: "2024-06-01",
      status: "processing",
      insights: 0,
      downloadCount: 0,
      summary: "Analysis in progress..."
    }
  ]);

  const [summaryStats] = useState({
    totalReports: 156,
    aiGeneratedReports: 124,
    manualReports: 32,
    totalDownloads: 2340,
    avgInsightsPerReport: 12,
    completionRate: "94%"
  });

  const generateAIReport = async (fileName: string) => {
    // Simulate AI report generation
    console.log(`Generating AI report for ${fileName}...`);
    // This would integrate with actual AI services
  };

  const downloadReport = (reportId: number) => {
    console.log(`Downloading report ${reportId}...`);
    // This would handle actual file download
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'AI Generated' ? <Brain className="w-4 h-4" /> : <FileText className="w-4 h-4" />;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports Center</h1>
        <p className="text-gray-600">Generate, manage, and download comprehensive data analysis reports</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{summaryStats.totalReports}</div>
            <div className="text-sm opacity-90">Total Reports</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{summaryStats.aiGeneratedReports}</div>
            <div className="text-sm opacity-90">AI Generated</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <Download className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{summaryStats.totalDownloads}</div>
            <div className="text-sm opacity-90">Downloads</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{summaryStats.avgInsightsPerReport}</div>
            <div className="text-sm opacity-90">Avg Insights</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{summaryStats.completionRate}</div>
            <div className="text-sm opacity-90">Success Rate</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{summaryStats.manualReports}</div>
            <div className="text-sm opacity-90">Manual Reports</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
          <TabsTrigger value="all-reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            All Reports
          </TabsTrigger>
          <TabsTrigger value="ai-generated" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Brain className="w-4 h-4 mr-2" />
            AI Generated
          </TabsTrigger>
          <TabsTrigger value="create-new" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Create New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-reports">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Report Management
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                        {getTypeIcon(report.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{report.title}</h3>
                        <p className="text-sm text-gray-600">Source: {report.fileName}</p>
                        <p className="text-sm text-gray-500 mt-1">{report.summary}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">Generated: {report.generatedDate}</span>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{report.insights}</div>
                        <div className="text-xs text-gray-500">Insights</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{report.downloadCount}</div>
                        <div className="text-xs text-gray-500">Downloads</div>
                      </div>
                      
                      <div className="text-center">
                        {getStatusBadge(report.status)}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => downloadReport(report.id)}
                          disabled={report.status !== 'completed'}
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => generateAIReport(report.fileName)}
                          title="Generate AI Analysis"
                        >
                          <Brain className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-generated">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6" />
                AI-Generated Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(report => report.type === 'AI Generated').map((report) => (
                  <div key={report.id} className="p-6 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{report.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{report.summary}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-purple-100 text-purple-800">AI Generated</Badge>
                          <span className="text-xs text-gray-500">{report.generatedDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-new">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Create New Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Report</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Let AI analyze your data and generate comprehensive insights automatically
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Generate AI Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Report</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Create a manual report with specific charts and data visualizations
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Create Custom Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Report Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer">
                    <h5 className="font-medium text-gray-900">Sales Analysis</h5>
                    <p className="text-sm text-gray-600 mt-1">Comprehensive sales performance analysis</p>
                  </div>
                  <div className="p-4 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer">
                    <h5 className="font-medium text-gray-900">Financial Summary</h5>
                    <p className="text-sm text-gray-600 mt-1">Financial metrics and KPI dashboard</p>
                  </div>
                  <div className="p-4 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer">
                    <h5 className="font-medium text-gray-900">Customer Insights</h5>
                    <p className="text-sm text-gray-600 mt-1">Customer behavior and segmentation analysis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
