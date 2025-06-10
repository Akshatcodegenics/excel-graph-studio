import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Activity, 
  FileSpreadsheet, 
  BarChart3, 
  TrendingUp, 
  Shield,
  Search,
  UserPlus,
  UserMinus,
  Edit,
  Ban,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
  Eye,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileViewer } from "./FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";
import { isAdmin, type AppUser } from "@/utils/authUtils";

interface AdminPanelProps {
  currentUser: AppUser | null;
}

export const AdminPanel = ({ currentUser }: AdminPanelProps) => {
  // Check if user is admin - restrict access
  if (!currentUser || !isAdmin(currentUser)) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="p-12 text-center">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
            <p className="text-sm text-gray-500">Only users with admin role can access this section.</p>
            <Button 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/'}
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [users] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@gmail.com", 
      role: "user", 
      status: "active", 
      joinDate: "2024-01-15",
      lastActive: "2 hours ago"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@company.com", 
      role: "admin", 
      status: "active", 
      joinDate: "2024-01-10",
      lastActive: "5 minutes ago"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike.j@example.com", 
      role: "user", 
      status: "inactive", 
      joinDate: "2024-01-20",
      lastActive: "1 day ago"
    }
  ]);

  const [files] = useState([
    {
      id: 1,
      fileName: "sales_data_q1.xlsx",
      userName: "John Doe",
      uploadDate: "2024-06-03",
      size: "2.3 MB",
      status: "processed",
      chartsGenerated: 5,
      downloadCount: 12
    },
    {
      id: 2,
      fileName: "inventory_report.xlsx",
      userName: "Jane Smith",
      uploadDate: "2024-06-02",
      size: "1.8 MB",
      status: "processed",
      chartsGenerated: 3,
      downloadCount: 8
    }
  ]);

  const [activityLogs] = useState([
    {
      id: 1,
      user: "John Doe",
      action: "Uploaded file",
      details: "sales_data_q1.xlsx",
      timestamp: "2024-06-03 14:30:00",
      type: "upload"
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Generated chart",
      details: "Bar chart from inventory_report.xlsx",
      timestamp: "2024-06-03 14:25:00",
      type: "chart"
    }
  ]);

  const [stats] = useState({
    totalUsers: 1250,
    activeUsers: 892,
    totalFiles: 3456,
    storageUsed: 45.6,
    chartsGenerated: 8901,
    downloadsToday: 234
  });

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  const handleUserAction = (action: string, userId: number) => {
    console.log(`${action} action performed for user ID: ${userId}`);
    toast.success(`User ${action} successfully`);
  };

  const handleFileAction = (action: string, fileId: number) => {
    console.log(`${action} action performed for file ID: ${fileId}`);
    toast.success(`File ${action} successfully`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Users</p>
                <p className="text-3xl font-bold">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Files</p>
                <p className="text-3xl font-bold">{stats.totalFiles.toLocaleString()}</p>
              </div>
              <FileSpreadsheet className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Storage Used</span>
                <span className="font-semibold">{stats.storageUsed} GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Charts Generated</span>
                <span className="font-semibold">{stats.chartsGenerated.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Downloads Today</span>
                <span className="font-semibold">{stats.downloadsToday}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.user}</p>
                    <p className="text-xs text-gray-600">{log.action}: {log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleUserAction('edit', user.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleUserAction('ban', user.id)}>
                  <Ban className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderFiles = () => (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6" />
          File Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileSpreadsheet className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">{file.fileName}</h3>
                  <p className="text-sm text-gray-600">Uploaded by {file.userName}</p>
                  <p className="text-xs text-gray-500">{file.uploadDate} • {file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => openFileViewer(file)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleFileAction('download', file.id)}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleFileAction('delete', file.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalytics = () => (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Analytics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalFiles}</div>
            <div className="text-sm text-gray-600">Files Uploaded</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.chartsGenerated}</div>
            <div className="text-sm text-gray-600">Charts Generated</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.storageUsed}GB</div>
            <div className="text-sm text-gray-600">Storage Used</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSettings = () => (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          System Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">General Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable user registration</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Security Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-factor authentication</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Password requirements</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderOverview()}
      {renderUsers()}
      {renderFiles()}
      {renderAnalytics()}
      {renderSettings()}
      
      <FileViewer 
        isOpen={isViewerOpen}
        onClose={closeFileViewer}
        file={selectedFile}
      />
    </div>
  );
};
