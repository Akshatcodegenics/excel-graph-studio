
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Calendar, Download, BarChart3, Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HistoryItem {
  id: string;
  fileName: string;
  uploadDate: string;
  fileSize: string;
  chartTypes: string[];
  status: 'completed' | 'processing' | 'failed';
}

export const UploadHistory = () => {
  const [historyItems] = useState<HistoryItem[]>([
    {
      id: '1',
      fileName: 'sales_data_2024.xlsx',
      uploadDate: '2024-01-15',
      fileSize: '2.3 MB',
      chartTypes: ['Bar', 'Line', 'Pie'],
      status: 'completed'
    },
    {
      id: '2',
      fileName: 'customer_analytics.xlsx',
      uploadDate: '2024-01-14',
      fileSize: '1.8 MB',
      chartTypes: ['Bar', '3D'],
      status: 'completed'
    },
    {
      id: '3',
      fileName: 'revenue_report_q4.xlsx',
      uploadDate: '2024-01-13',
      fileSize: '3.1 MB',
      chartTypes: ['Line', 'Doughnut'],
      status: 'processing'
    },
    {
      id: '4',
      fileName: 'market_research.xlsx',
      uploadDate: '2024-01-12',
      fileSize: '4.5 MB',
      chartTypes: ['Bar'],
      status: 'failed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet size={24} />
            Upload History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {historyItems.map((item) => (
              <Card key={item.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileSpreadsheet className="text-blue-600" size={20} />
                        <h3 className="font-semibold text-gray-900">{item.fileName}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <span>{item.fileSize}</span>
                        <div className="flex items-center gap-1">
                          <BarChart3 size={14} />
                          <span>{item.chartTypes.join(', ')} charts</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.chartTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {item.status === 'completed' && (
                        <>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Eye size={14} />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download size={14} />
                            Download
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Total Uploads</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">28</div>
              <div className="text-sm text-gray-600">Charts Generated</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">4.2 MB</div>
              <div className="text-sm text-gray-600">Storage Used</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
