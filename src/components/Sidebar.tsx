import { useState, useEffect } from "react";
import { Users, Megaphone, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, to, isActive, isCollapsed }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
        isActive
          ? "bg-hubu-purple/10 text-hubu-purple"
          : "text-hubu-gray-600 hover:bg-hubu-gray-100"
      )}
      title={isCollapsed ? label : undefined}
    >
      <div className={cn(isActive ? "text-hubu-purple" : "text-hubu-gray-500")}>
        {icon}
      </div>
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsCollapsed(window.innerWidth < 1024);
    
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}
      
      <div
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-white border-r border-hubu-gray-200 transition-all duration-300 pt-16",
          isCollapsed ? "w-16" : "w-64",
          isMobile ? (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
        onMouseEnter={() => !isMobile && setIsCollapsed(false)}
        onMouseLeave={() => !isMobile && setIsCollapsed(true)}
      >
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-1 rounded-md text-hubu-gray-500 hover:bg-hubu-gray-100"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        )}
        
        {isMobile && isMobileMenuOpen && (
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 p-1 rounded-md text-hubu-gray-500 hover:bg-hubu-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <div className="p-4">
          <div className="mb-6 space-y-1">
            <SidebarItem
              icon={<Users className="h-5 w-5" />}
              label="Segmentos"
              to="/"
              isActive={isActive("/") && !isActive("/campaigns")}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Megaphone className="h-5 w-5" />}
              label="Campañas Masivas"
              to="/campaigns"
              isActive={isActive("/campaigns")}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </div>

      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md text-hubu-gray-500 hover:bg-hubu-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
