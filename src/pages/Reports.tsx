import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, TrendingUp, BarChart3, Brain, Filter, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { FileViewer } from "@/components/FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";

interface ReportsProps {
  currentUser: any;
}

const Reports = ({ currentUser }: ReportsProps) => {
  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  // Only reports from published files
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
      isPublished: true,
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
      isPublished: true,
      summary: "Inventory turnover improved by 18%. Recommendations include reducing slow-moving stock and increasing fast-moving inventory."
    }
  ].filter(report => report.isPublished)); // Only show reports from published files

  const [summaryStats] = useState({
    totalReports: reports.length,
    aiGeneratedReports: reports.filter(r => r.type === 'AI Generated').length,
    manualReports: reports.filter(r => r.type === 'Manual').length,
    totalDownloads: reports.reduce((sum, r) => sum + r.downloadCount, 0),
    avgInsightsPerReport: reports.length > 0 ? Math.round(reports.reduce((sum, r) => sum + r.insights, 0) / reports.length) : 0,
    completionRate: reports.length > 0 ? "100%" : "0%"
  });

  const generateAIReport = async (fileName: string) => {
    console.log(`Generating AI report for ${fileName}...`);
    toast.success(`AI report generation started for ${fileName}`);
  };

  const downloadReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      console.log(`Downloading report: ${report.title}`);
      toast.success(`Downloaded ${report.title}`);
    }
  };

  const viewReport = (report: any) => {
    openFileViewer({
      id: report.id,
      fileName: report.fileName,
      uploadDate: report.generatedDate,
      status: report.status,
      chartTypes: [report.type],
      chartsGenerated: report.insights,
      downloadCount: report.downloadCount
    });
  };

  const createCustomReport = () => {
    console.log("Creating custom report...");
    toast.success("Custom report creation started");
  };

  const createAIReport = () => {
    console.log("Creating AI-powered report...");
    toast.success("AI report generation started");
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
        <p className="text-gray-600">Generate, manage, and download reports from published Excel files</p>
      </div>

      {/* Summary Stats - Only from published files */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{summaryStats.totalReports}</div>
            <div className="text-sm opacity-90">Published Reports</div>
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
            Published Reports
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
                  Published Report Management
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reports.length > 0 ? (
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
                            <Badge className="bg-green-100 text-green-800">Published Source</Badge>
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
                            onClick={() => viewReport(report)}
                            title="View Report"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
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
              ) : (
                <div className="text-center py-12">
                  <FileSpreadsheet className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Published Reports</h3>
                  <p className="text-gray-600 mb-4">You need to publish Excel files to generate reports.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Go to Dashboard to Publish Files
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-generated">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6" />
                AI-Generated Reports from Published Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reports.filter(report => report.type === 'AI Generated').length > 0 ? (
                <div className="space-y-4">
                  {reports.filter(report => report.type === 'AI Generated').map((report) => (
                    <div key={report.id} className="p-6 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{report.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{report.summary}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-purple-100 text-purple-800">AI Generated</Badge>
                            <Badge className="bg-green-100 text-green-800">Published Source</Badge>
                            <span className="text-xs text-gray-500">{report.generatedDate}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => viewReport(report)}
                            className="bg-purple-50 hover:bg-purple-100"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => downloadReport(report.id)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No AI Reports from Published Files</h3>
                  <p className="text-gray-600 mb-4">Publish Excel files first, then generate AI reports.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-new">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Create New Report from Published Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Report</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Let AI analyze your published data and generate comprehensive insights automatically
                    </p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={createAIReport}
                    >
                      Generate AI Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Report</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Create a manual report with specific charts and data visualizations from published files
                    </p>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={createCustomReport}
                    >
                      Create Custom Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Report Templates (Requires Published Files)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer">
                    <h5 className="font-medium text-gray-900">Sales Analysis</h5>
                    <p className="text-sm text-gray-600 mt-1">Comprehensive sales performance analysis from published data</p>
                  </div>
                  <div className="p-4 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer">
                    <h5 className="font-medium text-gray-900">Financial Summary</h5>
                    <p className="text-sm text-gray-600 mt-1">Financial metrics and KPI dashboard from published files</p>
                  </div>
                  <div className="p-4 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer">
                    <h5 className="font-medium text-gray-900">Customer Insights</h5>
                    <p className="text-sm text-gray-600 mt-1">Customer behavior analysis from published data sources</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <FileViewer 
        isOpen={isViewerOpen}
        onClose={closeFileViewer}
        file={selectedFile}
      />
    </div>
  );
};

export default Reports;
