
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Download, Trash2, Eye, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { FileViewer } from "./FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";
import { supabase } from "@/integrations/supabase/client";

export const AdminFileManager = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.user_email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || file.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  useEffect(() => {
    fetchAllFiles();
  }, []);

  const fetchAllFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('files')
        .select(`
          *,
          user_profiles!inner(first_name, last_name)
        `)
        .order('upload_date', { ascending: false });

      if (error) throw error;

      const filesWithUserInfo = data.map(file => ({
        ...file,
        user_name: `${file.user_profiles.first_name || ''} ${file.user_profiles.last_name || ''}`.trim(),
        user_email: file.user_profiles.email || 'Unknown'
      }));

      setFiles(filesWithUserInfo);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      setFiles(files.filter(file => file.id !== fileId));
      toast.success("File deleted successfully");
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleDownloadFile = (file: any) => {
    toast.success(`Downloaded ${file.file_name}`);
  };

  const handleViewFile = (file: any) => {
    openFileViewer({
      id: file.id,
      fileName: file.file_name,
      userName: file.user_name,
      uploadDate: file.upload_date,
      size: file.file_size,
      status: file.status,
      chartsGenerated: file.chart_types?.length || 0,
      downloadCount: file.download_count
    });
  };

  const getTotalStorage = () => {
    return files.reduce((total, file) => total + parseFloat(file.file_size || '0'), 0).toFixed(1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading files...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div className="text-2xl font-bold">{files.filter(f => f.status === 'completed').length}</div>
            <div className="text-sm opacity-90">Processed</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <Filter className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{files.reduce((sum, f) => sum + (f.download_count || 0), 0)}</div>
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
                <option value="completed">Completed</option>
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
                          <h3 className="font-semibold text-gray-900">{file.file_name}</h3>
                          <Badge variant={file.status === 'completed' ? 'default' : 
                                       file.status === 'processing' ? 'secondary' : 'destructive'}>
                            {file.status}
                          </Badge>
                          {file.chart_types && file.chart_types.length > 0 && (
                            <Badge className="bg-purple-100 text-purple-800">Charts: {file.chart_types.length}</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">User:</span> {file.user_name || 'Unknown'}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {file.file_size}
                          </div>
                          <div>
                            <span className="font-medium">Charts:</span> {file.chart_types?.length || 0}
                          </div>
                          <div>
                            <span className="font-medium">Downloads:</span> {file.download_count || 0}
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-1">
                          Uploaded: {new Date(file.upload_date).toLocaleDateString()}
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
                      
                      {file.status === 'completed' && (
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
