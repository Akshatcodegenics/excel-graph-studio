
import { useState } from "react";

interface FileData {
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
}

export const useFileViewer = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  const openFileViewer = (file: FileData) => {
    setSelectedFile(file);
    setIsViewerOpen(true);
  };

  const closeFileViewer = () => {
    setIsViewerOpen(false);
    setSelectedFile(null);
  };

  return {
    isViewerOpen,
    selectedFile,
    openFileViewer,
    closeFileViewer
  };
};
