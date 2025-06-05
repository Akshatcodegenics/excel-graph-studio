import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Calendar, Download, BarChart3, Eye, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileViewer } from "./FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";

interface HistoryItem {
  id: string;
  fileName: string;
  uploadDate: string;
  fileSize: string;
  chartTypes: string[];
  status: 'completed' | 'processing' | 'failed';
  downloadCount: number;
  userName: string;
}

export const UploadHistory = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: '1',
      fileName: 'sales_data_2024.xlsx',
      uploadDate: '2024-01-15',
      fileSize: '2.3 MB',
      chartTypes: ['Bar', 'Line', 'Pie'],
      status: 'completed',
      downloadCount: 12,
      userName: 'John Doe'
    },
    {
      id: '2',
      fileName: 'customer_analytics.xlsx',
      uploadDate: '2024-01-14',
      fileSize: '1.8 MB',
      chartTypes: ['Bar', '3D'],
      status: 'completed',
      downloadCount: 8,
      userName: 'Jane Smith'
    },
    {
      id: '3',
      fileName: 'revenue_report_q4.xlsx',
      uploadDate: '2024-01-13',
      fileSize: '3.1 MB',
      chartTypes: ['Line', 'Doughnut'],
      status: 'processing',
      downloadCount: 0,
      userName: 'Mike Johnson'
    },
    {
      id: '4',
      fileName: 'market_research.xlsx',
      uploadDate: '2024-01-12',
      fileSize: '4.5 MB',
      chartTypes: ['Bar'],
      status: 'failed',
      downloadCount: 0,
      userName: 'Sarah Wilson'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = historyItems.filter(item =>
    item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  const handleView = (item: HistoryItem) => {
    openFileViewer({
      id: item.id,
      fileName: item.fileName,
      userName: item.userName,
      uploadDate: item.uploadDate,
      fileSize: item.fileSize,
      status: item.status,
      chartTypes: item.chartTypes,
      downloadCount: item.downloadCount
    });
  };

  const handleDownload = (item: HistoryItem) => {
    if (item.status !== 'completed') {
      toast.error("Cannot download incomplete files");
      return;
    }

    // Simulate file download
    const link = document.createElement('a');
    link.href = '#'; // In real app, this would be the file URL
    link.download = item.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update download count
    setHistoryItems(prev => prev.map(historyItem =>
      historyItem.id === item.id
        ? { ...historyItem, downloadCount: historyItem.downloadCount + 1 }
        : historyItem
    ));

    toast.success(`Downloaded ${item.fileName}`);
  };

  const handleDelete = (itemId: string) => {
    setHistoryItems(prev => prev.filter(item => item.id !== itemId));
    toast.success("File deleted successfully");
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected");
      return;
    }

    setHistoryItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    toast.success(`Deleted ${selectedItems.length} files`);
  };

  const handleBulkDownload = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected");
      return;
    }

    const completedItems = historyItems.filter(item => 
      selectedItems.includes(item.id) && item.status === 'completed'
    );

    if (completedItems.length === 0) {
      toast.error("No completed files to download");
      return;
    }

    // Simulate bulk download
    completedItems.forEach(item => {
      setTimeout(() => {
        toast.success(`Downloaded ${item.fileName}`);
      }, Math.random() * 1000);
    });

    toast.info(`Starting download of ${completedItems.length} files`);
    setSelectedItems([]);
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(
      selectedItems.length === filteredItems.length
        ? []
        : filteredItems.map(item => item.id)
    );
  };

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
            Upload History & File Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Bulk Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search files or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={selectAllItems}
                disabled={filteredItems.length === 0}
              >
                {selectedItems.length === filteredItems.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button
                variant="outline"
                onClick={handleBulkDownload}
                disabled={selectedItems.length === 0}
                className="bg-blue-50 hover:bg-blue-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Bulk Download
              </Button>
              <Button
                variant="outline"
                onClick={handleBulkDelete}
                disabled={selectedItems.length === 0}
                className="bg-red-50 hover:bg-red-100 text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Bulk Delete
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      
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
                          <span>By: {item.userName}</span>
                          <span>Downloads: {item.downloadCount}</span>
                          <div className="flex items-center gap-1">
                            <BarChart3 size={14} />
                            <span>{item.chartTypes.join(', ')} charts</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {item.chartTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(item)}
                        className="flex items-center gap-1 hover:bg-blue-50"
                      >
                        <Eye size={14} />
                        View
                      </Button>
                      
                      {item.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(item)}
                          className="flex items-center gap-1 hover:bg-green-50"
                        >
                          <Download size={14} />
                          Download
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No files found matching your search</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">{historyItems.length}</div>
              <div className="text-sm text-gray-600">Total Uploads</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {historyItems.reduce((sum, item) => sum + item.chartTypes.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Charts Generated</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {historyItems.reduce((sum, item) => sum + parseFloat(item.fileSize), 0).toFixed(1)} MB
              </div>
              <div className="text-sm text-gray-600">Storage Used</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {historyItems.reduce((sum, item) => sum + item.downloadCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FileViewer 
        isOpen={isViewerOpen}
        onClose={closeFileViewer}
        file={selectedFile}
      />
    </div>
  );
};
