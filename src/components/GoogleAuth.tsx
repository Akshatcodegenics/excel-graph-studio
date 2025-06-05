
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
      // Simulate Google OAuth popup window
      const popup = window.open(
        'about:blank',
        'google-auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      
      if (!popup) {
        throw new Error('Popup blocked');
      }

      // Simulate Google OAuth consent screen
      popup.document.write(`
        <html>
          <head>
            <title>Sign in with Google</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                background: #f8f9fa;
              }
              .container {
                background: white;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 400px;
              }
              .google-logo {
                width: 40px;
                height: 40px;
                margin-bottom: 20px;
              }
              h2 { color: #202124; margin-bottom: 20px; }
              p { color: #5f6368; margin-bottom: 30px; }
              button {
                background: #1a73e8;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                margin: 5px;
              }
              button:hover { background: #1557b0; }
              .cancel { background: #5f6368; }
              .cancel:hover { background: #3c4043; }
            </style>
          </head>
          <body>
            <div class="container">
              <svg class="google-logo" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h2>Sign in with Google</h2>
              <p>Excel Analytics wants to access your Google Account</p>
              <p style="font-size: 12px; margin-bottom: 20px;">This will allow Excel Analytics to:</p>
              <ul style="text-align: left; font-size: 12px; color: #5f6368; margin-bottom: 30px;">
                <li>See your basic profile info</li>
                <li>See your primary email address</li>
              </ul>
              <button onclick="allowAccess()">Allow</button>
              <button class="cancel" onclick="window.close()">Cancel</button>
            </div>
            <script>
              function allowAccess() {
                // Simulate successful authentication
                const users = [
                  {
                    id: Date.now(),
                    name: "John Doe",
                    email: "john.doe@gmail.com",
                    role: "user",
                    avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
                    joinDate: new Date().toISOString().split('T')[0],
                    provider: "google"
                  },
                  {
                    id: Date.now() + 1,
                    name: "Admin User",
                    email: "admin@company.com",
                    role: "admin",
                    avatar: "https://lh3.googleusercontent.com/a/admin-user=s96-c",
                    joinDate: new Date().toISOString().split('T')[0],
                    provider: "google"
                  }
                ];
                
                // 30% chance of getting admin user
                const selectedUser = Math.random() > 0.7 ? users[1] : users[0];
                
                // Send user data back to parent window
                window.opener.postMessage({
                  type: 'GOOGLE_AUTH_SUCCESS',
                  user: selectedUser
                }, '*');
                
                window.close();
              }
            </script>
          </body>
        </html>
      `);

      // Listen for authentication result
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          const user = event.data.user;
          onAuthSuccess(user);
          toast.success(`Welcome ${user.name}! ${user.role === 'admin' ? 'Admin access granted.' : ''}`);
          setIsLoading(false);
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);

      // Handle popup close without authentication
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsLoading(false);
        }
      }, 1000);

    } catch (error) {
      console.error("Google login error:", error);
      onError?.("Failed to login with Google");
      toast.error("Google login failed. Please try again.");
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
      {isLoading ? "Connecting to Google..." : "Continue with Google"}
    </Button>
  );
};
