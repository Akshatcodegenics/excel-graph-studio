
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Calendar, Download, BarChart3, Eye, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileViewer } from "./FileViewer";
import { useFileViewer } from "@/hooks/useFileViewer";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/utils/authUtils";

interface HistoryItem {
  id: string;
  file_name: string;
  upload_date: string;
  file_size: string;
  chart_types: string[];
  status: 'completed' | 'processing' | 'failed';
  download_count: number;
}

export const UploadHistory = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = historyItems.filter(item =>
    item.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { isViewerOpen, selectedFile, openFileViewer, closeFileViewer } = useFileViewer();

  useEffect(() => {
    fetchUserFiles();
  }, []);

  const fetchUserFiles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', user.id)
        .order('upload_date', { ascending: false });

      if (error) throw error;

      setHistoryItems(data.map(file => ({
        id: file.id,
        file_name: file.file_name,
        upload_date: file.upload_date,
        file_size: file.file_size,
        chart_types: file.chart_types || [],
        status: file.status as 'completed' | 'processing' | 'failed',
        download_count: file.download_count
      })));
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error('Failed to load upload history');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (item: HistoryItem) => {
    openFileViewer({
      id: item.id,
      fileName: item.file_name,
      uploadDate: item.upload_date,
      fileSize: item.file_size,
      status: item.status,
      chartTypes: item.chart_types,
      downloadCount: item.download_count
    });
  };

  const handleDownload = async (item: HistoryItem) => {
    if (item.status !== 'completed') {
      toast.error("Cannot download incomplete files");
      return;
    }

    try {
      // Update download count in database
      const { error } = await supabase
        .from('files')
        .update({ download_count: item.download_count + 1 })
        .eq('id', item.id);

      if (error) throw error;

      // Log the activity
      await logActivity('Downloaded file', item.file_name, 'download');

      // Update local state
      setHistoryItems(prev => prev.map(historyItem =>
        historyItem.id === item.id
          ? { ...historyItem, download_count: historyItem.download_count + 1 }
          : historyItem
      ));

      toast.success(`Downloaded ${item.file_name}`);
    } catch (error) {
      console.error('Error updating download count:', error);
      toast.error('Download failed');
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      const item = historyItems.find(h => h.id === itemId);
      
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      // Log the activity
      if (item) {
        await logActivity('Deleted file', item.file_name, 'delete');
      }

      setHistoryItems(prev => prev.filter(item => item.id !== itemId));
      toast.success("File deleted successfully");
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected");
      return;
    }

    try {
      const { error } = await supabase
        .from('files')
        .delete()
        .in('id', selectedItems);

      if (error) throw error;

      // Log activities
      for (const itemId of selectedItems) {
        const item = historyItems.find(h => h.id === itemId);
        if (item) {
          await logActivity('Deleted file', item.file_name, 'delete');
        }
      }

      setHistoryItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      toast.success(`Deleted ${selectedItems.length} files`);
    } catch (error) {
      console.error('Error bulk deleting files:', error);
      toast.error('Failed to delete files');
    }
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
        handleDownload(item);
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

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet size={24} />
            My Upload History & File Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Bulk Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search files..."
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
                          <h3 className="font-semibold text-gray-900">{item.file_name}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(item.upload_date).toLocaleDateString()}</span>
                          </div>
                          <span>{item.file_size}</span>
                          <span>Downloads: {item.download_count}</span>
                          <div className="flex items-center gap-1">
                            <BarChart3 size={14} />
                            <span>{item.chart_types.join(', ')} charts</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {item.chart_types.map((type) => (
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
                {historyItems.reduce((sum, item) => sum + item.chart_types.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Charts Generated</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {historyItems.reduce((sum, item) => sum + parseFloat(item.file_size), 0).toFixed(1)} MB
              </div>
              <div className="text-sm text-gray-600">Storage Used</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {historyItems.reduce((sum, item) => sum + item.download_count, 0)}
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
