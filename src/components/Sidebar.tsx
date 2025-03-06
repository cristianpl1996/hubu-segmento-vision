
import { useState } from "react";
import { Users, Megaphone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, to, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
        isActive
          ? "bg-hubu-purple/10 text-hubu-purple"
          : "text-hubu-gray-600 hover:bg-hubu-gray-100"
      )}
    >
      <div className={cn(isActive ? "text-hubu-purple" : "text-hubu-gray-500")}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-white border-r border-hubu-gray-200 transition-all duration-300 pt-16",
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-[4rem]" : "w-64 translate-x-0"
        )}
      >
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 p-1 rounded-md text-hubu-gray-500 hover:bg-hubu-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-4">
          <div className="mb-6 space-y-1">
            <SidebarItem
              icon={<Users className="h-5 w-5" />}
              label={isCollapsed ? "" : "Segmentos"}
              to="/"
              isActive={isActive("/") && !isActive("/campaigns")}
            />
            <SidebarItem
              icon={<Megaphone className="h-5 w-5" />}
              label={isCollapsed ? "" : "Campañas Masivas"}
              to="/campaigns"
              isActive={isActive("/campaigns")}
            />
          </div>
        </div>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-hubu-gray-500 hover:bg-hubu-gray-100"
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
};

export default Sidebar;
