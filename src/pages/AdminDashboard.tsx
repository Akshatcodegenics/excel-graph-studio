
import { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminUsers } from "@/components/AdminUsers";
import { AdminActivityMonitor } from "@/components/AdminActivityMonitor";
import { AdminFileManager } from "@/components/AdminFileManager";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { AdminSettings } from "@/components/AdminSettings";

interface AdminDashboardProps {
  currentUser: any;
  onLogout: () => void;
}

const AdminDashboard = ({ currentUser, onLogout }: AdminDashboardProps) => {
  const [currentSection, setCurrentSection] = useState("overview");

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
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
        return <AdminOverview />;
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
        {renderCurrentSection()}
      </div>
    </div>
  );
};

const AdminOverview = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overview cards */}
      </div>
    </div>
  );
};

export default AdminDashboard;
