import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Download, Trash2, Eye, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { FileViewer } from "./FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";

export const AdminFileManager = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      fileName: "sales_data_q1.xlsx",
      userName: "John Doe",
      uploadDate: "2024-06-03",
      size: "2.3 MB",
      status: "processed",
      chartsGenerated: 5,
      downloadCount: 12,
      aiAnalyzed: true
    },
    {
      id: 2,
      fileName: "inventory_report.xlsx",
      userName: "Jane Smith",
      uploadDate: "2024-06-02",
      size: "1.8 MB",
      status: "processed",
      chartsGenerated: 3,
      downloadCount: 8,
      aiAnalyzed: true
    },
    {
      id: 3,
      fileName: "analytics_dashboard.xlsx",
      userName: "Mike Johnson",
      uploadDate: "2024-06-01",
      size: "3.1 MB",
      status: "failed",
      chartsGenerated: 0,
      downloadCount: 0,
      aiAnalyzed: false
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || file.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  const handleDeleteFile = (fileId: number) => {
    setFiles(files.filter(file => file.id !== fileId));
    toast.success("File deleted successfully");
  };

  const handleDownloadFile = (file: any) => {
    toast.success(`Downloaded ${file.fileName}`);
  };

  const handleViewFile = (file: any) => {
    openFileViewer(file);
  };

  const getTotalStorage = () => {
    return files.reduce((total, file) => total + parseFloat(file.size), 0).toFixed(1);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">File Management</h1>
        <p className="text-gray-600">Manage and monitor all uploaded files across the platform</p>
      </div>

      {/* File Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <FileSpreadsheet className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{files.length}</div>
            <div className="text-sm opacity-90">Total Files</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6 text-center">
            <Download className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{getTotalStorage()} MB</div>
            <div className="text-sm opacity-90">Storage Used</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{files.filter(f => f.status === 'processed').length}</div>
            <div className="text-sm opacity-90">Processed</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <Filter className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{files.reduce((sum, f) => sum + f.downloadCount, 0)}</div>
            <div className="text-sm opacity-90">Downloads</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6" />
              File Directory
            </CardTitle>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search files..."
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
                <option value="all">All Files</option>
                <option value="processed">Processed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <FileSpreadsheet className="w-10 h-10 text-blue-600" />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{file.fileName}</h3>
                          <Badge variant={file.status === 'processed' ? 'default' : 
                                       file.status === 'processing' ? 'secondary' : 'destructive'}>
                            {file.status}
                          </Badge>
                          {file.aiAnalyzed && (
                            <Badge className="bg-purple-100 text-purple-800">AI Analyzed</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">User:</span> {file.userName}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {file.size}
                          </div>
                          <div>
                            <span className="font-medium">Charts:</span> {file.chartsGenerated}
                          </div>
                          <div>
                            <span className="font-medium">Downloads:</span> {file.downloadCount}
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-1">
                          Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewFile(file)}
                        className="hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {file.status === 'processed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadFile(file)}
                          className="hover:bg-green-50"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No files found matching your criteria</p>
            </div>
          )}
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
