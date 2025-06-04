
import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onDataUploaded: (data: any) => void;
}

export const FileUpload = ({ onDataUploaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const excelFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );

    if (!excelFile) {
      toast.error("Please upload a valid Excel file (.xlsx or .xls)");
      setUploadStatus('error');
      return;
    }

    setFileName(excelFile.name);
    setUploadStatus('uploading');

    // Simulate file processing
    setTimeout(() => {
      const mockData = {
        headers: ['Month', 'Sales', 'Revenue', 'Customers'],
        data: [
          ['Jan', 120, 15000, 450],
          ['Feb', 150, 18500, 520],
          ['Mar', 180, 22000, 610],
          ['Apr', 210, 26500, 680],
          ['May', 190, 24000, 640],
          ['Jun', 230, 29000, 750]
        ]
      };

      onDataUploaded(mockData);
      setUploadStatus('success');
      toast.success("Excel file uploaded and processed successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : uploadStatus === 'success' 
              ? 'border-green-500 bg-green-50'
              : uploadStatus === 'error'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploadStatus === 'idle' && (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Excel File
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your Excel file here, or click to browse
            </p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Choose File
            </Button>
          </>
        )}

        {uploadStatus === 'uploading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Processing {fileName}
            </h3>
            <p className="text-gray-500">
              Analyzing your Excel data...
            </p>
          </>
        )}

        {uploadStatus === 'success' && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Successful!
            </h3>
            <p className="text-gray-500 mb-4">
              {fileName} has been processed successfully
            </p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              Upload Another File
            </Button>
          </>
        )}

        {uploadStatus === 'error' && (
          <>
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Failed
            </h3>
            <p className="text-gray-500 mb-4">
              Please try again with a valid Excel file
            </p>
            <Button 
              onClick={() => {
                setUploadStatus('idle');
                fileInputRef.current?.click();
              }}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Try Again
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <FileSpreadsheet size={16} />
        <span>Supported formats: .xlsx, .xls (Max size: 10MB)</span>
      </div>
    </div>
  );
};
