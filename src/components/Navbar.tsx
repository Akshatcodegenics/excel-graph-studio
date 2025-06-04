
import { useState } from "react";
import { User, Settings, LogOut, Menu, X, FileSpreadsheet, BarChart3, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavbarProps {
  currentUser?: any;
  onAuthClick: () => void;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar = ({ currentUser, onAuthClick, onLogout, currentPage, onNavigate }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'View your analytics overview, recent uploads, and quick stats'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Deep dive into chart performance, view metrics, and track engagement'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Generate AI-powered reports, download analysis, and manage documentation'
    },
    {
      id: 'upload',
      label: 'Upload',
      icon: FileSpreadsheet,
      description: 'Upload Excel files and start creating interactive visualizations'
    }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <TooltipProvider>
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleNavClick('upload')}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EA</span>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">
                  Excel Analytics
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-blue-600 bg-blue-50 border border-blue-200'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
              
              {currentUser?.role === 'admin' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 'admin'
                          ? 'text-red-600 bg-red-50 border border-red-200'
                          : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <Shield size={18} />
                      <span>Admin</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Access admin panel to manage users and system settings</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {currentUser.name?.charAt(0) || 'U'}
                      </div>
                      <span className="hidden sm:inline">{currentUser.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
                    <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                      <User size={16} />
                      <div>
                        <div className="font-medium">{currentUser.name}</div>
                        <div className="text-xs text-gray-500">{currentUser.email}</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                      <Settings size={16} />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center space-x-2 cursor-pointer text-red-600"
                      onClick={onLogout}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={onAuthClick} className="bg-blue-600 hover:bg-blue-700">
                  Login / Sign Up
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon size={18} />
                      <div>
                        <div>{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </button>
                  );
                })}
                
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                      currentPage === 'admin'
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Shield size={18} />
                    <div>
                      <div>Admin Panel</div>
                      <div className="text-xs text-gray-500">Manage users and system settings</div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </TooltipProvider>
  );
};
