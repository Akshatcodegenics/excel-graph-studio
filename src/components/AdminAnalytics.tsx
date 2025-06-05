
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Activity, FileSpreadsheet, Upload } from "lucide-react";

export const AdminAnalytics = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">System Analytics</h1>
        <p className="text-gray-600">Comprehensive analytics and performance metrics for published content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Published Files Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span>Total Published Files</span>
                <span className="font-bold text-blue-600">42</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span>Files Published Today</span>
                <span className="font-bold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span>Charts from Published Files</span>
                <span className="font-bold text-purple-600">127</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span>Unpublished Files</span>
                <span className="font-bold text-orange-600">15</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span>Avg Analytics Views</span>
                <span className="font-bold text-emerald-600">2.3k</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <span>Report Downloads</span>
                <span className="font-bold text-indigo-600">456</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                <span>Published Files Engagement</span>
                <span className="font-bold text-pink-600">87%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span>Publishing Rate</span>
                <span className="font-bold text-red-600">73.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <FileSpreadsheet className="w-12 h-12 mx-auto mb-4" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm opacity-90">Total Files in System</div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6 text-center">
            <Upload className="w-12 h-12 mx-auto mb-4" />
            <div className="text-2xl font-bold">42</div>
            <div className="text-sm opacity-90">Published Files</div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <div className="text-2xl font-bold">34</div>
            <div className="text-sm opacity-90">Active Publishers</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
