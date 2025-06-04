
import { useState } from "react";
import { User, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EA</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Excel Analytics
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Analytics
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Reports
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="hidden sm:inline">John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
                <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                  <User size={16} />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                  <Settings size={16} />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer text-red-600">
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium py-2">
                Dashboard
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium py-2">
                Analytics
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium py-2">
                Reports
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
