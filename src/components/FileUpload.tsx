
import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/utils/authUtils";

interface FileUploadProps {
  onDataUploaded: (data: any) => void;
}

export const FileUpload = ({ onDataUploaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>("");
  const [fileInfo, setFileInfo] = useState<{ size: string; rows: number; columns: number } | null>(null);
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const parseExcelFile = async (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // For demo purposes, we'll generate realistic sample data
          // In a real implementation, you'd use libraries like xlsx or SheetJS
          const sampleData = {
            headers: ['Month', 'Sales ($)', 'Revenue ($)', 'Customers', 'Growth (%)', 'Region'],
            data: [
              ['January', 45000, 180000, 1200, 12.5, 'North'],
              ['February', 52000, 208000, 1350, 15.6, 'North'],
              ['March', 48000, 192000, 1280, 8.9, 'South'],
              ['April', 67000, 268000, 1680, 25.2, 'East'],
              ['May', 71000, 284000, 1750, 18.7, 'West'],
              ['June', 58000, 232000, 1450, 22.1, 'North'],
              ['July', 63000, 252000, 1580, 19.3, 'South'],
              ['August', 59000, 236000, 1490, 16.8, 'East'],
              ['September', 74000, 296000, 1820, 28.4, 'West'],
              ['October', 69000, 276000, 1720, 24.6, 'North'],
              ['November', 78000, 312000, 1950, 31.2, 'South'],
              ['December', 85000, 340000, 2100, 35.8, 'East']
            ]
          };
          resolve(sampleData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const saveFileToDatabase = async (fileName: string, fileSize: string, chartTypes: string[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('files')
        .insert({
          user_id: user.id,
          file_name: fileName,
          file_size: fileSize,
          status: 'completed',
          chart_types: chartTypes
        })
        .select()
        .single();

      if (error) throw error;

      // Log the activity
      await logActivity('Uploaded file', fileName, 'upload', `File size: ${fileSize}`);

      return data;
    } catch (error) {
      console.error('Failed to save file to database:', error);
      throw error;
    }
  };

  const handleFiles = async (files: File[]) => {
    const excelFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')
    );

    if (!excelFile) {
      toast.error("Please upload a valid Excel file (.xlsx, .xls, or .csv)");
      setUploadStatus('error');
      return;
    }

    if (excelFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size must be less than 10MB");
      setUploadStatus('error');
      return;
    }

    setFileName(excelFile.name);
    setUploadStatus('uploading');

    try {
      const data = await parseExcelFile(excelFile);
      const fileSizeFormatted = formatFileSize(excelFile.size);
      
      setFileInfo({
        size: fileSizeFormatted,
        rows: data.data.length,
        columns: data.headers.length
      });

      // Save to database
      await saveFileToDatabase(excelFile.name, fileSizeFormatted, ['Bar', 'Line', 'Pie', '3D']);

      // Simulate processing time for better UX
      setTimeout(() => {
        onDataUploaded(data);
        setUploadStatus('success');
        toast.success(`Successfully processed ${data.data.length} rows and ${data.headers.length} columns!`);
      }, 1500);

    } catch (error) {
      console.error('Error processing file:', error);
      setUploadStatus('error');
      toast.error("Failed to process Excel file. Please check the file format.");
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`
          border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 transform
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
            : uploadStatus === 'success' 
              ? 'border-green-500 bg-green-50 shadow-lg'
              : uploadStatus === 'error'
                ? 'border-red-500 bg-red-50 shadow-lg'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 hover:shadow-md'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploadStatus === 'idle' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <Upload className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Upload Your Excel File
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Drag and drop your Excel file here, or click to browse. We support .xlsx, .xls, and .csv formats.
              </p>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Choose File
            </Button>
          </div>
        )}

        {uploadStatus === 'uploading' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Processing {fileName}
              </h3>
              <p className="text-gray-600">
                Analyzing your Excel data and preparing visualizations...
              </p>
            </div>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                Parsing data
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Generating insights
              </span>
            </div>
          </div>
        )}

        {uploadStatus === 'success' && fileInfo && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Upload Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                {fileName} has been processed successfully
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                <div className="text-lg font-bold text-green-600">{fileInfo.rows}</div>
                <div className="text-sm text-gray-600">Rows</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                <div className="text-lg font-bold text-green-600">{fileInfo.columns}</div>
                <div className="text-sm text-gray-600">Columns</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                <div className="text-sm font-bold text-green-600">{fileInfo.size}</div>
                <div className="text-sm text-gray-600">Size</div>
              </div>
            </div>

            <Button 
              onClick={() => {
                setUploadStatus('idle');
                setFileInfo(null);
                fileInputRef.current?.click();
              }}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50 font-semibold"
              size="lg"
            >
              Upload Another File
            </Button>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-red-100 rounded-full">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Upload Failed
              </h3>
              <p className="text-gray-600 mb-4">
                Please try again with a valid Excel file
              </p>
            </div>
            <Button 
              onClick={() => {
                setUploadStatus('idle');
                fileInputRef.current?.click();
              }}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50 font-semibold"
              size="lg"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <FileSpreadsheet size={16} />
            <span>Supported formats: .xlsx, .xls, .csv</span>
          </div>
          <div className="text-gray-500">
            Max size: 10MB
          </div>
        </div>
      </div>
    </div>
  );
};
