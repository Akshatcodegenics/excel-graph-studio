
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileSpreadsheet, BarChart3, Settings, Trash2, Eye } from "lucide-react";

interface AdminPanelProps {
  currentUser: any;
}

export const AdminPanel = ({ currentUser }: AdminPanelProps) => {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", filesUploaded: 12, lastActive: "2024-06-03" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", filesUploaded: 8, lastActive: "2024-06-02" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "user", filesUploaded: 15, lastActive: "2024-06-01" },
  ]);

  const [uploads] = useState([
    { id: 1, fileName: "sales_data.xlsx", userName: "John Doe", uploadDate: "2024-06-03", size: "2.3 MB", status: "processed" },
    { id: 2, fileName: "inventory.xlsx", userName: "Jane Smith", uploadDate: "2024-06-02", size: "1.8 MB", status: "processed" },
    { id: 3, fileName: "analytics.xlsx", userName: "Mike Johnson", uploadDate: "2024-06-01", size: "3.1 MB", status: "failed" },
  ]);

  const [systemStats] = useState({
    totalUsers: 156,
    totalUploads: 1234,
    totalCharts: 5678,
    activeUsers: 42,
    storageUsed: "156.7 GB",
    systemUptime: "99.9%"
  });

  if (currentUser?.role !== 'admin') {
    return (
      <div className="container mx-auto px-6 py-8">
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="p-12 text-center">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, monitor system performance, and oversee data analytics</p>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <div className="text-sm opacity-90">Total Users</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <FileSpreadsheet className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.totalUploads}</div>
            <div className="text-sm opacity-90">Files Uploaded</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.totalCharts}</div>
            <div className="text-sm opacity-90">Charts Created</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
            <div className="text-sm opacity-90">Active Users</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-4 text-center">
            <Settings className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.storageUsed}</div>
            <div className="text-sm opacity-90">Storage Used</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
            <div className="text-sm opacity-90">System Uptime</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
          <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="uploads" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            File Management
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{user.filesUploaded} files</div>
                        <div className="text-xs text-gray-500">Last active: {user.lastActive}</div>
                      </div>
                      <Badge variant="outline">{user.role}</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="space-y-4">
                {uploads.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{upload.fileName}</h3>
                      <p className="text-sm text-gray-600">Uploaded by {upload.userName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{upload.size}</div>
                        <div className="text-xs text-gray-500">{upload.uploadDate}</div>
                      </div>
                      <Badge variant={upload.status === 'processed' ? 'default' : 'destructive'}>
                        {upload.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-6 h-6" />
                System Settings
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
    </div>
  );
};
