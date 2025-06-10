
import { useState, useEffect } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminPanel } from "@/components/AdminPanel";
import { isAdmin, type AppUser } from "@/utils/authUtils";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

interface AdminDashboardProps {
  currentUser: AppUser | null;
  onLogout: () => void;
}

const AdminDashboard = ({ currentUser, onLogout }: AdminDashboardProps) => {
  const [currentSection, setCurrentSection] = useState("overview");

  useEffect(() => {
    // Check if user is admin, if not redirect
    if (currentUser && !isAdmin(currentUser)) {
      toast.error("Access denied. Admin privileges required.");
    }
  }, [currentUser]);

  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // Redirect if not admin
  if (!isAdmin(currentUser)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar
        currentUser={currentUser}
        onLogout={onLogout}
        currentSection={currentSection}
        onNavigate={setCurrentSection}
      />
      <div className="pt-16">
        <AdminPanel currentSection={currentSection} />
      </div>
    </div>
  );
};

export default AdminDashboard;
