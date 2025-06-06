import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, FileSpreadsheet, TrendingUp, Clock, Download, Eye, Upload } from "lucide-react";
import { toast } from "sonner";
import { FileViewer } from "@/components/FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";

interface DashboardProps {
  currentUser: any;
}

const Dashboard = ({ currentUser }: DashboardProps) => {
  const [userStats, setUserStats] = useState({
    totalUploads: 0,
    publishedFiles: 0,
    chartsGenerated: 0,
    aiReports: 0,
    lastActivity: ""
  });

  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      fileName: "sales_data_q4.xlsx",
      uploadDate: "2024-06-03",
      status: "processed",
      isPublished: true,
      chartsGenerated: 3,
      aiInsights: true
    },
    {
      id: 2,
      fileName: "inventory_analysis.xlsx",
      uploadDate: "2024-06-02",
      status: "processed",
      isPublished: true,
      chartsGenerated: 5,
      aiInsights: true
    },
    {
      id: 3,
      fileName: "customer_data.xlsx",
      uploadDate: "2024-06-01",
      status: "processed",
      isPublished: false,
      chartsGenerated: 2,
      aiInsights: true
    },
    {
      id: 4,
      fileName: "financial_report.xlsx",
      uploadDate: "2024-05-31",
      status: "processing",
      isPublished: false,
      chartsGenerated: 0,
      aiInsights: false
    }
  ]);

  // Filter only published files for analytics
  const publishedFiles = recentUploads.filter(upload => upload.isPublished);

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  useEffect(() => {
    // Calculate stats only from published files
    setTimeout(() => {
      setUserStats({
        totalUploads: recentUploads.length,
        publishedFiles: publishedFiles.length,
        chartsGenerated: publishedFiles.reduce((sum, upload) => sum + upload.chartsGenerated, 0),
        aiReports: publishedFiles.filter(upload => upload.aiInsights).length,
        lastActivity: new Date().toLocaleDateString()
      });
    }, 500);
  }, [recentUploads, publishedFiles]);

  const handlePublish = (fileId: number) => {
    setRecentUploads(prev => 
      prev.map(upload => 
        upload.id === fileId 
          ? { ...upload, isPublished: true }
          : upload
      )
    );
  };

  const handleUnpublish = (fileId: number) => {
    setRecentUploads(prev => 
      prev.map(upload => 
        upload.id === fileId 
          ? { ...upload, isPublished: false }
          : upload
      )
    );
  };

  const handleViewFile = (file: any) => {
    openFileViewer(file);
  };

  const handleDownloadFile = (file: any) => {
    console.log(`Downloading file: ${file.fileName}`);
    toast.success(`Downloaded ${file.fileName}`);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Here's an overview of your published analytics activity</p>
      </div>

      {/* Stats Cards - Only showing published data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Files</p>
                <p className="text-3xl font-bold">{userStats.totalUploads}</p>
              </div>
              <FileSpreadsheet className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Published Files</p>
                <p className="text-3xl font-bold">{userStats.publishedFiles}</p>
              </div>
              <Upload className="h-12 w-12 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Charts Generated</p>
                <p className="text-3xl font-bold">{userStats.chartsGenerated}</p>
              </div>
              <BarChart3 className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">AI Reports</p>
                <p className="text-3xl font-bold">{userStats.aiReports}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Last Activity</p>
                <p className="text-lg font-bold">{userStats.lastActivity}</p>
              </div>
              <Clock className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - All files with publish status */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6" />
            File Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{upload.fileName}</h3>
                    <p className="text-sm text-gray-600">Uploaded on {upload.uploadDate}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={upload.status === 'processed' ? 'default' : 'secondary'}>
                        {upload.status}
                      </Badge>
                      <Badge variant={upload.isPublished ? 'default' : 'outline'} 
                             className={upload.isPublished ? 'bg-green-500' : 'border-gray-400'}>
                        {upload.isPublished ? 'Published' : 'Unpublished'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {upload.isPublished ? `${upload.chartsGenerated} charts` : 'Not visible in analytics'}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewFile(upload)}
                      title="View File Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {upload.status === 'processed' && (
                      upload.isPublished ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUnpublish(upload.id)}
                          className="border-red-500 text-red-600 hover:bg-red-50"
                          title="Unpublish File"
                        >
                          Unpublish
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePublish(upload.id)}
                          className="border-green-500 text-green-600 hover:bg-green-50"
                          title="Publish File"
                        >
                          Publish
                        </Button>
                      )
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDownloadFile(upload)}
                      title="Download File"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {publishedFiles.length === 0 && (
            <div className="text-center py-8">
              <FileSpreadsheet className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Published Files</h3>
              <p className="text-gray-600">Publish your Excel files to see them in analytics and reports.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-blue-50 hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload New File</h3>
            <p className="text-gray-600 text-sm">Start analyzing your Excel data with AI-powered insights</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Charts</h3>
            <p className="text-gray-600 text-sm">Generate beautiful 2D and 3D visualizations from published files</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">Get intelligent insights from your published data</p>
          </CardContent>
        </Card>
      </div>

      <FileViewer 
        isOpen={isViewerOpen}
        onClose={closeFileViewer}
        file={selectedFile}
      />
    </div>
  );
};

export default Dashboard;
