import { useState, useEffect } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminUsers } from "@/components/AdminUsers";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { AdminFileManager } from "@/components/AdminFileManager";
import { AdminSettings } from "@/components/AdminSettings";
import { AdminActivityMonitor } from "@/components/AdminActivityMonitor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, BarChart3, Settings, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { getCurrentUser, isAdmin, type AppUser } from "@/utils/authUtils";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("overview");
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalFiles: 0,
    systemHealth: "excellent",
    uptime: "99.9%",
    storage: "45GB / 100GB"
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user || !isAdmin(user)) {
          toast.error("Access denied. Admin privileges required.");
          window.location.href = '/';
          return;
        }
        setCurrentUser(user);
      } catch (error) {
        console.error('Error getting user:', error);
        window.location.href = '/';
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    // Simulate loading system stats
    setTimeout(() => {
      setSystemStats({
        totalUsers: 1234,
        activeUsers: 89,
        totalFiles: 5678,
        systemHealth: "excellent",
        uptime: "99.9%",
        storage: "45GB / 100GB"
      });
    }, 500);
  }, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAdmin(currentUser)) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Return to Home
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentSection) {
      case 'users':
        return <AdminUsers />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'files':
        return <AdminFileManager />;
      case 'settings':
        return <AdminSettings />;
      case 'activity':
        return <AdminActivityMonitor />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold">{systemStats.activeUsers}</p>
              </div>
              <Activity className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Files</p>
                <p className="text-3xl font-bold">{systemStats.totalFiles.toLocaleString()}</p>
              </div>
              <FileText className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">System Health</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-bold">Excellent</span>
                </div>
              </div>
              <Settings className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uptime</span>
              <Badge className="bg-green-100 text-green-800">{systemStats.uptime}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Storage Usage</span>
              <span className="font-medium">{systemStats.storage}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Response Time</span>
              <Badge className="bg-blue-100 text-blue-800">Less than 100ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Error Rate</span>
              <Badge className="bg-green-100 text-green-800">0.01%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">User registration completed</span>
              <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New file uploaded</span>
              <span className="text-xs text-gray-400 ml-auto">5 min ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Chart generated successfully</span>
              <span className="text-xs text-gray-400 ml-auto">8 min ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">AI analysis completed</span>
              <span className="text-xs text-gray-400 ml-auto">12 min ago</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => setCurrentSection('users')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage user accounts</p>
            </button>
            
            <button 
              onClick={() => setCurrentSection('analytics')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <BarChart3 className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold">View Analytics</h3>
              <p className="text-sm text-gray-600">System performance metrics</p>
            </button>
            
            <button 
              onClick={() => setCurrentSection('files')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <FileText className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold">File Manager</h3>
              <p className="text-sm text-gray-600">Manage uploaded files</p>
            </button>
            
            <button 
              onClick={() => setCurrentSection('settings')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Settings className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-semibold">System Settings</h3>
              <p className="text-sm text-gray-600">Configure system parameters</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar 
        currentUser={currentUser}
        onLogout={handleLogout}
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      
      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Excel Analytics platform</p>
        </div>
        
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default AdminDashboard;
