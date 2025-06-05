
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, FileSpreadsheet, TrendingUp, Clock, Download, Eye } from "lucide-react";

interface DashboardProps {
  currentUser: any;
}

const Dashboard = ({ currentUser }: DashboardProps) => {
  const [userStats, setUserStats] = useState({
    totalUploads: 0,
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
      chartsGenerated: 3,
      aiInsights: true
    },
    {
      id: 2,
      fileName: "inventory_analysis.xlsx",
      uploadDate: "2024-06-02",
      status: "processed",
      chartsGenerated: 5,
      aiInsights: true
    },
    {
      id: 3,
      fileName: "customer_data.xlsx",
      uploadDate: "2024-06-01",
      status: "processing",
      chartsGenerated: 0,
      aiInsights: false
    }
  ]);

  useEffect(() => {
    // Simulate loading user stats
    setTimeout(() => {
      setUserStats({
        totalUploads: recentUploads.length,
        chartsGenerated: recentUploads.reduce((sum, upload) => sum + upload.chartsGenerated, 0),
        aiReports: recentUploads.filter(upload => upload.aiInsights).length,
        lastActivity: new Date().toLocaleDateString()
      });
    }, 500);
  }, [recentUploads]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Here's an overview of your analytics activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Uploads</p>
                <p className="text-3xl font-bold">{userStats.totalUploads}</p>
              </div>
              <FileSpreadsheet className="h-12 w-12 text-blue-200" />
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

      {/* Recent Activity */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6" />
            Recent File Uploads
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
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{upload.chartsGenerated} charts</div>
                    <Badge variant={upload.status === 'processed' ? 'default' : 'secondary'}>
                      {upload.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" title="View Details">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Download Report">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <p className="text-gray-600 text-sm">Generate beautiful 2D and 3D visualizations</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">Get intelligent insights and recommendations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
