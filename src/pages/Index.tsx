
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
import { supabase } from "@/integrations/supabase/client";

interface IndexProps {
  currentUser: any;
  onAuthSuccess: (user: any) => void;
}

const Index = ({ currentUser, onAuthSuccess }: IndexProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [selectedChart, setSelectedChart] = useState<string>("bar");
  const [currentPage, setCurrentPage] = useState<string>("upload");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleNavigate = (page: string) => {
    if (page === 'admin') {
      window.location.href = '/admin';
    } else {
      setCurrentPage(page);
    }
  };

  const handleDataUploaded = (data: any) => {
    setUploadedData(data);
    setCurrentPage("analytics");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar 
        currentUser={currentUser} 
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigate}
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

        {currentPage === "upload" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-8">
              <FileUpload onDataUploaded={handleDataUploaded} />
              {uploadedData && <QuickAnalysisPreview data={uploadedData} />}
            </div>
            
            <div className="space-y-8">
              {uploadedData && (
                <>
                  <ChartDisplay 
                    data={uploadedData} 
                    selectedChart={selectedChart}
                    onChartChange={setSelectedChart}
                  />
                  <AIInsights data={uploadedData} />
                </>
              )}
            </div>
          </div>
        )}

        {currentPage === "analytics" && uploadedData && (
          <div className="space-y-8">
            <ChartDisplay 
              data={uploadedData} 
              selectedChart={selectedChart}
              onChartChange={setSelectedChart}
            />
            <AIInsights data={uploadedData} />
          </div>
        )}

        {currentPage === "dashboard" && (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h2>
            <p className="text-gray-600">Upload data to view your dashboard analytics</p>
          </div>
        )}

        {currentPage === "reports" && (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Reports</h2>
            <p className="text-gray-600">Generate AI-powered reports from your data</p>
          </div>
        )}

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
