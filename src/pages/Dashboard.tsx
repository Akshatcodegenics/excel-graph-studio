
import { useState, useEffect } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ChartDisplay } from "@/components/ChartDisplay";
import { ThreeJSChart } from "@/components/ThreeJSChart";
import { UploadHistory } from "@/components/UploadHistory";
import { AIInsights } from "@/components/AIInsights";
import { QuickAnalysisPreview } from "@/components/QuickAnalysisPreview";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  FileSpreadsheet, 
  Brain,
  Shield,
  Upload,
  History,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { getCurrentUser, signOut, isAdmin, type AppUser } from "@/utils/authUtils";

const Dashboard = () => {
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      toast.success("Logged out successfully");
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to logout");
    }
  };

  const handleDataUploaded = (data: any) => {
    setUploadedData(data);
    toast.success("Data uploaded and ready for visualization!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="shadow-xl border-0 bg-white max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <div className="text-blue-500 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please log in to access the dashboard.</p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/'}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      
      <div className="pt-16">
        <div className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, {currentUser.profile?.first_name || currentUser.email}!
                </h1>
                <p className="text-gray-600">
                  Transform your Excel data into beautiful, interactive visualizations
                </p>
              </div>
              
              {isAdmin(currentUser) && (
                <Button
                  onClick={() => window.location.href = '/admin'}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Charts
              </TabsTrigger>
              <TabsTrigger value="3d-charts" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                3D Charts
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <FileSpreadsheet className="w-6 h-6" />
                    Excel File Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <FileUpload onDataUploaded={handleDataUploaded} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="charts">
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6" />
                    Data Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {uploadedData ? (
                    <ChartDisplay data={uploadedData} />
                  ) : (
                    <div className="text-center py-12">
                      <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        Upload an Excel file to see your data visualizations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="3d-charts">
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    3D Data Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {uploadedData ? (
                    <ThreeJSChart data={uploadedData} />
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        Upload an Excel file to see stunning 3D visualizations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <UploadHistory />
            </TabsContent>

            <TabsContent value="insights">
              <div className="space-y-6">
                <AIInsights data={uploadedData} />
                {uploadedData && <QuickAnalysisPreview data={uploadedData} />}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
