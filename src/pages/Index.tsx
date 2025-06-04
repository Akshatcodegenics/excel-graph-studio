
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { ChartDisplay } from "@/components/ChartDisplay";
import { UploadHistory } from "@/components/UploadHistory";
import { ThreeJSChart } from "@/components/ThreeJSChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, FileSpreadsheet, Zap, Users, Download } from "lucide-react";

const Index = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [selectedChart, setSelectedChart] = useState("bar");

  const features = [
    {
      icon: <FileSpreadsheet className="h-8 w-8 text-blue-600" />,
      title: "Excel File Processing",
      description: "Upload .xlsx and .xls files with instant parsing and analysis"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Interactive Charts",
      description: "Generate beautiful 2D charts: Bar, Line, Pie, and Doughnut"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "3D Visualizations",
      description: "Immersive 3D charts with rotate, zoom, and pan controls"
    },
    {
      icon: <Download className="h-8 w-8 text-orange-600" />,
      title: "Export & Download",
      description: "Download charts as PNG or PDF for presentations"
    }
  ];

  const stats = [
    { label: "Files Processed", value: "1,234+", color: "text-blue-600" },
    { label: "Charts Generated", value: "5,678+", color: "text-green-600" },
    { label: "Active Users", value: "892", color: "text-purple-600" },
    { label: "Data Points Analyzed", value: "2.3M+", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <Zap className="w-4 h-4 mr-1" />
            AI-Powered Analytics Platform
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Your Excel Data
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload Excel files and create stunning interactive visualizations with our advanced analytics platform. 
            Generate 2D/3D charts, get AI insights, and download professional reports in minutes.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Application Tabs */}
        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-xl p-2">
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Upload & Analyze
            </TabsTrigger>
            <TabsTrigger 
              value="charts" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              2D Charts
            </TabsTrigger>
            <TabsTrigger 
              value="3d" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              3D Visualization
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-700 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Users className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <FileSpreadsheet className="w-6 h-6" />
                    Excel File Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <FileUpload onDataUploaded={setUploadedData} />
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Zap className="w-6 h-6" />
                    AI-Powered Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Smart Analysis Engine
                      </h4>
                      <p className="text-green-700 text-sm mb-4">
                        Our AI analyzes your data patterns, identifies trends, and provides actionable insights automatically.
                      </p>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• Automatic data validation</li>
                        <li>• Trend detection & forecasting</li>
                        <li>• Outlier identification</li>
                        <li>• Statistical summaries</li>
                      </ul>
                    </div>
                    <button className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                      Generate AI Analysis Report
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {uploadedData && (
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6" />
                    Data Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50">
                          {uploadedData.headers.map((header: string, index: number) => (
                            <th key={index} className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedData.data.slice(0, 5).map((row: any[], index: number) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            {row.map((cell: any, cellIndex: number) => (
                              <td key={cellIndex} className="border border-gray-200 px-4 py-3 text-gray-600">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {uploadedData.data.length > 5 && (
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Showing first 5 rows of {uploadedData.data.length} total rows
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <ChartDisplay 
              data={uploadedData} 
              selectedChart={selectedChart}
              onChartChange={setSelectedChart}
            />
          </TabsContent>

          <TabsContent value="3d" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  3D Interactive Visualization
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <ThreeJSChart data={uploadedData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <UploadHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
