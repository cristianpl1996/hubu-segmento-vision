
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

interface PageHeaderProps {
  title: string;
  count: number;
  breadcrumbs: { label: string; href: string; active?: boolean }[];
  onSearch: (term: string) => void;
}

const PageHeader = ({ title, count, breadcrumbs, onSearch }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-hubu-gray-700">{title}: {count}</h1>
        <nav className="flex items-center space-x-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="text-hubu-gray-400 mx-1">{'>'}</span>}
              <a 
                href={crumb.href} 
                className={`${crumb.active ? 'text-hubu-gray-700 font-medium' : 'text-hubu-gray-500 hover:text-hubu-gray-700'}`}
              >
                {crumb.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex-1">
          <SearchBar onSearch={onSearch} />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Crear segmento
        </motion.button>
      </div>
    </div>
  );
};

export default PageHeader;
