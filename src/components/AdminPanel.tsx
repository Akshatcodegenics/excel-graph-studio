import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  FileSpreadsheet, 
  BarChart3, 
  Settings, 
  Trash2, 
  Eye, 
  Activity,
  TrendingUp,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  Brain,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { FileViewer } from "./FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";

interface AdminPanelProps {
  currentSection: string;
}

export const AdminPanel = ({ currentSection }: AdminPanelProps) => {
  const [users] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      role: "user", 
      filesUploaded: 12, 
      chartsCreated: 28,
      lastActive: "2024-06-03",
      status: "active",
      joinDate: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      role: "user", 
      filesUploaded: 8, 
      chartsCreated: 15,
      lastActive: "2024-06-02",
      status: "active",
      joinDate: "2024-02-10"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike@example.com", 
      role: "user", 
      filesUploaded: 15, 
      chartsCreated: 32,
      lastActive: "2024-06-01",
      status: "inactive",
      joinDate: "2024-01-20"
    },
  ]);

  const [uploads] = useState([
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
    },
    { 
      id: 3, 
      fileName: "analytics_dashboard.xlsx", 
      userName: "Mike Johnson", 
      uploadDate: "2024-06-01", 
      size: "3.1 MB", 
      status: "failed",
      chartsGenerated: 0,
      downloadCount: 0
    },
  ]);

  const [activities] = useState([
    { id: 1, user: "John Doe", action: "uploaded file", target: "sales_data_q1.xlsx", time: "2 hours ago", type: "upload" },
    { id: 2, user: "Jane Smith", action: "created chart", target: "Bar Chart - Revenue", time: "3 hours ago", type: "chart" },
    { id: 3, user: "Mike Johnson", action: "generated AI report", target: "Q1 Analysis", time: "5 hours ago", type: "ai" },
    { id: 4, user: "John Doe", action: "downloaded chart", target: "Sales_Trends.png", time: "6 hours ago", type: "download" },
    { id: 5, user: "Admin", action: "system backup", target: "Database", time: "1 day ago", type: "system" },
  ]);

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

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  const handleUserAction = (action: string, userId: number) => {
    console.log(`${action} action performed for user ID: ${userId}`);
    toast.success(`${action} action performed for user ID: ${userId}`);
  };

  const handleFileAction = (action: string, fileId: number) => {
    if (action === 'View') {
      const file = uploads.find(u => u.id === fileId);
      if (file) {
        openFileViewer(file);
      }
    } else if (action === 'Download') {
      const file = uploads.find(u => u.id === fileId);
      if (file) {
        console.log(`Downloading file: ${file.fileName}`);
        toast.success(`Downloaded ${file.fileName}`);
      }
    } else {
      console.log(`${action} action performed for file ID: ${fileId}`);
      toast.success(`${action} action performed for file ID: ${fileId}`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Complete system overview and management console</p>
        <Badge className="bg-red-100 text-red-800 mt-2">Admin Access Only</Badge>
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

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg">
          <TabsTrigger value="activity" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Activity className="w-4 h-4 mr-2" />
            Activity Feed
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="uploads" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            File Management
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Real-time Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'upload' ? 'bg-blue-500' :
                      activity.type === 'chart' ? 'bg-green-500' :
                      activity.type === 'ai' ? 'bg-purple-500' :
                      activity.type === 'download' ? 'bg-orange-500' :
                      'bg-gray-500'
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{user.filesUploaded} files uploaded</div>
                          <div>{user.chartsCreated} charts created</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.status === 'active' ? 
                            <CheckCircle className="w-4 h-4 text-green-500" /> :
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          }
                          <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                            {user.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleUserAction('View', user.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleUserAction('Delete', user.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-6 h-6" />
                File Upload Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Analytics</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{upload.fileName}</div>
                          <div className="text-sm text-gray-600">{upload.size} • {upload.uploadDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>{upload.userName}</TableCell>
                      <TableCell>
                        <Badge variant={upload.status === 'processed' ? 'default' : 'destructive'}>
                          {upload.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{upload.chartsGenerated} charts generated</div>
                          <div>{upload.downloadCount} downloads</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleFileAction('View', upload.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleFileAction('Download', upload.id)}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleFileAction('Delete', upload.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                System Analytics & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Usage Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span>Daily Active Users</span>
                      <span className="font-bold text-blue-600">42</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span>Files Processed Today</span>
                      <span className="font-bold text-green-600">127</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span>Charts Generated Today</span>
                      <span className="font-bold text-purple-600">89</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                      <span>AI Reports Generated</span>
                      <span className="font-bold text-pink-600">34</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">System Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span>Average Processing Time</span>
                      <span className="font-bold text-orange-600">{systemStats.avgProcessingTime}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span>System Uptime</span>
                      <span className="font-bold text-indigo-600">{systemStats.systemUptime}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span>Error Rate</span>
                      <span className="font-bold text-red-600">{systemStats.errorRate}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                      <span>Storage Used</span>
                      <span className="font-bold text-teal-600">{systemStats.storageUsed}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-6 h-6" />
                System Settings & Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">File Upload Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max File Size (MB)</label>
                      <input type="number" className="w-full p-2 border rounded" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Allowed File Types</label>
                      <input type="text" className="w-full p-2 border rounded" defaultValue=".xlsx, .xls, .csv" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">AI Integration</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">AI Provider</label>
                      <select className="w-full p-2 border rounded">
                        <option>OpenAI GPT-4</option>
                        <option>Claude</option>
                        <option>Custom API</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">AI Analysis Timeout (seconds)</label>
                      <input type="number" className="w-full p-2 border rounded" defaultValue="30" />
                    </div>
                  </div>
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </Button>
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
