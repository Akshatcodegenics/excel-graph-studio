
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { toast } from "sonner";

interface GoogleAuthProps {
  onAuthSuccess: (user: any) => void;
  onError?: (error: string) => void;
}

export const GoogleAuth = ({ onAuthSuccess, onError }: GoogleAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow
      // In a real app, you would integrate with Google OAuth API
      setTimeout(() => {
        // Check if admin email (you can customize this)
        const isAdmin = Math.random() > 0.5; // Simulate random admin assignment
        
        const user = {
          id: Date.now(),
          name: isAdmin ? "Admin User" : "John Doe",
          email: isAdmin ? "admin@company.com" : "user@example.com",
          role: isAdmin ? "admin" : "user",
          avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
          joinDate: new Date().toISOString().split('T')[0],
          provider: "google"
        };
        
        onAuthSuccess(user);
        toast.success(`Welcome ${user.name}!`);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Google login error:", error);
      onError?.("Failed to login with Google");
      toast.error("Google login failed");
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <Chrome className="w-5 h-5 mr-2 text-blue-500" />
      {isLoading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
};
