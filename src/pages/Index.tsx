
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { ChartDisplay } from "@/components/ChartDisplay";
import { UploadHistory } from "@/components/UploadHistory";
import { ThreeJSChart } from "@/components/ThreeJSChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [selectedChart, setSelectedChart] = useState("bar");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Excel Analytics Platform
          </h1>
          <p className="text-xl text-gray-600">
            Upload, analyze, and visualize your Excel data with powerful charts and AI insights
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="upload" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Upload & Analyze
            </TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              2D Charts
            </TabsTrigger>
            <TabsTrigger value="3d" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              3D Visualization
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    📊 File Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <FileUpload onDataUploaded={setUploadedData} />
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    🤖 AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Smart Analysis Ready</h4>
                      <p className="text-green-700 text-sm">
                        Upload your Excel file to get AI-powered insights and summary reports.
                      </p>
                    </div>
                    <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Generate AI Summary
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <ChartDisplay 
              data={uploadedData} 
              selectedChart={selectedChart}
              onChartChange={setSelectedChart}
            />
          </TabsContent>

          <TabsContent value="3d" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle>3D Data Visualization</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
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
