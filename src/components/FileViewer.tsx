
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileSpreadsheet, 
  Download, 
  X, 
  Eye, 
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    id?: string | number;
    fileName: string;
    userName?: string;
    uploadDate?: string;
    fileSize?: string;
    size?: string;
    status?: string;
    chartTypes?: string[];
    chartsGenerated?: number;
    downloadCount?: number;
    aiAnalyzed?: boolean;
  } | null;
}

export const FileViewer = ({ isOpen, onClose, file }: FileViewerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!file) return null;

  const handleDownload = () => {
    setIsLoading(true);
    // Simulate file download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // In real app, this would be the file URL
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloaded ${file.fileName}`);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'processed':
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileSpreadsheet className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (file.status) {
      case 'processed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Simulate file content preview
  const generatePreviewData = () => {
    const sampleData = [
      ['Month', 'Sales', 'Revenue', 'Customers'],
      ['January', '120', '$12,000', '45'],
      ['February', '150', '$15,500', '52'],
      ['March', '180', '$18,200', '61'],
      ['April', '200', '$20,800', '68'],
      ['May', '220', '$22,500', '75']
    ];
    return sampleData;
  };

  const previewData = generatePreviewData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              File Preview - {file.fileName}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">File Name</label>
                <p className="text-sm font-semibold">{file.fileName}</p>
              </div>
              {file.userName && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Uploaded By</label>
                  <p className="text-sm font-semibold">{file.userName}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-600">Size</label>
                <p className="text-sm font-semibold">{file.fileSize || file.size}</p>
              </div>
              {file.uploadDate && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Upload Date</label>
                  <p className="text-sm font-semibold">{new Date(file.uploadDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mt-4">
              {file.status && (
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  <Badge className={getStatusColor()}>
                    {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                  </Badge>
                </div>
              )}
              
              {file.aiAnalyzed && (
                <Badge className="bg-purple-100 text-purple-800">AI Analyzed</Badge>
              )}
              
              {file.chartTypes && file.chartTypes.length > 0 && (
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm text-gray-600">
                    {file.chartTypes.join(', ')} charts
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* File Preview */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <h3 className="font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4" />
                File Content Preview
              </h3>
            </div>
            
            <div className="p-4">
              {file.status === 'failed' ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                  <p className="text-red-600 font-medium">File processing failed</p>
                  <p className="text-sm text-gray-500">Unable to preview this file</p>
                </div>
              ) : file.status === 'processing' ? (
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-spin" />
                  <p className="text-yellow-600 font-medium">File is being processed</p>
                  <p className="text-sm text-gray-500">Preview will be available soon</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {previewData[0].map((header, index) => (
                          <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing first 5 rows of data. Full file contains more records.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          {(file.chartsGenerated !== undefined || file.downloadCount !== undefined) && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {file.chartsGenerated !== undefined && (
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{file.chartsGenerated}</div>
                  <div className="text-sm text-gray-600">Charts Generated</div>
                </div>
              )}
              
              {file.downloadCount !== undefined && (
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{file.downloadCount}</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {file.status === 'processed' || file.status === 'completed' ? (
              <Button onClick={handleDownload} disabled={isLoading}>
                <Download className="w-4 h-4 mr-2" />
                {isLoading ? "Downloading..." : "Download File"}
              </Button>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
