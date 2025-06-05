import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";
import { AdminPanel } from "@/components/AdminPanel";
import { FileUpload } from "@/components/FileUpload";
import { ChartDisplay } from "@/components/ChartDisplay";
import { UploadHistory } from "@/components/UploadHistory";
import { ThreeJSChart } from "@/components/ThreeJSChart";
import { AIInsights } from "@/components/AIInsights";
import { QuickAnalysisPreview } from "@/components/QuickAnalysisPreview";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import Reports from "./Reports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, FileSpreadsheet, Zap, Users, Download, Brain, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [selectedChart, setSelectedChart] = useState("bar");
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("upload");

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    toast.success(`Welcome ${user.name}!`);
    
    // Redirect admin users to admin panel
    if (user.role === 'admin') {
      setCurrentPage('admin');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("upload");
    toast.success("Logged out successfully");
  };

  const handleDataUploaded = (data: any) => {
    setUploadedData(data);
    console.log("Data uploaded:", data);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'analytics':
        return <Analytics currentUser={currentUser} />;
      case 'reports':
        return <Reports currentUser={currentUser} />;
      case 'admin':
        // Redirect to separate admin page
        window.location.href = '/admin';
        return null;
      default:
        return renderUploadPage();
    }
  };

  const renderUploadPage = () => {
    const features = [
      {
        icon: <FileSpreadsheet className="h-8 w-8 text-blue-600" />,
        title: "Smart File Processing",
        description: "Upload Excel files with instant parsing and intelligent data analysis"
      },
      {
        icon: <BarChart3 className="h-8 w-8 text-green-600" />,
        title: "Advanced Charts",
        description: "Generate 7 types of interactive charts with download capabilities"
      },
      {
        icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
        title: "3D Visualizations",
        description: "Immersive 3D charts with real-time animations and controls"
      },
      {
        icon: <Brain className="h-8 w-8 text-pink-600" />,
        title: "AI Analytics",
        description: "Get intelligent insights, trends analysis, and recommendations"
      }
    ];

    const stats = [
      { label: "Files Processed", value: "1,234+", color: "text-blue-600" },
      { label: "Charts Generated", value: "5,678+", color: "text-green-600" },
      { label: "AI Reports", value: "892+", color: "text-purple-600" },
      { label: "Data Points", value: "2.3M+", color: "text-pink-600" }
    ];

    return (
      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Analytics Platform
            </Badge>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Transform Excel Data into Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Upload Excel files and unlock the power of advanced analytics with AI-driven insights, 
            interactive 2D/3D visualizations, and professional reports. Experience the future of data analysis.
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Main Application Tabs */}
        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-2">
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Upload
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
              3D Views
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-pink-700 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
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
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <FileSpreadsheet className="w-6 h-6" />
                    Smart Excel File Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <FileUpload onDataUploaded={handleDataUploaded} />
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Zap className="w-6 h-6" />
                    Quick Analysis Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <QuickAnalysisPreview data={uploadedData} />
                </CardContent>
              </Card>
            </div>

            {uploadedData && (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6" />
                    Data Preview & Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                          {uploadedData.headers.map((header: string, index: number) => (
                            <th key={index} className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedData.data.slice(0, 5).map((row: any[], index: number) => (
                          <tr key={index} className="hover:bg-blue-50 transition-colors">
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
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  Interactive 3D Data Visualization
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <ThreeJSChart data={uploadedData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <AIInsights data={uploadedData} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <UploadHistory />
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar 
        currentUser={currentUser}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      {renderCurrentPage()}

      <AuthModal 
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
