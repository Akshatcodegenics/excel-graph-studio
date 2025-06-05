
import { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminUsers } from "@/components/AdminUsers";
import { AdminActivityMonitor } from "@/components/AdminActivityMonitor";
import { AdminFileManager } from "@/components/AdminFileManager";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { AdminSettings } from "@/components/AdminSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileSpreadsheet, 
  BarChart3, 
  Activity,
  TrendingUp,
  Brain,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface AdminDashboardProps {
  currentUser: any;
  onLogout: () => void;
}

const AdminDashboard = ({ currentUser, onLogout }: AdminDashboardProps) => {
  const [currentSection, setCurrentSection] = useState("overview");

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'users':
        return <AdminUsers />;
      case 'activity':
        return <AdminActivityMonitor />;
      case 'files':
        return <AdminFileManager />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <AdminNavbar 
        currentUser={currentUser}
        onLogout={onLogout}
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      <div className="pt-16">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

const AdminOverview = () => {
  const [systemStats] = useState({
    totalUsers: 156,
    activeUsers: 42,
    totalUploads: 1234,
    totalCharts: 5678,
    aiReportsGenerated: 892,
    totalDownloads: 3421,
    storageUsed: "156.7 GB",
    systemUptime: "99.9%",
    avgProcessingTime: "2.3s",
    errorRate: "0.02%"
  });

  const [recentActivities] = useState([
    { id: 1, user: "John Doe", action: "uploaded file", target: "sales_data_q1.xlsx", time: "2 hours ago", type: "upload", status: "success" },
    { id: 2, user: "Jane Smith", action: "created chart", target: "Bar Chart - Revenue", time: "3 hours ago", type: "chart", status: "success" },
    { id: 3, user: "Mike Johnson", action: "generated AI report", target: "Q1 Analysis", time: "5 hours ago", type: "ai", status: "success" },
    { id: 4, user: "Sarah Wilson", action: "downloaded chart", target: "Sales_Trends.png", time: "6 hours ago", type: "download", status: "success" },
    { id: 5, user: "Admin", action: "system backup", target: "Database", time: "1 day ago", type: "system", status: "success" },
    { id: 6, user: "Tom Brown", action: "failed upload", target: "corrupted_file.xlsx", time: "2 days ago", type: "upload", status: "error" },
  ]);

  const [topFiles] = useState([
    { name: "sales_data_q1.xlsx", uploads: 45, charts: 128, downloads: 234 },
    { name: "inventory_report.xlsx", uploads: 32, charts: 89, downloads: 156 },
    { name: "marketing_analytics.xlsx", uploads: 28, charts: 76, downloads: 134 },
    { name: "financial_summary.xlsx", uploads: 24, charts: 67, downloads: 98 },
  ]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Overview</h1>
        <p className="text-gray-600">Complete system monitoring and user activity dashboard</p>
      </div>

      {/* Enhanced System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <div className="text-sm opacity-90">Total Users</div>
            <div className="text-xs opacity-75">{systemStats.activeUsers} active</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <FileSpreadsheet className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.totalUploads}</div>
            <div className="text-sm opacity-90">Files Uploaded</div>
            <div className="text-xs opacity-75">{systemStats.storageUsed} used</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.totalCharts}</div>
            <div className="text-sm opacity-90">Charts Created</div>
            <div className="text-xs opacity-75">{systemStats.totalDownloads} downloads</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.aiReportsGenerated}</div>
            <div className="text-sm opacity-90">AI Reports</div>
            <div className="text-xs opacity-75">{systemStats.avgProcessingTime} avg</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
            <div className="text-sm opacity-90">System Uptime</div>
            <div className="text-xs opacity-75">{systemStats.errorRate} error rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activities */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Recent User Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      <span className="font-bold">{activity.user}</span> {activity.action}
                    </div>
                    <div className="text-sm text-gray-600">{activity.target}</div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {activity.time}
                  </div>
                  {activity.status === 'success' ? 
                    <CheckCircle className="w-5 h-5 text-green-500" /> :
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  }
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Files */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Top Performing Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-600">
                      {file.uploads} uploads • {file.charts} charts • {file.downloads} downloads
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    Popular
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance Metrics */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            System Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">42</div>
              <div className="text-sm text-blue-700">Daily Active Users</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">127</div>
              <div className="text-sm text-green-700">Files Processed Today</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-purple-700">Charts Generated Today</div>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">34</div>
              <div className="text-sm text-pink-700">AI Reports Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
