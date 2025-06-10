
import { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminPanel } from "@/components/AdminPanel";
import { AdminUsers } from "@/components/AdminUsers";
import { AdminActivityMonitor } from "@/components/AdminActivityMonitor";
import { AdminFileManager } from "@/components/AdminFileManager";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { AdminSettings } from "@/components/AdminSettings";
import { isAdmin, type AppUser } from "@/utils/authUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminDashboardProps {
  currentUser: AppUser | null;
  onLogout: () => void;
}

const AdminDashboard = ({ currentUser, onLogout }: AdminDashboardProps) => {
  const [currentSection, setCurrentSection] = useState("overview");

  // Check if user is admin
  if (!currentUser || !isAdmin(currentUser)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="shadow-xl border-0 bg-white max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
            <p className="text-sm text-gray-500 mb-6">Only users with admin role can access this section.</p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/'}
            >
              Return to Main Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'overview':
        return <AdminPanel currentUser={currentUser} />;
      case 'users':
        return <AdminUsers />;
      case 'activity':
        return <AdminActivityMonitor />;
      case 'files':
        return <AdminFileManager />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminPanel currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <AdminNavbar
        currentUser={currentUser}
        onLogout={onLogout}
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      
      <div className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {currentUser?.profile?.first_name || currentUser?.email}! 
              Manage your platform from here.
            </p>
          </div>
          
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
