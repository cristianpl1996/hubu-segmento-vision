
import { Search, Bell, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 w-full z-40 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="h-16 px-6 ml-0 lg:ml-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-hubu-purple to-hubu-purple/80">
                hubu
              </span>
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md hover:bg-hubu-gray-100 transition">
            <Search className="h-5 w-5 text-hubu-gray-500" />
          </button>
          <button className="p-2 rounded-md hover:bg-hubu-gray-100 transition">
            <Bell className="h-5 w-5 text-hubu-gray-500" />
          </button>
          <button className="p-2 rounded-md hover:bg-hubu-gray-100 transition">
            <Settings className="h-5 w-5 text-hubu-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
