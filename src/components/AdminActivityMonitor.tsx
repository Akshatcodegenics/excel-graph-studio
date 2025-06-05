
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Clock, Search, Eye, Download, FileSpreadsheet, BarChart3, Brain, Users } from "lucide-react";

export const AdminActivityMonitor = () => {
  const [activities] = useState([
    { id: 1, user: "John Doe", action: "uploaded file", target: "sales_data_q1.xlsx", time: "2 minutes ago", type: "upload", details: "2.3MB Excel file" },
    { id: 2, user: "Jane Smith", action: "created chart", target: "Bar Chart - Revenue", time: "5 minutes ago", type: "chart", details: "Interactive bar chart" },
    { id: 3, user: "Mike Johnson", action: "generated AI report", target: "Q1 Analysis", time: "8 minutes ago", type: "ai", details: "Comprehensive insights" },
    { id: 4, user: "Sarah Wilson", action: "downloaded chart", target: "Sales_Trends.png", time: "12 minutes ago", type: "download", details: "PNG format" },
    { id: 5, user: "Admin", action: "system backup", target: "Database", time: "1 hour ago", type: "system", details: "Full system backup" },
    { id: 6, user: "David Chen", action: "logged in", target: "Dashboard", time: "1 hour ago", type: "auth", details: "Google OAuth" },
    { id: 7, user: "Lisa Park", action: "created 3D chart", target: "Revenue 3D Visualization", time: "2 hours ago", type: "chart", details: "Interactive 3D model" },
    { id: 8, user: "Tom Brown", action: "shared report", target: "Monthly Report", time: "3 hours ago", type: "share", details: "Via email link" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || activity.type === filterType;
    return matchesSearch && matchesType;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return <FileSpreadsheet className="w-5 h-5 text-blue-500" />;
      case 'chart': return <BarChart3 className="w-5 h-5 text-green-500" />;
      case 'ai': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'download': return <Download className="w-5 h-5 text-orange-500" />;
      case 'auth': return <Users className="w-5 h-5 text-indigo-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: string) => {
    const colors = {
      upload: "bg-blue-100 text-blue-800",
      chart: "bg-green-100 text-green-800",
      ai: "bg-purple-100 text-purple-800",
      download: "bg-orange-100 text-orange-800",
      auth: "bg-indigo-100 text-indigo-800",
      system: "bg-gray-100 text-gray-800",
      share: "bg-pink-100 text-pink-800"
    };
    return colors[type] || colors.system;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Activity Monitor</h1>
        <p className="text-gray-600">Real-time monitoring of all user activities and system events</p>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{activities.length}</div>
            <div className="text-sm opacity-90">Total Activities</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6 text-center">
            <FileSpreadsheet className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{activities.filter(a => a.type === 'upload').length}</div>
            <div className="text-sm opacity-90">File Uploads</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{activities.filter(a => a.type === 'chart').length}</div>
            <div className="text-sm opacity-90">Charts Created</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{activities.filter(a => a.type === 'ai').length}</div>
            <div className="text-sm opacity-90">AI Reports</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Live Activity Feed
            </CardTitle>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Activities</option>
                <option value="upload">File Uploads</option>
                <option value="chart">Chart Creation</option>
                <option value="ai">AI Reports</option>
                <option value="download">Downloads</option>
                <option value="auth">Authentication</option>
                <option value="system">System Events</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{activity.user}</span>
                    <span className="text-gray-600">{activity.action}</span>
                    <Badge className={getActivityBadge(activity.type)}>
                      {activity.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 truncate">{activity.target}</div>
                  <div className="text-xs text-gray-500">{activity.details}</div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{activity.time}</span>
                </div>
                
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No activities found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
