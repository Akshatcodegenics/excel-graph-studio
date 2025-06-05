import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  Eye, 
  Trash2, 
  Ban, 
  CheckCircle, 
  AlertCircle,
  Download,
  Filter,
  FileSpreadsheet,
  BarChart3,
  Activity,
  X
} from "lucide-react";
import { toast } from "sonner";

export const AdminUsers = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      role: "user", 
      filesUploaded: 12, 
      chartsCreated: 28,
      lastActive: "2024-06-03",
      status: "active",
      joinDate: "2024-01-15",
      provider: "google"
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
      joinDate: "2024-02-10",
      provider: "email"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike@example.com", 
      role: "user", 
      filesUploaded: 15, 
      chartsCreated: 32,
      lastActive: "2024-06-01",
      status: "banned",
      joinDate: "2024-01-20",
      provider: "google"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserViewOpen, setIsUserViewOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

  const handleBanUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === "banned" ? "active" : "banned" } : user
    ));
    const user = users.find(u => u.id === userId);
    toast.success(`User ${user?.status === "banned" ? "unbanned" : "banned"} successfully`);
  };

  const handleViewUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsUserViewOpen(true);
    }
  };

  const closeUserView = () => {
    setIsUserViewOpen(false);
    setSelectedUser(null);
  };

  const handleExportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Role,Files Uploaded,Charts Created,Status,Join Date\n" +
      users.map(user => 
        `${user.name},${user.email},${user.role},${user.filesUploaded},${user.chartsCreated},${user.status},${user.joinDate}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Users data exported successfully");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage and monitor all registered users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{users.length}</div>
            <div className="text-sm opacity-90">Total Users</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{users.filter(u => u.status === "active").length}</div>
            <div className="text-sm opacity-90">Active Users</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6 text-center">
            <Ban className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{users.filter(u => u.status === "banned").length}</div>
            <div className="text-sm opacity-90">Banned Users</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <Download className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.filesUploaded, 0)}</div>
            <div className="text-sm opacity-90">Total Files</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              User Directory
            </CardTitle>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </select>
              
              <Button onClick={handleExportUsers} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
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
                      <Badge variant="outline" className="capitalize">
                        {user.provider}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.filesUploaded} files uploaded</div>
                        <div>{user.chartsCreated} charts created</div>
                        <div className="text-gray-500">Last active: {user.lastActive}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.status === 'active' ? 
                          <CheckCircle className="w-4 h-4 text-green-500" /> :
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        }
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {user.joinDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewUser(user.id)}
                          className="hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBanUser(user.id)}
                          className={user.status === "banned" ? "hover:bg-green-50" : "hover:bg-yellow-50"}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Detail View Dialog */}
      <Dialog open={isUserViewOpen} onOpenChange={closeUserView}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                User Details - {selectedUser?.name}
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={closeUserView}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {/* User Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedUser.status === 'active' ? 
                        <CheckCircle className="w-4 h-4 text-green-500" /> :
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      }
                      <Badge variant={selectedUser.status === 'active' ? 'default' : 'destructive'}>
                        {selectedUser.status}
                      </Badge>
                      <Badge variant="outline">{selectedUser.role}</Badge>
                      <Badge variant="outline">{selectedUser.provider}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Join Date</label>
                    <p className="text-sm font-semibold">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Active</label>
                    <p className="text-sm font-semibold">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Files Uploaded</label>
                    <p className="text-sm font-semibold">{selectedUser.filesUploaded}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Charts Created</label>
                    <p className="text-sm font-semibold">{selectedUser.chartsCreated}</p>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <FileSpreadsheet className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{selectedUser.filesUploaded}</div>
                  <div className="text-sm text-gray-600">Files Uploaded</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{selectedUser.chartsCreated}</div>
                  <div className="text-sm text-gray-600">Charts Created</div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                  <div className="text-sm text-gray-600">Total Actions</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border rounded-lg">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <h3 className="font-semibold">Recent Activity</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Uploaded sales_data_q1.xlsx</span>
                    <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Created bar chart visualization</span>
                    <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                    <Download className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Downloaded revenue_report.xlsx</span>
                    <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={closeUserView}>
                  Close
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleBanUser(selectedUser.id)}
                  className={selectedUser.status === "banned" ? "hover:bg-green-50" : "hover:bg-yellow-50"}
                >
                  <Ban className="w-4 h-4 mr-2" />
                  {selectedUser.status === "banned" ? "Unban User" : "Ban User"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
