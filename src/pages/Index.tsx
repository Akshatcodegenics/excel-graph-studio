
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { ChartDisplay } from "@/components/ChartDisplay";
import { AIInsights } from "@/components/AIInsights";
import { QuickAnalysisPreview } from "@/components/QuickAnalysisPreview";
import { UploadHistory } from "@/components/UploadHistory";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface IndexProps {
  currentUser: any;
  onAuthSuccess: (user: any) => void;
}

const Index = ({ currentUser, onAuthSuccess }: IndexProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate processing and generate mock chart data
    setTimeout(() => {
      setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sample Data',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar 
        currentUser={currentUser} 
        onAuthClick={() => setIsAuthModalOpen(true)} 
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Excel Analytics & AI Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your Excel data into beautiful charts and get AI-powered insights instantly. 
            Upload, analyze, and visualize your data with ease.
          </p>
          
          {currentUser && (
            <div className="mt-6">
              <Button 
                onClick={() => window.location.href = '/admin'}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={currentUser.role !== 'admin'}
              >
                <Shield className="w-4 h-4 mr-2" />
                {currentUser.role === 'admin' ? 'Access Admin Panel' : 'Admin Access (Admin Only)'}
              </Button>
              {currentUser.role !== 'admin' && (
                <p className="text-sm text-gray-500 mt-2">
                  Admin panel access requires admin role
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            <FileUpload onFileUpload={handleFileUpload} />
            {uploadedFile && <QuickAnalysisPreview file={uploadedFile} />}
          </div>
          
          <div className="space-y-8">
            {chartData && <ChartDisplay data={chartData} />}
            {chartData && <AIInsights />}
          </div>
        </div>

        <UploadHistory />

        <AuthModal 
          open={isAuthModalOpen}
          onOpenChange={setIsAuthModalOpen}
          onAuthSuccess={onAuthSuccess}
        />
      </main>
    </div>
  );
};

export default Index;
